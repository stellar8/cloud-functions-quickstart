# Example: PubSub Subscriber

This directory contains the boilerplate for a PubSub Cloud Function with the following features:

-   Uses Bunyan for logging which handles logging JSON objects much nicer than letting Cloud Logs handle `console.log()`
-   Supports `.env` and `nodemon` for local development

## Using This Example

1. In a terminal:
    ```bash
    npm install
    cp .env.sample .env
    ```
1. Edit `.env`:

    1. Set `LOG_SERVICE_NAME` to the name you'd like to use for the Bunyan log service

        This will be used as the `name` in the `jsonPayload` log property or `pubsub-subscriber` if not set

1. Modify `src/index.ts` and add your code where noted
1. Test locally by running `npm start`
1. Test POSTing a message to `http://localhost:8080` with `curl` or the like:

    ```bash
    curl -m 190 -X POST http://localhost:8080 \
    -H "Content-Type: application/json" \
    -H "ce-id: 1234567890" \
    -H "ce-specversion: 1.0" \
    -H "ce-type: google.cloud.pubsub.topic.v1.messagePublished" \
    -H "ce-time: 2020-08-08T00:11:44.895529672Z" \
    -H "ce-source: n/a" \
    -d '{
    "message": {
        "_comment": "data decodes to { material: 'security' }",
        "data": "H4sIAAAAAAAAE6tWyk0sSS3KTMxRslIqTk0uLcosqVSqBQBywfxCFwAAAA=="
        }
    }'
    ```

## Deploying

Use the [`gcloud` cli](https://cloud.google.com/sdk/docs/install), replacing the following [PLACEHOLDERS]:

-   `[FUNCTION_NAME]` - display name of the function
-   `[PROJECT]` - your Material GCP project name

```
gcloud functions deploy [FUNCTION_NAME] \
--gen2 \
--project=[PROJECT] \
--runtime=nodejs20 \
--region=us-central1 \
--source=. \
--entry-point=main \
--trigger-http \
--allow-unauthenticated
```
