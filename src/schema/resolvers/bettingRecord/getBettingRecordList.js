/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

import {BettingRecordList, Message, PageInfo} from '../../objects';
import {baseDao} from '../../../dao/baseDao';


export async function getBettingRecordList() {
    try {
        let params = {};
        params.offset = arguments[1].offset;
        params.count = arguments[1].count;
        //访问数据库Dao
        let obj = await baseDao('bettingRecordDao', 'getBettingRecordListByOffsetAndCount', params);
        let totalCount = obj[0].totalCount;
        let bettingRecordList = obj[0].bettingRecordList;
        let hasNextPage = (arguments[1].offset + arguments[1].count) < obj[0].totalCount ? true : false;
        let endCursor = hasNextPage?arguments[1].offset + arguments[1].count:obj[0].totalCount;
        let pageInfo = new PageInfo(endCursor, hasNextPage);
        let BettingRecordListTemp = new BettingRecordList(totalCount, bettingRecordList, pageInfo);
        let type = "BettingRecordList";
        let code = "600002";
        let content = JSON.stringify(BettingRecordListTemp);
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400002", err);
    }
}