import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Album extends BaseEntity {
	@Column()
	name: string;

	@Column({ type: 'date' })
	releaseDate: Date;
}
