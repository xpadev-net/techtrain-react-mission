import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import SignUp from './pages/SignUp';
let root = document.createElement('div');
root.id = 'root';
document.body.append(root);
const Router = () => {
	const [url,setUrl] = useState(window.location.hash.match(/#\/?(.*)/)[1]);
	useEffect(()=>{
		setUrl(window.location.hash.match(/#\/?(.*)/)[1]);
	},[window.location.hash]);
	let component=<></>;
	switch (url) {
		case "signup":
			component=<SignUp go={(loc)=>setUrl(loc)}/>;
			break;
	}
	return <>
		{component}
	</>;
}
ReactDOM.render(<Router/>, root);