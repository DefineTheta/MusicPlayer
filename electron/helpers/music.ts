import { parseFile } from 'music-metadata';
import { getFilesWithExt } from './fs';

import DatabaseManager from '#/loaders/db';
import { Album } from '#/models/album.entity';
import { Artist } from '#/models/artist.entity';
import { Song } from '#/models/song.entity';

export interface ISongData {
	title: string;
	albumName: string;
	albumArtist: string;
	albumReleaseDate: string;
	trackPosition: number;
	songArtists: string[];
	date: string;
	path?: string;
}

export interface IAlbumData {
	artist: string;
	releaseDate: string;
	songs: ISongData[];
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

	return {
		title: metadata.common.title as string,
		albumName: metadata.common.album as string,
		albumArtist: metadata.common.albumartist as string,
		albumReleaseDate: metadata.common.date as string,
		trackPosition: metadata.common.track.no as number,
		songArtists: parseArtistName(metadata.common.artists as string[]),
		date: metadata.common.date as string,
	};
};

export const parseMusicFiles = async (folderPath: string): Promise<void> => {
	const connection = DatabaseManager.connection;
	const albumRepository = connection.getRepository(Album);
	const artistRepository = connection.getRepository(Artist);
	const songRepository = connection.getRepository(Song);

	const artists: { [key: string]: Artist } = {};

	const filePaths = await getFilesWithExt(folderPath, ['mp3', 'wav', 'flac']);
	const albumsData: { [key: string]: IAlbumData } = {};
	const albumsDataKeys: string[] = [];

	for (let i = 0; i < filePaths.length; i++) {
		const filePath = filePaths[i];
		const songData = await getSongMetadata(filePath);
		songData.path = filePath;

		const albumName = songData.albumName;

		if (albumName !== undefined) {
			if (albumsData[albumName] !== undefined) {
				albumsData[albumName].songs.push(songData);
			} else {
				albumsDataKeys.push(albumName);
				albumsData[albumName] = {
					artist: songData.albumArtist,
					releaseDate: songData.albumReleaseDate,
					songs: [songData],
				};
			}
		}
	}

	for (let i = 0; i < albumsDataKeys.length; i++) {
		const albumName = albumsDataKeys[i];
		const albumData = albumsData[albumName];

		// TODO Have proper checking if properties actually exist
		// TODO Have proper album cover art path
		const album = new Album();
		album.name = albumName;
		album.releaseDate = new Date(albumData.releaseDate);
		album.coverImagePath = '';
		await albumRepository.save(album);

		for (let j = 0; j < albumData.songs.length; j++) {
			const songData = albumData.songs[j];

			const song = new Song();
			song.title = songData.title;
			song.albumPosition = songData.trackPosition;
			song.path = songData.path as string;
			song.album = album;
			await songRepository.save(song);
		}
	}
};
