import { createSlice, createAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        _id: "",
        hoots: [],
        createdAt: new Date(),
        bio: "",
        ua: "",
        email: "",
        username: ""
    },

    reducers: {
        // Will be typically set on load of site, set user values
        setUser: (state, { payload }) => {
            Object.assign(state, payload);
        },

        // Add Hoot to user's hoot array
        addHoot: (state, { payload }) => {

        },

        // Update user's bio
        updateBio: (state, { payload }) => {

        },

        // Update user's useragent
        updateUseragent: (state, { payload }) => {

        },

        // Update user's email
        updateEmail: (state, { payload }) => {

        },

        // Update user's username
        udpateUsername: (state, { payload }) => {

        }
    }
});

export const setUser = createAction<any>("user/setUser");
export const addHoot = createAction<any>("user/addHoot");
export const updateBio = createAction<any>("user/updateBio");
export const updateUseragent = createAction<any>("user/updateUseragent");
export const updateEmail = createAction<any>("user/updateEmail");
export const updateUsername = createAction<any>("user/updateUsername");

export default userSlice.reducer;