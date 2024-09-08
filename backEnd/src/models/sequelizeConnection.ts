import { Sequelize } from "sequelize";
require('dotenv').config();

const database = String(process.env.DBNAME);
const user = String(process.env.DBUSER);
const password = String(process.env.DBPASSWORD);
const host = String(process.env.DBHOST)
const url = `postgresql://postgres.klnnttfuqgzvihaqtpua:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  // port: 6543,
  dialect: 'postgres',
  dialectOptions: {
    allowPublicKeyRetrieval: true,
    ssl: {
      rejectUnauthorized: false,
    }
  }
});

export default sequelize;
