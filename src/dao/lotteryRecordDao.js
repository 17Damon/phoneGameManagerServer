/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

//去除内置属性字段
var tokill = ['_rev', '_id', '_key'];

//连接DB
import {db} from '../util/database';

//userDao
export function lotteryRecordDao( module, method, params) {
    //code

    //promise
    console.log('lotteryRecordDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
let dao = {};

//getLotteryRecordListByOffsetAndCount
dao.getLotteryRecordListByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('lotteryRecordDao-getLotteryRecordListByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        let bindVars = {};
        bindVars.tokill = tokill;
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = ` 
                    LET gainNumSum = SUM(For l in lotteryRecord
                                      return l.bettingNum-l.gainNum
                                      )
                    LET lotteryRecordList = (For lr in lotteryRecord
                                        SORT lr.periodNum DESC
                                        LIMIT @offset,@count
                                      return UNSET(lr,@tokill)
                                      )
                    return {totalCount:LENGTH(lotteryRecord),lotteryRecordList:lotteryRecordList,gainNumSum:gainNumSum}
                  `;
        //promise
        return db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.offset or params.count Undefined!Check it!';
    }
};

//功能Dao---end---