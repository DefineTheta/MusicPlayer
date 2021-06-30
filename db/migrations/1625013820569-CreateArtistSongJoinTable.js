const { Table } = require('typeorm');
const { createForeignKeys, deleteForeignKeys } = require('../helpers/util');

module.exports = class CreateArtistSongJoinTable1625013820569 {
	async up(queryRunner) {
		await queryRunner.createTable(
			new Table({
				name: 'artist_song',
				columns: [
					{
						name: 'artistId',
						type: 'integer',
						isPrimary: true,
					},
					{
						name: 'songId',
						type: 'integer',
						isPrimary: true,
					},
				],
			})
		);

		await createForeignKeys(queryRunner, 'artist_song', [
			{
				column: 'artistId',
				table: 'artist',
			},
			{
				column: 'songId',
				table: 'song',
			},
		]);
	}

	async down(queryRunner) {
		await deleteForeignKeys(queryRunner, 'artist_song', ['artistId', 'songId']);
		await queryRunner.dropTable('artist_song');
	}
};
