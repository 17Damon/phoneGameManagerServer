/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var resolverMap = exports.resolverMap = {
    GetTokenResult: {
        __resolveType: function __resolveType(obj, context, info) {
            if (obj.content) {
                return 'Message';
            }

            if (obj.token) {
                return 'Token';
            }

            return null;
        }
    },
    GetDeviceListResult: {
        __resolveType: function __resolveType(obj, context, info) {
            if (obj.content) {
                return 'Message';
            }

            if (obj.deviceList) {
                return 'DeviceList';
            }

            return null;
        }
    }
};