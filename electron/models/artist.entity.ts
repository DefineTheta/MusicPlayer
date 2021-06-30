import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Album } from './album.entity';
import { Song } from './song.entity';

@Entity()
export class Artist extends BaseEntity {
	@Column({ type: 'varchar' })
	name: string;

	@ManyToMany(() => Album, (album) => album.artists)
	@JoinTable({ name: 'artist_album' })
	albums: Album[];

	@ManyToMany(() => Song, (song) => song.artists)
	@JoinTable({ name: 'artist_song' })
	songs: Song[];
}
