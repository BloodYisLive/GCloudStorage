const initialState = {
    currentFolderName: '',
};

const folderReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CURRENT_FOLDER':
            return { ...state, currentFolderName: action.data };
        default:
            return state;
    }
};

export default folderReducer;
