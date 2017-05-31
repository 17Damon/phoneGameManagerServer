/**
 * Created by zhubg on 2017/4/17.
 */
   
'use strict';

//口令
export class Token {
    constructor(token) {
        this.token = token;
    }
}

//Message
export class Message {
    constructor(type,code,content) {
        this.type = type;
        this.code = code;
        this.content = content;
    }
}

//每期开奖结果和盈亏列表
export class LotteryRecordList {
    constructor(totalCount,gainNumSum,lotteryRecordList,pageInfo) {
        this.totalCount = totalCount;
        this.gainNumSum = gainNumSum;
        this.lotteryRecordList = lotteryRecordList;
        this.pageInfo = pageInfo;
    }
}

//个人下注结果和盈亏列表
export class BettingRecordList {
    constructor(totalCount,bettingRecordList,pageInfo) {
        this.totalCount = totalCount;
        this.bettingRecordList = bettingRecordList;
        this.pageInfo = pageInfo;
    }
}

//上下分审批记录列表
export class PointAddAndSubtractRecordList {
    constructor(totalCount,pointAddAndSubtractRecordList,pageInfo) {
        this.totalCount = totalCount;
        this.pointAddAndSubtractRecordList = pointAddAndSubtractRecordList;
        this.pageInfo = pageInfo;
    }
}

//用户信息列表
export class UserList {
    constructor(totalCount,userList,pageInfo) {
        this.totalCount = totalCount;
        this.userList = userList;
        this.pageInfo = pageInfo;
    }
}

//分页信息
export class PageInfo {
    constructor(endCursor,hasNextPage) {
        this.endCursor = endCursor;
        this.hasNextPage = hasNextPage;
    }
}