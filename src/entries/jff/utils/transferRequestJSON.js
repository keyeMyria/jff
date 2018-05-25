import MD5 from 'UTILS/MD5';

const AppSetting = window.AppSetting || {
    AppVersion: '1.0.0',
    AppId: 'WD',
    AppKey: 'WDApp',
    AppSecret: 'a323f9b6-1f04-420e-adb9-b06d142c5e63',
    DeviceName: window.navigator.userAgent
};

function transferRequestJSON(params) {
    let p = params || {};
    let dataStr = JSON.stringify(p);
    let nowTmp = Math.round((new Date()).getTime() / 1000);
    return JSON.stringify({
        AppVer: AppSetting.AppVersion,
        TimeStamp: nowTmp,
        Lang: 'CN',
        DeviceName: AppSetting.DeviceName,
        DeviceType: 'web',
        Token: '',
        AppKey: AppSetting.AppKey,
        Sign: getSign(dataStr, nowTmp.toString()),
        Data: dataStr
    });
}

function getSign(dataStr, TimeStampStr) {
    if (typeof dataStr !== 'string' || typeof TimeStampStr !== 'string') {
        throw Error('Arguments type must be string. dataStr & timeStampStrt');
    }
    let AppKey = AppSetting.AppKey.toString();
    let AppSecret = AppSetting.AppSecret.toString();
    return MD5(AppKey + TimeStampStr + dataStr + AppSecret, 32);
}

export default transferRequestJSON;