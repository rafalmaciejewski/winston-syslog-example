import * as mockedEnv from 'mocked-env';

import { transports } from 'winston';
import { getLoggerTransports } from './transports';
import { Syslog } from 'winston-syslog';

describe('logger transports', () => {
    describe('by default', () => {
        let restore;

        beforeEach(() => {
            restore = mockedEnv({
                LOG_TARGET: undefined,
            });
        });

        afterEach(() => restore());

        it('should log to console', () => {
            const result = getLoggerTransports();
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(transports.Console);
        });
    });

    describe('when LOG_TARGET=syslog', () => {
        let restore;

        beforeEach(() => {
            restore = mockedEnv({
                LOG_TARGET: 'syslog',
            });
        });

        afterEach(() => restore());

        it('should log to SYSLOG', () => {
            const result = getLoggerTransports();
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(Syslog);
        });
    });

    describe('when LOG_TARGET=stdout', () => {
        let restore;

        beforeEach(() => {
            restore = mockedEnv({
                LOG_TARGET: 'stdout',
            });
        });

        afterEach(() => restore());

        it('should log to STDOUT', () => {
            const result = getLoggerTransports();
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(transports.Console);
        });
    });

    describe('when LOG_TARGET=stdout,syslog', () => {
        let restore;

        beforeEach(() => {
            restore = mockedEnv({
                LOG_TARGET: 'stdout,syslog',
            });
        });

        afterEach(() => restore());

        it('should log to STDOUT and SYSLOG', () => {
            const result = getLoggerTransports();
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(transports.Console);
            expect(result[1]).toBeInstanceOf(Syslog);
        });
    });
});
