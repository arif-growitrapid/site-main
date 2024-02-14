import { Client, Databases } from "appwrite";


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64e9ea77d685252a9eed');

export const databases = new Databases(client);

