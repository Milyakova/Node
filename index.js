const chalk=require('chalk')
const port=3000
const path=require('path')
const basePath=path.join(__dirname,'pages')
const {addNote}=require('./notes.controller')

const express=require('express')
const app=express()
app.use(express.urlencoded({
    extended:true
})) // метод use добавляет дп функционал.middleware, дополнит плагины экспресса

app.get('/',(req,res)=>{
    res.sendFile(path.join(basePath, 'index.html'))
})
app.post('/',async (req,res)=>{
    await addNote(req.body.title)
        res.sendFile(path.join(basePath, 'index.html'))
}
    )

app.listen(port,()=>{
    console.log(chalk.green(`Server has been started on port ${port}`))
})