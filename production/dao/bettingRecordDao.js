/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

//去除内置属性字段

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bettingRecordDao = bettingRecordDao;

var _database = require('../util/database');

var tokill = ['_rev', '_id', '_key'];

//连接DB


//userDao
function bettingRecordDao(module, method, params) {
    //code

    //promise
    console.log('bettingRecordDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
var dao = {};

//getBettingRecordListByOffsetAndCount
dao.getBettingRecordListByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('bettingRecordDao-getBettingRecordListByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        var bindVars = {};
        bindVars.tokill = tokill;
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = ' \n                    LET bettingRecordList = (For br in bettingRecord\n                                        SORT br.periodNum DESC\n                                        LIMIT @offset,@count\n                                      return UNSET(br,@tokill)\n                                      )\n                    return {totalCount:LENGTH(bettingRecord),bettingRecordList:bettingRecordList}\n                  ';
        //promise
        return _database.db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.offset or params.count Undefined!Check it!';
    }
};

//功能Dao---end---