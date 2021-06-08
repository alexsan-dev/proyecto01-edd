"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var BAR_MARGIN = 10;
var BAR_WIDTH = 5;
var BAR_HEIGHT = 300;
var VELOCITY = 200;
var globalSortData = [
    4, 1, 13, 2, 15, 3, 8, 9, 5, 11, 14, 6, 18, 12, 7,
];
var globalCopySortData = __spreadArray([], globalSortData);
var globalSortLength = globalSortData.length;
var sortBarWidth = (BAR_WIDTH / globalSortLength) * 100;
var maxSortDataValue = Math.max.apply(Math, globalSortData);
var sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue);
var codeDataArray = document.getElementById('code-data-array');
var sortStepText = document.getElementById('sort-step-text');
var sortRuntime = document.getElementById('sort-runtime');
var sortPerformance = document.getElementById('sort-performance');
var sortLengthText = document.getElementById('sort-length');
var sortMethod = function () { return null; };
var barColors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#009688',
    '#4CAF50',
    '#CDDC39',
    '#FFC107',
    '#FF5722',
];
var onChangeSortLoad = function (ev) {
    var input = ev.target;
    var file = input.files ? input.files[0] : null;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var json = JSON.parse(typeof text === 'string' ? text : '{}');
        globalCopySortData = json.data;
        globalSortData = json.data;
        globalSortLength = json.data.length;
        sortBarWidth = (BAR_WIDTH / json.data.length) * 100;
        maxSortDataValue = Math.max.apply(Math, json.data);
        sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue);
        if (sortLengthText)
            sortLengthText.textContent = globalSortLength.toString();
        if (codeDataArray)
            codeDataArray.textContent = json.data.join(', ');
        if (sortStepText)
            sortStepText.textContent = '0';
        if (sortPerformance)
            sortPerformance.textContent = '0%';
        setSortRuntime();
    };
    if (file)
        reader.readAsText(file);
};
var drawInCanvas = function () {
    if (canvasCtx) {
        canvasCtx.clearRect(0, 0, width, height);
        for (var barIndex = 0; barIndex < globalSortLength; barIndex++) {
            canvasCtx.fillStyle =
                barColors[barIndex > barColors.length - 1
                    ? barIndex -
                        barColors.length * Math.floor(barIndex / barColors.length)
                    : barIndex];
            canvasCtx.fillRect(sortBarWidth * barIndex + BAR_MARGIN * (barIndex + 1) - width / 2 + 20, -(sortBarHeight * globalSortData[barIndex]) + 138, sortBarWidth, sortBarHeight * globalSortData[barIndex]);
            canvasCtx.fillStyle = '#fff';
            canvasCtx.font = 'bold 20px Montserrat';
            canvasCtx.textAlign = 'center';
            canvasCtx.fillText(globalSortData[barIndex].toString(), sortBarWidth * barIndex +
                BAR_MARGIN * (barIndex + 1) -
                width / 2 +
                32 +
                sortBarWidth / 2 -
                canvasCtx.measureText(globalSortData[0].toString()).width, 160);
        }
    }
};
var startSorting = function () {
    sortMethod(globalSortData, function (newSortData, step) {
        var tmpSortData = __spreadArray([], newSortData);
        setTimeout(function () {
            globalSortData = tmpSortData;
            if (sortStepText)
                sortStepText.textContent = step.toString();
            if (sortPerformance)
                sortPerformance.textContent = ((globalSortLength / step) *
                    100).toFixed(2) + "%";
        }, step * VELOCITY);
    });
};
var setSortRuntime = function () {
    var t0 = performance.now();
    sortMethod(globalSortData);
    var tf = performance.now();
    if (sortRuntime)
        sortRuntime.textContent = (tf - t0).toFixed(3) + "ms";
};
var restartSortedData = function () {
    resetCanvas();
    globalSortData = globalCopySortData;
};
var onChangeSortVelocity = function (ev) {
    var target = ev.target;
    VELOCITY = 850 - +target.value;
};
setSortRuntime();
