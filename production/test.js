'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPosts() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(new Date());
        }, 3000);
    });
} /**
   * Created by zhubg on 2017/5/13.
   */

async function printPostsToConsole() {
    for (var i = 0; i < 20; i++) {
        var date = await getPosts();
        console.log(date);
    }
}

printPostsToConsole();