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
