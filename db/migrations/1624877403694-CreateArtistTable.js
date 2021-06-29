const { Table } = require('typeorm');

module.exports = class CreateArtistTable1624877403694 {
	async up(queryRunner) {
		await queryRunner.createTable(
			new Table({
				name: 'artist',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'datetime',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'edited_at',
						type: 'datetime',
						default: 'CURRENT_TIMESTAMP',
					},
				],
			})
		);
	}

	async down(queryRunner) {
		await queryRunner.dropTable('artist');
	}
};
