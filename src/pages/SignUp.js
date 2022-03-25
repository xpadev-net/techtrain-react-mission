import React, {useEffect, useState} from 'react';
import Storage from "../libraries/storage";
import fetchLib from "../libraries/fetchLib";
const SignUp = (props) => {
	const [username,setUsername] = useState(""),
		[email,setEmail] = useState(""),
		[password,setPassword] = useState(""),
		[msg,setMsg] = useState(""),
		[init,setInit] = useState(false);
	useEffect(()=>{
		const init = async()=>{
			const req = await fetchLib('https://api-for-missions-and-railways.herokuapp.com/users',{auth:true});
			let res = await req.text();
			try{
				res = JSON.parse(res);
			}catch (e) {
				setInit(true);
				return
			}
			if (!res.ErrorCode){
				props.reloadHeader();
				props.go("/");
				return
			}
			setInit(true);
		}
		init();
	},[]);
	const reg = async() => {
		const req = await fetch('https://api-for-missions-and-railways.herokuapp.com/users',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"name":username,"email":email,"password":password})
		});
		const res = await req.json();
		if (res.ErrorCode){
			setMsg(res.ErrorMessageJP);
			return;
		}
		Storage.set("token",res.token);
		Storage.set("username",username);
		props.reloadHeader();
		props.go("/");
	}
	if (!init){
		return <h1>loading...</h1>;
	}
	return <>
		<h1>Sign Up</h1>
		<p>{msg}</p>
		<table>
			<tbody>
				<tr>
					<th>username</th>
					<td><input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/></td>
				</tr>
				<tr>
					<th>email</th>
					<td><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/></td>
				</tr>
				<tr>
					<th>password</th>
					<td><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></td>
				</tr>
				<tr>
					<th colSpan={2}>
						<button onClick={()=>reg()}>SignUp</button>
					</th>
				</tr>
			</tbody>
		</table>
		<a onClick={()=>props.go("/login")}>Login</a>
	</>;
}
export default SignUp;