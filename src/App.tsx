import React from 'react';
import { render } from 'react-dom';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
} from 'react-router-dom';

import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import BottomBar from '@/components/BottomBar';

import AlbumsPage from '@/pages/Albums';
import AlbumPage from '@/pages/Album';

import './styles/main.scss';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
	const history = useHistory();

	return (
		<>
			<div className='w-full h-full grid app app-container'>
				<SideBar />
				<Router>
					<div className='flex flex-col row-start-1 col-start-2 bg-black-dark'>
						<Header />
						<Switch>
							<Redirect from='/album/' to='/' exact />
							<Route path='/album/:id' component={AlbumPage} exact />
							<Route path='/' component={AlbumsPage} />
						</Switch>
					</div>
				</Router>
				<BottomBar />
			</div>
		</>
	);
};

render(<App />, mainElement);
