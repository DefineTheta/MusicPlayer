import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IpcService } from 'ipc/IpcService';
import { ISong } from 'types/music';

const AlbumPage: React.FC = () => {
	const [songs, setSongs] = useState<ISong[]>();
	const { id: albumId } = useParams();

	useEffect(() => {
		const fetchSongs = async () => {
			setSongs(await IpcService.send('get-album-songs', { params: { albumId } }));
		};

		fetchSongs();
	}, []);

	return (
		<div>
			{songs?.map((song) => {
				return <div key={song.id}>{song.title}</div>;
			})}
		</div>
	);
};

export default AlbumPage;
