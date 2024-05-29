import { ADVANCE_FILTER } from "@/redux/action/myteam/advanceFilterAction";

const initialState = {
  beforedate: "",
  afterdate: "",
  ownerIds: [],
  status: "",
  jobtype : "",
  advanceFilterClick: false
};

const advanceFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADVANCE_FILTER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default advanceFilterReducer;
