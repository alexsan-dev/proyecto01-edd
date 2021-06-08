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
var runningSortAnimation = false;
var globalSortData = [
    4, 1, 13, 2, 15, 3, 8, 9, 5, 11, 14, 6, 18, 12, 7,
];
var globalCopySortData = __spreadArray([], globalSortData);
var globalSortLength = globalSortData.length;
var sortBarWidth = (BAR_WIDTH / globalSortLength) * 100;
var maxSortDataValue = Math.max.apply(Math, globalSortData);
var sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue);
var barColors = [
    '#ffd280',
    '#ffb1a3',
    '#5e81f4',
    '#8fc7ff',
    '#9ba0fc',
    '#5e81f4',
    '#ffae33',
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
            canvasCtx.fillRect(sortBarWidth * barIndex + BAR_MARGIN * (barIndex + 1) - width / 2 + 20, -(sortBarHeight * globalSortData[barIndex]) + 150, sortBarWidth, sortBarHeight * globalSortData[barIndex]);
        }
    }
};
var startSorting = function (sortMethod) {
    sortMethod(globalSortData, function (newSortData, step) {
        var tmpSortData = __spreadArray([], newSortData);
        runningSortAnimation = true;
        setTimeout(function () {
            globalSortData = tmpSortData;
        }, step * VELOCITY);
    });
};
var restartSortedData = function () {
    resetCanvas();
    globalSortData = globalCopySortData;
};
var onChangeSortVelocity = function (ev) {
    var target = ev.target;
    console.log(+target.value);
    VELOCITY = +target.value;
};
