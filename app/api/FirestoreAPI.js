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

// export const createFolder = async (user) => {
// 	try {
// 		const dest = await firestore().collection('users').doc(`${user.id}/folders`);
// 		dest.add({
// 			createdAt: firestore.FieldValue.serverTimestamp(),
// 			folderName: 
// 		});
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
