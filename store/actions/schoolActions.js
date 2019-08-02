import * as actionTypes from '../actionTypes';

export const loadSchoolAdmin = (theAdmin) => {
    return {
        type: actionTypes.SET_SCHOOL_ADMIN,
        schAdmin: theAdmin
    };
};

export const initializeDashboardData = (dataMap) => {
    return {
        type: actionTypes.INITIALIZE_DASHBOARD_DATA,
        dashboardData: {
            birthdaysArray: dataMap.get('birthdaysArray'),
            monthChartData: dataMap.get('monthChartData'),
            totalStudents: dataMap.get('totalStudents'),
            finalYearStudents: dataMap.get('finalYearStudents'),
            birthdaysToday: dataMap.get('birthdaysToday')
        },
        busStatsChanged: false
    }
};

export const busStatsChanged = () => {
   return {
       type: actionTypes.BUS_STATS_CHANGED,
       busStatsChanged: true
   }
};

export const loadSchoolAdmins = (theAdmins) => {
    return {
        type: actionTypes.LOAD_SCHOOL_ADMINS,
        schoolAdmins: theAdmins,
        schoolAdminsLoading: false
    }
};