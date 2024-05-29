export const ADVANCE_FILTER = "ADVANCE_FILTER";

export const getAdvanceFilter = (data) => {
    return (dispatch) => {
        dispatch({ type: ADVANCE_FILTER,payload:data });

    }
};
