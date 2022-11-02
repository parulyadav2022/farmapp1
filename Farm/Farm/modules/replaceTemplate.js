/** 
 * 
 * In node every file is treated as a module, be it index.js or replaceTemplate.js
 * In each module, we have access to a variable called as module and on there we can set the exports property.
 * 
*/

//Right now we just want to export this anonymous function
module.exports  = (temp,product)=>
{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output=output.replace(/{%QUANTITY%}/g,product.quantity);
    output=output.replace(/{%IMAGE%}/g,product.image);
    output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output=output.replace(/{%PRICE%}/g,product.price);
    output=output.replace(/{%DESCRIPTION%}/g,product.description);
    output=output.replace(/{%FROM%}/g,product.from);
    output=output.replace(/{%ID%}/g,product.id);

    if(!product.organic) output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
};

