const { TableForeignKey } = require('typeorm');

/**
 * Adds foreign keys to a given table using the TypeORM QueryRunner
 *
 * @param {QueryRunner} queryRunner
 * @param {string} tableName
 * @param {{ column: string, table: string }} data
 */
const createForeignKeys = async (queryRunner, tableName, data) => {
	const foreignKeys = data.map(({ column, table }) => {
		return new TableForeignKey({
			columnNames: [column],
			referencedColumnNames: ['id'],
			referencedTableName: table,
			onDelete: 'CASCADE',
		});
	});

	await queryRunner.createForeignKeys(tableName, foreignKeys);
};

/**
 * Removes foreign keys from a given table using the TypeORM QueryRunner
 *
 * @param {QueryRunner} queryRunner
 * @param {string} tableName
 * @param {string[]} columnNames
 */
const deleteForeignKeys = async (queryRunner, tableName, columnNames) => {
	const table = await queryRunner.getTable(tableName);
	const foreignKeys = columnNames.map((columnName) => {
		return table.foreignKeys.find((fk) => fk.columnNames.indexOf(columnName) !== -1);
	});

	await queryRunner.dropForeignKeys(tableName, foreignKeys);
};

module.exports = {
	createForeignKeys,
	deleteForeignKeys,
};
