declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			ROOT_PATH: string;
			DEV_DB_PATH: string;
			PROD_DB_PATH: string;
			ALBUM_THUMB_PATH: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
