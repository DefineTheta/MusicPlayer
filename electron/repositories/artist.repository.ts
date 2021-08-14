import { EntityRepository, Repository } from 'typeorm';
import { Artist } from '#/models/artist.entity';
import { Album } from '#/models/album.entity';
import { Song } from '#/models/song.entity';

export interface IArtistData {
	name: string;
	albums?: Album[];
	songs?: Song[];
}

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {
	/**
	 * Inserts artist data into the database
	 */
	saveWithData({ name, albums, songs }: IArtistData): Promise<Artist> {
		const artist = new Artist();
		artist.name = name;
		artist.albums = albums ? albums : [];
		artist.songs = songs ? songs : [];
		return this.save(artist);
	}

	/**
	 * Creates an artist object
	 * Does not save into the database
	 */
	createWithData({ name, albums, songs }: IArtistData): Artist {
		const artist = new Artist();
		artist.name = name;
		artist.albums = albums ? albums : [];
		artist.songs = songs ? songs : [];
		return artist;
	}

	/**
	 * Finds an artist that matches a given name
	 */
	findBy(name: string): Promise<Artist | undefined> {
		return this.findOne({ where: { name } });
	}

	/**
	 * Finds an artist by their name and appends provided data
	 * If the artist does not exist in the databse then inserts with provided data
	 */
	async appendOrCreate({ name, albums, songs }: IArtistData): Promise<Artist> {
		if (albums === undefined) albums = [];
		if (songs === undefined) songs = [];

		const artist = await this.findBy(name);

		if (artist === undefined) return this.saveWithData({ name, albums, songs });
		else return this.addData(artist, albums, songs);
	}

	addAlbum(artist: Artist, album: Album): Promise<Artist> {
		artist.albums.push(album);
		return this.save(artist);
	}

	addAlbums(artist: Artist, albums: Album[]): Promise<Artist> {
		artist.albums.push(...albums);
		return this.save(artist);
	}

	addSong(artist: Artist, song: Song): Promise<Artist> {
		artist.songs.push(song);
		return this.save(artist);
	}

	addSongs(artist: Artist, songs: Song[]): Promise<Artist> {
		artist.songs.push(...songs);
		return this.save(artist);
	}

	addData(artist: Artist, albums: Album[], songs: Song[]): Promise<Artist> {
		artist.albums.push(...albums);
		artist.songs.push(...songs);
		return this.save(artist);
	}
}
