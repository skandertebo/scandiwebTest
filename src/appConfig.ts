export const MODE : 'DEV' | 'PROD' = 'PROD'; // DEV or PROD


export const apiRoute = MODE === 'PROD' ? 'https://scandiwebapitest.000webhostapp.com' : 'http://localhost:80/backendTestScandiweb';