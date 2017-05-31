/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

//去除内置属性字段
var tokill = ['_rev', '_id', '_key'];

//连接DB
import {db} from '../util/database';

//userDao
export function bettingRecordDao( module, method, params) {
    //code

    //promise
    console.log('bettingRecordDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
let dao = {};

//getBettingRecordListByOffsetAndCount
dao.getBettingRecordListByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('bettingRecordDao-getBettingRecordListByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        let bindVars = {};
        bindVars.tokill = tokill;
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = ` 
                    LET bettingRecordList = (For br in bettingRecord
                                        SORT br.periodNum DESC
                                        LIMIT @offset,@count
                                      return UNSET(br,@tokill)
                                      )
                    return {totalCount:LENGTH(bettingRecord),bettingRecordList:bettingRecordList}
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