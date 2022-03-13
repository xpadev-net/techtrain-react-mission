import React, {useState} from 'react';
const SignUp = () => {
	const [username,setUsername] = useState(""),
		[email,setEmail] = useState(""),
		[password,setPassword] = useState("");
	const reg = async() => {
		
	}
	return <>
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
						<button onClick={()=>reg}>SignUp</button>
					</th>
				</tr>
			</tbody>
		</table>
	</>;
}
export default SignUp;