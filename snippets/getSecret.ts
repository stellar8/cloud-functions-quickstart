/* eslint-disable @typescript-eslint/no-unused-vars */
import { SecretManagerServiceClient } from '@google-cloud/secret-manager/build/src/v1';

const secretManager = new SecretManagerServiceClient();

const accessSecret = async (secretPath: string): Promise<string> => {
    const [accessResponse] = await secretManager.accessSecretVersion({
        name: secretPath,
    });

    if (accessResponse === undefined || !accessResponse.payload || !accessResponse.payload.data) {
        throw new Error('Secret response undefined or had no payload/data');
    }

    const responsePayload = accessResponse.payload.data.toString();

    return responsePayload;
};

const getSecretAsString = async () => {
    const secret = await accessSecret('/path/to/secret/version');
    // do something with secret
};
