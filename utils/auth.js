const WXAPI = require('apifm-wxapi');

async function checkHasLogin(){
  const token = wx.getStorageSynv('token');
  if(!token){
    return false
  }
}