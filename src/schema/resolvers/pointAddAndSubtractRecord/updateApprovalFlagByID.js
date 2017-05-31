/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

import {Message} from '../../objects';
import {baseDao} from '../../../dao/baseDao';
import moment from 'moment';


export async function updateApprovalFlagByID() {
    try {
        let now = moment();
        let params = {};
        let type = 'PointAddAndSubtractRecord';
        let code = '600004';
        //提交  通过  驳回
        params.approvalFlag = arguments[1].approvalFlag;
        params.ID = arguments[1].ID;
        params.approvalDate = now.format('YYYY-MM-DD HH:mm:ss');

        //访问数据库Dao
        let obj = await baseDao('pointAddAndSubtractRecordDao', 'updateApprovalFlagByID', params);
        if (obj.length === 0) {
            return new Message(type, code, '该上下分记录不存在');
        } else if (obj[0].additionPoints !== undefined && obj[0].additionPoints === arguments[1].additionPoints && obj[0].approvalFlag === '通过') {
            //更新用户余额
            params = {};
            params.ID = obj[0].user_fid;
            params.additionGoldPoints = obj[0].additionPoints;
            let obj1 = await baseDao('userDao', 'updateGoldPointsByID', params);
            if (obj1.length === 0) {
                return new Message(type, code, '该用户记录不存在');
            } else if (obj1.length === 1) {
                return new Message(type, code, '审批通过');
            }else {
                throw '有多条用户记录';
            }
        } else if (obj[0].additionPoints !== undefined && obj[0].additionPoints === arguments[1].additionPoints && obj[0].approvalFlag === '驳回') {
            return new Message(type, code, '审批驳回');
        } else {
            throw 'insertPointAddAndSubtractRecord error!提交审批失败!';
        }
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400004", err);
    }
}