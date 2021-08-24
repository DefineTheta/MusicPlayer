import { app } from 'electron';
import { parseFile, selectCover } from 'music-metadata';
import { generate as uniqueString } from 'randomstring';
import colors from 'colors';
import sharp from 'sharp';
import path from 'path';

import DatabaseManager from '#/loaders/db';
import FileManager from '#/loaders/fs';
import { Album } from '#/models/album.entity';
import { Artist } from '#/models/artist.entity';
import { Song } from '#/models/song.entity';

import { IArtistData, ArtistRepository } from '#/repositories/artist.repository';
import { IAlbumData, AlbumRepository } from '#/repositories/album.repository';

export interface ISongData {
	title: string;
	albumName: string;
	albumArtist: string;
	albumReleaseDate: string;
	albumImage?: Buffer;
	trackPosition: number;
	songArtists: string[];
	date: string;
	path?: string;
}

export const parseArtistName = (arr: string[]): string[] => {
	const artists: string[] = [];

	for (let i = 0; i < arr.length; i++) {
		const allArtist = arr[i].split('; ');
		allArtist.forEach((artist) => artists.push(artist));
	}

	return artists;
};

// TODO: Have a seperate album artist and song artist
export const getSongMetadata = async (filePath: string): Promise<ISongData> => {
	const metadata = await parseFile(filePath);
	const albumCover = selectCover(metadata.common.picture);

	return {
		title: metadata.common.title as string,
		albumName: metadata.common.album as string,
		albumArtist: metadata.common.albumartist as string,
		albumReleaseDate: metadata.common.date as string,
		albumImage: albumCover?.data,
		trackPosition: metadata.common.track.no as number,
		songArtists: parseArtistName(metadata.common.artists as string[]),
		date: metadata.common.date as string,
	};
};

export const parseMusicFiles = async (folderPath: string): Promise<void> => {
	const connection = DatabaseManager.connection;
	const albumRepository = connection.getCustomRepository(AlbumRepository);
	const artistRepository = connection.getCustomRepository(ArtistRepository);
	const songRepository = connection.getRepository(Song);

	const artistEntities: Artist[] = [];
	const albumEntities: Album[] = [];
	const songEntities: Song[] = [];

	const artistEntitiesLookup: { [key: string]: number } = {};
	const albumEntitiesLookup: { [key: string]: number } = {};

	const albumLookup = async (
		data: IAlbumData,
		albumArtists: IArtistData[],
		albumImageData?: Buffer
	): Promise<Album> => {
		let entity: Album | undefined;
		let entityIndex = albumEntitiesLookup[data.name];

		if (entityIndex === undefined) {
			entity = await albumRepository.findBy(data.name, data.releaseDate);
		} else {
			entity = albumEntities[entityIndex];
		}

		if (entity === undefined) {
			if (albumImageData !== null) {
				const thumbFileName = uniqueString(7) + '.png';

				await sharp(albumImageData)
					.resize(320)
					.toFile(
						path.join(
							app.getPath('userData'),
							process.env.ALBUM_THUMB_PATH as string,
							thumbFileName
						)
					);
				data.coverImageName = thumbFileName;
			}

			entity = albumRepository.createWithData(data);
		}

		if (entityIndex === undefined) {
			// If this is a new album add its associated artists to database
			for (let i = 0; i < albumArtists.length; i++) {
				const albumArtist = await artistLookup(albumArtists[i]);
				albumArtist.albums.push(entity);
			}

			entityIndex = albumEntities.length;
			albumEntities.push(entity);
			albumEntitiesLookup[data.name] = entityIndex;
		}

		return entity;
	};

	const artistLookup = async (data: IArtistData): Promise<Artist> => {
		let entity: Artist | undefined;
		let entityIndex = artistEntitiesLookup[data.name];

		if (entityIndex === undefined) entity = await artistRepository.findBy(data.name);
		else entity = artistEntities[entityIndex];

		if (entity === undefined) entity = artistRepository.createWithData(data);

		if (entityIndex === undefined) {
			entityIndex = artistEntities.length;
			artistEntities.push(entity);
			artistEntitiesLookup[data.name] = entityIndex;
		}

		return entity;
	};

	const filePaths = await FileManager.getFilesWithExt(folderPath, ['mp3', 'wav', 'flac']);

	for (let i = 0; i < filePaths.length; i++) {
		const filePath = filePaths[i];
		const songData = await getSongMetadata(filePath);
		songData.path = filePath;

		const albumName = songData.albumName;
		const albumDate = new Date(songData.albumReleaseDate);
		const albumArtistName = songData.albumArtist;
		const albumImage = songData.albumImage;

		// TODO Have proper checking if properties actually exist
		// TODO Have proper album cover art path
		// TODO Have multiple album artist
		const album = await albumLookup(
			{
				name: albumName,
				releaseDate: albumDate,
				coverImageName: '',
			},
			[{ name: albumArtistName }],
			albumImage
		);

		// TODO Check if the song already exists
		const song = new Song();
		song.title = songData.title;
		song.albumPosition = songData.trackPosition;
		song.path = songData.path as string;
		song.album = album;

		songEntities.push(song);

		for (let j = 0; j < songData.songArtists.length; j++) {
			const songArtistName = songData.songArtists[j];
			const songArtist = await artistLookup({ name: songArtistName });

			songArtist.songs.push(song);
		}
	}

	await artistRepository.save(artistEntities);
};
