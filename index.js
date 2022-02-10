const chalk=require('chalk')
const port=3000
const {addNote, getNotes}=require('./notes.controller')

const express=require('express')
const app=express()

app.set('view engine', 'ejs')
app.set('views','pages')

app.use(express.urlencoded({
    extended:true
})) // метод use добавляет дп функционал.middleware, дополнит плагины экспресса

app.get('/',async(req,res)=>{
    await res.render('index',{
        title:'Express App',
        notes:await getNotes()
    })
})
app.post('/',async (req,res)=>{
    await addNote(req.body.title)
        res.render( 'index.ejs',{
            title:'Express App',
            notes:await getNotes()
        })
})

app.listen(port,()=>{
    console.log(chalk.green(`Server has been started on port ${port}`))
})