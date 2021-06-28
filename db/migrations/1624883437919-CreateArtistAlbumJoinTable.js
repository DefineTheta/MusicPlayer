const { Table, TableForeignKey } = require('typeorm');

module.exports = class CreateArtistAlbumJoinTable1624883437919 {
	async up(queryRunner) {
		await queryRunner.createTable(
			new Table({
				name: 'artist_album',
				columns: [
					{
						name: 'artistId',
						type: 'integer',
						isPrimary: true,
					},
					{
						name: 'albumId',
						type: 'integer',
						isPrimary: true,
					},
				],
			})
		);

		await queryRunner.createForeignKey(
			'artist_album',
			new TableForeignKey({
				columnNames: ['artistId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'artist',
				onDelete: 'CASCADE',
			})
		);

		await queryRunner.createForeignKey(
			'artist_album',
			new TableForeignKey({
				columnNames: ['albumId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'album',
				onDelete: 'CASCADE',
			})
		);
	}

	async down(queryRunner) {
		const table = await queryRunner.getTable('artist_album');
		const foreignKeys = ['artistId', 'albumId'].map((columnName) => {
			return table.foreignKeys.find((fk) => fk.columnNames.indexOf(columnName) !== -1);
		});

		await queryRunner.dropForeignKeys('artist_album', foreignKeys);
		await queryRunner.dropTable('artist_album');
	}
};
