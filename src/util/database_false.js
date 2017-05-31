/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

// database connect 应用启动时已经初始化完成
const host = 'host';
// const host = '127.0.0.1';
const port = 'port';
const database = 'database';
const username = 'username';
const password = 'password';

export const db = require('arangojs')({
    url: `http://${username}:${password}@${host}:${port}`,
    databaseName: database
});

console.log('database');

