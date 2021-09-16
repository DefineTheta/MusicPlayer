import path from 'path';
import { Repository } from 'typeorm';
import { IpcMainEvent } from 'electron';
import { IpcChannelInterface, IpcRequest, IpcStream } from '../IpcChannelInterface';

import DatabaseManager from '#/loaders/db';
import { AlbumRepository } from '#/repositories/album.repository';
import { Song } from '#/models/song.entity';
import { IAlbum, IArtist } from 'types/music';
import { ALBUM_THUMB_PATH } from '#/constants/paths';

export class MusicLibraryChannel implements IpcChannelInterface {
	private albumRepository: AlbumRepository;
	private songRepository: Repository<Song>;

	init(): void {
		const connection = DatabaseManager.connection;
		this.albumRepository = connection.getCustomRepository(AlbumRepository);
		this.songRepository = connection.getRepository(Song);
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
			{
				name: 'get-album-songs',
				handler: this.getAlbumSongs.bind(this),
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

	private async getAlbumSongs(event: IpcMainEvent, request: IpcRequest): Promise<void> {
		const result = await this.songRepository.find({
			where: { album: request.params?.albumId },
		});

		console.log(result);

		event.reply(request.responseChannel, result);
	}
}
