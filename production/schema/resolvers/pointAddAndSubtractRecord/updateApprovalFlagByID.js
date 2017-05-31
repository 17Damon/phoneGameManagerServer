/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateApprovalFlagByID = updateApprovalFlagByID;

var _objects = require('../../objects');

var _baseDao = require('../../../dao/baseDao');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function updateApprovalFlagByID() {
    try {
        var now = (0, _moment2.default)();
        var params = {};
        var type = 'PointAddAndSubtractRecord';
        var code = '600004';
        //提交  通过  驳回
        params.approvalFlag = arguments[1].approvalFlag;
        params.ID = arguments[1].ID;
        params.approvalDate = now.format('YYYY-MM-DD HH:mm:ss');

        //访问数据库Dao
        var obj = await (0, _baseDao.baseDao)('pointAddAndSubtractRecordDao', 'updateApprovalFlagByID', params);
        if (obj.length === 0) {
            return new _objects.Message(type, code, '该上下分记录不存在');
        } else if (obj[0].additionPoints !== undefined && obj[0].additionPoints === arguments[1].additionPoints && obj[0].approvalFlag === '通过') {
            //更新用户余额
            params = {};
            params.ID = obj[0].user_fid;
            params.additionGoldPoints = obj[0].additionPoints;
            var obj1 = await (0, _baseDao.baseDao)('userDao', 'updateGoldPointsByID', params);
            if (obj1.length === 0) {
                return new _objects.Message(type, code, '该用户记录不存在');
            } else if (obj1.length === 1) {
                return new _objects.Message(type, code, '审批通过');
            } else {
                throw '有多条用户记录';
            }
        } else if (obj[0].additionPoints !== undefined && obj[0].additionPoints === arguments[1].additionPoints && obj[0].approvalFlag === '驳回') {
            return new _objects.Message(type, code, '审批驳回');
        } else {
            throw 'insertPointAddAndSubtractRecord error!提交审批失败!';
        }
    } catch (err) {
        console.log(err);
        return new _objects.Message("error", "400004", err);
    }
}