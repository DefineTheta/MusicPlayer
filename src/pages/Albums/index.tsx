import React, { useEffect, useState } from 'react';
import { IpcService } from 'ipc/IpcService';
import { IAlbum } from 'types/music';

import AlbumCard from './components/AlbumCard';

import './style.scss';

const AlbumsPage: React.FC = () => {
	const [albums, setAlbums] = useState<IAlbum[]>();
	useEffect(() => {
		const fetchAlbums = async () => {
			setAlbums(await IpcService.send('get-albums'));
		};

		fetchAlbums();
	}, []);

	if (!albums) {
		return <div className='w-auto h-auto p-4'></div>;
	} else {
		return (
			<div className='w-auto h-auto px-6 py-4'>
				<h1 className='py-2 ml-4 text-7xl font-bold'>ALBUMS</h1>
				<div className='mt-6 -mr-2 grid albums__container'>
					{albums.map((album) => (
						<AlbumCard
							key={album.id}
							id={album.id}
							name={album.name}
							coverImagePath={album.coverImagePath}
							artists={album.artists}
						/>
					))}
				</div>
			</div>
		);
	}
};

export default AlbumsPage;
