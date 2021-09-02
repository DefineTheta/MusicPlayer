import React from 'react';
import { fileURLtoProtocol } from '@/helpers/misc';
import { IArtist } from 'types/music';

interface AlbumCardProps {
	name: string;
	coverImagePath: string;
	artists: IArtist[];
}

const AlbumCard: React.FC<AlbumCardProps> = (props) => {
	return (
		<div className='mr-6 mb-6 p-4 pb-6 bg-black-darkest hover:bg-black-light cursor-pointer rounded'>
			<img src={fileURLtoProtocol(props.coverImagePath)} />
			<h3 className='mt-4 font-semibold truncate' role='text' aria-label={props.name}>
				{props.name}
			</h3>
			<h4 className='text-sm font-light truncate'>{props.artists[0].name}</h4>
		</div>
	);
};

export default AlbumCard;
