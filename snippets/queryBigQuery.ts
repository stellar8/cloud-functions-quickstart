import * as bq from '@google-cloud/bigquery';
import fs from 'fs';

const runQuery = async () => {
    const bigquery = new bq.BigQuery();
    const query = fs.readFileSync('./query.sql').toString(); // YOUR SQL FILE

    const options: bq.Query = {
        query,
        location: 'US',
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rows;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const queryBigQuery = async () => {
    const rows = await runQuery();
    console.log(`${rows.length} rows returned`);
    // Do something with rows data
};
