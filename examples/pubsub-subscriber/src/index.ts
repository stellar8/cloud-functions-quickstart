import * as ff from '@google-cloud/functions-framework';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';
import * as bunyan from 'bunyan';
import 'dotenv/config';
import * as nodeGzip from 'node-gzip';
import { MessagePublishedData } from '@google/events/cloud/pubsub/v1/MessagePublishedData';

const logServiceName = process.env.LOG_SERVICE_NAME || 'pubsub-subscriber';
const loggingBunyan = new LoggingBunyan();
// log to bunyan_log in Log Explorer if in production or to the console if not
const logStreams =
    process.env.NODE_ENV === 'production' ? [loggingBunyan.stream('info')] : [{ stream: process.stdout, level: 'info' } as bunyan.Stream];
const logger = bunyan.createLogger({
    name: logServiceName,
    streams: logStreams,
});

ff.cloudEvent('main', async (cloudEvent: ff.CloudEvent<MessagePublishedData>) => {
    if (!cloudEvent.data?.message?.data) {
        logger.info('No data to process.');
        return;
    }

    const data = Buffer.from(cloudEvent.data.message.data, 'base64');

    // messages published to Material topics are gzipped JSON
    const decompressed = await nodeGzip.ungzip(data);
    const payload = JSON.parse(decompressed.toString()) as object;

    logger.info(payload); // EXAMPLE. remove this and add your code here
});
