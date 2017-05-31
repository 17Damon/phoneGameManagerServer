/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

import {LotteryRecordList, Message, PageInfo} from '../../objects';
import {baseDao} from '../../../dao/baseDao';


export async function getLotteryRecordList() {
    try {
        let params = {};
        params.offset = arguments[1].offset;
        params.count = arguments[1].count;
        //访问数据库Dao
        let obj = await baseDao('lotteryRecordDao', 'getLotteryRecordListByOffsetAndCount', params);
        let totalCount = obj[0].totalCount;
        let gainNumSum = obj[0].gainNumSum;
        let lotteryRecordList = obj[0].lotteryRecordList;
        let hasNextPage = (arguments[1].offset + arguments[1].count) < obj[0].totalCount ? true : false;
        let endCursor = hasNextPage?arguments[1].offset + arguments[1].count:obj[0].totalCount;
        let pageInfo = new PageInfo(endCursor, hasNextPage);
        let LotteryRecordListTemp = new LotteryRecordList(totalCount,gainNumSum, lotteryRecordList, pageInfo);
        let type = "LotteryRecordList";
        let code = "600001";
        let content = JSON.stringify(LotteryRecordListTemp);
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}