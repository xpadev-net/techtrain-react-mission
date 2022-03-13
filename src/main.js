import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

/* pages */
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Index from './pages/Index';
import Profile from './pages/Profile';

/* components */
import Header from "./components/Header";

/* page scripts */
let root = document.createElement('div');
root.id = 'root';
document.body.append(root);
const Router = () => {
	const getUrl = () => {
		const match = window.location.hash.match(/#\/?(.*)/);
		return match?match[1]:"/";
	}
	const [url,setUrl] = useState(getUrl());
	const goUrl = (url) => {
		window.location.hash=url;
		setUrl(getUrl());
	}
	const onHashChange = () => {
		setUrl(getUrl());
	}
	useEffect(()=>{
		window.addEventListener("hashchange",onHashChange);
		return () => {
			window.removeEventListener("hashchange",onHashChange);
		}
	},[]);
	let component=<></>;
	switch (url) {
		case "signup":
			component=<SignUp go={goUrl}/>;
			break;
		case "login":
			component=<Login go={goUrl}/>;
			break;
		default:
			switch (url) {
				case "":
					component=<Index go={goUrl}/>;
					break;
				case "profile":
					component=<Profile go={goUrl}/>;
					break;
			}
			component=<>
				<Header go={goUrl}/>
				{component}
			</>
	}
	return <>
		{component}
	</>;
}
ReactDOM.render(<Router/>, root);