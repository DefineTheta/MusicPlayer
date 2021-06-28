import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createDateTime: Date;

	@UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	updateDateTime: Date;
}
