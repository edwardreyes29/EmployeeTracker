// function helloWorld() {
//     return new Promise(resolve => {
//         resolve("Yay!")
//     });
// }
// async function msg() {
//     const msg = await helloWorld();
//     console.log(msg)
// }
// msg();

let hello = async () => { return "Hello" };
hello().then((value) => console.log(value))
// or 
hello().then(console.log)

const connection = require("./config/connection.js");
const cTable = require("console.table");


let funkYou = async () => {
    const rows = await connection.query('SELECT id, title FROM role ORDER BY role.id');
    console.log(rows);
    return rows;
}

funkYou().then((data) => {
    const table = cTable.getTable(data);
})