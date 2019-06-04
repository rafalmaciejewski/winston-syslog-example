import { configure, getLogger, registry } from './registry';
import { Logger } from './logger';

describe('logger registry', () => {
    beforeAll(() => configure({ appName: 'test' }));

    describe('getLogger', () => {
        it('should return a new Logger and store it in the registry', () => {
            expect(getLogger('test1')).toBeInstanceOf(Logger);
            expect(registry.size).toEqual(1);
        });

        it('should not store duplicate loggers', () => {
            getLogger('test1');
            expect(registry.size).toEqual(1);
            getLogger('test2');
            expect(registry.size).toEqual(2);
        });
    });
});
