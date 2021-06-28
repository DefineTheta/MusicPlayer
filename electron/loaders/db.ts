import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { app } from 'electron';
import path from 'path';

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

const dbPath =
	process.env.NODE_ENV === 'development'
		? process.env.ROOT_PATH + process.env.DEV_DB_PATH
		: app.getPath('userData') + process.env.PROD_DB_PATH;

const db = new DatabaseManager({
	type: 'sqlite',
	database: dbPath,
	entities: [path.resolve(__dirname, '../models/*.ts')],
	logging: false,
});

export default db;
