import React, {useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

/* pages */
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Index from './pages/Index';
import Profile from './pages/Profile';
import New from './pages/New';
import Error from './pages/Error';
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";

/* components */
import Header from "./components/Header";
import fetchLib from "./libraries/fetchLib";

/* page scripts */
document.title = "Techtrain Railway Mission";
let root = document.createElement('div');
root.id = 'root';
document.body.append(root);
const Router = () => {
	const getUrl = () => {
		const match = window.location.hash.match(/#\/?(.*)/);
		if (!match){
			window.location.hash="/";
			return "";
		}
		return match[1];
	}
	const [url,setUrl] = useState(getUrl()),
		[userData,setUserData] = useState(false);
	const goUrl = useCallback((url) => {
		window.location.hash=url;
		setUrl(getUrl());
	},[window.location.hash]);
	const reloadHeader = useCallback(() => {
		getUserData();
	},[]);
	const getUserData = async() => {
		const req = await fetchLib('https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users',{auth:true});
		let res = await req.text();
		try{
			setUserData(JSON.parse(res));
		}catch (e) {
			setUserData(false);
		}
	}

	const onHashChange = () => {
		setUrl(getUrl());
	}
	useEffect(()=>{
		const init = async() => {
			await getUserData();
		}
		init();
		window.addEventListener("hashchange",onHashChange);
		return () => {
			window.removeEventListener("hashchange",onHashChange);
		}
	},[]);

	let component;
	switch (url) {
		case "signup":
			component=<SignUp go={goUrl}  reloadHeader={reloadHeader}/>;
			break;
		case "login":
			component=<Login go={goUrl}  reloadHeader={reloadHeader}/>;
			break;
		default:
			switch (url) {
				case "":
					component=<Index go={goUrl}/>;
					break;
				case "profile":
					component=<Profile go={goUrl} reloadHeader={reloadHeader}/>;
					break;
				case "new":
					component=<New go={goUrl}/>;
					break;
				case url.startsWith("detail/")&&url:
					component=<Detail go={goUrl}/>;
					break;
				case url.startsWith("edit/")&&url:
					component=<Edit go={goUrl}/>;
					break;
				default:
					component=<Error go={goUrl}/>;
			}
			component=<>
				<Header go={goUrl} user={userData}/>
				{component}
			</>
	}
	return <>
		{component}
	</>;
}
ReactDOM.render(<Router/>, root);