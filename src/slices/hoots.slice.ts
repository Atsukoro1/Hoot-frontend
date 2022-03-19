import { createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

// Create a new axios instance to send requests with
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

const hootsSlice = createSlice({
    name: "hoots", 
    initialState: [],
    reducers: {
        // Rewrite whole Hoot state and set new value
        setHoots: (state, { payload }) => {
            Object.assign(state, payload);
        },

        // Add specific value to Hoot state
        add: (state, { payload }) => {
            // @ts-ignore
            state.unshift(payload)
            state.pop();
        },

        // Remove specific Hoot from state
        remove: (state, { payload }) => {
            // @ts-ignore
            state.splice(state.indexOf(state.find((el : any) => el._id === payload)), 1)
        },

        // Edit value in specific Hoot
        editContent: (state, { payload }) => {
            // @ts-ignore
            state[state.indexOf(state.find((el : any) => el._id === payload.id))].textContent = payload.content;
        },

        // Edit hashtags in specific Hoot
        editHashtags: (state, { payload }) => {
        },

        // React to specific Hoot
        react: (state, { payload }) => {
            // @ts-ignore
            const method = state.find((el : any) => el._id === payload.hootId.toString())?.hearts?.find((he : any) => he === payload.userId.toString()) ? "DELETE" : "PUT";
            // @ts-ignore
            const index = state.indexOf(state.find((el : any) => el._id === payload.hootId.toString()));

            (async function() {
                const req = await axiosInstance({
                    method: method, 
                    url: "/api/hoots/reactions",
                    data: { id: payload.hootId } 
                });
    
                if(!req.data.success) return;
            }());

            if(method === "PUT") {
                // @ts-ignore
                state[index].hearts.push(payload.userId);
            } else {
                // @ts-ignore
                state[index].hearts.splice(state[index].hearts.indexOf(payload.userId), 1);
            }
        },

        // Add specific post to user's bookmarks
        bookmark: (state, { payload }) => {
            (async function() {
                const response = await axiosInstance.post("/api/user/@me/bookmarks?id=" + payload.id);
                console.log(response);
            }());
        }
    }
});

export const setHoots = createAction<any>("hoots/setHoots");
export const add = createAction<any>("hoots/add");
export const remove = createAction<any>("hoots/remove");
export const editContent = createAction<any>("hoots/editContent");
export const editHashtags = createAction<any>("hoots/editHashtags");
export const react = createAction<any>("hoots/react");
export const bookmark = createAction<any>("hoots/bookmark");

export default hootsSlice.reducer;