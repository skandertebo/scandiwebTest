export const MODE : 'DEV' | 'PROD' = 'PROD'; // DEV or PROD


export const apiRoute = MODE === 'PROD' ? 'http://apiscandiweb.great-site.net/' : 'http://localhost:80/backendTestScandiweb';