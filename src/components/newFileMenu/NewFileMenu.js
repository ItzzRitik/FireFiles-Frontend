import React, { createRef } from 'react';
import './NewFileMenu.scss';

import CreateFile from './icons/CreateFile.svg';
import CreateFolder from './icons/CreateFolder.svg';
import UploadFile from './icons/UploadFile.svg';
import UploadFolder from './icons/UploadFolder.svg';

let NewFileMenu = (props) => {
	let uploadFile = createRef(),
		uploadFolder = createRef(),
		getMask = (icon) => {
			return {
				maskImage: 'url(' + icon + ')',
				WebkitMaskImage: 'url(' + icon + ')'
			};
		};

	return (
		<div className='newFileMenu'>
			<span className='icon' style={getMask(props.icon)} />
			<span className='title'>{props.title}</span>
			<div className='subMenu'>
				<div className='file' onClick={() => (props.upload ? uploadFile.current.click() : props.onClick())}>
					{ props.upload && <input ref={uploadFile} type='file' onChange={props.file} multiple /> }
					<span className='icon' style={getMask(props.create ? CreateFile : UploadFile)} />
					<span className='title'>File</span>
				</div>
				<div className='folder' onClick={() => (props.upload ? uploadFolder.current.click() : props.onClick())}>
					{ props.upload && <input ref={uploadFolder} type='file' webkitdirectory='' multiple /> }
					<span className='icon' style={getMask(props.create ? CreateFolder : UploadFolder)} />
					<span className='title'>Folder</span>
				</div>
			</div>
		</div>
	);
};

export default NewFileMenu;
