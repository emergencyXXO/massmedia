const ADD_NOTE = 'ADD_NOTE';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_NOTE = 'DELETE_NOTE';
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const UPDATE_NOTE = 'UPDATE_NOTE';

let InitialState = {
	notes: [],
	initialize: false,
};

let CreateNote = (state = InitialState, action) => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			let notesFromSorage = JSON.parse(localStorage.getItem('Notes'));
			if (notesFromSorage === null) {
				notesFromSorage = [];
			}
			return {
				...state,
				notes: [...notesFromSorage],
				initialize: true,
			};

		case ADD_NOTE:
			let newId;
			if (state.notes.length) {
				newId = state.notes[state.notes.length - 1].id;
				newId++;
			} else {
				newId = 0;
			}
			action.note.id = newId;
			action.note = { ...action.note, comments: [] };
			let newNote = [...state.notes, action.note];
			localStorage.setItem('Notes', JSON.stringify(newNote));
			return {
				...state,
				notes: newNote,
			};
		case DELETE_NOTE:
			let newNotes = state.notes.filter(note => note.id !== action.delId);
			localStorage.setItem('Notes', JSON.stringify(newNotes));
			return {
				...state,
				notes: newNotes,
			};
		case UPDATE_NOTE:
			let updateNote = state.notes.filter(note => note.id == action.updateId)[0];

			updateNote.notes = action.updateNotes;

			localStorage.setItem('Notes', JSON.stringify([...state.notes, updateNote]));
			return {
				...state,
				notes: [...state.notes, updateNote],
			};

		case ADD_COMMENT:
			let currentNote = state.notes.filter(note => note.id == action.currentId)[0];

			let newCommentId;
			if (currentNote.comments.length) {
				newCommentId = currentNote.comments[currentNote.comments.length - 1].id;
				newCommentId++;
			} else {
				newCommentId = 0;
			}
			currentNote.comments = [
				...currentNote.comments,
				{
					id: newCommentId,
					name: action.commentBody.name,
					comment: action.commentBody.comment,
					date:
						new Date().getDate() +
						'-' +
						(new Date().getMonth() + 1) +
						'-' +
						new Date().getFullYear() +
						' ' +
						new Date().getHours() +
						':' +
						new Date().getMinutes(),
				},
			];
			let newNoteWithCom = [...state.notes];
			localStorage.setItem('Notes', JSON.stringify(newNoteWithCom));
			return {
				...state,
				notes: newNoteWithCom,
			};
		default:
			return state;
	}
};

export const addNote = note => ({
	type: ADD_NOTE,
	note,
});
export const delNote = delId => ({
	type: DELETE_NOTE,
	delId,
});

export const setInitialized = () => ({
	type: INITIALIZED_SUCCESS,
});

export const updateNote = (updateId, updateNotes) => ({
	type: UPDATE_NOTE,
	updateId,
	updateNotes,
});
export const addComment = (currentId, commentBody) => ({
	type: ADD_COMMENT,
	currentId,
	commentBody,
});

export const initializeApp = () => async dispatch => {
	//await dispatch(getMeThunkCreator());
	//dispatch(setInitialized());
};

export default CreateNote;
