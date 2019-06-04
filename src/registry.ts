import * as winston from 'winston';
import { Logger, LoggerConfig, LogLevel } from './logger';

export const registry: Map<string, Logger> = new Map();

let defaultAppName = 'default';
let defaultLevel = LogLevel.INFO;

export interface LoggerConfigureConfig {
    appName: string;
    level?: LogLevel;
}

export function configure({ appName, level }: LoggerConfigureConfig): void {
    defaultAppName = appName;
    defaultLevel = level;
}

function getLoggerKey(appName: string, category: string): string {
    return `${appName}:${category}`;
}

export function getLogger(category: string): Logger {
    const cfg: LoggerConfig = {
        appName: defaultAppName,
        level: defaultLevel,
        levels: winston.config.syslog.levels,
        category,
    };
    const loggerKey = getLoggerKey(cfg.appName, cfg.category);
    let logger = registry.get(loggerKey);
    if (!logger) {
        logger = new Logger(cfg);
        registry.set(loggerKey, logger);
    }
    return logger;
}
