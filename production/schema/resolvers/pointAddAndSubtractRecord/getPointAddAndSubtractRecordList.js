/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPointAddAndSubtractRecordList = getPointAddAndSubtractRecordList;

var _objects = require('../../objects');

var _baseDao = require('../../../dao/baseDao');

async function getPointAddAndSubtractRecordList() {
    try {
        var params = {};
        params.offset = arguments[1].offset;
        params.count = arguments[1].count;
        //访问数据库Dao
        var obj = await (0, _baseDao.baseDao)('pointAddAndSubtractRecordDao', 'getPointAddAndSubtractRecordListByOffsetAndCount', params);
        var totalCount = obj[0].totalCount;
        var pointAddAndSubtractRecordList = obj[0].pointAddAndSubtractRecordList;
        var hasNextPage = arguments[1].offset + arguments[1].count < obj[0].totalCount ? true : false;
        var endCursor = hasNextPage ? arguments[1].offset + arguments[1].count : obj[0].totalCount;
        var pageInfo = new _objects.PageInfo(endCursor, hasNextPage);
        var PointAddAndSubtractRecordListTemp = new _objects.PointAddAndSubtractRecordList(totalCount, pointAddAndSubtractRecordList, pageInfo);
        var type = "PointAddAndSubtractRecordList";
        var code = "600005";
        var content = JSON.stringify(PointAddAndSubtractRecordListTemp);
        return new _objects.Message(type, code, content);
    } catch (err) {
        console.log(err);
        return new _objects.Message("error", "400005", err);
    }
}