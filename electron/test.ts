import DatabaseManager from './loaders/db';
import { Album } from './models/album.entity';
import { Artist } from './models/artist.entity';

const t = async (): Promise<void> => {
	const connection = DatabaseManager.connection;
	const albumRepository = connection.getRepository(Album);
	const artistRepository = connection.getRepository(Artist);

	const album = new Album();
	album.name = 'Sweetner';
	album.releaseDate = new Date('2018-06-12');
	await albumRepository.save(album);

	const artist = new Artist();
	artist.name = 'Ariana Grande';
	artist.albums = [album];
	await artistRepository.save(artist);
};

export default t;
