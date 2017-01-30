
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

<a href="https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=ServerlessCodePipeline&amp;templateURL=https://s3.amazonaws.com/cloudformation-serverless-codepipeline.us-east-1/codepipeline.yaml"><img src="https://camo.githubusercontent.com/210bb3bfeebe0dd2b4db57ef83837273e1a51891/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f636c6f7564666f726d6174696f6e2d6578616d706c65732f636c6f7564666f726d6174696f6e2d6c61756e63682d737461636b2e706e67" alt="Launch Stack" data-canonical-src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png" /></a>

Input Parameter Values

- CloudformationLambdaExecutionRoleArn: *role_arn* (See <a href="https://s3.amazonaws.com/cloudformation-serverless-codepipeline.us-east-1/roles/role_cloudformation-lambda-execution-role.json">here</a> for Trust Relationships and Policy Document)
- CodePipelineServiceRoleArn: *role_arn*  (See <a href="https://s3.amazonaws.com/cloudformation-serverless-codepipeline.us-east-1/roles/role_AWS-CodePipeline-Service.json">here</a> for Trust Relationships and Policy Document)
- CustomAuthorizerIAMRoleArn:*role_arn*  (See <a href="https://s3.amazonaws.com/cloudformation-serverless-codepipeline.us-east-1/roles/role_apigateway-lambda-execution-role.json">here</a> for Trust Relationships and Policy Document)
- CustomAuthorizerLambdaName: *custom_authorizer_lambda_function_name* (See <a href="https://github.com/SungardAS/aws-services-authorizer">here</a> for the Lambda Function Project for Custom Authorizer)
- EncryptionLambdaName:
- GitHubPersonalAccessToken: *access_token* (See <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">here</a> to find how to genernate the access token)
- GitHubSourceRepositoryBranch: master
- GitHubSourceRepositoryName: aws-services-federation
- GitHubSourceRepositoryOwner: SungardAS
- ParameterOverrides:
- ProjectImage: aws/codebuild/nodejs:4.3.2


## How To Test Lambda Function

After populating the const variables in test.js, run below command

    $ node tests/test.js

## [![Sungard Availability Services | Labs][labs-logo]][labs-github-url]

This project is maintained by the Labs group at [Sungard Availability
Services](http://sungardas.com)

GitHub: [https://sungardas.github.io](https://sungardas.github.io)

Blog:
[http://blog.sungardas.com/CTOLabs/](http://blog.sungardas.com/CTOLabs/)

[labs-github-url]: https://sungardas.github.io
[labs-logo]: https://raw.githubusercontent.com/SungardAS/repo-assets/master/images/logos/sungardas-labs-logo-small.png
[aws-services-image]: ./docs/images/logo.png?raw=true
