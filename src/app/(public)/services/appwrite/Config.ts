import { Client, Databases } from "appwrite";


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65cdb2195653a03224c8');

export const databases = new Databases(client);

