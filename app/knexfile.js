require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: 'reddit-clone'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
  }

  // test: {
  //   client: 'pg',
  //   connection: {
  //     database: process.env.DATABASE_URL || 'reddit-clone-test',
  //   }
  // }

};
