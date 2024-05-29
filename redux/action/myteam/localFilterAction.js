export const LOCAL_FILTER = "LOCAL_FILTER";

export const getlocalFilter = (data) => {
    return (dispatch) => {
        dispatch({ type: LOCAL_FILTER,payload:data });

    }
};
