const { Table } = require('typeorm');
const { createForeignKeys, deleteForeignKeys } = require('../helpers/util');

module.exports = class CreateSongTable1624924787877 {
	async up(queryRunner) {
		await queryRunner.createTable(
			new Table({
				name: 'song',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'albumId',
						type: 'integer',
					},
					{
						name: 'album_position',
						type: 'integer',
					},
					{
						name: 'title',
						type: 'varchar',
					},
					{
						name: 'path',
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

		await createForeignKeys(queryRunner, 'song', [
			{
				column: 'albumId',
				table: 'album',
			},
		]);
	}

	async down(queryRunner) {
		await deleteForeignKeys(queryRunner, 'song', ['albumId']);
	}
};
