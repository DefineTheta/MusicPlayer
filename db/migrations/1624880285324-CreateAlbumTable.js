const { Table } = require('typeorm');

module.exports = class CreateAlbumTable1624880285324 {
	async up(queryRunner) {
		await queryRunner.createTable(
			new Table({
				name: 'album',
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
						name: 'release_date',
						type: 'date',
					},
					{
						name: 'cover_image_name',
						type: 'text',
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
		await queryRunner.dropTable('album');
	}
};
