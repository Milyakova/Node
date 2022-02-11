const buttons=document.querySelectorAll('.buttons-group')

buttons.forEach(el=>el.addEventListener('click',event=>{
    if (event.target.dataset.type==="remove"){
        const id=event.target.dataset.id
        remove(id).then(()=>{
            console.log(event.target.closest('li'))
            event.target.closest('li').remove()
        })
        document.querySelector('.alert').innerText='Note has been deleted!'
    }
    if (event.target.dataset.type==="edit") {
        const id = event.target.dataset.id
        const text = prompt("ведите новое название")
        if (text) {
            edit(id, text).then(()=>{
                const p=document.createElement("p")
                p.innerText=text
                const parent=event.target.closest('li')
                parent.replaceChild(p, parent.querySelector('.note'));
            })
        }
        document.querySelector('.alert').innerText='Note has been edited!'
    }
}))

async function remove(id){
    await fetch(`/${id}`,{
        method:'DELETE'
    })
}

async  function edit(id, title){
    await fetch(`/${id}`,{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
}