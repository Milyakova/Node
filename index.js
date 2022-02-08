const yargs=require('yargs')
const {addNote,removeNote, printNotes}=require('./notes.controller')

yargs.command({
    command:"add",
    describe:'add new note to list',
    builder:{
        title:{
            type:'string',
            describe:'Note title',
            demandOption:true
        }
    },
    async handler({title}){
       await addNote(title)
    }
})
yargs.command({
    command:"remove",
    describe:'remove note from list',
    builder:{
        id:{
            type:'string',
            describe:'Note id',
            demandOption:true
        }
    },
    async handler({id}){
        await removeNote(id)
    }
})


yargs.command({
    command:"list",
    describe:'print all notes',
    async handler(){
       await printNotes()

    }
})

yargs.parse()