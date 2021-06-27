import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Greetings from './components/Greetings';

import './styles/main.scss';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
	return (
		<Router>
			<Greetings />
		</Router>
	);
};

render(<App />, mainElement);
