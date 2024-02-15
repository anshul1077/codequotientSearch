const fs= require('fs');
const http = require('http');
const url = require('url');
let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

http.createServer((req,res)=>{
    let { query, pathname: path } = url.parse(req.url, true);
    if(path=='/'){
        let filteredProducts = products;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filteredProducts));
    }
    else if(path=='/products'&& req.method=='GET'){
        let filteredProducts = products;

        if(query.category){
            filteredProducts = products.filter((ele)=>{
                return ele.category === query.category;
            })
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filteredProducts));
    }

    else if(path=='/filterproducts' && req.method=='GET'){
        let filteredProducts = products;
        
        if(query.category && query.price){
            filteredProducts = products.filter((ele)=>{
                return ele.category === query.category && ele.price >= query.price;
            })
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filteredProducts));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}).listen(3001);