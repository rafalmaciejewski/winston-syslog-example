import * as v4 from 'uuid/v4';
import { format } from 'winston';
import { MESSAGE } from 'triple-beam';
import { LoggerConfig } from './logger';
import { Format } from 'logform';

const { timestamp, combine, json } = format;

export const uuid = format((opts) => {
    opts.uuid = v4();
    return opts;
});

export const cee = format((opts) => {
    opts[MESSAGE] = `@cee: ${opts[MESSAGE]}`;
    return opts;
});

export const context = (config: LoggerConfig) =>
    format((opts) => {
        opts.app_name = config.appName;
        opts.category = config.category;
        return opts;
    });

export function getLoggerFormats(config: LoggerConfig): Format {
    return combine(uuid(), context(config)(), timestamp({ alias: 'timestamp' }), json(), cee());
}
