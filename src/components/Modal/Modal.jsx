import React from 'react';
import { FaTimes } from 'react-icons/fa';
const Modal = (props) => {
	return (
		<div className="fixed z-50 top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 bg-white w-2/3">
			<div className="flex justify-between items-center my-2 h-10">
				<div className="ml-4 text-3xl">
					<p>{props.modalTitle}</p>
				</div>
				<button onClick={props.onClose} className="p-2 mr-8">
					<FaTimes className="text-red-500 text-3xl" />
				</button>
			</div>
			{props.children}
		</div>
	);
};

export default Modal;
