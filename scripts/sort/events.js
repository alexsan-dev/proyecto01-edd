"use strict";
var globalSortData = [4, 1, 6, 2, 7, 3, 8, 9, 5];
var onChangeSortLoad = function (ev) {
    var input = ev.target;
    var file = input.files ? input.files[0] : null;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var json = JSON.parse(typeof text === 'string' ? text : '{}');
        globalSortData = json.data;
    };
    if (file)
        reader.readAsText(file);
};
