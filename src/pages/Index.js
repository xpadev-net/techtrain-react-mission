import React, {useEffect, useState} from 'react';
import Storage from "../libraries/storage";
import Styles from '../Styles/index.module.scss';
import Loading from "../Styles/loading.module.scss";
import fetchLib from "../libraries/fetchLib";
const Index = (props) => {
	const [list,setList] = useState([]),
		[offset,setOffset] = useState(0),
		[loading,setLoading] = useState(false);
	const getList = async(offset=0) => {
		const req = async(usePublic=false,offset=0) => {
			const req = await fetchLib(`https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/${usePublic?"public/":""}books?offset=${offset}`,{auth:!usePublic});
			let res = await req.text();
			try{
				res = JSON.parse(res);
			}catch (e) {
				return `${req.status}`;
			}
			return res.ErrorCode||res;
		}
		let data=[];
		if (Storage.get("token")){
			data = await req(false,offset);
			switch (data) {
				case "400":
				case "500":
					return false;
				case "403":
				case "401":
					Storage.remove("token");
					props.go('/login');
					break;
				default:
					setOffset(offset+10);
					if (data.length<10){
						setOffset(-1);
					}
					return data;
			}
		}
		data = await req(true,offset);
		switch (data) {
			case "400":
			case "500":
			case "403":
				return false;
			default:
				setOffset(offset+10);
				if (data.length<10){
					setOffset(-1);
				}
				return data;
		}
	}
	useEffect(()=>{
		const init = async()=>{
			setLoading(true);
			setList(await getList(0));
			setLoading(false);
		}
		init();
	},[]);
	if (!list){
		return <>
			<h1>データの取得に失敗しました</h1>
		</>
	}
	return <div className={Styles.wrapper}>
		{loading? <div className={Loading.bar}>
			<div/>
		</div>:""}
		{list.map((data,key)=>{
			return <div className={Styles.item} key={key}>
				<h2 onClick={()=>{props.go(`/detail/${data.id}`)}}>{data.title}</h2>
				{data.isMine?<div className={Styles.button} onClick={()=> {
					props.go(`/edit/${data.id}`)
				}}>編集</div>:""}
			</div>
		})}
		{offset<0?<p>これ以上はありません</p>:<button onClick={async()=>{
			setLoading(true);
			setList([...list,...await getList(offset)]);
			setLoading(false);
		}} disabled={loading}>load more</button>}
	</div>;
}
export default Index;