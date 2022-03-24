import React from 'react';
import Storage from "../libraries/storage";
import Styles from '../Styles/Header.module.scss';

const Header = (props) => {
	const res = props.user;
	return <div className={Styles.Header}>
		<div className={Styles.left}>
			<div onClick={() => {
				props.go("/")
			}} className={Styles.title}>Techtrain Railway Mission
			</div>
			<div className={Styles.nav}>
				<div onClick={() => {
					props.go("/new")
				}}>Post
				</div>
			</div>
		</div>
		{!res || res.ErrorCode ? <div>
			<button onClick={() => props.go("/login")}>login</button>
			<button onClick={() => props.go("/signup")}>signup</button>
		</div> : <div className={Styles.account}>
			<span className={Styles.name}>{res.name}</span>
			<div className={Styles.dropdown}>
				<div onClick={() => {
					props.go("/profile")
				}}>profile
				</div>
				<div onClick={() => {
					Storage.remove("token");
					props.go("/login")
				}}>logout
				</div>
			</div>
		</div>}
	</div>;
}
export default Header;