// wikipedia-load-test.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 5 },

        { duration: '1m', target: 10 },

        { duration: '30s', target: 0 },
    ],

    thresholds: {
        // less than 1% failures
        http_req_failed: ['rate<0.01'],

        // 95% of requests should finish under 1s
        http_req_duration: ['p(95)<1000'],
    },
};

export default function () {
    const res = http.get('https://www.wikipedia.org/');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // small pause between iterations
    sleep(1);
}