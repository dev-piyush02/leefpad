import { axiosObj } from "./helper";

export const signUp= (userData)=>{
    return axiosObj.post("/public/signup", userData, {withCredentials : true}).then((response)=> response.data);
};

export const addNote= (noteData)=>{
    return axiosObj.post("/public/add-note", noteData).then((response)=> response.data);
}

export const login= (noteData)=>{
    return axiosObj.post("/public/login", noteData, {withCredentials : true}).then((response)=> response.data);
}

export const logout= (noteData)=>{
    return axiosObj.post("/public/logout", {withCredentials : true}).then((response)=> response.data);
}