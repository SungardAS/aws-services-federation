
var federateAccount = '<federate_account_num>';
var federateRoleName = '<federate_role_name>';
var roleName = '<target_account_role_name>';
var account = '<target_account_num>';
var roleExternalId = '<externl_id_of_target_account_to_federate>';

var roles = [];
roles.push({roleArn: 'arn:aws:iam::' + federateAccount + ':role/' + federateRoleName});
roles.push({roleArn: 'arn:aws:iam::' + account + ':role/' + roleName, externalId: roleExternalId});
console.log(roles);

event = {
  roles: roles,
  sessionName: "dummy_session_name",
  durationSeconds: 0
}

var i = require('./index.js');
var context = null;
i.handler(event, context, function(err, data) {
  if (err)  console.log("failed : " + err);
  else console.log("completed: " + JSON.stringify(data));
});
