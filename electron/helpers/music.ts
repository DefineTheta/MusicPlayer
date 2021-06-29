import { parseFile } from 'music-metadata';
import { getFilesWithExt } from './fs';

export interface IMusicData {
	title: string | undefined;
	album: string | undefined;
	albumArtist: string | undefined;
	trackPosition: number | null;
	data: string | undefined;
}

// TODO: Have a seperate album artist and song artist
export const getMusicMetadata = async (filePath: string): Promise<IMusicData> => {
	const metadata = await parseFile(filePath);

	return {
		title: metadata.common.title,
		album: metadata.common.album,
		albumArtist: metadata.common.artist,
		trackPosition: metadata.common.track.no,
		data: metadata.common.date,
	};
};

export const parseMusicFiles = async (folderPath: string): Promise<void> => {
	const musicFilePaths = await getFilesWithExt(folderPath, ['mp3', 'wav', 'flac']);
	const musicFilesData: { [key: string]: IMusicData[] } = {};

	for (let i = 0; i < musicFilePaths.length; i++) {
		const data = await getMusicMetadata(musicFilePaths[i]);

		if (data.album !== undefined) {
			if (musicFilesData[data.album] !== undefined) {
				musicFilesData[data.album].push(data);
			} else {
				musicFilesData[data.album] = [data];
			}
		}
	}

	console.log(musicFilesData);
};
