import { LOCAL_FILTER } from "@/redux/action/myteam/localFilterAction";

const initialState = {
    ownerIds: [],
    epics: [],
    types: [],
    sort: ""
};

const localFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCAL_FILTER:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default localFilterReducer;
