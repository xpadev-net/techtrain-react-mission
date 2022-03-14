import React from 'react';

const Error = () => {
	const goUrl = (url) => {
		window.location.hash=url;
	}
	return <>
		<h1>Something went wrong...</h1>
		<a onClick={()=>goUrl("/")}>back to top page</a>
	</>;
}
export default Error;