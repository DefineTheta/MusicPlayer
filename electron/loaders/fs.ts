import mkdirp from 'mkdirp';

import { ALBUM_THUMB_PATH } from '#/constants/paths';

class FilesystemManager {
	public async init(): Promise<void> {
		await mkdirp(ALBUM_THUMB_PATH);
	}
}

const fs = new FilesystemManager();

export default fs;
