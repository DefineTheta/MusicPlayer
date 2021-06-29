import { parseFile } from 'music-metadata';
import { getFilesWithExt } from './fs';

import DatabaseManager from '#/loaders/db';
import { Album } from '#/models/album.entity';
import { Artist } from '#/models/artist.entity';
import { Song } from '#/models/song.entity';

export interface ISongData {
	title: string | undefined;
	albumName: string | undefined;
	albumArtist: string | undefined;
	albumReleaseDate: string | undefined;
	trackPosition: number | null;
	date: string | undefined;
	path?: string;
}

export interface IAlbumData {
	artist: string | undefined;
	releaseDate: string | undefined;
	songs: ISongData[];
}

// TODO: Have a seperate album artist and song artist
export const getSongMetadata = async (filePath: string): Promise<ISongData> => {
	const metadata = await parseFile(filePath);

	return {
		title: metadata.common.title,
		albumName: metadata.common.album,
		albumArtist: metadata.common.albumartist,
		albumReleaseDate: metadata.common.date,
		trackPosition: metadata.common.track.no,
		date: metadata.common.date,
	};
};

export const parseMusicFiles = async (folderPath: string): Promise<void> => {
	const connection = DatabaseManager.connection;
	const albumRepository = connection.getRepository(Album);
	const artistRepository = connection.getRepository(Artist);
	const songRepository = connection.getRepository(Song);

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
		album.releaseDate = new Date(albumData.releaseDate as string);
		album.coverImagePath = '';
		await albumRepository.save(album);
	}
};
