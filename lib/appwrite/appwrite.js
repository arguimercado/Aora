import { Client,Account,ID, Avatars, Databases, Query } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.kieltech.aora",
    projectId: "6624db58bb697eaf3c79",
    databaseId: "6624dd9b129015cc0276",
    userCollectionId: "6624ddd04f8496ea888b",
    videCollectionId: "6624de6512b337e67ad6",
    storageId: "6624e3db3be87764e70a"
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (username, email,password) => {

    try {
        const acct = await account.create(ID.unique(),email,password,username);
        
        if(!acct) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email,password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: acct.$id,
                email,
                username,
                avatar: avatarUrl
            })

        return newUser;

    }
    catch(error) {
        console.log(error);

    }
   
}

export const signIn = async (email,password) =>  {
    try {
        const session = await account.createEmailSession(email,password);
        return session;
    }catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount)
            throw new Error("No user account");

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.
            userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]);
        
        if(!currentUser)
            throw new Error;

        return currentUser.documents[0];
    }
    catch(error) {
        console.log(error);
    }
}
