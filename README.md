
# Account Federation

API Gateway and Lambda Function to manage AWS Account Federation

![aws-services][aws-services-image]

## How to Execute API Gateway Interface

Path
```
/federation?federateAccount=<federate_account_num>&federateRoleName=<federate_role_name>&account=<target_account_num>&roleName=<target_account_role_name>
```

Headers
```
roleExternalId:<externl_id_of_target_account_to_federate>
```

Return Value
```
{"statusCode":200,"body":{"ResponseMetadata":{"RequestId":""},"Credentials":{"AccessKeyId":"","SecretAccessKey":"","SessionToken":"","Expiration":""},"AssumedRoleUser":{"AssumedRoleId":"","Arn":""}}}
```

## How To Setup a CodePipeline

- First, create a S3 Bucket where the deployment files will be uploaded with following below naming convention. *(You can use a different convention, but you need to add a permission for the CodeBuild to access this S3 bucket)*.

  >

      codepipeline-\<region\>-\<account_num\>-\<project_name\>

  like

      codepipeline-us-east-1-9999999999-aws-services-encryption


- Follow the steps in http://docs.aws.amazon.com/lambda/latest/dg/automating-deployment.html along with additional steps below.

  - When creating a new project in CodeBuild,

    > Under 'Advanced' setting, add an Environment variable , S3_BUCKET_NAME, with the S3 bucket name you created above.




And currently some values need to be hardcoded in swagger.yaml and these are

- **AWS Region** and **AWS Account Number** in Lambda Function Uri, `arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:089476987273:function:${stageVariables.LambdaFunctionName}/invocations`

After deployment, follow these steps to give a permission for the API Gateway to invoke Lambda Function

- In API Gateway console,

  > Go to 'Integration Request' page of '/federation' GET method

  > Click the edit icon for 'Lambda Function'

  > Save without any change, then a popup window will be displayed

  > Run the command in the popup window

  > Deploy API again


## How To Test Lambda Function

After populating the const variables in test.js, run below command

    $ node tests/test.js

[aws-services-image]: ./docs/images/logo.png?raw=true
