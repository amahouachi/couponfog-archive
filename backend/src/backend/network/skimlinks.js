const request= require('request');
const {config}= require('../../common/config');
const {logger}= require('../../common/logger');
const util= require('../../common/util').Util;

class Skimlinks{

  static isAccessTokenExpired(){
    return !Skimlinks.accessToken || util.getTimestamp()>Skimlinks.accessTokenExpires;
  }
  static async getAccessToken(){
    if(this.isAccessTokenExpired()){
      Skimlinks.accessToken= null;
      Skimlinks.accessTokenExpires= 0;
      try{
        const {access_token, expiry_timestamp}= await this.generateAccessToken();
        if(access_token){
          Skimlinks.accessToken= access_token;
          Skimlinks.accessTokenExpires= expiry_timestamp;
        }
        return access_token;
      }catch (e) {
        return null;
      }
    }else{
      return Skimlinks.accessToken;
    }
  }
  static async generateAccessToken(){
    return new Promise((resolve, reject) => {
      const req = {
        url: 'https://authentication.skimapis.com/access_token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        json: true,
        body: {
          "client_id": config.affiliate.skimlinks.clientId,
          "client_secret": config.affiliate.skimlinks.clientSecret,
          "grant_type": "client_credentials"
        }
      };
      request(req, async (error, response, data) => {
        if (error != null) {
          logger.error("Failed : " + req.url + " - Error=" + error);
          reject(error);
          return;
        }
        resolve(data);
      });
    });
  }
}

Skimlinks.accessToken= null;
Skimlinks.accessTokenExpires= 0;

exports.Skimlinks= Skimlinks;
