import { Logger as WinstonLogger, createLogger } from 'winston';
import { SyslogConfigSetLevels } from 'winston/lib/winston/config';
import { getLoggerFormats } from './formats';
import { getLoggerTransports } from './transports';

export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
}

export interface LoggerConfig {
    appName?: string;
    category?: string;
    index?: LogLevel | string;
    level?: LogLevel;
    levels?: SyslogConfigSetLevels;
}

export class Logger {

    private logger: WinstonLogger;

    constructor(config: LoggerConfig) {

        this.logger = createLogger({
            level: config.level,
            format: getLoggerFormats(config),
            transports: getLoggerTransports(config),
        });
    }

    public get level(): LogLevel {
        return this.logger.level as LogLevel;
    }

    public set level(value: LogLevel) {
        this.logger.level = value;
    }

    public error(message: string, ...args: any): any {
        this.logger.error(message, ...args);
    }

    public log(message: string, ...args: any): any {
        this.info(message, ...args);
    }

    public warn(message: string, ...args: any): any {
        this.logger.warn(message, ...args);
    }

    public debug(message: string, ...args: any): any {
        this.logger.debug(message, ...args);
    }

    public info(message: string, ...args: any): any {
        this.logger.info(message, ...args);
    }

    public close(): WinstonLogger {
        return this.logger.close();
    }

}
