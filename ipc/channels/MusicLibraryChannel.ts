import path from 'path';
import { IpcMainEvent } from 'electron';
import { IpcChannelInterface, IpcRequest, IpcStream } from '../IpcChannelInterface';

import DatabaseManager from '#/loaders/db';
import { AlbumRepository } from '#/repositories/album.repository';
import { IAlbum, IArtist } from 'types/music';
import { ALBUM_THUMB_PATH } from '#/constants/paths';

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
		const result = await this.albumRepository.find({ relations: ['artists'] });
		const albums: IAlbum[] = [];

		for (let i = 0; i < result.length; i++) {
			const album = result[i];
			const artists: IArtist[] = album.artists.map((artist) => ({
				id: artist.id,
				name: artist.name,
			}));

			albums.push({
				id: album.id,
				name: album.name,
				releaseData: album.releaseDate,
				coverImagePath: path.join(ALBUM_THUMB_PATH, album.coverImageName),
				artists,
			});
		}

		event.reply(request.responseChannel, albums);
	}
}
