/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

import {PointAddAndSubtractRecordList, Message, PageInfo} from '../../objects';
import {baseDao} from '../../../dao/baseDao';


export async function getPointAddAndSubtractRecordList() {
    try {
        let params = {};
        params.offset = arguments[1].offset;
        params.count = arguments[1].count;
        //访问数据库Dao
        let obj = await baseDao('pointAddAndSubtractRecordDao', 'getPointAddAndSubtractRecordListByOffsetAndCount', params);
        let totalCount = obj[0].totalCount;
        let pointAddAndSubtractRecordList = obj[0].pointAddAndSubtractRecordList;
        let hasNextPage = (arguments[1].offset + arguments[1].count) < obj[0].totalCount ? true : false;
        let endCursor = hasNextPage?arguments[1].offset + arguments[1].count:obj[0].totalCount;
        let pageInfo = new PageInfo(endCursor, hasNextPage);
        let PointAddAndSubtractRecordListTemp = new PointAddAndSubtractRecordList(totalCount, pointAddAndSubtractRecordList, pageInfo);
        let type = "PointAddAndSubtractRecordList";
        let code = "600005";
        let content = JSON.stringify(PointAddAndSubtractRecordListTemp);
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400005", err);
    }
}