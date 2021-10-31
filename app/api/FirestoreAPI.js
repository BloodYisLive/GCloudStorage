/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';

export const addNewUser = async (user) => {
	try {
		const usersCollection = await firestore().collection('users').doc(user.id);
		usersCollection.set({
			userId: user.id,
			userCreatedAt: firestore.FieldValue.serverTimestamp(),
			storageLimit: 2,
		});
	} catch (err) {
		console.log(err);
	}
};

export const createFolder = async (userToken, folderName) => {
	try {
		const dest = await firestore().collection('users').doc(userToken).collection('folders');
		dest.add({
			createdAt: firestore.FieldValue.serverTimestamp(),
			folderName: folderName,
			updatedAt: firestore.FieldValue.serverTimestamp(),
			items: 0,
		});
	} catch (e) {
		console.log(e);
	}
};

export const getUserFolders = async (userToken, dataRetrieved) => {
	try {
		await firestore().collection('users')
			.doc(userToken).collection('folders')
			.onSnapshot(snap => {
				const folders = [];
				snap.forEach(doc => folders.push({ ...doc.data(), id: doc.id }));
				dataRetrieved(folders);
			});
	} catch (e) {
		console.log(e);
	}
};
