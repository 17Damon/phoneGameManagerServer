/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLotteryRecordList = getLotteryRecordList;

var _objects = require('../objects');

var _baseDao = require('../../dao/baseDao');

async function getLotteryRecordList() {
    try {
        var params = {};
        params.offset = arguments[1].offset;
        params.count = arguments[1].count;
        //访问数据库Dao
        var obj = await (0, _baseDao.baseDao)('lotteryRecordDao', 'getLotteryRecordListByOffsetAndCount', params);
        var totalCount = obj[0].totalCount;
        var gainNumSum = obj[0].gainNumSum;
        var lotteryRecordList = obj[0].lotteryRecordList;
        var hasNextPage = arguments[1].offset + arguments[1].count < obj[0].totalCount ? true : false;
        var endCursor = hasNextPage ? arguments[1].offset + arguments[1].count : obj[0].totalCount;
        var pageInfo = new _objects.PageInfo(endCursor, hasNextPage);
        var LotteryRecordListTemp = new _objects.LotteryRecordList(totalCount, gainNumSum, lotteryRecordList, pageInfo);
        var type = "LotteryRecordList";
        var code = "600001";
        var content = JSON.stringify(LotteryRecordListTemp);
        return new _objects.Message(type, code, content);
    } catch (err) {
        console.log(err);
        return new _objects.Message("error", "400001", err);
    }
}