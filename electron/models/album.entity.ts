import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Artist } from './artist.entity';

@Entity()
export class Album extends BaseEntity {
	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'date' })
	releaseDate: Date;

	@ManyToMany(() => Artist, (artist) => artist.albums)
	artists: Artist[];
}
