# Example: HTTPS Endpoint

This directory contains the boilerplate for an HTTPS Cloud Function with the following features:

-   Uses Bunyan for logging which handles logging JSON objects much nicer than letting Cloud Logs handle `console.log()`
-   Requires a Bearer token for authentication
-   Supports `.env` and `nodemon` for local development

## Using This Example

1. In a terminal:
    ```bash
    npm install
    cp .env.sample .env
    ```
1. Edit `.env`:

    1. Set `BEARER_TOKEN` to the Bearer token used to secure the function--you can create this using `openssl rand -base64 32`
    1. Set `LOG_SERVICE_NAME` to the name you'd like to use for the Bunyan log service

        This will be used as the `name` in the `jsonPayload` log property or `https-function` if not set

1. Modify `src/index.ts` and add your code where noted
1. Test locally by running `npm start`
1. Test GETting or POSTing data to `http://localhost:8080` with `curl` or the like.

## Deploying

Use the [`gcloud` cli](https://cloud.google.com/sdk/docs/install), replacing the following [PLACEHOLDERS]:

-   `[FUNCTION_NAME]` - display name of the function
-   `[PROJECT]` - GCP project name
-   `[BEARER_TOKEN]` - the Bearer token to use for authentication (see 2.1 above to create one)

```
gcloud functions deploy [FUNCTION_NAME] \
--gen2 \
--project=[PROJECT] \
--runtime=nodejs20 \
--region=us-central1 \
--source=. \
--entry-point=main \
--trigger-http \
--allow-unauthenticated \
--set-secrets 'BEARER_TOKEN=[BEARER_TOKEN]'
```
