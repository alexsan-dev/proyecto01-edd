"use strict";
var linearStructure = null;
var simple = true;
var linearStructureLength = 0;
var insertMode = 'start';
var repeatValues = true;
var newNodeValue = '';
var oldNodeValue = '';
canvasBannerDif = 135;
var editor = document.querySelector('.editor > pre > code');
var navBtns = document.querySelectorAll('.nav-btn');
var setLinearStructure = function (newLinearStructure, newSimple) {
    linearStructure = newLinearStructure;
    simple = newSimple;
    if (linearStructure) {
        linearStructure.insertar(1);
        linearStructure.insertar(2);
        linearStructure.insertar(3);
        linearStructure.insertar(4);
        linearStructure.insertar(5);
    }
    linearStructureLength = (linearStructure === null || linearStructure === void 0 ? void 0 : linearStructure.getTamaño()) || 5;
};
CanvasRenderingContext2D.prototype.arrow = function (x, y, distance, width, down, left, double) {
    var lineWidth = width || 4;
    this.lineWidth = lineWidth;
    this.moveTo(x, y);
    this.quadraticCurveTo(x + distance / 2, y + (distance / 2) * (down ? 1 : -1), x + distance, y);
    this.strokeStyle = this.fillStyle;
    this.stroke();
    if (!left || double) {
        this.beginPath();
        this.lineWidth = 1;
        if (!down) {
            this.moveTo(x + distance - 5, y + 5);
            this.lineTo(x + distance + 5, y - 5);
            this.lineTo(x + distance + 5, y + 5);
        }
        else {
            this.moveTo(x + distance + 5, y + 5);
            this.lineTo(x + distance - 5, y - 5);
            this.lineTo(x + distance + 5, y - 5);
        }
        this.stroke();
        this.fill();
        this.closePath();
    }
    if (left || double) {
        this.beginPath();
        this.lineWidth = 1;
        if (!down) {
            this.moveTo(x - 5, y - 5);
            this.lineTo(x + 5, y + 5);
            this.lineTo(x - 5, y + 5);
        }
        else {
            this.moveTo(x - 5, y + 5);
            this.lineTo(x + 5, y - 5);
            this.lineTo(x - 5, y - 5);
        }
        this.stroke();
        this.fill();
        this.closePath();
    }
};
fileUploadCallback = function (json) {
    console.log(json);
};
drawInCanvas = function () {
    if (canvasCtx) {
        canvasCtx.globalCompositeOperation = 'destination-over';
        for (var nodeIndex = 0; nodeIndex < linearStructureLength; nodeIndex++) {
            var nodeX = -579 + 150 * nodeIndex;
            canvasCtx.beginPath();
            canvasCtx.arc(nodeX, 0, 40, 0, 2 * Math.PI);
            canvasCtx.fillStyle = '#aaa';
            canvasCtx.strokeStyle =
                canvasObjectColors[nodeIndex > canvasObjectColors.length - 1
                    ? nodeIndex -
                        canvasObjectColors.length *
                            Math.floor(nodeIndex / canvasObjectColors.length)
                    : nodeIndex];
            canvasCtx.lineWidth = 7;
            canvasCtx.stroke();
            canvasCtx.fill();
            canvasCtx.closePath();
            if (linearStructure) {
                canvasCtx.font = 'bold 20px Montserrat';
                canvasCtx.textAlign = 'center';
                canvasCtx.fillText(linearStructure.obtener(nodeIndex).valor.toString(), nodeX, -50);
            }
            if (nodeIndex < linearStructureLength - 1) {
                canvasCtx.beginPath();
                canvasCtx.fillStyle = 'white';
                canvasCtx.arrow(nodeX + 5 + (simple ? 25 : 0), -1, simple ? 120 : 95, 4);
            }
            if (nodeIndex > 0 && !simple) {
                canvasCtx.beginPath();
                canvasCtx.fillStyle = 'white';
                canvasCtx.arrow(nodeX + 5 - 105, -1, 95, 4, true, true);
                canvasCtx.closePath();
            }
        }
    }
};
var saveNewNodeValue = function (ev) {
    var target = ev.target;
    newNodeValue = target.value;
};
var saveOldNodeValue = function (ev) {
    var target = ev.target;
    oldNodeValue = target.value;
};
var changeRepeatValues = function (ev) {
    var target = ev.target;
    repeatValues = target.checked;
};
var changeInsertMode = function (ev) {
    var target = ev.target;
    insertMode = target.value;
};
var addTestCode = function (method, value) {
    if (editor)
        editor.innerHTML =
            editor.innerHTML +
                ("\ndata.<strong style=\"color: var(--green)\">" + method + "</strong>(<strong style=\"color: var(--lightPurple)\">" + value + "</strong>)");
};
var addNode = function () {
    if (linearStructure && newNodeValue.length > 0) {
        var nodeOnStructure = linearStructure.buscar(newNodeValue);
        if (repeatValues || (!repeatValues && nodeOnStructure === null)) {
            if (insertMode === 'start')
                linearStructure.push(newNodeValue);
            else if (insertMode === 'end')
                linearStructure.insertar(newNodeValue);
            linearStructureLength = linearStructure.getTamaño();
            addTestCode(insertMode === 'start'
                ? 'push'
                : insertMode === 'end'
                    ? 'insertar'
                    : 'insertar', newNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
};
var removeNode = function () {
    if (linearStructure && oldNodeValue.length > 0) {
        var nodeOnStructure = linearStructure.buscar(oldNodeValue);
        if (nodeOnStructure !== null) {
            linearStructure.eliminar(oldNodeValue);
            linearStructureLength = linearStructure.getTamaño();
            addTestCode('eliminar', oldNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
};
var findNode = function () {
    if (linearStructure && oldNodeValue.length > 0) {
        var nodeOnStructure = linearStructure.buscar(oldNodeValue);
        if (nodeOnStructure !== null) {
            linearStructure.buscar(oldNodeValue);
            linearStructureLength = linearStructure.getTamaño();
            addTestCode('buscar', oldNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
};
var updateNode = function () {
    if (linearStructure && newNodeValue.length > 0 && oldNodeValue.length > 0) {
        var nodeOnStructure = linearStructure.buscar(oldNodeValue);
        var newNodeOnStructure = linearStructure.buscar(newNodeValue);
        if (nodeOnStructure !== null &&
            (repeatValues || (newNodeOnStructure === null && !repeatValues))) {
            linearStructure.actualizar(oldNodeValue, newNodeValue);
            linearStructureLength = linearStructure.getTamaño();
            addTestCode('actualizar', oldNodeValue + "," + newNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
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
