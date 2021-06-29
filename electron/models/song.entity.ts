import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Album } from './album.entity';

@Entity()
export class Song extends BaseEntity {
	@Column({ type: 'varchar' })
	title: string;

	@Column({ type: 'integer' })
	albumPosition: number;

	@Column({ type: 'text' })
	path: string;

	@ManyToOne(() => Album, (album) => album.songs)
	album: Album;
}
