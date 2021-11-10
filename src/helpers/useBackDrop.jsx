import { useState } from 'react';

function useBackdrop() {
	let [ isOpen, setIsOpen ] = useState(false);
	let openBackdropHandler = (value) => {
		setIsOpen(value);
	};
	return [ isOpen, openBackdropHandler ];
}

export default useBackdrop;
