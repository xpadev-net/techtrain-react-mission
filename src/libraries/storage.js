const STORAGE_PREFIX = "techtrain-react-mission";
const Storage = {
	get:(key)=>{
		return localStorage.getItem(`${STORAGE_PREFIX}_${key}`) || false;
	},
	set:(key,data)=>{
		if (typeof data == 'object'){
			data = JSON.stringify(data);
		}
		localStorage.setItem(`${STORAGE_PREFIX}_${key}`,data);
	},
	remove:(key)=>{
		localStorage.removeItem(`${STORAGE_PREFIX}_${key}`);
	}
}
export default Storage;