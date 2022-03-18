import { createSlice, configureStore } from "@reduxjs/toolkit";

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
        setUser: (state, action) => {

        },

        // Add Hoot to user's hoot array
        addHoot: (state, action) => {

        },

        // Update user's bio
        updateBio: (state, action) => {

        },

        // Update user's useragent
        updateUseragent: (state, action) => {

        },

        // Update user's email
        updateEmail: (state, action) => {

        },

        // Update user's username
        udpateUsername: (state, action) => {

        }
    }
});

export const { setUser, addHoot, updateBio, updateUseragent, updateEmail, udpateUsername } = userSlice.caseReducers;

export const user = configureStore({
    reducer: userSlice.reducer
});