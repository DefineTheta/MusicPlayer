import { ipcMain, IpcRenderer } from 'electron';
import { IpcChannelInterface, IpcRequest } from './IpcChannelInterface';

import colors from 'colors';

export class IpcService {
	private static ipcRenderer: IpcRenderer;

	private static initializeIpcRenderer() {
		if (!window || !window.process || !window.require) {
			throw new Error(`Unable to require renderer process`);
		}
		this.ipcRenderer = window.require('electron').ipcRenderer;
	}

	public static registerChannel(channel: IpcChannelInterface): void {
		channel.init();

		channel
			.getStreams()
			.forEach((stream) =>
				ipcMain.on(stream.name, (event, request) => stream.handler(event, request))
			);

		if (process.env.NODE_ENV === 'development') {
			console.log(colors.green('[IPC]'), ` Registered ${channel.getName()} Channel`);
		}
	}

	public static send<T>(channel: string, request: IpcRequest = {}): Promise<T> {
		// If the ipcRenderer is not available try to initialize it
		if (!this.ipcRenderer) {
			this.initializeIpcRenderer();
		}
		// If there's no responseChannel let's auto-generate it
		if (!request.responseChannel) {
			request.responseChannel = `${channel}_response`;
		}

		this.ipcRenderer.send(channel, request);

		// This method returns a promise which will be resolved when the response has arrived.
		return new Promise((resolve) => {
			this.ipcRenderer.once(request.responseChannel as string, (event, response) =>
				resolve(response)
			);
		});
	}
}
