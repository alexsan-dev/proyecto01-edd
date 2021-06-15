"use strict";
var treeStructure = null;
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
        canvasCtx.translate(maxTreeHeight * -340, maxTreeHeight * -37.5);
        if (treeStructure) {
            var queue = [treeStructure.raiz];
            var levelCounter = 0;
            for (var treeHeighIndex = maxTreeHeight; treeHeighIndex > 0; treeHeighIndex--) {
                for (var treeXIndex = 0; treeXIndex < Math.pow(2, maxTreeHeight - treeHeighIndex); treeXIndex++) {
                    var node = queue.shift();
                    queue.push((node === null || node === void 0 ? void 0 : node.izquierdo) || null);
                    queue.push((node === null || node === void 0 ? void 0 : node.derecho) || null);
                    var isLeft = treeXIndex % 2 === 1;
                    if (treeHeighIndex !== levelCounter) {
                        canvasCtx.restore();
                        canvasCtx.translate(Math.pow(2, treeHeighIndex) * 25, 0);
                        canvasCtx.save();
                        levelCounter = treeHeighIndex;
                    }
                    canvasCtx.font = 'bold 18px Montserrat';
                    canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#eee';
                    canvasCtx.strokeStyle =
                        canvasObjectColors[maxTreeHeight - treeHeighIndex];
                    canvasCtx.translate(Math.pow(2, treeHeighIndex) * 50, 0);
                    if (node) {
                        canvasCtx.fillText(node.valor, -50, (maxTreeHeight - treeHeighIndex) * 100);
                    }
                    if (node) {
                        canvasCtx.beginPath();
                        canvasCtx.lineWidth = 5;
                        if (isLeft) {
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
                        canvasCtx.lineWidth = 7;
                        canvasCtx.arc(0, (maxTreeHeight - treeHeighIndex) * 100, 25, 0, 2 * Math.PI);
                        canvasCtx.stroke();
                        canvasCtx.fill();
                        canvasCtx.closePath();
                    }
                }
            }
        }
    }
};
