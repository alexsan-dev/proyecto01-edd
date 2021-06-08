"use strict";
var canvas = document.getElementById('canvas');
var canvasCtx = canvas.getContext('2d');
var width = window.innerWidth - 60;
var height = window.innerHeight - 160;
var cameraOffset = {
    x: width / 2,
    y: height / 2,
};
var cameraZoom = 1;
var MAX_ZOOM = 5;
var MIN_ZOOM = 0.1;
var SCROLL_SENSITIVITY = 0.003;
var isDragging = false;
var dragStart = { x: 0, y: 0 };
var initialPinchDistance = null;
var lastZoom = cameraZoom;
var draw = function () {
    canvas.width = width;
    canvas.height = height;
    if (canvasCtx) {
        canvasCtx.translate(width / 2, height / 2);
        canvasCtx.scale(cameraZoom, cameraZoom);
        canvasCtx.translate(-width / 2 + cameraOffset.x, -height / 2 + cameraOffset.y);
        drawInCanvas();
        requestAnimationFrame(draw);
    }
};
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
var getEventLocation = function (event) {
    if (event.touches && event.touches.length == 1) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    else if (event.clientX && event.clientY) {
        return { x: event.clientX, y: event.clientY };
    }
    else
        return { x: 0, y: 0 };
};
var onCanvasPointerDown = function (event) {
    isDragging = true;
    dragStart.x = getEventLocation(event).x / cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(event).y / cameraZoom - cameraOffset.y;
};
var onCanvasPointerUp = function (_event) {
    isDragging = false;
    initialPinchDistance = null;
    lastZoom = cameraZoom;
};
var onCanvasPointerMove = function (event) {
    if (isDragging) {
        cameraOffset.x = getEventLocation(event).x / cameraZoom - dragStart.x;
        cameraOffset.y = getEventLocation(event).y / cameraZoom - dragStart.y;
    }
};
var handleCanvasTouch = function (event, singleTouchHandler) {
    if (event.touches.length == 1)
        singleTouchHandler(event);
    else if (event.type == 'touchmove' && event.touches.length == 2) {
        isDragging = false;
        handleCanvasPinch(event);
    }
};
var handleCanvasPinch = function (event) {
    event.preventDefault();
    var touch1 = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
    };
    var touch2 = {
        x: event.touches[1].clientX,
        y: event.touches[1].clientY,
    };
    var currentDistance = Math.pow((touch1.x - touch2.x), 2) + Math.pow((touch1.y - touch2.y), 2);
    if (initialPinchDistance == null)
        initialPinchDistance = currentDistance;
    else
        adjustCanvasZoom(null, currentDistance / initialPinchDistance);
};
var adjustCanvasZoom = function (zoomAmount, zoomFactor) {
    if (!isDragging) {
        if (zoomAmount)
            cameraZoom += zoomAmount;
        else if (zoomFactor)
            cameraZoom = zoomFactor * lastZoom;
        cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
        cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
    }
};
canvas.addEventListener('mousedown', function (event) {
    return onCanvasPointerDown(event);
});
canvas.addEventListener('touchstart', function (event) {
    return handleCanvasTouch(event, onCanvasPointerDown);
});
canvas.addEventListener('mouseup', onCanvasPointerUp);
canvas.addEventListener('touchend', function (event) {
    return handleCanvasTouch(event, onCanvasPointerUp);
});
canvas.addEventListener('mousemove', function (event) {
    return onCanvasPointerMove(event);
});
canvas.addEventListener('touchmove', function (event) {
    return handleCanvasTouch(event, onCanvasPointerMove);
});
canvas.addEventListener('wheel', function (event) {
    return adjustCanvasZoom(event.deltaY * SCROLL_SENSITIVITY);
});
draw();
