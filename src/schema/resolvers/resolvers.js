/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//获取token测试
import {getToken} from './getToken';
import {getLotteryRecordList} from './lotteryRecord/getLotteryRecordList';
import {getBettingRecordList} from './bettingRecord/getBettingRecordList';
import {getUserList} from './user/getUserList';
import {insertPointAddAndSubtractRecord} from './pointAddAndSubtractRecord/insertPointAddAndSubtractRecord';
import {getPointAddAndSubtractRecordList} from './pointAddAndSubtractRecord/getPointAddAndSubtractRecordList';
import {updateApprovalFlagByID} from './pointAddAndSubtractRecord/updateApprovalFlagByID';

export const resolvers = {
    Query: {
        getToken,
        getLotteryRecordList,
        getBettingRecordList,
        getUserList,
        getPointAddAndSubtractRecordList,
        insertPointAddAndSubtractRecord,
        updateApprovalFlagByID
        }
};