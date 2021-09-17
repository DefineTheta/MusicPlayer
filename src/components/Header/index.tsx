import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.scss';

const Header: React.FC = () => {
	const history = useHistory();

	return (
		<div className='p-4 flex items-center'>
			<div className='flex items-center app-header__nav'>
				<button onClick={() => history.goBack()}>
					<svg fill='white' viewBox='0 0 24 24' aria-hidden='true'>
						<path d='M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z'></path>
					</svg>
				</button>
				<button onClick={() => history.goForward()}>
					<svg fill='white' viewBox='0 0 24 24' aria-hidden='true'>
						<path d='M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z'></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Header;
