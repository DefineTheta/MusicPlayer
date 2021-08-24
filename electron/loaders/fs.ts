import mkdirp from 'mkdirp';
import glob from 'glob-promise';

import { ALBUM_THUMB_PATH } from '#/constants/paths';

class FilesystemManager {
	/**
	 * Create all necessary directories and copy all required resources
	 */
	public async init(): Promise<void> {
		await mkdirp(ALBUM_THUMB_PATH);
	}

	/**
	 * Recursively find all files in a folder with provided extensions
	 */
	public async getFilesWithExt(
		folderPath: string,
		extensions: string[]
	): Promise<string[]> {
		const extensionPattern = extensions.reduce((acc, cur) => {
			return (acc += ',' + cur);
		});

		return await glob(`${folderPath}/**/*.{${extensionPattern}}`);
	}
}

const fs = new FilesystemManager();

export default fs;
