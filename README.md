# Material Security Cloud Functions Quickstart

## Using This Quickstart

To start, [use this repository as a template](https://github.com/stellar8/cloud-functions-quickstart/generate) to create a new repository.

All code uses TypeScript.

Read the following sections:

- [Best Practices](#best-practices) - tips on coding Cloud Functions
- [Examples](#examples) - view the README in each example's directory for details on how to use it
- [Snippets](#snippets) - code for common tasks you can use in your Cloud Functions

## Best Practices

### Catch Errors from Async Functions

When using async/await, use `try...catch` blocks around the function call to handle errors. Otherwise, the Cloud Function will log an `Exception from a finished function` error with no stack trace.

This isn't stricly necessary for HTTPS functions since Express handles the error gracefully.

### Use Runtime Environment Variables for Configuration

To make configuration changes easy and keep code reusable, [runtime environment variables](https://cloud.google.com/functions/docs/configuring/env-var#setting_runtime_environment_variables) should be used. These can be set when deploying the Cloud Function:

```bash
gcloud functions deploy my-project \
# other command flags
--set-env-vars MY_VAR1=HELLO,MY_VAR2="WORLD!"
```

### Set Secrets as Environment Variables

If your function uses Secrets, they can be [set as environment variables at runtime](https://cloud.google.com/functions/docs/configuring/secrets#environment_variables). This makes accessing them much quicker than calling the Secret Manager SDK.

```bash
gcloud functions deploy my-project \
# other command flags
--set-secrets 'MY_SECRET=[secret name]:latest'
```

### Optimize PubSub Subscriptions

Some Material PubSub topics are published to frequently (e.g. on every email in all connected email tenants) so you will want to optimize your code to exit early where possible and avoid expensive/synchronous code.

## Examples

Examples are working functions for each type of Cloud Function that can be used as a starting point for you own function. Each example's README gives more details on what it does, how to use it for local development, and deployment instructions.

- [HTTPS Endpoint](examples/https-endpoint/README.md)
- [PubSub Subscription Function](examples/pubsub-subscriber/README.md)

## Snippets

Snippets are code that can be added to your Cloud Functions to accomplish common tasks.

- [Run a BigQuery query](./snippets/queryBigQuery.ts)
- [Get a file as text from a Storage bucket](./snippets/getStorageFileAsString.ts)
- [Send an email](./snippets/sendEmail.ts)
- [Send a Slack message](./snippets/sendSlack.ts)
- [Get a Secret](./snippets/getSecret.ts)
- [Create a Phishing Case](./snippets/createPhishingCase.ts)
