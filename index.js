const http=require('http')
const chalk=require('chalk')
const port=3000
const fs=require('fs/promises')
const path=require('path')
const basePath=path.join(__dirname,'pages')
const {addNote}=require('./notes.controller')

const server=http.createServer(async(req,res)=>{
    if (req.method==='GET'){
        const content=await fs.readFile(path.join(basePath, 'index.html'))
        // console.log(content.toString('utf-8'))
        // res.setHeader('Content-Type', 'text/html')
        // res.setHeader('Content-Type', 'text/plain') html-верстка
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(content)
    }else if (req.method==='POST'){
        const body=[]
        res.writeHead(200,{
            'Content-Type':'text/plain; charset=utf-8'
        })
        req.on('data',data=>{
            body.push(Buffer.from(data))
        })
        req.on('end',()=>{
            const title=body.toString().split('=')[1].replaceAll('+',' ')
            addNote(title)
            res.end(`Post success with title=${title}`)
        })

    }

})
server.listen(port,()=>{
    console.log(chalk.green(`Server has been started on port ${port}`))
})