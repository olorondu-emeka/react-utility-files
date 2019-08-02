import * as actionTypes from "../actionTypes";

export const loadChurchAdmin = (theAdmin) => {
    return {
        type: actionTypes.SET_SCHOOL_ADMIN,
        churchAdmin: theAdmin
    };
};

export const initializeChurchData = (dataMap) => {
    return {
        type: actionTypes.INITIALIZE_CHURCH_DASHBOARD,
        dashboardData: {
            totalStudents: dataMap.get('totalStudents'),
            finalYearStudents: dataMap.get('finalYearStudents'),
            monthChartData: dataMap.get('monthChartData')
        }
    }
};

export const loadBusData = (dataMap) => {
    return {
        type: actionTypes.LOAD_BUS_DATA,
        busData: {
            monthChartData: dataMap.get('monthChartData'),
            yearChartData: dataMap.get('yearChartData'),
            cumulChartData: dataMap.get('cumulChartData'),
            yearsArray: dataMap.get('yearsArray'),
            busContentLoading: false
        }
    }
};