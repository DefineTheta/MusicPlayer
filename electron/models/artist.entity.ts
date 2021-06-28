import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Album } from './album.entity';

@Entity()
export class Artist extends BaseEntity {
	@Column()
	name: string;

	@ManyToMany(() => Album, (album) => album.artists)
	@JoinTable()
	albums: Album[];
}
