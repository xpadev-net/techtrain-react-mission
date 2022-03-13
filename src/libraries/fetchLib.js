import Storage from "./storage";
const fetchLib = (url,options={}) => {
	if (options.auth){
		const token = Storage.get("token");
		if (typeof options.headers !== "object"){
			options.headers={}
		}
		options.headers["Authorization"]=`Bearer ${token}`;
		console.log(options);
		return fetch(url,options);
	}
	return fetch(url,options);
};
export default fetchLib;