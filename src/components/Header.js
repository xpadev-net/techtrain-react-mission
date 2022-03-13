import React, {useEffect, useState} from 'react';
import fetchLib from "../libraries/fetchLib";
import Storage from "../libraries/storage";
import Styles from '../Styles/Header.module.scss';
const Header = (props) => {
	const [header,setHeader] = useState(<div/>);
	useEffect(()=>{
		const init = async() => {
			const req = await fetchLib('https://api-for-missions-and-railways.herokuapp.com/users',{auth:true});
			let res = await req.text();
			let error = false;
			try{
				res = JSON.parse(res);
			}catch (e) {
				error = true;
			}
			if (res.ErrorCode||error){
				setHeader(<div>
					<button onClick={()=>props.go("/login")}>login</button>
					<button onClick={()=>props.go("/signup")}>signup</button>
				</div>)
			}else{
				setHeader(<div className={Styles.account}>
					<span className={Styles.name}>{res.name}</span>
					<div className={Styles.dropdown}>
						<div onClick={()=>{props.go("/profile")}}>profile</div>
						<div onClick={()=>{Storage.remove("token");props.go("/login")}}>logout</div>
					</div>
				</div>)
			}
		}
		init();
	},[])
	return <div className={Styles.Header}>
		<div className={Styles.left}>
			<div onClick={()=>{props.go("/")}} className={Styles.title}>Techtrain Railway Mission</div>
		</div>
		{header}
	</div>;
}
export default Header;