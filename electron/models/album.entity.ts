import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Artist } from './artist.entity';
import { Song } from './song.entity';

@Entity()
export class Album extends BaseEntity {
	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'date' })
	releaseDate: Date;

	@Column({ type: 'text' })
	coverImagePath: string;

	@OneToMany(() => Song, (song) => song.album)
	songs: Song[];

	@ManyToMany(() => Artist, (artist) => artist.albums)
	artists: Artist[];
}
