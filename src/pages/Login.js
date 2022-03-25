import React, {useEffect, useState} from 'react';
import Storage from "../libraries/storage";
import fetchLib from "../libraries/fetchLib";
const Login = (props) => {
	const [email,setEmail] = useState(""),
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
	const log = async() => {
		const req = await fetch('https://api-for-missions-and-railways.herokuapp.com/signin',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"email":email,"password":password})
		});
		const res = await req.json();
		if (res.ErrorCode){
			setMsg(res.ErrorMessageJP);
			return;
		}
		Storage.set("token",res.token);
		props.reloadHeader();
		props.go("/");
	}
	if (!init){
		return <h1>loading...</h1>;
	}
	return <>
		<h1>Login</h1>
		<p>{msg}</p>
		<table>
			<tbody>
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
						<button onClick={()=>log()}>Login</button>
					</th>
				</tr>
			</tbody>
		</table>
		<a onClick={()=>props.go("/signup")}>Create Account</a>
	</>;
}
export default Login;