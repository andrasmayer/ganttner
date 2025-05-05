const now = new Date().toLocaleDateString("hu-Hu").split(". ").join("-").split(".").join("")
const dataElements = (obj) =>{
    for(let i=0; i< obj.data.length; i++){
        if(obj.data[i] == null){
            obj.data[i] =  {rowId:i, name:"",start:"",end:"",status:0,readyState:0,color:"#ccc",connections:[]}
        }
    }
    return obj.data
}

const colorpicker = (obj) =>{
    const rowColor = document.querySelectorAll(".row-color") 
    document.querySelectorAll('.row-color').forEach(cell => {
        const picker = new Picker({
            parent: cell,
            popup: 'bottom',
            onChange: (color) => {
                const id = parseInt(cell.parentNode.parentNode.getAttribute("id").split("row_").join(""))
                if(obj.data[id] != null){
                    obj.data[id].color = color.rgbaString
                    obj.drawElement(obj)
                    cell.style.backgroundColor = color.rgbaString;  // Az elem háttérszínét módosítja
                }
            }
        })
    })
}

export const tableEvents = (obj) =>{
    const rowName = document.querySelectorAll(".row-name") 
    const rowStart = document.querySelectorAll(".row-start") 
    const rowEnd = document.querySelectorAll(".row-end") 
    const rowStatus = document.querySelectorAll(".row-status") 
    const rowReadyState = document.querySelectorAll(".row-readyState") 
    const rowConnections = document.querySelectorAll(".row-connections") 
    rowName.forEach(itm=>{
        itm.addEventListener("keyup",()=>{  
            const id = parseInt(itm.parentNode.parentNode.getAttribute("id").split("row_").join(""))
            if(obj.data[id] == null){
                obj.data[id] = {rowId:id, name:"",start:now,end:now,status:0,readyState:0,color:"#ccc",connections:[]}
            }
            obj.data[id].name = itm.value
           

            obj.data = dataElements({data:obj.data,id:id})
            if(id == obj.data.length-1){
                obj.data.push({rowId:id+1, name:"",start:"",end:"",status:0,readyState:0,color:"#ccc",connections:[]})
                ////console.log("utolsó")
                //obj.data = dataElements({data:obj.data,id:id})
            }
            console.log(obj.data)

           // obj.drawTable(obj)
            obj.drawElement(obj)
           
        })
    })

    rowStart.forEach(itm=>{
        itm.addEventListener("change",()=>{
            const id = itm.parentNode.parentNode.getAttribute("id").split("row_").join("")
            if(obj.data[id] == null){
                obj.data[id] = {rowId:id, name:"",start:itm.value,end:itm.value,status:0,readyState:0,color:"#ccc",connections:[]}
            }
            obj.data[id].start = itm.value
            obj.data = dataElements({data:obj.data,id:id})
            obj.drawElement(obj)
        })
    })

    rowEnd.forEach(itm=>{
        itm.addEventListener("change",()=>{
            const id = itm.parentNode.parentNode.getAttribute("id").split("row_").join("")
            if(obj.data[id] == null){
                obj.data[id] = {rowId:id, name:"",start:itm.value,end:itm.value,status:0,readyState:0,color:"#ccc",connections:[]}
            }
            obj.data[id].end = itm.value
            obj.data = dataElements({data:obj.data,id:id})
            obj.drawElement(obj)
        })
    })

    rowStatus.forEach(itm=>{
        itm.addEventListener("change",()=>{
            const id = itm.parentNode.parentNode.getAttribute("id").split("row_").join("")
            if(obj.data[id] == null){
                obj.data[id] = {rowId:id, name:"",start:now,end:now,status:0,readyState:0,color:"#ccc",connections:[]}
            }
            obj.data[id].status = itm.value
            obj.data = dataElements({data:obj.data,id:id})
            obj.drawElement(obj)
        })
    })


    rowReadyState.forEach(itm=>{
        itm.addEventListener("keyup",()=>{
            const id = itm.parentNode.parentNode.getAttribute("id").split("row_").join("")
            if(obj.data[id] == null){
                obj.data[id] = {rowId:id, name:"",start:now,end:now,status:0,readyState:0,color:"#ccc",connections:[]}
            }
            obj.data[id].readyState = itm.value
            obj.data = dataElements({data:obj.data,id:id})
            obj.drawElement(obj)
        })
    })


    rowConnections.forEach(itm=>{
        itm.addEventListener("keyup",()=>{
            const id = itm.parentNode.parentNode.getAttribute("id").split("row_").join("")
            if(obj.data[id] == null){
                obj.data[id] = {rowId:id, name:"",start:now,end:now,status:0,readyState:0,color:"#ccc",connections:[]}
            }
            obj.data = dataElements({data:obj.data,id:id})
            obj.drawElement(obj)
        })
    })






    colorpicker(obj)
  
  




}