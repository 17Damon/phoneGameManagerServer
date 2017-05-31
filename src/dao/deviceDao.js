/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//去除内置属性字段
var tokill = ['_rev', '_id', '_key'];

//连接DB
import {db} from '../util/database';

//userDao
export function deviceDao( module, method, params) {
    //code

    //promise
    console.log('deviceDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
let dao = {};

//getUserByAccountName
dao.getDeviceListResultByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('deviceDao-getDeviceListResultByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        let bindVars = {};
        bindVars.tokill = params.tokill;
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = `
                    LET deviceList = (For d in device
                                        LIMIT @offset,@count
                                            LET softwareList = (For sl in d.softwareList
                                                                    For s in software
                                                                        FILTER sl.software_fid == s._id
                                                                 return UNSET(s,['_rev', '_id', '_key'])
                                            )
                                            LET monitorPointList = (For mp in d.monitorPointList
                                                                        LET monitorPoint = (For mi in monitorPoint
                                                                                                FILTER mp.monitorPoint_fid == mi._id
                                                                                                LET monitor_type = (For pmt in monitorType
                                                                                                                FILTER mi.monitor_type_fid == pmt._id
                                                                                                            return UNSET(pmt,['_rev', '_id', '_key'])
                                                                                                )
                                                                                            return merge(UNSET(mi,['_rev', '_id', '_key', 'monitor_type_fid']),{monitor_type:monitor_type[0]})
                                                                        )
                                                                        LET rule = (For r in rule
                                                                                        FILTER mp.rule_fid == r._id
                                                                                        LET monitor_type = (For rmt in monitorType
                                                                                                                FILTER r.monitor_type_fid == rmt._id
                                                                                                            return UNSET(rmt,['_rev', '_id', '_key'])
                                                                                        )
                                                                                    return merge(UNSET(r,['_rev', '_id', '_key', 'monitor_type_fid']),{monitor_type:monitor_type[0]})
                                                                        )
                                                                        LET monitor_type = (For mt in monitorType
                                                                                                FILTER mp.monitor_type_fid == mt._id
                                                                                            return UNSET(mt,['_rev', '_id', '_key'])
                                                                        )
                                                                        return merge(UNSET(mp,['_rev', '_id', '_key', 'monitorPoint_fid', 'rule_fid', 'monitor_type_fid']),{monitorPoint:monitorPoint[0],rule:rule[0],monitor_type:monitor_type[0]})
                                            )
                                      return merge(UNSET(d,['_rev', '_id', '_key', 'softwareList', 'monitorPointList']),{softwareList:softwareList,monitorPointList:monitorPointList})
                                      )
                    return {totalCount:LENGTH(device),deviceList:deviceList}
                  `;
        //promise
        return db.query(AQL, bindVars).then(function (cursor) {
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
        let user = JSON.stringify(params.user);
        var AQL = `
            INSERT ${user}
            IN user
            return NEW
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.user Undefined!Check it!`;
    }
};

//功能Dao---end---