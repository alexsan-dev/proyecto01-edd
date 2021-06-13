"use strict";
var treeStructure = null;
var setTreeStructure = function (newTreeStructure) {
    treeStructure = newTreeStructure;
    if (treeStructure) {
        treeStructure.insertar(1);
        treeStructure.insertar(2);
        treeStructure.insertar(3);
        treeStructure.insertar(4);
        treeStructure.insertar(5);
    }
};
drawInCanvas = function () {
    if (canvasCtx) {
    }
};
