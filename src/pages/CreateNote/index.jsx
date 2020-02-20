import React, { useState } from 'react';

import { Button, Col, Form } from 'react-bootstrap';
import { Input } from '../../components/fields';
import { addNote } from '../../modules/CreateNote/reducers';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';

let CreateNote = props => {
	let [name, setName] = useState('');
	let [notes, setNotes] = useState('');
	let [submitEvents, setSubmitEvents] = useState(false);

	let submit = e => {
		e.preventDefault();
		setSubmitEvents(!submitEvents);
		if (name && notes) {
			props.addNote({ name, notes });
			setName('');
			setNotes('');
			props.history.push('/');
		}
	};

	return (
		<Col md={{ span: 6, offset: 3 }}>
			<Form onSubmit={submit}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						name="name"
						type="text"
						placeholder="Name"
						required={true}
						submitEvents={submitEvents}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Notes</Form.Label>
					<Input
						value={notes}
						onChange={e => setNotes(e.target.value)}
						name="notes"
						type="text"
						placeholder="Your note..."
						required={true}
						submitEvents={submitEvents}
						as="textarea"
					/>
				</Form.Group>
				<div>
					<Button type="submit" variant="primary">
						Submit
					</Button>
				</div>
			</Form>
		</Col>
	);
};

export default compose(withRouter, connect(null, { addNote }))(CreateNote);
