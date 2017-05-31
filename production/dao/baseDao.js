/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baseDao = baseDao;

var _lotteryRecordDao = require('./lotteryRecordDao');

var _bettingRecordDao = require('./bettingRecordDao');

var _userDao = require('./userDao');

var _pointAddAndSubtractRecordDao = require('./pointAddAndSubtractRecordDao');

//allDao注册
var dao = {};
dao.lotteryRecordDao = _lotteryRecordDao.lotteryRecordDao;
dao.bettingRecordDao = _bettingRecordDao.bettingRecordDao;
dao.userDao = _userDao.userDao;
dao.pointAddAndSubtractRecordDao = _pointAddAndSubtractRecordDao.pointAddAndSubtractRecordDao;

//baseDao
function baseDao(module, method, params) {

    //promise
    console.log('baseDao');

    //can not find dao
    if (!dao[module]) {
        console.log('baseDao can not find dao[' + module + ']');
        return Promise.reject('baseDao can not find dao[' + module + ']');
    }

    return dao[module](module, method, params);
}