import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import SideBar from '@/components/SideBar';
import BottomBar from '@/components/BottomBar';

import AlbumsPage from '@/pages/Albums';

import './styles/main.scss';
import { IpcService } from 'ipc/IpcService';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
	// useEffect(() => {
	// 	(async () => {
	// 		const a = await IpcService.send('get-albums');
	// 		console.log(a);
	// 	})();
	// }, []);

	return (
		<>
			<div className='w-full h-full grid app app-container'>
				<SideBar />
				<Router>
					<div className='row-start-1 col-start-2 bg-black-dark'>
						<AlbumsPage />
					</div>
				</Router>
				<BottomBar />
			</div>
		</>
	);
};

render(<App />, mainElement);
