import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  username: process.env.RAMPORT_USERNAME,
  password: process.env.RAMPORT_PASSWORD,
  startURL: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskrsta.P_RegsStatusDisp'
};