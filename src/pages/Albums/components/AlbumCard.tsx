import React from 'react';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

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
			<div className='relative'>
				<img src={fileURLtoProtocol(props.coverImagePath)} />
				<div className='rounded-full albums__card__play-icon'>
					<button>
						<svg role='img' viewBox='0 0 24 24' aria-hidden='true'>
							<polygon
								points='21.57 12 5.98 3 5.98 21 21.57 12'
								fill='currentColor'
							></polygon>
						</svg>
					</button>
				</div>
			</div>
			<h3 className='mt-4 font-semibold truncate' role='text' aria-label={props.name}>
				{props.name}
			</h3>
			<h4 className='text-sm font-light truncate'>{props.artists[0].name}</h4>
		</div>
	);
};

export default AlbumCard;
