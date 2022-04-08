import { paths } from './pte';
import { Fetcher } from 'openapi-typescript-fetch';

// declare fetcher for paths
export const fetcher = Fetcher.for<paths>();

// global configuration
fetcher.configure({
    baseUrl: 'http://127.0.0.1:3331',
    init: {
        headers: {
            Accept: 'application/json',
        }
    },
    use: []
});

export const showAddress = fetcher.path('/show/{address}').method('get').create();
