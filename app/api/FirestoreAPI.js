/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
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
				if (snap !== null) {
					const folders = [];
					snap.forEach(doc => folders.push({ ...doc.data(), id: doc.id }));
					dataRetrieved(folders);
				}
			});
	} catch (e) {
		console.log(e);
	}
};

export const uploadDocToStorage = async (userId, fileName, filePath, folderId, fileSize) => {
	try {
		const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
		console.log(filePath, destPath);
		await RNFS.copyFile(filePath, destPath);
		await RNFS.stat(destPath).then(async (result) => {
			const reference = storage().ref(userId).child(fileName);
			const task = reference.putFile(result.path);
			task.then(() => {
				uploadDocToFirestore(userId, folderId, fileName, fileSize);
				console.log('File Uploaded');
			});
		});
	} catch (err) {
		console.log(err);
	}
};

export const uploadDocToFirestore = async (userId, folderId, fileName, fileSize) => {
	try {
		const dest = await firestore().collection('users').doc(userId).collection('folders').doc(folderId).collection('items');
		dest.add({
			createdAt: firestore.FieldValue.serverTimestamp(),
			fileName: fileName,
			fileSize: fileSize,
			updatedAt: firestore.FieldValue.serverTimestamp(),
		});
	} catch (err) {
		console.log(err);
	}
};

export const getFolderItems = async (userToken, folderId, dataRetrieved) => {
	try {
		await firestore().collection('users')
			.doc(userToken).collection('folders').doc(folderId).collection('items')
			.onSnapshot(snap => {
				if (snap !== null) {
					const items = [];
					snap.forEach(doc => items.push({ ...doc.data(), id: doc.id }));
					dataRetrieved(items);
				}
			});
	} catch (err) {
		console.log(err);
	}
};

export const deleteFolder = async (userToken, folderId) => {
	try {
		await firestore().collection('users')
			.doc(userToken).collection('folders').doc(folderId).delete()
			.then(() => console.log('Folder Deleted'));
	} catch (err) {
		console.log(err);
	}
};

export const deleteFolderItems = async (userId, fileName, folderId, itemId) => {
	try {
		const reference = await storage().ref(userId).child(fileName);
		reference.delete().then(() => {
			deleteFolderItemsFromFirestore(userId, folderId, itemId);
		});
	} catch (err) {
		console.log(err);
	}
};

export const deleteFolderItemsFromFirestore = async (userId, folderId, itemId) => {
	try {
		await firestore().collection('users')
			.doc(userId).collection('folders').doc(folderId).collection('items').doc(itemId).delete()
			.then(() => console.log('Item Deleted'));
	} catch (err) {
		console.log(err);
	}
};

