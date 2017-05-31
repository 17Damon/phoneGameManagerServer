/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

//去除内置属性字段

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lotteryRecordDao = lotteryRecordDao;

var _database = require('../util/database');

var tokill = ['_rev', '_id', '_key'];

//连接DB


//userDao
function lotteryRecordDao(module, method, params) {
    //code

    //promise
    console.log('lotteryRecordDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
var dao = {};

//getLotteryRecordListByOffsetAndCount
dao.getLotteryRecordListByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('lotteryRecordDao-getLotteryRecordListByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        var bindVars = {};
        bindVars.tokill = tokill;
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = ' \n                    LET gainNumSum = SUM(For l in lotteryRecord\n                                      return l.bettingNum-l.gainNum\n                                      )\n                    LET lotteryRecordList = (For lr in lotteryRecord\n                                        SORT lr.periodNum DESC\n                                        LIMIT @offset,@count\n                                      return UNSET(lr,@tokill)\n                                      )\n                    return {totalCount:LENGTH(lotteryRecord),lotteryRecordList:lotteryRecordList,gainNumSum:gainNumSum}\n                  ';
        //promise
        return _database.db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.offset or params.count Undefined!Check it!';
    }
};

//功能Dao---end---