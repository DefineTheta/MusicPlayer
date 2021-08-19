import { ipcMain, IpcMainEvent } from 'electron';
import { IpcChannelInterface, IpcRequest, IpcStream } from '../IpcChannelInterface';

import DatabaseManager from '#/loaders/db';
import { AlbumRepository } from '#/repositories/album.repository';

export class MusicLibraryChannel implements IpcChannelInterface {
	private albumRepository: AlbumRepository;

	init(): void {
		const connection = DatabaseManager.connection;
		this.albumRepository = connection.getCustomRepository(AlbumRepository);
	}

	getName(): string {
		return 'Music Library';
	}

	getStreams(): IpcStream[] {
		return [
			{
				name: 'get-albums',
				handler: this.getAlbums.bind(this),
			},
		];
	}

	private async getAlbums(event: IpcMainEvent, request: IpcRequest): Promise<void> {
		const result = await this.albumRepository.find();

		event.reply(request.responseChannel, result);
	}
}
