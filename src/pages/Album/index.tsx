import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IpcService } from 'ipc/IpcService';

const AlbumPage: React.FC = () => {
	const { id: albumId } = useParams();

	useEffect(() => {
		const fetchSongs = async () => {
			await IpcService.send('get-album-songs');
		};

		fetchSongs();
	}, []);

	return <div></div>;
};

export default AlbumPage;
