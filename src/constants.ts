import * as dotenv from 'dotenv';

dotenv.config();

const AUTH_EMAIL = process.env.RAMPORT_EMAIL || '';
const AUTH_PASSWORD = process.env.RAMPORT_PASSWORD || '';

export { AUTH_EMAIL, AUTH_PASSWORD };