import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IpcService } from 'ipc/IpcService';
import { ISong } from 'types/music';

import './style.scss';

const AlbumPage: React.FC = () => {
	const [songs, setSongs] = useState<ISong[]>([]);
	const { id: albumId } = useParams();

	useEffect(() => {
		const fetchSongs = async () => {
			setSongs(await IpcService.send('get-album-songs', { params: { albumId } }));
		};

		fetchSongs();
	}, []);

	return (
		<div className='w-auto h-auto px-6 py-6'>
			<div className='mb-4 pb-2 w-auto flex items-center text-sm text-secondary border-b border-faint'>
				<span className='w-12 text-center'>#</span>
				<div className='w-full flex items-center justify-between'>
					<span>TITLE</span>
					<span>PLAYS</span>
				</div>
			</div>
			{songs?.map((song) => {
				return (
					<div
						key={song.id}
						className='py-2 flex items-center rounded-md cursor-pointer song-detail-row'
					>
						<div className='w-12 text-center text-m text-secondary'>
							<span className='song-detail-row__positon'>{song.albumPosition}</span>
							<button className='song-detail-row__play'>
								<svg viewBox='0 0 24 24'>
									<path fill='white' d='M8,5.14V19.14L19,12.14L8,5.14Z' />
								</svg>
							</button>
						</div>
						<div className='flex flex-col'>
							<span className='font-semibold text-m'>{song.title}</span>
							<span className='text-sm text-secondary'>
								{song.artists.map((artist) => {
									return (
										<span key={artist.id} className='song-detail-row__artist'>
											{artist.name}
										</span>
									);
								})}
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AlbumPage;
