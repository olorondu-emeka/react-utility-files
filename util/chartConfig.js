export let returnDataSet = (theLabel, dataArray, backgroundColorArray, borderColorArray, theBorderWidth) => {
    return {
        label: theLabel,  // this is the label for each data set
        data: dataArray,
        backgroundColor: backgroundColorArray,
        borderColor: borderColorArray,
        borderWidth: theBorderWidth
    };
};


export const returnData = (labelsArray, datasetsArray) =>{
    return {
        labels: labelsArray,   // these are the main labels for the x-axis
        datasets: datasetsArray  // these are the different datasets,
                                // each a representation of the returnDataSet object above
    }
};


