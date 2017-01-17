'use strict';

const AWS = require('aws-sdk');

const createResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: body
  }
};

exports.handler = (event, context, callback) => {
  assumeRole(null, 0, event.roles, event.sessionName, event.durationSeconds, function(err, data) {
    if (err)  callback(null, createResponse(500, err));
    else {
      if (event.region) data['region'] = event.region;
      callback(null, createResponse(200, data));
    }
  });
}

const assumeRole = (creds, idx, roles, sessionName, durationSeconds, callback) => {
  var params = {};
  let role = roles[idx];
  if (creds)  params.credentials = creds;
  let sts = new AWS.STS(params);
  params = {
    RoleArn: role.roleArn,
    RoleSessionName: sessionName,
  }
  if (durationSeconds > 0)  params.DurationSeconds = durationSeconds;
  if (role.externalId)  params.ExternalId = role.externalId;
  sts.assumeRole(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err, null);
    }
    else {
      console.log("successfully assumed role, '" + role.roleArn + "'");
      //console.log(data);
      if (++idx == roles.length) {
        console.log("successfully completed to assume all roles");
        /*creds = new AWS.Credentials({
          accessKeyId: data.Credentials.AccessKeyId,
          secretAccessKey: data.Credentials.SecretAccessKey,
          sessionToken: data.Credentials.SessionToken
        });
        callback(null, creds);*/
        callback(null, data);
      }
      else {
        creds = new AWS.Credentials({
          accessKeyId: data.Credentials.AccessKeyId,
          secretAccessKey: data.Credentials.SecretAccessKey,
          sessionToken: data.Credentials.SessionToken
        });
        assumeRole(creds, idx, roles, sessionName, durationSeconds, callback);
      }
    }
  });
}
