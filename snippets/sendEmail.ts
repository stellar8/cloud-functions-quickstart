import * as ps from '@google-cloud/pubsub';
import { v4 as uuidv4 } from 'uuid';

const publishMessage = async (to: string, subject: string, text: string) => {
    // EXAMPLE: compose the message data with a text file attachment
    const data = JSON.stringify({
        type: 'system_email',
        email: {
            to,
            subject,
            text,
            attachments: [
                {
                    headers: [
                        { k: 'Content-Type', v: 'text/plan; charset=UTF-8' },
                        { k: 'Content-Transfer-Encoding', v: 'quoted-printable' },
                    ],
                    bytes: 'Text file contents',
                },
            ],
        },
        source: {
            notificationWorker: true,
        },
        notificationId: `notification_${uuidv4()}`,
    });

    const pubSubClient = new ps.PubSub();
    const dataBuffer = Buffer.from(data);

    const messageId = await pubSubClient.topic('busprod-OutputRequest-NotificationTopics-default').publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sendEmail = async () => {
    try {
        await publishMessage('me@example.com', 'Test Email', 'Test body.');
    } catch (err) {
        console.error(err);
    }
};
