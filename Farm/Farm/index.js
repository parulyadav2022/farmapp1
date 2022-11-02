// For importing, core modules come before our own modules

const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
//*******************SYNCHRONOUS AND ASYNCHRONOUS FILE SYSTEM,CALLBACK HELL**************** */


//fs stands for file system
//Blocking synchronous code


// // Synchronous File Code
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log('Reading file');
// console.log(textIn);

// const textOut = `This is what we know about the avocados : ${textIn}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written !');

// //Non blocking asynchronous code
// //the error paramter is usually the first parameter

// //CREATING A CALLBACK HELL
// fs.readFile('./txt/startt.txt','utf-8',(err,data1)=>{
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile(`./txt/finall.txt`,`${data1}\n${data2}\n${data3}`,'utf-8',err=>{
//                 if(err) console.log('Operation failed');
//                 else console.log("All done !")
//             });
//         });
//     });
// });
// console.log('Will read file!');


//*************************CREATING A WEB SERVER************************* */


//createServer takes in a callback function, that gets triggered every time a new request hits our server
// server variable is the result of the method createServer

//data is a string that we convert into an object using JSON.parse
// const productData = JSON.parse(data);
//console.log(productData);

//NOTE : WE can use readFileSync here because we are in the top level code which is going to be execute just once.
const data = fs.readFileSync(`./dev-data/data.json`);
const dataObj = JSON.parse(data);

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');



const server = http.createServer((req,res)=>
{
    //console.log(url.parse(req.url,true)); , uncomment this to understand how we are fetching query and pathname from url

    //fetching query that is id of the product and the pathname from the URL
    
    const {query,pathname}= url.parse(req.url,true);
   

   //Overview page
   if(pathname==='/' || pathname==='/overview')
   {

       res.writeHead(200,{'Content-type':'text/html'});

       //join converts the array to a string
       const cardsHtml = dataObj.map(el => replaceTemplate(templateCard,el)).join('');
       const output = templateOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
       res.end(output);
   }

   //product page
   else if(pathname === '/product')
   {
       const product = dataObj[query.id];
       const output = replaceTemplate(templateProduct,product);
       res.writeHead(200,{'Content-type':'text/html'});
       res.end(output);
   }

   //API
   else if(pathname === '/api')
   {
       
           
           res.writeHead(200,{'Content-type':'application/json' });
            res.end(`Hey I am trying ${data}`);

      
   }

   //Not found
   else{
       res.writeHead(404,{
        'Content-type':'text/html',
        'my-own-header':'Yeah thats my own header'

       });
       res.end('<h1>Oops page not found !</h1>');
   }

});

//So now our server is created and now we can use that server to call listen
//listen(portNo,host,callback ) - portNo is usually 8000 or 30
// localHost is 127.0.0.1
//The callback function starts running as soon as the server starts listening

server.listen(30,'127.0.0.1',()=>
{
console.log('Listening to requests on port 8000');
})

//Now run node index.js and open the browser with 127.0.0.1:3000
//Hitting the URL 127.0.0.1:8000 is considered to be a request

//*************************ROUTING*************** */

//routing basically means implementing different actions for different URLS
// We can use express, but we will do here from scratch
/**the writeHead() is called to write the header of the response, that the application will serve to the client. 
The end() method both sends the content of the response to the client and signals to the server that the response
(header and content) has been sent completely.

You may find your header response in the Network tab

*/