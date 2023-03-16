export const MODE : 'DEV' | 'PROD' = 'PROD'; // DEV or PROD


export const apiRoute = MODE === 'PROD' ? 'http://skandertebotest.c1.biz' : 'http://localhost:80/backendTestScandiweb';