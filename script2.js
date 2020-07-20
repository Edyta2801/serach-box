function addId(id) {
    return function iter(o) {
        if ('game' in o) {
            o.id = id++;
        }
        Object.keys(o).forEach(function (k) {
            Array.isArray(o[k]) && o[k].forEach(iter);
        });
    };
}

let obj;
let mydata;

// let data =('./data.json');
// let mydata =[
//   {
//     "game": "Athens",
//     "edition": "1896",
//     "sport": "Aquatics",
//     "competition": "Swimming",
//     "player": "HAJOS, Alfred",
//     "FIELD6": "HUN",
//     "FIELD7": "Men",
//     "FIELD8": "100m freestyle",
//     "FIELD9": "M",
//     "medal": "Gold"
//   },
//   {
//     "game": "Athens",
//     "edition": "1896",
//     "sport": "Aquatics",
//     "competition": "Swimming",
//     "player": "HERSCHMANN, Otto",
//     "FIELD6": "AUT",
//     "FIELD7": "Men",
//     "FIELD8": "100m freestyle",
//     "FIELD9": "M",
//     "medal": "Silver"
//   },
//   {
//     "game": "Athens",
//     "edition": "1896",
//     "sport": "Aquatics",
//     "competition": "Swimming",
//     "player": "DRIVAS, Dimitrios",
//     "FIELD6": "GRE",
//     "FIELD7": "Men",
//     "FIELD8": "100m freestyle for sailors",
//     "FIELD9": "M",
//     "medal": "Bronze"
//   },
//   {
//     "game": "Athens",
//     "edition": "1896",
//     "sport": "Aquatics",
//     "competition": "Swimming",
//     "player": "MALOKINIS, Ioannis",
//     "FIELD6": "GRE",
//     "FIELD7": "Men",
//     "FIELD8": "100m freestyle for sailors",
//     "FIELD9": "M",
//     "medal": "Gold"
//   }];

// fetch('./data.json')
//   .then(response => response.json())
//   .then(obj => console.log(obj))



//   const obj1 = [];
 
  
//   fetch("https://gist.githubusercontent.com/Edyta2801/c1c70068ae804044fedb493b3e5b6af6/raw/0fbf294ed4edfcddd61cf2bf7d7bf08a3aa8aa9a/gistfile1.txt")
//   .then(blob => blob.json())
//   // .then(data=>console.log(data));
//   .then(data => obj1.push(...data));

      

 
mydata.forEach(addId(1));
console.log(mydata);








// var iterator = 0; // this is going to be your identifier

// function addIdentifier(target){
//   target.id = iterator;
//   iterator++;
// }

// function loop(obj){

//   for(let i in obj){

//     var c = obj[i];

//     if(typeof c === 'object'){

//       if(c.length === undefined){

//         //c is not an array
//         addIdentifier(c);

//       }

//       loop(c);

//     }

//   }

// }

// loop(json);