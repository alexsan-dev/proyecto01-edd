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
canvasBannerDif = 20;
var globalSortData = [
    4, 1, 13, 2, 15, 3, 8, 9, 5, 11, 14, 6, 18, 12, 7,
];
var globalCopySortData = __spreadArray([], globalSortData);
var globalSortLength = globalSortData.length;
var sortBarWidth = (BAR_WIDTH / globalSortLength) * 100;
var maxSortDataValue = Math.max.apply(Math, globalSortData);
var sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue);
var fontSize = 20;
var codeDataArray = document.getElementById('code-data-array');
var sortStepText = document.getElementById('sort-step-text');
var sortPerformance = document.getElementById('sort-performance');
var sortBanner = document.getElementById('sort-banner');
var startButton = document.getElementById('start-btn');
var sortMethod = function () { return null; };
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
        if (globalSortLength > 0 && globalSortLength <= 10)
            fontSize = 25;
        else if (globalSortLength > 15 && globalSortLength <= 30)
            fontSize = 17;
        else if (globalSortLength > 30 && globalSortLength <= 50)
            fontSize = 13;
        else
            fontSize = 10;
        if (sortLengthText)
            sortLengthText.textContent = globalSortLength.toString();
        if (codeDataArray)
            codeDataArray.textContent = json.data.join(', ');
        if (sortStepText)
            sortStepText.textContent = '0';
        if (sortPerformance)
            sortPerformance.textContent = '0%';
        removeBanner();
        setSortRuntime();
    };
    if (file)
        reader.readAsText(file);
};
drawInCanvas = function () {
    if (canvasCtx) {
        canvasCtx.clearRect(0, 0, width, height);
        for (var barIndex = 0; barIndex < globalSortLength; barIndex++) {
            canvasCtx.fillStyle =
                canvasObjectColors[barIndex > canvasObjectColors.length - 1
                    ? barIndex -
                        canvasObjectColors.length *
                            Math.floor(barIndex / canvasObjectColors.length)
                    : barIndex];
            var rectX = sortBarWidth * barIndex + BAR_MARGIN * (barIndex + 1) - width / 2 + 20;
            var rectY = -(sortBarHeight * globalSortData[barIndex]) + 138;
            var rectH = sortBarHeight * globalSortData[barIndex];
            canvasCtx.fillRect(rectX, rectY, sortBarWidth, rectH);
            canvasCtx.fillStyle = '#fff';
            canvasCtx.font = "bold " + fontSize + "px Montserrat";
            canvasCtx.textAlign = 'center';
            canvasCtx.textBaseline = 'middle';
            canvasCtx.fillText(globalSortData[barIndex].toString(), rectX + sortBarWidth / 2, 160);
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
var removeBanner = function () {
    if (startButton && sortBanner) {
        setTimeout(function () {
            var btnRect = startButton.getBoundingClientRect().bottom;
            var bannerRect = sortBanner.getBoundingClientRect().top + 24;
            if (btnRect - bannerRect > canvasBannerDif)
                sortBanner.style.display = 'none';
        }, 100);
    }
};
removeBanner();
setSortRuntime();
