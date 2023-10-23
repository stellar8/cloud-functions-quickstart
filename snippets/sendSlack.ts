/*
Send a message to a Slack App

Prerequisites:
A Slack App configured in your Workspace to use incoming webhooks: https://api.slack.com/messaging/webhooks
 
Required Configuration:
Set the SLACK_WEBHOOK_URL environment variable to the URL of your Slack App
 */

const postData = async (url: string, data: object) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sendSlack = async () => {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '';
    if (!slackWebhookUrl) {
        console.error('SLACK_WEBHOOK_URL environment variable not defined. Exiting.');
        return;
    }

    // Block Kit formatted data https://api.slack.com/block-kit
    const data = {
        text: 'Title Here',
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Something happened',
                },
            },
        ],
    };
    const response = await postData(slackWebhookUrl, data);
    console.log(response.status);
};
