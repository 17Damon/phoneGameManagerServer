/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//口令

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = exports.Token = function Token(token) {
    _classCallCheck(this, Token);

    this.token = token;
};

//Message


var Message = exports.Message = function Message(type, code, content) {
    _classCallCheck(this, Message);

    this.type = type;
    this.code = code;
    this.content = content;
};

//每期开奖结果和盈亏列表


var LotteryRecordList = exports.LotteryRecordList = function LotteryRecordList(totalCount, gainNumSum, lotteryRecordList, pageInfo) {
    _classCallCheck(this, LotteryRecordList);

    this.totalCount = totalCount;
    this.gainNumSum = gainNumSum;
    this.lotteryRecordList = lotteryRecordList;
    this.pageInfo = pageInfo;
};

//个人下注结果和盈亏列表


var BettingRecordList = exports.BettingRecordList = function BettingRecordList(totalCount, bettingRecordList, pageInfo) {
    _classCallCheck(this, BettingRecordList);

    this.totalCount = totalCount;
    this.bettingRecordList = bettingRecordList;
    this.pageInfo = pageInfo;
};

//上下分审批记录列表


var PointAddAndSubtractRecordList = exports.PointAddAndSubtractRecordList = function PointAddAndSubtractRecordList(totalCount, pointAddAndSubtractRecordList, pageInfo) {
    _classCallCheck(this, PointAddAndSubtractRecordList);

    this.totalCount = totalCount;
    this.pointAddAndSubtractRecordList = pointAddAndSubtractRecordList;
    this.pageInfo = pageInfo;
};

//用户信息列表


var UserList = exports.UserList = function UserList(totalCount, userList, pageInfo) {
    _classCallCheck(this, UserList);

    this.totalCount = totalCount;
    this.userList = userList;
    this.pageInfo = pageInfo;
};

//分页信息


var PageInfo = exports.PageInfo = function PageInfo(endCursor, hasNextPage) {
    _classCallCheck(this, PageInfo);

    this.endCursor = endCursor;
    this.hasNextPage = hasNextPage;
};