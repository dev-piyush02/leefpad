import { axiosObj } from "./helper";

export const getAllNotes = () => {
    return axiosObj.get("/notes/view-notes", { withCredentials: true }).then((response) => response.data);
};

export const getNoteById = (noteId) => {
    return axiosObj.get(`/notes/view-note`, {
        headers: { noteId: noteId },
        withCredentials: true
    }).then((response) => response.data);
};
