/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

//去除内置属性字段
var tokill = ['_rev', '_id', '_key'];

//连接DB
import {db} from '../util/database';

//userDao
export function pointAddAndSubtractRecordDao(module, method, params) {
    //code

    //promise
    console.log('pointAddAndSubtractRecordDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
let dao = {};

//getPointAddAndSubtractRecordListByOffsetAndCount
dao.getPointAddAndSubtractRecordListByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('pointAddAndSubtractRecordDao-getPointAddAndSubtractRecordListByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        let bindVars = {};
        bindVars.tokill = ['_rev', '_key', 'user_fid', 'approvalUser_fid'];
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = ` 
                    LET pointAddAndSubtractRecordList = (For pr in pointAddAndSubtractRecord
                                                            FILTER pr.approvalFlag == '提交'
                                                            SORT pr.submitDate DESC
                                                            LIMIT @offset,@count
                                                            
                                                            LET user = (For u in user
                                                                            FILTER pr.user_fid == u._id
                                                                        return UNSET(u,['_rev', '_id', '_key', 'invitationCode', 'password', 'token'])
                                                                        )
                                                            LET approvalUser = (For au in user
                                                                                    FILTER pr.user_fid == au._id
                                                                                return UNSET(au,['_rev', '_id', '_key', 'invitationCode', 'password', 'token'])
                                                                                )
                                                        return merge(UNSET(pr,@tokill),{user:user[0]},{approvalUser:approvalUser[0]})                   
                                                        )
                    return {totalCount:LENGTH(pointAddAndSubtractRecordList),pointAddAndSubtractRecordList:pointAddAndSubtractRecordList}
                  `;
        //promise
        return db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.offset or params.count Undefined!Check it!';
    }
};

//insertPointAddAndSubtractRecord
dao.insertPointAddAndSubtractRecord = function (module, method, params) {
    //some code
    console.log('pointAddAndSubtractRecordDao-insertPointAddAndSubtractRecord');
    if (params.pointAddAndSubtractRecord !== undefined) {
        let bindVars = {};
        bindVars.pointAddAndSubtractRecord = params.pointAddAndSubtractRecord;
        var AQL = `
            INSERT @pointAddAndSubtractRecord
            IN pointAddAndSubtractRecord
            return NEW
        `;
        //promise
        return db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw `params.pointAddAndSubtractRecord Undefined!Check it!`;
    }
};

//updateApprovalFlagById
dao.updateApprovalFlagByID = function ( module, method, params) {
    //some code
    console.log('pointAddAndSubtractRecordDao-updateApprovalFlagById');
    if (params.approvalFlag !== undefined && params.ID !== undefined) {
        let bindVars = {};
        bindVars.approvalFlag = params.approvalFlag;
        bindVars.approvalDate = params.approvalDate;
        bindVars.tokill = tokill;
        bindVars.ID = params.ID;
        var AQL = `
        For pr in pointAddAndSubtractRecord
            FILTER pr._id == @ID && pr.approvalFlag == '提交'
            UPDATE pr WITH {approvalFlag: @approvalFlag,approvalDate: @approvalDate} IN pointAddAndSubtractRecord
            return UNSET(NEW,@tokill)
        `;
        //promise
        return db.query(AQL, bindVars).then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.accountName or params.token Undefined!Check it!`;
    }
};

//功能Dao---end---