// function addId(id) {
//     return function iter(o) {
//         if ('title' in o) {
//             o.id = id++;
//         }
//         Object.keys(o).forEach(function (k) {
//             Array.isArray(o[k]) && o[k].forEach(iter);
//         });
//     };
// }

// let data =('./data.json');

// data.forEach(addId(1))
// console.log(data);

var iterator = 0; // this is going to be your identifier

function addIdentifier(target){
  target.id = iterator;
  iterator++;
}

function loop(obj){

  for(let i in obj){

    var c = obj[i];

    if(typeof c === 'object'){

      if(c.length === undefined){

        //c is not an array
        addIdentifier(c);

      }

      loop(c);

    }

  }

}

loop(json);