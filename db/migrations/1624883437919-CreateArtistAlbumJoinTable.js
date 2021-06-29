const { Table } = require('typeorm');
const { createForeignKeys, deleteForeignKeys } = require('../helpers/util');

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

		await createForeignKeys(queryRunner, 'artist_album', [
			{
				column: 'artistId',
				table: 'artist',
			},
			{
				column: 'albumId',
				table: 'album',
			},
		]);
	}

	async down(queryRunner) {
		await deleteForeignKeys(queryRunner, 'artist_album', ['artistId', 'albumId']);
		await queryRunner.dropTable('artist_album');
	}
};
