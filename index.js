const chalk=require('chalk')
const port=3000
const path=require('path')
const {addNote, getNotes, removeNote, editNote}=require('./notes.controller')

const express=require('express')
const app=express()

app.set('view engine', 'ejs')
app.set('views','pages')
app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.urlencoded({
    extended:true
})) // метод use добавляет дп функционал.middleware, дополнит плагины экспресса
app.use(express.json())


app.get('/',async(req,res)=>{
    await res.render('index',{
        title:'Express App',
        notes:await getNotes(),
        created: false
    })
})
app.post('/',async (req,res)=>{
    console.log('req.body.title ',req.body.title)
    await addNote(req.body.title)
        res.render( 'index.ejs',{
            title:'Express App',
            notes:await getNotes(),
            created:true
        })
})
app.delete('/:id', async (req, res)=>{
    await removeNote(req.params.id)
     res.render( 'index.ejs',{
        title:'Express App',
        notes:await getNotes(),
        created:false
    })
})
app.put('/:id',async (req,res)=>{
    console.log(req.params.id,req.body.title)
    await editNote(req.params.id,req.body.title)
    res.render( 'index.ejs',{
        title:'Express App',
        notes:await getNotes(),
        created:false
    })
})

app.listen(port,()=>{
    console.log(chalk.green(`Server has been started on port ${port}`))
})