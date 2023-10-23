import * as ff from '@google-cloud/functions-framework';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';
import * as bunyan from 'bunyan';
import 'dotenv/config';

const logServiceName = process.env.LOG_SERVICE_NAME || 'https-function';
const loggingBunyan = new LoggingBunyan();
// log to bunyan_log in Log Explorer if in production or to the console if not
const logStreams =
    process.env.NODE_ENV === 'production' ? [loggingBunyan.stream('info')] : [{ stream: process.stdout, level: 'info' } as bunyan.Stream];
const logger = bunyan.createLogger({
    name: logServiceName,
    streams: logStreams,
});

const bearerToken = process.env.BEARER_TOKEN;

ff.http('main', (req: ff.Request, res: ff.Response) => {
    if (!bearerToken) {
        logger.error('BEARER_TOKEN not sent in env. Exiting.');
        return res.status(500).send();
    }

    // validate Bearer token
    const receivedToken = req.headers.authorization;
    if (!receivedToken || !receivedToken.startsWith('Bearer ') || receivedToken.split(' ')[1] !== bearerToken) {
        logger.info('Invalid Bearer token received');
        return res.status(401).send('Invalid Bearer token');
    }

    /*
    Your code here...for example, to output the POSTed body:

    return res.send(req.body);
    */

    // always return a response
    res.end();
});
