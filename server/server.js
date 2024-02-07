const http = require('http');



const port = 5000;

const server=http.createServer((err,res)=>{
  console.log("request made");
})
server.listen(port, () => {
    console.log('Server listening on port 5000');
  });
  