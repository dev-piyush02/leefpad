import { axiosObj } from "./helper";

export const getAllNotes= ()=>{
    return axiosObj.get("/notes/view-notes", {withCredentials : true}).then((response)=> response.data);
};
