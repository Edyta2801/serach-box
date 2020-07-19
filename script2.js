function addId(id) {
    return function iter(o) {
        if ('title' in o) {
            o.id = id++;
        }
        Object.keys(o).forEach(function (k) {
            Array.isArray(o[k]) && o[k].forEach(iter);
        });
    };
}

let data =('./data.json');

data.forEach(addId(1))
console.log(data);