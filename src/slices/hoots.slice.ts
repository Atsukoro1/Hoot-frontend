import { createSlice, configureStore } from "@reduxjs/toolkit";

const hootsSlice = createSlice({
    name: "hoots", 
    initialState: [],
    reducers: {
        // Rewrite whole Hoot state and set new value
        set: (state : any, action : any) => {
            state = action.payload;
        },

        // Add specific value to Hoot state
        add: (state : any, action : any) => {
            state.push(action.payload);
        },

        // Remove specific Hoot from state
        remove: (state : any, action : any) => {
        },

        // Edit value in specific Hoot
        editContent: (state : any, action : any) => {
        },

        // Edit hashtags in specific Hoot
        editHashtags: (state : any, action : any) => {
        },

        // React to specific Hoot
        react: (state : any, action : any) => {

        },

        // Remove reaction from specific Hoot
        unreact: (state : any, action : any) => {

        }
    }
});

export const { set, add, remove, editContent, editHashtags, react, unreact } = hootsSlice.caseReducers;

export default hootsSlice.reducer;