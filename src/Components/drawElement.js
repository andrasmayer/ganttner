const {dateDiff} = await import(`../Hooks/Date/Date.js${app_version}`)
export const drawElement = (obj) =>{
//obj.drawTable(obj)
    const SVG = document.querySelector(".SVG")
    SVG.innerHTML = ""
    let yPos = 3.5
   
    obj.data.forEach((itm,index)=>{
        const row = document.querySelector(`#row_${itm.rowId}`)
        const evtStartX = dateDiff(`${obj.year}-01-01`,itm.start)
        const evtLength = dateDiff(itm.start,itm.end)
        if(itm.start != ""){
            const tmpLength = evtLength*47+47
            const evtRealLength = itm.readyState == 0 ? tmpLength : tmpLength * (itm.readyState/100)
            const color = itm.readyState > 0 ? itm.color : "#ccc"
            SVG.innerHTML += `<rect evtId="${index}" x="${evtStartX*46.5}" y="${index*20+yPos}" width="${evtRealLength}" height="${29}" fill="${color}" />`
            if(evtRealLength != tmpLength){
                SVG.innerHTML += `<rect  evtId="${index}" x="${evtStartX*46.5+evtRealLength}" y="${index*20+yPos}" width="${tmpLength - evtRealLength }" height="${29}" fill="#ccc" />`

            }
        
        }
        yPos += 15
        Object.keys(itm).forEach(key=>{
            const cell = row.querySelector(`.row-${key}`)
 
            if(cell !== null){
                if(key == "color"){
                    row.querySelector(`.row-color`).style.backgroundColor = itm.color
                }
                row.querySelector(`.row-${key}`).value = itm[key]
            }
             
        })
    })
        
}