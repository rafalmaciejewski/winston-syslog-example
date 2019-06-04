import * as logger from './index';

describe('@gr/logger module exports', () => {
    it('should match snapshot', () => {
        expect(logger).toMatchSnapshot();
    });
});
