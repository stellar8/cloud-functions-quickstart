import * as cs from '@google-cloud/storage';

const storage = new cs.Storage();

const getFileAsString = async (bucket: string, fileName: string) => {
    const contents = await storage.bucket(bucket).file(fileName).download();

    return contents.toString();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStorageFileAsString = async () => {
    try {
        const fileContents = await getFileAsString('bucket_name', 'file_name');
        console.log(fileContents);
    } catch (err) {
        console.error(err);
    }
};
