import React, {useEffect, useState} from 'react';
import fetchLib from "../libraries/fetchLib";
import Storage from "../libraries/storage";
import Loading from "../Styles/loading.module.scss";

const Profile = (props) => {
	const [init,setInit] = useState(false),
		[username, setUsername] = useState("loading..."),
		[msg,setMsg] = useState("");
	const initialize = async()=>{
		const req = await fetchLib('https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users',{auth:true});
		let res = await req.text();
		try{
			res = JSON.parse(res);
		}catch (e) {
			props.go("/login");
			return
		}
		if (res.ErrorCode){
			props.go("/login");
			return
		}
		setUsername(res.name);
		setInit(true);
	}
	useEffect(()=>{
		initialize();
	},[]);
	const update = async() => {
		setInit(false);
		const req = await fetchLib('https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"name":username}),
				auth:true
			})
		const res = await req.json();
		if (!res.ErrorCode){
			initialize();
			setMsg("更新しました");
			props.reloadHeader();
			return;
		}
		if (res.ErrorCode===403){
			Storage.remove("token");
			props.go("/login");
			return;
		}
		setMsg(res.ErrorMessageJP);
		setInit(true);

	}
	return <>
		{!init? <div className={Loading.bar}>
			<div/>
		</div>:""}
		<p>{msg}</p>
		<table>
			<tbody>
				<tr>
					<th>username</th>
					<td><input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} disabled={!init}/></td>
				</tr>
				<tr>
					<th colSpan={2}>
						<button onClick={()=>update()} disabled={!init}>save</button>
					</th>
				</tr>
			</tbody>
		</table>
	</>;
}
export default Profile;