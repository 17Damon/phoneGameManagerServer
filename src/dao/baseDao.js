/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

import {lotteryRecordDao} from './lotteryRecordDao';
import {bettingRecordDao} from './bettingRecordDao';
import {userDao} from './userDao';
import {pointAddAndSubtractRecordDao} from './pointAddAndSubtractRecordDao';

//allDao注册
var dao = {};
dao.lotteryRecordDao = lotteryRecordDao;
dao.bettingRecordDao = bettingRecordDao;
dao.userDao = userDao;
dao.pointAddAndSubtractRecordDao = pointAddAndSubtractRecordDao;


//baseDao
export function baseDao( module, method, params) {

    //promise
    console.log('baseDao');

    //can not find dao
    if(!dao[module]) {
        console.log('baseDao can not find dao['+module+']');
        return Promise.reject(
            'baseDao can not find dao['+module+']'
        );
    }

    return dao[module]( module, method, params);
}
