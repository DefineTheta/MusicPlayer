import React, { useEffect, useState } from 'react';
import { IpcService } from 'ipc/IpcService';

const AlbumsPage: React.FC = () => {
	const [albums, setAlbums] = useState();
	useEffect(() => {
		const fetchAlbums = async () => {
			setAlbums(await IpcService.send('get-albums'));
		};

		fetchAlbums();
	}, []);

	return <div className='w-auto h-auto bg-gray-500'></div>;
};

export default AlbumsPage;
