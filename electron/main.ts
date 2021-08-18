import { app, BrowserWindow, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import installExtension, {
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import 'reflect-metadata';
import DatabaseManager from '#/loaders/db';
import { getFilesWithExt } from './helpers/fs';
import { parseMusicFiles } from './helpers/music';

class Main {
	private mainWindow: BrowserWindow;

	public async init() {
		app.on('ready', this.createWindow);
		app.on('window-all-closed', this.onWindowAllClosed);
		// app.on('activate', this.onActivate);

		app.allowRendererProcessReuse = true;

		await DatabaseManager.init();

		app.whenReady().then(async () => {
			const paths = await dialog.showOpenDialog(this.mainWindow, {
				properties: ['openDirectory'],
			});

			if (!paths.canceled) {
				await parseMusicFiles(paths.filePaths[0]);
			}
		});
	}

	private onWindowAllClosed() {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	}

	private createWindow() {
		this.mainWindow = new BrowserWindow({
			width: 1280,
			height: 720,
			title: 'Music Player',
			backgroundColor: '#121212',
			webPreferences: {
				nodeIntegration: true,
				enableRemoteModule: true,
			},
		});

		if (process.env.NODE_ENV === 'development') {
			this.mainWindow.loadURL('http://localhost:4000');

			installExtension(REACT_DEVELOPER_TOOLS)
				.then((name) => console.log(`Added Extension:  ${name}`))
				.catch((err) => console.log('An error occurred: ', err));
			installExtension(REDUX_DEVTOOLS)
				.then((name) => console.log(`Added Extension:  ${name}`))
				.catch((err) => console.log('An error occurred: ', err));

			this.mainWindow.webContents.openDevTools();
		} else {
			this.mainWindow.loadURL(
				url.format({
					pathname: path.join(__dirname, 'renderer/index.html'),
					protocol: 'file:',
					slashes: true,
				})
			);
		}
	}
}

// Here we go!
new Main().init();
