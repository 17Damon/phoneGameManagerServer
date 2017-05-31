/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

//去除内置属性字段

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pointAddAndSubtractRecordDao = pointAddAndSubtractRecordDao;

var _database = require('../util/database');

var tokill = ['_rev', '_id', '_key'];

//连接DB


//userDao
function pointAddAndSubtractRecordDao(module, method, params) {
    //code

    //promise
    console.log('pointAddAndSubtractRecordDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
var dao = {};

//getPointAddAndSubtractRecordListByOffsetAndCount
dao.getPointAddAndSubtractRecordListByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('pointAddAndSubtractRecordDao-getPointAddAndSubtractRecordListByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        var bindVars = {};
        bindVars.tokill = ['_rev', '_key', 'user_fid', 'approvalUser_fid'];
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = ' \n                    LET pointAddAndSubtractRecordList = (For pr in pointAddAndSubtractRecord\n                                                            FILTER pr.approvalFlag == \'\u63D0\u4EA4\'\n                                                            SORT pr.submitDate DESC\n                                                            LIMIT @offset,@count\n                                                            \n                                                            LET user = (For u in user\n                                                                            FILTER pr.user_fid == u._id\n                                                                        return UNSET(u,[\'_rev\', \'_id\', \'_key\', \'invitationCode\', \'password\', \'token\'])\n                                                                        )\n                                                            LET approvalUser = (For au in user\n                                                                                    FILTER pr.user_fid == au._id\n                                                                                return UNSET(au,[\'_rev\', \'_id\', \'_key\', \'invitationCode\', \'password\', \'token\'])\n                                                                                )\n                                                        return merge(UNSET(pr,@tokill),{user:user[0]},{approvalUser:approvalUser[0]})                   \n                                                        )\n                    return {totalCount:LENGTH(pointAddAndSubtractRecordList),pointAddAndSubtractRecordList:pointAddAndSubtractRecordList}\n                  ';
        //promise
        return _database.db.query(AQL, bindVars).then(function (cursor) {
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
        var bindVars = {};
        bindVars.pointAddAndSubtractRecord = params.pointAddAndSubtractRecord;
        var AQL = '\n            INSERT @pointAddAndSubtractRecord\n            IN pointAddAndSubtractRecord\n            return NEW\n        ';
        //promise
        return _database.db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.pointAddAndSubtractRecord Undefined!Check it!';
    }
};

//updateApprovalFlagById
dao.updateApprovalFlagByID = function (module, method, params) {
    //some code
    console.log('pointAddAndSubtractRecordDao-updateApprovalFlagById');
    if (params.approvalFlag !== undefined && params.ID !== undefined) {
        var bindVars = {};
        bindVars.approvalFlag = params.approvalFlag;
        bindVars.approvalDate = params.approvalDate;
        bindVars.tokill = tokill;
        bindVars.ID = params.ID;
        var AQL = '\n        For pr in pointAddAndSubtractRecord\n            FILTER pr._id == @ID && pr.approvalFlag == \'\u63D0\u4EA4\'\n            UPDATE pr WITH {approvalFlag: @approvalFlag,approvalDate: @approvalDate} IN pointAddAndSubtractRecord\n            return UNSET(NEW,@tokill)\n        ';
        //promise
        return _database.db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.accountName or params.token Undefined!Check it!';
    }
};

//功能Dao---end---