const readline = require ('readline-sync');

let a = parseInt(readline.question("Digite um numero: "));
let b = parseInt(readline.question("Digite outro numero: "));

if(a > b){
    console.log("primeiro");
} else {
    console.log("segundo");
}