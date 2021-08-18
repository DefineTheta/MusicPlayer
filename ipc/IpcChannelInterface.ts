import { IpcMainEvent } from 'electron';

export interface IpcRequest {
	responseChannel?: string;
	params?: string[];
}

export interface IpcChannelInterface {
	init(): void;
	register(): void;
}
