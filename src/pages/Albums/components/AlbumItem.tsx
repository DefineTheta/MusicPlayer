import React from 'react';
import { fileURLtoProtocol } from '@/helpers/misc';

interface AlbumItemProps {
	name: string;
	coverImagePath: string;
}

const AlbumItem: React.FC<AlbumItemProps> = (props) => {
	return (
		<div className='mr-6 mb-6 p-4 bg-black-darkest hover:bg-black-light cursor-pointer rounded'>
			<img src={fileURLtoProtocol(props.coverImagePath)} />
			<h3 className='mt-4 font-medium truncate' role='text' aria-label={props.name}>
				{props.name}
			</h3>
		</div>
	);
};

export default AlbumItem;
