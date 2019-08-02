import * as actionTypes from "../actionTypes";

const initialState = {
    totalStudents: null,
    finalYearStudents: null,
    monthChartData: {},
    yearChartData: {},
    cumulChartData: {},
    yearsArray: [],
    busContentLoading: true
};

const churchReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CHURCH_ADMIN:
            return {};

        case actionTypes.INITIALIZE_CHURCH_DASHBOARD:
            return {
                ...state,
                ...action.dashboardData
            };

        case actionTypes.LOAD_BUS_DATA:
            return {
                ...state,
                ...action.busData
            };

        default:
            return state;
    }
};

export default churchReducer;