import { app, BrowserWindow, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import installExtension, {
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import 'reflect-metadata';
import DatabaseManager from '#/loaders/db';
import { getFilePaths } from './helpers/fs';

let mainWindow: Electron.BrowserWindow | null;

async function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		backgroundColor: '#121212',
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
	});

	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://localhost:4000');
	} else {
		mainWindow.loadURL(
			url.format({
				pathname: path.join(__dirname, 'renderer/index.html'),
				protocol: 'file:',
				slashes: true,
			})
		);
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	const paths = await dialog.showOpenDialog(mainWindow, {
		properties: ['openDirectory'],
	});

	await getFilePaths(paths.filePaths[0], ['mp3', 'wav', 'flac']);
}

app
	.on('ready', createWindow)
	.whenReady()
	.then(async () => {
		if (process.env.NODE_ENV === 'development') {
			installExtension(REACT_DEVELOPER_TOOLS)
				.then((name) => console.log(`Added Extension:  ${name}`))
				.catch((err) => console.log('An error occurred: ', err));
			installExtension(REDUX_DEVTOOLS)
				.then((name) => console.log(`Added Extension:  ${name}`))
				.catch((err) => console.log('An error occurred: ', err));
		}

		await DatabaseManager.init();
	});
app.allowRendererProcessReuse = true;
