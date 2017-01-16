
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

Follow the steps in, http://docs.aws.amazon.com/lambda/latest/dg/automating-deployment.html

But, currently, some values need to be hardcoded in deployment files because the constraints of CodePipeline / CodeBuild / SAM and these are

- ./buildspec.yml

  > **S3 Bucket Name** where the code zip file (federation.zip) and swagger file (swagger.yaml) will be copied, `sgas.sam.aws-services-federation`

- ./template.yaml

  > **S3 Bucket Name** where the code zip file (federation.zip) and swagger file (swagger.yaml) will be copied, `sgas.sam.aws-services-federation`

- ./swagger.yaml

  > **AWS Region** and **AWS Account Number** in Lambda Function Uri, `arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:089476987273:function:${stageVariables.LambdaFunctionName}/invocations`

After setting up the pipeline, there is a step you need to do

- In the newly created role for CodeBuild, add below policy statement to upload the lambda code zip file in S3 bucket during building

  ```
  {
    "Effect": "Allow",
    "Resource": [ "*" ],
    "Action": [
      "s3:PutObject"
    ]
  }
  ```

After deployment, follow these steps to give a permission for the API Gateway to invoke Lambda Function

- In API Gateway console,

  > Go to 'Integration Request' page of '/federation' GET method

  > Click the edit icon for 'Lambda Function'

  > Save without any change, then a popup window will be displayed

  > Run the command in the popup window

  > Deploy API again


## How To Test Lambda Function

After populate the const variables in test.js, run below command

    $ node test.js

[aws-services-image]: ./docs/images/logo.png?raw=true
