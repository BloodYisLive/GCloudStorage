import DocumentPicker from 'react-native-document-picker'
import { uploadDocToFirestore, uploadDocToStorage } from './FirestoreAPI'

export const openDocSelector = async (userId, folderId) => {
try {
        const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles],
        })
        console.log(res.name, res.uri);
        uploadDocToStorage(userId, res.name, res.uri)
        uploadDocToFirestore(userId, folderId, res.name, res.size)
        } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
        } else {
            throw err
        }
    }
}