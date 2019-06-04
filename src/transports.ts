import { transports } from 'winston';
import { Syslog } from 'winston-syslog';
import * as Transport from 'winston-transport';
import { LoggerConfig } from './logger';

export enum LogTarget {
    STDOUT = 'stdout',
    SYSLOG = 'syslog',
}

export function getLoggerTransports(config: LoggerConfig = {}): Transport[] {
    const logTargets = (process.env.LOG_TARGET || LogTarget.STDOUT).toLowerCase().split(',') as LogTarget[];
    const loggerTransports = [];
    if (logTargets.includes(LogTarget.STDOUT) || logTargets.length === 0) {
        loggerTransports.push(new transports.Console());
    }
    if (logTargets.includes(LogTarget.SYSLOG)) {
        loggerTransports.push(
            new Syslog({
                app_name: `test-logger.${config.appName}`,
                level: config.level,
                protocol: 'unix-connect',
                path: '/dev/log',
            }),
        );
    }
    return loggerTransports;
}
