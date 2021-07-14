function myTemplate(id, data) {
    var str = document.getElementById(id).innerHTML;
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/;
    return repleaceStr(str, pattern, data);
}

function repleaceStr(str, pattern, data) {
    var reslut = null
    while (reslut = pattern.exec(str)) {
        str = str.replace(reslut[0], data[reslut[1]])
    }
    return str;
}