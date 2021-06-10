"use strict";
var sortRuntime = document.getElementById('sort-runtime');
var sortLengthText = document.getElementById('sort-length');
var canvasBannerDif = 20;
var canvasObjectColors = [
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
var resetCanvas = function () {
    if (canvasCtx) {
        isDragging = false;
        initialPinchDistance = null;
        cameraOffset = { x: width / 2, y: height / 2 };
        dragStart = { x: 0, y: 0 };
        cameraZoom = 1;
        lastZoom = 1;
    }
};
