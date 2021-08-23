import { app } from 'electron';
import path from 'path';

export const DEV_DB_PATH = path.join(process.env.ROOT_PATH, process.env.DEV_DB_PATH);
export const PROD_DB_PATH = path.join(app.getPath('userData'), process.env.PROD_DB_PATH);
export const ALBUM_THUMB_PATH = path.join(
	app.getPath('userData'),
	process.env.ALBUM_THUMB_PATH
);
