import { configureStore } from "@reduxjs/toolkit";
import advanceFilterReducer from "../reducer/myteam/advanceFilterReducer";
import localFilterReducer from "../reducer/myteam/localFilterReducer";



const store = configureStore({
	reducer: {
		advanceFilter: advanceFilterReducer,
        localFilter : localFilterReducer
	},
});

export default store;
