# BACKEND NODEJS

# Run Locally

1. Run ```npm install```
2. Add aws credential to .aws folder If you don't have it, ask your colleagues
3. Run ```npm install-dynamodb```
5. If you’re stuck on the install for a few minutes,
    1. you can open:  http://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz directly from browser and download the gzip file
    2. Unzip the files into the ./dynamodb folder at the root folder of the project
6. Run ```npm run offline```
    1. If you’re on Mac, you might need to go into “preference” ->  “privacy” to allow dynamo process to execute

# Run the test

```zsh
npm run test
```

# To Deploy.

Just create a `pull request` from your `feature-branch` to the `develop` branch. After the pull request is accepted it will be automatically deployed to the `dev` environnement.

When you merge `develop` to `master`, it will be automatically deployed to the `prod` environnement .

## Generate Schema AJV (if you don't want do it manually)

To check if our json object are correct we use `https://ajv.js.org/`

We need to have a json schema to compare it, you can write then manually or generate them here:

```zsh
npx ts-json-schema-generator --path "src/models/**/*.ts"  -o "src/models/schema.json"
```

## Continous Deployement

For deployment to AWS, we use the Serverless Framework `https://www.serverless.com/`

All the config files are in the folder `./serverless`

If you deploy from your local machine (absolutely not recommended), we suppose that you have created an AWS profile like explain here: `https://www.serverless.com/framework/docs/providers/aws/guide/credentials#using-aws-profiles` and that your credentials allows you to deploy

All Continous deployement is setup in CodeBuild `https://console.amazonaws.cn/codesuite/codebuild/home?region=cn-north-1` and that will use the `./buildspec.yml`. So if you don't want use CodeBuild all the deployement instructions are in the `./buildspec.yml` file

In CodeBuild add the environnement variable for each deployement:

- STAGE : dev / prod
