import * as actionTypes from '../actionTypes'

const initialState = {
    birthdaysArray: [],
    monthChartData: {},
    totalStudents: null,
    finalYearStudents: null,
    birthdaysToday: 0,
    busStatsChanged: true,
    schoolAdmins: [],
    schoolAdminsLoading: true
};

const schoolReducer = (state = initialState, action) => {
     switch(action.type){
         case actionTypes.SET_SCHOOL_ADMIN:
             return {
                 ...state,
                 school_admin: { ...action.schAdmin }
             };
         case actionTypes.INITIALIZE_DASHBOARD_DATA:
             return {
                 ...state,
                 ...action.dashboardData,
                 busStatsChanged: action.busStatsChanged
             };

         case actionTypes.BUS_STATS_CHANGED:
             return {
                 ...state,
                 busStatsChanged: action.busStatsChanged
             };

         case actionTypes.LOAD_SCHOOL_ADMINS:
             return {
                 ...state,
                 schoolAdmins: action.schoolAdmins,
                 schoolAdminsLoading: action.schoolAdminsLoading
             };

         default:
             return state;
     }
};

export default schoolReducer;