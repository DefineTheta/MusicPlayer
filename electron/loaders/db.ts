import { createConnection, ConnectionOptions, Connection } from 'typeorm';

import { DEV_DB_PATH, PROD_DB_PATH } from '#/constants/paths';

// Import database table entities to register with TypeORM
import { Album } from '#/models/album.entity';
import { Artist } from '#/models/artist.entity';
import { Song } from '#/models/song.entity';

class DatabaseManager {
	#connection!: Connection;
	#connectionOptions: ConnectionOptions;

	constructor(options: ConnectionOptions) {
		this.#connectionOptions = options;
	}

	async init(): Promise<void> {
		this.#connection = await createConnection(this.#connectionOptions);
	}

	get connection(): Connection {
		if (this.#connection !== undefined) {
			return this.#connection;
		} else {
			throw new ReferenceError('Database has not been initialized before access');
		}
	}
}

const dbPath = process.env.NODE_ENV === 'development' ? DEV_DB_PATH : PROD_DB_PATH;

const db = new DatabaseManager({
	type: 'sqlite',
	database: dbPath,
	entities: [Album, Artist, Song],
	logging: process.env.NODE_ENV === 'development',
	synchronize: true,
});

export default db;
