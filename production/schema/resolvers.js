/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//数据库dao

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = undefined;

var _baseDao = require('../dao/baseDao');

var _getToken = require('./resolvers/getToken');

var _objects = require('./objects');

//获取token测试
var resolvers = exports.resolvers = {
    Query: {
        getToken: _getToken.getToken,
        getDeviceListResult: function getDeviceListResult() {
            var _arguments = arguments;


            var params = {};
            params.offset = arguments[1].offset;
            params.count = arguments[1].count;

            return (0, _baseDao.baseDao)('deviceDao', 'getDeviceListResultByOffsetAndCount', params).then(function (obj) {
                var totalCount = obj[0].totalCount;
                var deviceList = obj[0].deviceList;

                var pageInfo = {
                    endCursor: 5,
                    hasNextPage: true
                };

                if (_arguments[1].offset + _arguments[1].count >= totalCount) {
                    pageInfo.endCursor = totalCount;
                    pageInfo.hasNextPage = false;
                } else {
                    pageInfo.endCursor = _arguments[1].offset + _arguments[1].count;
                    pageInfo.hasNextPage = true;
                }

                return new _objects.DeviceList(totalCount, deviceList, pageInfo);
            }).catch(function (e) {
                console.log(e);

                //Message constructor(type,code,content) {
                return new _objects.Message("error", "00001", "数据库连接失败");
            });
        }
    }
};

//objects