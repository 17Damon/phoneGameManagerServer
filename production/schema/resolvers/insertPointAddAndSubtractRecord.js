/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.insertPointAddAndSubtractRecord = insertPointAddAndSubtractRecord;

var _objects = require('../objects');

var _baseDao = require('../../dao/baseDao');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function insertPointAddAndSubtractRecord() {
    try {
        var now = (0, _moment2.default)();
        var params = {};
        var pointAddAndSubtractRecord = {};
        pointAddAndSubtractRecord.additionPoints = arguments[1].additionPoints;
        pointAddAndSubtractRecord.user_fid = arguments[1].user_fid;
        pointAddAndSubtractRecord.approvalUser_fid = arguments[1].approvalUser_fid;
        //submit  pass  rejection
        pointAddAndSubtractRecord.approvalFlag = 'submit';
        pointAddAndSubtractRecord.approvalDate = '';
        pointAddAndSubtractRecord.submitDate = now.format('YYYY-MM-DD HH:mm:ss');

        params.pointAddAndSubtractRecord = pointAddAndSubtractRecord;
        //访问数据库Dao
        var obj = await (0, _baseDao.baseDao)('pointAddAndSubtractRecordDao', 'insertPointAddAndSubtractRecord', params);
        console.log(obj);
        console.log('obj');
        if (obj[0].additionPoints !== undefined && obj[0].additionPoints === arguments[1].additionPoints) {
            var type = 'PointAddAndSubtractRecord';
            var code = '600004';
            var content = '提交审批成功';
            return new _objects.Message(type, code, content);
        } else {
            throw 'insertPointAddAndSubtractRecord error!提交审批失败!';
        }
    } catch (err) {
        console.log(err);
        return new _objects.Message("error", "400004", err);
    }
}