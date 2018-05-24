import {getUser, getDeviceId} from './Storage';
import MD5 from 'UTILS/MD5';
import {ServerError} from 'EXCEPTION';
import transferRequestJSON from "UTILS/transferRequestJSON";

const apiUrl = 'http://wd.a.wodedagong.com';

function getRequestInit(req) {
    return {
        method: 'POST',
        // headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: transferRequestJSON(req)
    };
}

async function toAsync(apiFetch) {
    const response = await apiFetch;
    if (response.ok) {
        let res = await response.json();
        if (res.Code === 0) {
            return res.Data;
        } else if (res.Code === 80001) {
            throw new ServerError(res.Code, res.Desc);
        } else {
            throw new ServerError(res.Code, res.Desc);
        }
    } else {
        throw new ServerError(response.message);
    }
}


export const getBrokerInfo = param => toAsync(
    fetch(apiUrl + '/OP_ECM_Manager/OP_ECM_GetBrokerInfo', getRequestInit(param))
);
export const getLaborInfo = param => toAsync(
    fetch(apiUrl + '/OP_ECM_Manager/GetLaborInfo', getRequestInit(param))
);

// 登录
export function login(param) {
    return toAsync(fetch(apiUrl + '/login', getRequestInit(param)));
}