import mysql from 'mysql2/promise'


    const db = async () => {
        try {
        const connection =  mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });
        return connection;
    } catch (error) {
        console.log(err);
    }
};


export {db}