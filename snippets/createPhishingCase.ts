const materialHostname = process.env.MATERIAL_HOSTNAME;
const materialApiKey = process.env.MATERIAL_API_KEY;

const createCase = async (messageId: string, date: string) => {
    if (!materialApiKey || !materialHostname) {
        console.error('MATERIAL_HOSTNAME AND MATERIAL_API_KEY environment variables not set. Exiting.');
        return;
    }

    const data = {
        jobConfig: {
            type: 'MarkMsgsSusp',
            skipCache: true,
            marks: [
                {
                    messages: [
                        {
                            datedHid: {
                                hId: messageId,
                                date: date,
                            },
                        },
                    ],
                    hints: [
                        {
                            remedy: {
                                // One of the following remediations:
                                //
                                //     /** Mark as spam */
                                //     markSpam: {
                                //         selected: true;
                                //     };
                                //
                                //     /** Speedbump */
                                //     vaxAllow: {
                                //         selected: true;
                                //     };
                                //
                                //     /** Block */
                                //     vaxDeny: {
                                //         selected: true;
                                //     };
                            },
                        },
                    ],
                },
            ],
        },
    };

    const url = `https://${materialHostname}/api/beta/jobby/job/MarkMsgsSusp`;
    // eslint-disable-next-line no-restricted-globals
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-material-client-secret': materialApiKey,
        },
        body: JSON.stringify(data),
    });

    // do something with the response...
    console.log(response.status);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPhishingCase = async () => {
    const messageId = ''; // typically `forMessage.json.messageId` or `message.messageId` from a query/pubsub topic
    const date = ''; // typically `forMessage.json.date` or `message.date` from a query/pubsub topic
    await createCase(messageId, date);
};
