const http=require('http')
const chalk=require('chalk')
const port=3000
const server=http.createServer((req,res)=>{
    console.log('request method ', req.method)
    console.log('request url ', req.url)
    res.end('Hello from server, response was ended')
})
server.listen(port,()=>{
    console.log(chalk.green(`Server has been started on port ${port}`))
})