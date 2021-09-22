export interface IAlbum {
	id: number;
	name: string;
	releaseData: Date;
	coverImagePath: string;
	artists: IArtist[];
}

export interface IArtist {
	id: number;
	name: string;
}

export interface ISong {
	id: number;
	title: string;
	albumPosition: number;
	path: string;
	albumId: number;
	artists: IArtist[];
}
