import React from 'react';
import './ProfilePanel.scss';

import Loader from '../base/loader/Loader';

let OptionSheet = (props) => {
	const [loadingPicture, setLoadingPicture] = React.useState(true);
	React.useEffect(() => {
		const img = new Image();
		img.src = props.user.picture;
		img.onload = () => setLoadingPicture(false);
	}, [props.user]);

	return (
		<div className='profilePanel'>
			<div className='picture'>
				<span style={{ backgroundImage: 'url(' + props.user.picture + ')' }} />
				{loadingPicture && <Loader />}
			</div>
			<span className='name'>{props.user.name}</span>
			<span className='email'>{props.user.email}</span>
		</div>
	);
};

export default OptionSheet;
