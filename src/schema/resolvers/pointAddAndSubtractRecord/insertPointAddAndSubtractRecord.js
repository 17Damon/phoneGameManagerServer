/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

import { Message } from '../../objects';
import {baseDao} from '../../../dao/baseDao';
import moment from 'moment';


export async function insertPointAddAndSubtractRecord() {
    try {
        let now = moment();
        let params = {};
        let pointAddAndSubtractRecord ={};
        pointAddAndSubtractRecord.additionPoints = arguments[1].additionPoints;
        pointAddAndSubtractRecord.user_fid = arguments[1].user_fid;
        pointAddAndSubtractRecord.approvalUser_fid = '';
        //提交  通过  驳回
        pointAddAndSubtractRecord.approvalFlag = '提交';
        pointAddAndSubtractRecord.approvalDate = '';
        pointAddAndSubtractRecord.submitDate = now.format('YYYY-MM-DD HH:mm:ss');

        params.pointAddAndSubtractRecord = pointAddAndSubtractRecord;    
        //访问数据库Dao
        let obj = await baseDao('pointAddAndSubtractRecordDao', 'insertPointAddAndSubtractRecord', params);
        if (obj[0].additionPoints !== undefined && obj[0].additionPoints === arguments[1].additionPoints){
            let type = 'PointAddAndSubtractRecord';
            let code = '600004';
            let content = '提交审批成功';
            return new Message(type, code, content)
        }else {
            throw 'insertPointAddAndSubtractRecord error!提交审批失败!';
        }
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400004", err);
    }
}