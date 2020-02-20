import React, { useState } from 'react';

import { Alert, Button, Col, Form } from 'react-bootstrap';
import { Input } from '../../../components/fields';
import { connect } from 'react-redux';
import { addComment } from '../../../modules/CreateNote/reducers';

let Comments = props => {
	let [name, setName] = useState('');
	let [comment, setComment] = useState('');
	let [submitEvents, setSubmitEvents] = useState(false);

	let submit = e => {
		e.preventDefault();
		setSubmitEvents(!submitEvents);
		if (name && comment) {
			props.addComment(props.noteId, { name, comment });
			setName('');
			setComment('');
		}
	};

	return (
		<Col md={{ span: 6, offset: 3 }}>
			{props.note &&
				props.note.comments.map(coment => (
					<Alert variant={'info'}>
						<h4>{coment.comment}</h4>
						<div className="d-flex justify-content-between align-items-center">
							<p>Author:{coment.name}</p>
							<p>Date:{coment.date}</p>
						</div>
					</Alert>
				))}

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
					<Form.Label>Comment</Form.Label>
					<Input
						value={comment}
						onChange={e => setComment(e.target.value)}
						name="comment"
						type="text"
						placeholder="Your comment..."
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

export default connect(null, { addComment })(Comments);
