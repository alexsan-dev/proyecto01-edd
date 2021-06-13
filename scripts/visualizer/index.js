"use strict";
var sortRuntime = document.getElementById('sort-runtime');
var sortLengthText = document.getElementById('sort-length');
var startButton = document.getElementById('start-btn');
var sortBanner = document.getElementById('sort-banner');
var navBtns = document.querySelectorAll('.nav-btn');
var canvasBannerDif = 20;
var VELOCITY = 200;
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
var fileUploadCallback = function () { };
var onChangeUploadInput = function (ev) {
    var input = ev.target;
    var file = input.files ? input.files[0] : null;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var json = JSON.parse(typeof text === 'string' ? text : '{}');
        fileUploadCallback(json);
    };
    if (file)
        reader.readAsText(file);
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
var setRuntimeText = function (ms) {
    if (sortRuntime)
        sortRuntime.textContent = ms.toFixed(3) + "ms";
};
var setElementsLength = function (length) {
    if (sortLengthText)
        sortLengthText.textContent = length.toString();
};
var inputsMenuSwitcher = Array.prototype.slice
    .call(navBtns)
    .map(function (element) {
    return element.previousElementSibling;
})
    .filter(Boolean);
navBtns.forEach(function (navElement, navIndex) {
    return navElement.addEventListener('click', function () {
        return inputsMenuSwitcher.forEach(function (inputElement, inpIndex) {
            if (navIndex !== inpIndex)
                inputElement.checked = false;
        });
    });
});
var hideNavMenu = function (index) {
    inputsMenuSwitcher.forEach(function (inputElement, inpIndex) {
        if (index === inpIndex)
            inputElement.checked = false;
    });
};
removeBanner();
