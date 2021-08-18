import { ipcMain, IpcMainEvent } from 'electron';
import { IpcChannelInterface, IpcRequest } from '../IpcChannelInterface';

import colors from 'colors';

import DatabaseManager from '#/loaders/db';
import { AlbumRepository } from '#/repositories/album.repository';

export class MusicLibraryChannel implements IpcChannelInterface {
	private albumRepository: AlbumRepository;

	init(): void {
		const connection = DatabaseManager.connection;
		this.albumRepository = connection.getCustomRepository(AlbumRepository);
	}

	register(): void {
		const subChannels = [
			{
				name: 'get-albums',
				handler: this.getAlbums.bind(this),
			},
		];

		subChannels.forEach((channel) =>
			ipcMain.on(channel.name, (event, request) => channel.handler(event, request))
		);

		if (process.env.NODE_ENV === 'development') {
			console.log(colors.green('[IPC]'), ' Registered Music Library Channel');
		}
	}

	private async getAlbums(event: IpcMainEvent, request: IpcRequest): Promise<void> {
		const result = await this.albumRepository.find();

		event.reply(request.responseChannel, result);
	}
}
