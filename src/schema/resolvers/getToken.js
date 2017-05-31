/**
 * Created by zhubg on 2017/5/14.
 */

import {Token,Message} from '../objects';

export function getToken() {
    let token = require('crypto').randomBytes(10).toString('hex');
    let message = new Message();
    message.type = "info";
    message.code = "00001";
    message.content = "this is a message test";
    console.log("token_test");
    console.log(token);
    // return new Token(token);
    return message;
}