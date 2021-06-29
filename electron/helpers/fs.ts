import glob from 'glob-promise';

export const getFilePaths = async (
	folderPath: string,
	extensions: string[]
): Promise<string[]> => {
	const extensionPattern = extensions.reduce((acc, cur) => {
		return (acc += ',' + cur);
	});
	const filePaths = await glob(`${folderPath}/**/*.{${extensionPattern}}`);

	console.log(filePaths);
	return filePaths;
};
