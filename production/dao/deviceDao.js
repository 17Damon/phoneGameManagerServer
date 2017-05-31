/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//去除内置属性字段

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deviceDao = deviceDao;

var _database = require('../util/database');

var tokill = ['_rev', '_id', '_key'];

//连接DB


//userDao
function deviceDao(module, method, params) {
    //code

    //promise
    console.log('deviceDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
var dao = {};

//getUserByAccountName
dao.getDeviceListResultByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('deviceDao-getDeviceListResultByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        var bindVars = {};
        bindVars.tokill = params.tokill;
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = '\n                    LET deviceList = (For d in device\n                                        LIMIT @offset,@count\n                                            LET softwareList = (For sl in d.softwareList\n                                                                    For s in software\n                                                                        FILTER sl.software_fid == s._id\n                                                                 return UNSET(s,[\'_rev\', \'_id\', \'_key\'])\n                                            )\n                                            LET monitorPointList = (For mp in d.monitorPointList\n                                                                        LET monitorPoint = (For mi in monitorPoint\n                                                                                                FILTER mp.monitorPoint_fid == mi._id\n                                                                                                LET monitor_type = (For pmt in monitorType\n                                                                                                                FILTER mi.monitor_type_fid == pmt._id\n                                                                                                            return UNSET(pmt,[\'_rev\', \'_id\', \'_key\'])\n                                                                                                )\n                                                                                            return merge(UNSET(mi,[\'_rev\', \'_id\', \'_key\', \'monitor_type_fid\']),{monitor_type:monitor_type[0]})\n                                                                        )\n                                                                        LET rule = (For r in rule\n                                                                                        FILTER mp.rule_fid == r._id\n                                                                                        LET monitor_type = (For rmt in monitorType\n                                                                                                                FILTER r.monitor_type_fid == rmt._id\n                                                                                                            return UNSET(rmt,[\'_rev\', \'_id\', \'_key\'])\n                                                                                        )\n                                                                                    return merge(UNSET(r,[\'_rev\', \'_id\', \'_key\', \'monitor_type_fid\']),{monitor_type:monitor_type[0]})\n                                                                        )\n                                                                        LET monitor_type = (For mt in monitorType\n                                                                                                FILTER mp.monitor_type_fid == mt._id\n                                                                                            return UNSET(mt,[\'_rev\', \'_id\', \'_key\'])\n                                                                        )\n                                                                        return merge(UNSET(mp,[\'_rev\', \'_id\', \'_key\', \'monitorPoint_fid\', \'rule_fid\', \'monitor_type_fid\']),{monitorPoint:monitorPoint[0],rule:rule[0],monitor_type:monitor_type[0]})\n                                            )\n                                      return merge(UNSET(d,[\'_rev\', \'_id\', \'_key\', \'softwareList\', \'monitorPointList\']),{softwareList:softwareList,monitorPointList:monitorPointList})\n                                      )\n                    return {totalCount:LENGTH(device),deviceList:deviceList}\n                  ';
        //promise
        return _database.db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.offset or params.count Undefined!Check it!';
    }
};

//insertUser
dao.insertDevice = function (module, method, params) {
    //some code
    console.log('deviceDao-insertDevice');
    if (params.user) {
        var user = JSON.stringify(params.user);
        var AQL = '\n            INSERT ' + user + '\n            IN user\n            return NEW\n        ';
        console.log('AQL:' + AQL);

        //promise
        return _database.db.query(AQL).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.user Undefined!Check it!';
    }
};

//功能Dao---end---