export const MODE : 'DEV' | 'PROD' = 'PROD'; // DEV or PROD


export const apiRoute = MODE === 'PROD' ? 'http://skandertebotest.atwebpages.com' : 'http://localhost:80/backendTestScandiweb';