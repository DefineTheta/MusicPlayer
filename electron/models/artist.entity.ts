import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Artist extends BaseEntity {
	@Column()
	name: string;
}
