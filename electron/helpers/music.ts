import { parseFile } from 'music-metadata';
import { getFilesWithExt } from './fs';

// TODO: Have a seperate album artist and song artist
export const getMusicMetadata = async (
	filePath: string
): Promise<{
	title: string | undefined;
	album: string | undefined;
	albumArtist: string | undefined;
	trackPosition: number | null;
	data: string | undefined;
}> => {
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

	for (let i = 0; i < musicFilePaths.length; i++) {
		console.log(await getMusicMetadata(musicFilePaths[i]));
	}
};
