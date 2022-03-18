import { configureStore } from "@reduxjs/toolkit";

// Reducers
import hootsReducer from "./hoots.slice";
import userReducer from "./user.slice";

// Create store
export default configureStore({
    reducer: {
        user: userReducer,
        hoots: hootsReducer
    }
});