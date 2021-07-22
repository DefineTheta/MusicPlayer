import { EntityRepository, Repository } from 'typeorm';
import { Artist } from '#/models/artist.entity';
import { Album } from '#/models/album.entity';
import { Song } from '#/models/song.entity';

export interface IAlbumData {
	name: string;
	releaseDate: Date;
	coverImagePath: string;
	songs?: Song[];
	artists?: Artist[];
}

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
	/**
	 * Inserts album data into the database
	 */
	createWithData({
		name,
		releaseDate,
		coverImagePath,
		songs,
		artists,
	}: IAlbumData): Promise<Album> {
		const album = new Album();
		album.name = name;
		album.releaseDate = releaseDate;
		album.coverImagePath = coverImagePath;
		album.songs = songs ? songs : [];
		album.artists = artists ? artists : [];
		return this.save(album);
	}

	/**
	 * Finds an album that matches a given name and date
	 */
	findBy(name: string, releaseDate: Date): Promise<Album | undefined> {
		return this.findOne({ where: { name, releaseDate } });
	}
}
