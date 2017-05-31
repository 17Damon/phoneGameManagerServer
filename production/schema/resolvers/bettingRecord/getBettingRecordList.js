/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBettingRecordList = getBettingRecordList;

var _objects = require('../../objects');

var _baseDao = require('../../../dao/baseDao');

async function getBettingRecordList() {
    try {
        var params = {};
        params.offset = arguments[1].offset;
        params.count = arguments[1].count;
        //访问数据库Dao
        var obj = await (0, _baseDao.baseDao)('bettingRecordDao', 'getBettingRecordListByOffsetAndCount', params);
        var totalCount = obj[0].totalCount;
        var bettingRecordList = obj[0].bettingRecordList;
        var hasNextPage = arguments[1].offset + arguments[1].count < obj[0].totalCount ? true : false;
        var endCursor = hasNextPage ? arguments[1].offset + arguments[1].count : obj[0].totalCount;
        var pageInfo = new _objects.PageInfo(endCursor, hasNextPage);
        var BettingRecordListTemp = new _objects.BettingRecordList(totalCount, bettingRecordList, pageInfo);
        var type = "BettingRecordList";
        var code = "600002";
        var content = JSON.stringify(BettingRecordListTemp);
        return new _objects.Message(type, code, content);
    } catch (err) {
        console.log(err);
        return new _objects.Message("error", "400002", err);
    }
}