import { IpcRenderer } from 'electron';
import { IpcRequest } from './IpcChannelInterface';

export class IpcService {
	private static ipcRenderer: IpcRenderer;

	private static initializeIpcRenderer() {
		if (!window || !window.process || !window.require) {
			throw new Error(`Unable to require renderer process`);
		}
		this.ipcRenderer = window.require('electron').ipcRenderer;
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

		const ipcRenderer = this.ipcRenderer;
		ipcRenderer.send(channel, request);

		// This method returns a promise which will be resolved when the response has arrived.
		return new Promise((resolve) => {
			ipcRenderer.once(request.responseChannel as string, (event, response) =>
				resolve(response)
			);
		});
	}
}
