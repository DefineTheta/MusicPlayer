import React, { useEffect, useState } from 'react';
import { IpcService } from 'ipc/IpcService';
import { IAlbum } from 'types/music';

const AlbumsPage: React.FC = () => {
	const [albums, setAlbums] = useState<IAlbum[]>();
	useEffect(() => {
		const fetchAlbums = async () => {
			setAlbums(await IpcService.send('get-albums'));
		};

		fetchAlbums();
	}, []);

	if (!albums) {
		return <div className='w-auto h-auto bg-gray-500'></div>;
	} else {
		return (
			<div className='w-auto h-auto bg-gray-500'>
				{albums.map((album) => {
					return <img src={album.coverImagePath} width='128px' key={album.id} />;
				})}
			</div>
		);
	}
};

export default AlbumsPage;
