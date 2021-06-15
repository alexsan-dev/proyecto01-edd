"use strict";
var treeStructure = null;
var treeElementsLength = 7;
var maxTreeHeight = 0;
var setTreeStructure = function (newTreeStructure) {
    treeStructure = newTreeStructure;
    if (treeStructure) {
        treeStructure.insertar(1);
        treeStructure.insertar(2);
        treeStructure.insertar(3);
        treeStructure.insertar(4);
        treeStructure.insertar(5);
        treeStructure.insertar(6);
        treeStructure.insertar(7);
        maxTreeHeight = treeStructure.raiz.altura;
    }
};
drawInCanvas = function () {
    if (canvasCtx) {
        canvasCtx.translate(maxTreeHeight * -340, maxTreeHeight * -41);
        if (treeStructure) {
            var queue = [treeStructure.raiz];
            var levelCounter = 0;
            for (var treeHeighIndex = maxTreeHeight; treeHeighIndex > 0; treeHeighIndex--) {
                for (var treeXIndex = 0; treeXIndex < Math.pow(2, maxTreeHeight - treeHeighIndex); treeXIndex++) {
                    var node = queue.shift();
                    queue.push((node === null || node === void 0 ? void 0 : node.izquierdo) || null);
                    queue.push((node === null || node === void 0 ? void 0 : node.derecho) || null);
                    var isRight = treeXIndex % 2 === 1;
                    if (treeHeighIndex !== levelCounter) {
                        canvasCtx.restore();
                        canvasCtx.translate(Math.pow(2, treeHeighIndex) * 25, 0);
                        canvasCtx.save();
                        levelCounter = treeHeighIndex;
                    }
                    canvasCtx.strokeStyle =
                        canvasObjectColors[maxTreeHeight - treeHeighIndex];
                    canvasCtx.translate(Math.pow(2, treeHeighIndex) * 50, 0);
                    if (node) {
                        canvasCtx.beginPath();
                        canvasCtx.lineWidth = 5;
                        if (isRight) {
                            canvasCtx.moveTo(0, (maxTreeHeight - treeHeighIndex) * 100);
                            canvasCtx.lineTo(Math.pow(2, treeHeighIndex) * -25 + 10, (maxTreeHeight - treeHeighIndex) * 100 - 75);
                        }
                        else if (treeHeighIndex !== maxTreeHeight) {
                            canvasCtx.moveTo(0, (maxTreeHeight - treeHeighIndex) * 100);
                            canvasCtx.lineTo(Math.pow(2, treeHeighIndex) * 25 - 10, (maxTreeHeight - treeHeighIndex) * 100 - 75);
                        }
                        canvasCtx.stroke();
                        canvasCtx.closePath();
                        canvasCtx.beginPath();
                        canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)';
                        canvasCtx.lineWidth = 7;
                        canvasCtx.arc(0, (maxTreeHeight - treeHeighIndex) * 100, 25, 0, 2 * Math.PI);
                        canvasCtx.stroke();
                        canvasCtx.fill();
                        canvasCtx.closePath();
                        canvasCtx.beginPath();
                        canvasCtx.textAlign = 'center';
                        canvasCtx.textBaseline = 'middle';
                        canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc';
                        canvasCtx.font = "bold " + (20 - node.valor.toString().length * 2.5) + "px Montserrat";
                        canvasCtx.fillText(node.valor, treeHeighIndex > 1 ? 50 * (isRight ? 1 : -1) : 0, (maxTreeHeight - treeHeighIndex) * 100 +
                            (treeHeighIndex > 1 ? 0 : 50));
                        canvasCtx.closePath();
                    }
                }
            }
        }
    }
};
var addNodeOnTree = function () {
    if (treeStructure && newNodeValue.length > 0) {
        treeStructure.insertar(newNodeValue);
        maxTreeHeight = treeStructure.raiz.altura;
        setElementsLength(treeElementsLength + 1);
        addTestCode('insertar', newNodeValue);
        hideNavMenu(1);
        removeBanner();
    }
};
var removeNodeOnTree = function () {
    if (treeStructure && oldNodeValue.length > 0) {
        treeStructure.eliminar(oldNodeValue);
        maxTreeHeight = treeStructure.raiz.altura;
        setElementsLength(treeElementsLength - 1);
        addTestCode('eliminar', oldNodeValue);
        hideNavMenu(1);
        removeBanner();
    }
};
var updateNodeOnTree = function () {
    if (treeStructure && oldNodeValue.length > 0 && newNodeValue.length > 0) {
        treeStructure.actualizar(oldNodeValue, newNodeValue);
        maxTreeHeight = treeStructure.raiz.altura;
        addTestCode('actualizar', oldNodeValue + "," + newNodeValue);
        hideNavMenu(1);
        removeBanner();
    }
};
