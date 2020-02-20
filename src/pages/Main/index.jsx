import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { delNote } from '../../modules/CreateNote/reducers';

let Main = props => {
	return (
		<>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#id</th>
						<th>Name</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{props.notes.map(note => (
						<tr key={note.id}>
							<td>{note.id}</td>
							<td>{note.name}</td>
							<td>
								<NavLink to={`/note/${note.id}`}> View/Edit</NavLink>
							</td>
							<td>
								<a
									href="#"
									onClick={e => {
										e.preventDefault();
										props.delNote(note.id);
									}}
								>
									Remove
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<NavLink to={`/create-note`}>+ Add new note </NavLink>
		</>
	);
};

let mapStateToProps = state => {
	return {
		notes: state.CreateNote.notes,
	};
};

export default connect(mapStateToProps, { delNote })(Main);
