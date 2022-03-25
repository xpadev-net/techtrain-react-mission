import React, {useEffect, useState} from 'react';
import Error from "./Error";
import fetchLib from "../libraries/fetchLib";
import Loading from "../Styles/loading.module.scss";
const detail = () => {
	const match = window.location.hash.match(/#\/detail\/(.+)/);
	if (!match)return <Error/>;
	const [data,setData] = useState(false);
	useEffect(()=>{
		const init = async() => {
			const req = await fetchLib(`https://api-for-missions-and-railways.herokuapp.com/books/${match[1]}`,{auth:true});
			let res = await req.json();
			if(res.ErrorCode){
				setData(-1);
			}else{
				setData(res);
			}
		}
		init();
	},[]);
	if (data===false){
		return <div className={Loading.bar}>
			<div/>
		</div>;
	}else if(data===-1){
		return <Error/>;
	}
	return <>
		<h1>{data.title}</h1>
		<table>
			<tbody>
				<tr>
					<th>URL</th>
					<td>{data.url}</td>
				</tr>
				<tr>
					<th>投稿者</th>
					<td>{data.reviewer}</td>
				</tr>
				<tr>
					<th>詳細情報</th>
					<td>{data.detail}</td>
				</tr>
				<tr>
					<th>レビュー</th>
					<td>{data.review}</td>
				</tr>
			</tbody>
		</table>
	</>;
}
export default detail;