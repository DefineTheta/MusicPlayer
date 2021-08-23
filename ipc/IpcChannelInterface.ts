import { IpcMainEvent } from 'electron';

export interface IpcRequest {
	responseChannel?: string;
	params?: Record<string, string>;
}

export interface IpcStream {
	name: string;
	handler(event: IpcMainEvent, request: IpcRequest): void;
}

export interface IpcChannelInterface {
	init(): void;
	getName(): string;
	getStreams(): IpcStream[];
}
