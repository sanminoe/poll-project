import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Modal from '../../components/Modal/Modal';
const textInputStyle = 'border border-black pl-1';
const PollCreationWindow = (props) => {
	const [ formData, setFormData ] = useState({
		pollTitle: '',
		pollOptions: []
	});
	const [ optionsNumber, setOptionsNumber ] = useState(2);
	let formChangeHandler = (e, id) => {
		let data = { ...formData };
		if (e.target.name === 'pollTitle') {
			data.pollTitle = e.target.value;
		}
		else {
			let options = data.pollOptions.map((v) => {
				if (v.id === id) {
					v.value = e.target.value;
				}
				return v;
			});

			data.pollOptions = options;
		}

		setFormData(data);
	};
	let optionsNumberHandler = (e) => {
		let data = { ...formData };

		data.pollOptions = [ ...Array(e).keys() ].map(() => ({
			id: uuid(),
			value: '',
			votes: 0
		}));
		setFormData(data);
	};
	let optionsInputs = formData.pollOptions.map((v, i) => (
		<article key={v.id} className="flex flex-col">
			<label>Option {i + 1}</label>
			<input
				className={textInputStyle}
				name={'optionValue' + i + 1}
				type="text"
				value={v.value}
				required
				min="2"
				onChange={(e) => formChangeHandler(e, v.id)}
			/>
		</article>
	));
	let createPollHandler = () => {
		props.onCreatePoll(formData);
	};
	useEffect(
		() => {
			optionsNumberHandler(optionsNumber);
		},
		[ optionsNumber ]
	);
	return (
		<Modal onClose={props.onClose} modalTitle={'New Poll'}>
			<div className="mt-5 mx-6 mb-5">
				<form className="flex flex-col">
					<article className="flex flex-col mb-5">
						<label htmlFor="polltitle">Poll Title</label>
						<input
							className={textInputStyle}
							name="pollTitle"
							type="text"
							placeholder="Poll title"
							required
							onChange={formChangeHandler}
						/>
					</article>
					<article className="border-b mb-5 flex flex-col">
						<label>Number of options</label>
						<select
							value={optionsNumber}
							name="optionsNumber"
							id="optionnumber"
							onChange={(e) => setOptionsNumber(+e.target.value)}
							className="mt-2 border border-black bg-white outline-none"
						>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
					</article>
					{optionsInputs}
				</form>
			</div>
			<div className="flex justify-end w-full mb-5">
				<div>
					<button className="p-2 border border-gray-600" onClick={props.onCancel}>
						Cancel
					</button>
				</div>
				<div>
					<button
						className="ml-2 mr-2 p-2 border border-green-500 bg-green-500 text-white"
						onClick={createPollHandler}
					>
						Create
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default PollCreationWindow;
