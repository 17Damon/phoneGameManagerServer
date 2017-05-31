/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//获取token测试

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = undefined;

var _getToken = require('./getToken');

var _getLotteryRecordList = require('./lotteryRecord/getLotteryRecordList');

var _getBettingRecordList = require('./bettingRecord/getBettingRecordList');

var _getUserList = require('./user/getUserList');

var _insertPointAddAndSubtractRecord = require('./pointAddAndSubtractRecord/insertPointAddAndSubtractRecord');

var _getPointAddAndSubtractRecordList = require('./pointAddAndSubtractRecord/getPointAddAndSubtractRecordList');

var _updateApprovalFlagByID = require('./pointAddAndSubtractRecord/updateApprovalFlagByID');

var resolvers = exports.resolvers = {
    Query: {
        getToken: _getToken.getToken,
        getLotteryRecordList: _getLotteryRecordList.getLotteryRecordList,
        getBettingRecordList: _getBettingRecordList.getBettingRecordList,
        getUserList: _getUserList.getUserList,
        getPointAddAndSubtractRecordList: _getPointAddAndSubtractRecordList.getPointAddAndSubtractRecordList,
        insertPointAddAndSubtractRecord: _insertPointAddAndSubtractRecord.insertPointAddAndSubtractRecord,
        updateApprovalFlagByID: _updateApprovalFlagByID.updateApprovalFlagByID
    }
};