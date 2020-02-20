import React, { useEffect, useState } from 'react';
import { Alert, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form } from 'react-bootstrap';
import { updateNote } from '../../modules/CreateNote/reducers';
import Comments from './Comments';

let Note = props => {
	let [editMode, SetEditMode] = useState(false);
	let [noteText, SetNoteText] = useState(props.notes.length && props.notes[props.match.params.noteId].notes);
	useEffect(() => {
		SetNoteText(props.notes.length && props.notes[props.match.params.noteId].notes);
	}, [props.notes.length]);

	return (
		<Col md={{ span: 6, offset: 3 }}>
			<Alert className="d-flex " variant={'info'}>
				<h4 className="mr-3">Name:</h4>
				<h4>{props.notes.length && props.notes[props.match.params.noteId].name}</h4>
			</Alert>
			<Alert variant={'success'}>Double click on note text to edit / save on blur</Alert>
			<Alert
				onDoubleClick={() => {
					SetEditMode(true);
				}}
				variant={'dark'}
			>
				<h2>Note text:</h2>
				<h5>{!editMode && props.notes.length && props.notes[props.match.params.noteId].notes}</h5>
				{editMode && (
					<Form.Control
						value={noteText}
						onChange={e => {
							SetNoteText(e.currentTarget.value);
						}}
						autoFocus
						onBlur={() => {
							SetEditMode(false);
							props.updateNote(props.match.params.noteId, noteText);
						}}
					/>
				)}
			</Alert>
			<Comments noteId={props.match.params.noteId} note={props.notes[props.match.params.noteId]} />
		</Col>
	);
};
let mapStateToProps = state => {
	return {
		notes: state.CreateNote.notes,
	};
};

export default compose(withRouter, connect(mapStateToProps, { updateNote }))(Note);
