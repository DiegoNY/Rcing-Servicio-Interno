import sql from 'mssql'
import { database, password, port, server, user } from '../config/config';

const config = {
    user: user,
    password: password,
    server: server,
    database: database,
    port: port,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

export const pool = new sql.ConnectionPool(config);
