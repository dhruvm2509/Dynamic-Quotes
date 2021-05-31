const http = require('http')
const fs = require('fs')
const requests = require('requests')

var indexData = fs.readFileSync("index.html","utf-8");

const replaceVal = (tempVal,oriData) => {
    let random = Math.floor(Math.random()*oriData.length);
    // console.log(oriData[random].text);
    let quote = tempVal.replace("{%quote%}",oriData[random].text)

    if(oriData[random].author == null)
    {quote = quote.replace("{%author%}","Unknown")}
    else{
        quote = quote.replace("{%author%}",oriData[random].author)
    }

    return quote;

}
const server = http.createServer((req,res) => {
    if(req.url=='/'){
        api = "https://type.fit/api/quotes";
        requests(api)        
        .on("data",(chunk)=>{
            const orgData = JSON.parse(chunk)
            const arrData = [orgData];
            const realtimeData = arrData.map((val) => replaceVal(indexData,val)).join("");
            res.write(realtimeData);
        })
        .on("end",(err) => {
            if(err){
                console.log("Data not found");
            }
            
        })
    }
}).listen(8000,"127.0.0.1")