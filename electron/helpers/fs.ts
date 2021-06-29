import glob from 'glob-promise';

/**
 * Recursively finds all files in a folder with provided extensions
 */
export const getFilesWithExt = async (
	folderPath: string,
	extensions: string[]
): Promise<string[]> => {
	const extensionPattern = extensions.reduce((acc, cur) => {
		return (acc += ',' + cur);
	});

	return await glob(`${folderPath}/**/*.{${extensionPattern}}`);
};
