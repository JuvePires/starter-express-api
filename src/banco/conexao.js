
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  },
});



module.exports = knex



/* PORT=3000
DB_HOST = cornelius.db.elephantsql.com
DB_PORT = 5432
DB_USER = scmhztlx
DB_PASS = 2BvZCig_PTNiYQLBorR6RRV8a5ACuban
DB_NAME = scmhztlx */





/* CYCLIC_URL=https://zany-pink-slug-kit.cyclic.app
CYCLIC_DB=zany-pink-slug-kitCyclicDB
CYCLIC_BUCKET_NAME=cyclic-zany-pink-slug-kit-sa-east-1
CYCLIC_APP_ID=zany-pink-slug-kit */