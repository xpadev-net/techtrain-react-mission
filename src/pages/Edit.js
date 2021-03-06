import React, {useEffect, useState} from 'react';
import fetchLib from "../libraries/fetchLib";
import Error from "./Error";
import Loading from "../Styles/loading.module.scss";
const Edit = (props) => {
	const match = window.location.hash.match(/#\/edit\/(.+)/);
	if (!match)return <Error/>;
	const [title,setTitle] = useState(""),
		[url,setUrl] = useState(""),
		[detail,setDetail] = useState(""),
		[review,setReview] = useState(""),
		[msg,setMsg] = useState(""),
		[code,setCode] = useState(0),
		[loading,setLoading] = useState(true);
	const post = async() => {
		setLoading(true);
		const req = await fetchLib(`https://api-for-missions-and-railways.herokuapp.com/books/${match[1]}`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"title":title,"url":url,"detail":detail,"review":review}),
			auth:true
		});
		const res = await req.json();
		if (res.ErrorCode){
			setMsg(res.ErrorMessageJP);
		}
		setLoading(false);
	}
	const remove = async() => {
		setLoading(true);
		const req = await fetchLib(`https://api-for-missions-and-railways.herokuapp.com/books/${match[1]}`,{
			method: 'DELETE',
			auth:true
		});
		let res = await req.text();
		if (res===""){
			props.go("/");
		}else{
			try{
				res = JSON.parse(res);
			}catch (e){
				setMsg(e);
				setLoading(false);
			}

			if (res.ErrorCode){
				setMsg(res.ErrorMessageJP);
			}
			setLoading(false);
		}
	}
	useEffect(()=>{
		const init = async() => {
			const req = await fetchLib(`https://api-for-missions-and-railways.herokuapp.com/books/${match[1]}`,{auth:true});
			let res = await req.json();
			if(res.ErrorCode){
				setCode(res.ErrorCode);
				setMsg(res.ErrorMessageJP);
			}else{
				if (!res.isMine){
					setCode(404)
				}else{
					setTitle(res.title);
					setUrl(res.url);
					setDetail(res.detail);
					setReview(res.review);
				}
			}
			setLoading(false);
		}
		init();
	},[]);
	if (code===404){
		return <Error/>;
	}
	return <>
		{loading? <div className={Loading.bar}>
			<div/>
		</div>:""}
		<h1>????????????????????????</h1>
		<p>{msg}</p>
		<table>
			<tbody>
			<tr>
				<th>????????????</th>
				<td><input disabled={loading} type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/></td>
			</tr>
			<tr>
				<th>URL</th>
				<td><input disabled={loading} type="text" value={url} onChange={(e)=>setUrl(e.target.value)}/></td>
			</tr>
			<tr>
				<th>????????????</th>
				<td><textarea disabled={loading} cols="30" rows="10" value={detail} onChange={(e) => setDetail(e.target.value)}/></td>
			</tr>
			<tr>
				<th>????????????</th>
				<td><textarea disabled={loading} cols="30" rows="10" value={review} onChange={(e) => setReview(e.target.value)}/></td>
			</tr>
			</tbody>
		</table>
		<button onClick={()=>post()} disabled={loading}>??????</button>
		<button onClick={()=>remove()} disabled={loading}>??????</button>
	</>;
}
export default Edit;