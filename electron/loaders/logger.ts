import colors from 'colors';

class LoggerManager {
	public info(s: string, c: string): void {
		console.log(colors.green(`[INFO | ${c} | ${new Date().toISOString()}] `), s);
	}

	public warn(s: string, c: string): void {
		console.log(colors.yellow(`[WARN | ${c} | ${new Date().toISOString()}] `), s);
	}

	public error(s: string, c: string): void {
		console.log(colors.red(`[ERROR | ${c} | ${new Date().toISOString()}] `), s);
	}
}

export const logger = new LoggerManager();
