"use strict";
var linearStructure = null;
var linearStructureLength = 0;
var className = 'ListaSimple';
var isLikeStack = false;
var isCircular = false;
var isSimple = true;
var insertMode = 'end';
var repeatValues = true;
canvasBannerDif = 110;
var setLinearStructure = function (newLinearStructure, linearClassName, simple, circular, likeStack, insertModeType) {
    if (circular === void 0) { circular = false; }
    if (likeStack === void 0) { likeStack = false; }
    if (insertModeType === void 0) { insertModeType = 'end'; }
    linearStructure = newLinearStructure;
    className = linearClassName;
    insertMode = insertModeType;
    isLikeStack = likeStack;
    isCircular = circular;
    isSimple = simple;
    if (linearStructure) {
        linearStructure.insertar(1);
        linearStructure.insertar(2);
        linearStructure.insertar(3);
        linearStructure.insertar(4);
        linearStructure.insertar(5);
    }
    linearStructureLength = (linearStructure === null || linearStructure === void 0 ? void 0 : linearStructure.getTamaño()) || 5;
};
fileUploadCallback = function (json) {
    var valores = json.valores;
    if (linearStructure)
        for (var linearIndex = 0; linearIndex < linearStructureLength; linearIndex++)
            linearStructure.pop();
    linearStructureLength = 0;
    if (editor)
        editor.innerHTML = "<strong style=\"color:var(--monoConstIce)\">const</strong> data <i style='color:var(--graySoda)'>=</i> <strong style='color:var(--keywordSoda)'>new</strong> <strong style=\"color:var(--monoClassIce)\">" + className + "</strong><strong style=\"color:var(--gray)\">&#x3c;</strong><strong style=\"color:var(--monoNumberIce)\">number</strong><strong style=\"color:var(--gray)\">&#x3e;</strong>()\n";
    valores.forEach(function (valor) {
        newNodeValue = valor.toString();
        addNode();
    });
    setElementsLength(linearStructure ? linearStructure.getTamaño() : 0);
};
drawInCanvas = function () {
    if (canvasCtx) {
        canvasCtx.globalCompositeOperation = 'destination-over';
        for (var nodeIndex = 0; nodeIndex < linearStructureLength; nodeIndex++) {
            var nodeX = -579 + 150 * nodeIndex;
            if (isCircular && nodeIndex === 0 && !isSimple) {
                var nodeEndX = -530 + 150 * -1;
                canvasCtx.beginPath();
                canvasCtx.arc(nodeEndX, 0, 30, 0, 2 * Math.PI);
                canvasCtx.save();
                canvasCtx.globalAlpha = 0.5;
                canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#eee';
                canvasCtx.strokeStyle =
                    canvasObjectColors[linearStructureLength + 2 > canvasObjectColors.length - 1
                        ? linearStructureLength +
                            2 -
                            canvasObjectColors.length *
                                Math.floor(linearStructureLength / canvasObjectColors.length)
                        : linearStructureLength + 2];
                canvasCtx.lineWidth = 7;
                canvasCtx.stroke();
                canvasCtx.fill();
                canvasCtx.closePath();
                var nodeEndValue = linearStructure
                    ? linearStructure.obtener(linearStructureLength - 1).valor.toString()
                    : '';
                if (linearStructure) {
                    canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                    canvasCtx.font = "bold " + (20 - nodeEndValue.length * 0.5) + "px Montserrat";
                    canvasCtx.textAlign = 'center';
                    canvasCtx.fillText(nodeEndValue, nodeEndX, -50);
                }
                canvasCtx.restore();
            }
            canvasCtx.beginPath();
            if (!isLikeStack)
                canvasCtx.arc(nodeX, 0, 40, 0, 2 * Math.PI);
            canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#eee';
            canvasCtx.strokeStyle =
                canvasObjectColors[nodeIndex > canvasObjectColors.length - 1
                    ? nodeIndex -
                        canvasObjectColors.length *
                            Math.floor(nodeIndex / canvasObjectColors.length)
                    : nodeIndex];
            canvasCtx.lineWidth = 7;
            if (!isLikeStack) {
                canvasCtx.stroke();
                canvasCtx.fill();
            }
            else {
                canvasCtx.beginPath();
                canvasCtx.roundRect(nodeX - nodeX / 3.5 - 200, -40, 80, 80, 10);
                canvasCtx.stroke();
                canvasCtx.closePath();
                canvasCtx.fillRect(nodeX - nodeX / 3.5 - 200, -40, 80, 80);
            }
            canvasCtx.closePath();
            var nodeValue = linearStructure
                ? linearStructure.obtener(nodeIndex).valor.toString()
                : '';
            if (linearStructure) {
                canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                canvasCtx.font = "bold " + (20 - nodeValue.length * 0.5) + "px Montserrat";
                canvasCtx.textAlign = 'center';
                canvasCtx.fillText(nodeValue, isLikeStack ? nodeX - nodeX / 3.5 - 160 : nodeX, isLikeStack ? -55 : -50);
            }
            if ((nodeIndex < linearStructureLength - 1 ||
                (isCircular && nodeIndex === linearStructureLength - 1)) &&
                !isLikeStack) {
                var isCircularEnd = isCircular && nodeIndex === linearStructureLength - 1;
                canvasCtx.beginPath();
                if (isSimple || isCircular) {
                    canvasCtx.save();
                    if (isSimple) {
                        canvasCtx.scale(2, 2);
                        canvasCtx.translate(225, 0);
                    }
                    if (isCircularEnd)
                        canvasCtx.globalAlpha = 0.5;
                }
                canvasCtx.fillStyle = isDarkMode ? 'white' : '#bbb';
                canvasCtx.arrow((isSimple ? nodeX / 2 : nodeX) + 5 + (isSimple ? -215 : 0), -1, isSimple ? (isCircularEnd ? 36 : 60) : 95, 4);
                canvasCtx.closePath();
                if (isSimple || isCircular)
                    canvasCtx.restore();
            }
            if (isCircular && nodeIndex === linearStructureLength - 1) {
                var nodeRootX = -625 + 150 * (nodeIndex + 1);
                canvasCtx.beginPath();
                canvasCtx.arc(nodeRootX, 0, 30, 0, 2 * Math.PI);
                canvasCtx.save();
                canvasCtx.globalAlpha = 0.5;
                canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#eee';
                canvasCtx.strokeStyle =
                    canvasObjectColors[nodeIndex + 1 > canvasObjectColors.length - 1
                        ? nodeIndex +
                            1 -
                            canvasObjectColors.length *
                                Math.floor(nodeIndex / canvasObjectColors.length)
                        : nodeIndex + 1];
                canvasCtx.lineWidth = 7;
                canvasCtx.stroke();
                canvasCtx.fill();
                canvasCtx.closePath();
                var nodeRootValue = linearStructure
                    ? linearStructure.obtener(0).valor.toString()
                    : '';
                if (linearStructure) {
                    canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                    canvasCtx.font = "bold " + (20 - nodeRootValue.length * 0.5) + "px Montserrat";
                    canvasCtx.textAlign = 'center';
                    canvasCtx.fillText(nodeRootValue, nodeRootX, -50);
                }
                canvasCtx.restore();
            }
            if ((nodeIndex > 0 && !isSimple) ||
                (isCircular && nodeIndex === 0 && !isSimple)) {
                if (!isSimple || isCircular) {
                    canvasCtx.save();
                    if (isCircular && nodeIndex === 0) {
                        canvasCtx.globalAlpha = 0.5;
                        if (!isSimple) {
                            canvasCtx.scale(0.8, 0.8);
                            canvasCtx.translate(-170, 0);
                        }
                    }
                }
                canvasCtx.beginPath();
                canvasCtx.fillStyle = isDarkMode ? 'white' : '#bbb';
                canvasCtx.arrow(nodeX + 5 - 105, -1, 95, 4, true, true);
                canvasCtx.closePath();
                if (!isSimple || isCircular)
                    canvasCtx.restore();
            }
        }
    }
};
var changeRepeatValues = function (ev) {
    var target = ev.target;
    repeatValues = target.checked;
};
var changeInsertMode = function (ev) {
    var target = ev.target;
    insertMode = target.value;
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
            setElementsLength(linearStructureLength);
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
            setElementsLength(linearStructureLength);
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
            setElementsLength(linearStructureLength);
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
            setElementsLength(linearStructureLength);
            addTestCode('actualizar', oldNodeValue + "," + newNodeValue);
            hideNavMenu(1);
            removeBanner();
        }
    }
};
