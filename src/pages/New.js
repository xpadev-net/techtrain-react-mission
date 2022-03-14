import React, {useState} from 'react';
import fetchLib from "../libraries/fetchLib";
const New = (props) => {
	const [title,setTitle] = useState(""),
		[url,setUrl] = useState(""),
		[detail,setDetail] = useState(""),
		[review,setReview] = useState(""),
		[msg,setMsg] = useState(""),
		[loading,setLoading] = useState(false);
	const post = async() => {
		setLoading(true);
		const req = await fetchLib('https://api-for-missions-and-railways.herokuapp.com/books',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"title":title,"url":url,"detail":detail,"review":review}),
			auth:true
		});
		const res = await req.json();
		if (res.ErrorCode){
			setMsg(res.ErrorMessageJP);
			setLoading(false);
		}else{
			props.go("/");
		}
	}
	return <>
		<h1>書籍レビュー追加</h1>
		<p>{msg}</p>
		<table>
			<tbody>
			<tr>
				<th>タイトル</th>
				<td><input disabled={loading} type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/></td>
			</tr>
			<tr>
				<th>URL</th>
				<td><input disabled={loading} type="text" value={url} onChange={(e)=>setUrl(e.target.value)}/></td>
			</tr>
			<tr>
				<th>詳細情報</th>
				<td><textarea disabled={loading} cols="30" rows="10" value={detail} onChange={(e) => setDetail(e.target.value)}/></td>
			</tr>
			<tr>
				<th>レビュー</th>
				<td><textarea disabled={loading} cols="30" rows="10" value={review} onChange={(e) => setReview(e.target.value)}/></td>
			</tr>
			</tbody>
		</table>
		<button onClick={()=>post()} disabled={loading}>投稿</button>
	</>;
}
export default New;