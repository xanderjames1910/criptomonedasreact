import React from 'react';
import './Spinner.css';

const Spinner = () => {
	return (
		<div className='sk-chase'>
			<div className='sk-chase-dot' />
			<div className='sk-chase-dot' />
			<div className='sk-chase-dot' />
			<div className='sk-chase-dot' />
			<div className='sk-chase-dot' />
			<div className='sk-chase-dot' />
		</div>
	);
};

export default Spinner;
