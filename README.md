# leads-to-slack
Simple integration to connect your website's contact form to slack using AWS Lambda

## How to install

### Install dependencies 
Install node dependecies, you can use `npm` or `yarn`
```bash
# Using npm
# npm install -g serverless
# npm i

$ yarn global add serverless
$ yarn 
```

### Setup AWS credentials
This projects is intended to run using AWS cloud platform, having AWS credentials set is required. Follow the link if don't know how to do that

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

### Get slack token
This project uses `Incomming Webhooks` from Slack, getting a `Slack` token is quite easy, you just need to create a new Slack App and add `Incomming Webhook` feature to your App (check `Add features and functionality`). For more information just follow this link https://api.slack.com/incoming-webhooks

### Add Slack token and Company info
[Serverless Framework](https://serverless.com) provides us a way to add `environmental variables` to the project and they are set in [serverless.yml](https://serverless.com) file:

```yml
  environment:
    SLACK_WEBHOOK: ${ssm:SLACK_WEBHOOK_URL}
    CAMPANY_LOGO: ${ssm:CAMPANY_LOGO_URL}
    CAMPANY_WEBSITE: Dreamcode.io  #${ssm:CAMPANY_WEBSITE_URL}
```
You just need to replace `${ssm:SLACK_WEBHOOK}`, `${ssm:CAMPANY_LOGO}`, `Dreamcode.io` with your information

Remember, this information could be sensible to your company, if you want to fork this repo it's better to store this info in a more secure way. Serverless Framework supports [secrets management](https://serverless.com/blog/serverless-secrets-api-keys/) using [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html) and that's why you see this weird notation `${ssm:SLACK_WEBHOOK_URL}`

## Running locally
Serverless Framework supports local execution, to start locally run the following:

```bash
$ serverless offline start
```
to test you should request `[POST] http://localhost:3000/send-lead` with any body `JSON` payload for example:

```bash
$ curl -X POST http://localhost:3000/send-lead --data '{ "email": "info@dreamcode.io" }'
```

## Deploy to AWS
If you have all set, deploying is really straightforward just run:

```bash
$ serverless deploy
```
After that you'll get something like:

```
Service Information
service: leads-to-slack
stage: dev
region: us-east-1
stack: leads-to-slack-dev
api keys:
  None
endpoints:
  POST - https://fb473thha.execute-api.us-east-1.amazonaws.com/dev/send-lead
functions:
  sendLead: leads-to-slack-dev-sendLead
Serverless: Invoke aws:deploy:finalize
Serverless: Removing old service artifacts from S3...
```
Under the `endpoints` section you have the endpoint you should invoke in your contact form. Test it:
```bash
$ curl -X POST https://fb473thha.execute-api.us-east-1.amazonaws.com/dev/send-lead --data '{ "email": "info@dreamcode.io" }'
```


