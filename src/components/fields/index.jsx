import { Form } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';

export let Input = props => {
	let [required, setRequired] = useState(false);
	const firstUpdate = useRef(true);
	let changeVal = () => {
		if (props.required) {
			if (props.value === '') {
				setRequired(true);
			} else {
				setRequired(false);
			}
		}
	};
	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		changeVal();
	}, [props.submitEvents]);

	return (
		<div className="field__wrapper">
			<Form.Control
				{...props}
				onChange={e => {
					changeVal();
					props.onChange(e);
				}}
				onBlur={changeVal}
			/>
			{required && <p>required</p>}
		</div>
	);
};
