import React, { useRef } from 'react';
import './SearchButton.scss';

import Search from '../../../assets/img/Search.svg';

let SearchButton = (props) => {
	let inputRef = useRef(),
		getMask = (icon) => {
			return {
				maskImage: 'url(' + icon + ')',
				WebkitMaskImage: 'url(' + icon + ')'
			};
		};

	return (
		<div className='search' onClick={() => inputRef.current.focus()}>
			<input type='text'
				ref={inputRef}
				placeholder='Search'
				onFocus={() => props.setSearchActive(true)}
				onBlur={() => props.setSearchActive(false)}
			/>
			<div />
			<span style={getMask(Search)} />
		</div>
	);
};

export default SearchButton;
