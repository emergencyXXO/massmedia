import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch, withRouter } from 'react-router-dom';
import Main from './pages/Main';
import { Container, Row } from 'react-bootstrap';
import Note from './pages/Note';
import CreateNote from './pages/CreateNote';
import { setInitialized } from './modules/CreateNote/reducers';
import { compose } from 'redux';
import { connect } from 'react-redux';

function App(props) {
	useEffect(() => {
		!props.initialize && props.setInitialized();
	}, []);
	return (
		<Container fluid>
			<Row>
				<Switch>
					<Route path="/" exact render={() => <Main />} />
					<Route path="/note/:noteId?" render={() => <Note />} />
					<Route path="/create-note" render={() => <CreateNote />} />
				</Switch>
			</Row>
		</Container>
	);
}

let mapStateToProps = state => {
	return {
		initialize: state.CreateNote.initialize,
	};
};

export default compose(withRouter, connect(mapStateToProps, { setInitialized }))(App);
