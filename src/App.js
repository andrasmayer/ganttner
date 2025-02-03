const {dateDiff,calendar} = await import(`./Hooks/Date/Date.js${app_version}`)

export class App{
    constructor(){
        this.year = new Date().getFullYear()
        const root = document.querySelector("#root")
        root.innerHTML = this.init()
        this.data = [
            {rowId:0, name:"Első",start:"2025-01-01",end:"2025-12-31",status:0,readyState:0,connections:[]},
            {rowId:1, name:"Első",start:"2025-01-03",end:"2025-01-05",status:0,readyState:0,connections:[]},
            {rowId:2, name:"Első",start:"2025-01-04",end:"2025-01-05",status:0,readyState:0,connections:[]},
            {rowId:3, name:"Első",start:"2025-01-04",end:"2025-01-12",status:0,readyState:0,connections:[]},
            {rowId:4, name:"Első",start:"2025-01-06",end:"2025-01-011",status:0,readyState:0,connections:[]},
        ]
        this.render()
    }
    calendar(){
        let context = ``
        for(let month = 1; month <= 12; month++){
            const color = month % 2 == 0 ? `style="background-color:#ccc"`: ""
            const cal = calendar(`${this.year}-${month}-01`)
            Object.keys(cal).forEach(day=>{
                context += `<th ${color} class="cal-day">
                                <div>${cal[day].monthNameShort}</div>
                                <div>${cal[day].dayNameShort}</div>
                                <div>${day}</div>
                            </th>`
            })
        }
        return `<table class="SVG_TABLE">
                    <thead>
                        ${context}
                    </thead>
                    <tbody>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                        <tr class="svg-table-row"></tr>
                    <tbody>
                </table>
                <div class="svgCtn">
                    <svg class="SVG"></svg>
                </div>

                `
    }
    init(){
        let context = ``
        for(let i=0;i<10;i++){
            context += `
                <tr class="data-row" id="row_${i}">
                    <td>
                        <input class="row-rowId" disabled>
                    </td>
                    <td>
                        <input class="row-name">
                    </td>
                    <td>
                        <input class="row-start" type="date">
                    </td>
                    <td>
                        <input class="row-end" type="date">
                    </td>
                    <td>
                        <select class="row-status">
                            <option value="0">Waiting</option>
                            <option value="1">Started</option>
                            <option value="2">On hold</option>
                            <option value="3">Completed</option>
                            <option value="4">Canceled</option>
                        </select>
                    </td>
                    <td>
                        <input class="row-readyState">
                    </td>
                    <td>
                        <input class="row-connections">
                    </td>
                    

                </tr>
            `
        }
        return `<table style="border-collapse:collapse;" class="DATA">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Status</th>
                            <th>Readystate</th>
                            <th>Connections</th>
                           
                        </tr>
                    </thead>
                    <tbody>${context}<tbody>
                </table>
                ${this.calendar()}
                `
    }
    render(){
        const DATA = document.querySelector(".DATA")
        const SVG_TABLE = document.querySelector(".SVG_TABLE")
        const SVG = document.querySelector(".SVG")
        const SVG_TABLE_THEAD = SVG_TABLE.querySelector("thead").getBoundingClientRect().height 

        let yPos = 3.5
        this.data.forEach((itm,index)=>{
            const row = document.querySelector(`#row_${itm.rowId}`)
            const evtStartX = dateDiff(`${this.year}-01-01`,itm.start)
            const evtLength = dateDiff(itm.start,itm.end)
            
            //yPos += 1 * index + 5
            //if(index %2 != 0){ yPos += 14}
        SVG.innerHTML += `<rect x="${evtStartX*46.5}" y="${index*20+yPos}" width="${evtLength*47+47}" height="${29}" fill="blue" />`
        yPos += 15
            Object.keys(itm).forEach(key=>{
                row.querySelector(`.row-${key}`).value = itm[key]

            })



        })

        this.svgResize()
    }
    svgResize(){
        const DATA = document.querySelector(".DATA")
        const SVG_TABLE = document.querySelector(".SVG_TABLE")
        const SVG = document.querySelector(".SVG")
        const SVG_TABLE_THEAD = SVG_TABLE.querySelector("thead").getBoundingClientRect().height 

        DATA.querySelector("thead").style.height = SVG_TABLE_THEAD 
        SVG.style.height = DATA.getBoundingClientRect().height - SVG_TABLE_THEAD - 20
        SVG.style.top =  SVG_TABLE_THEAD + 8
              
    }

    events(){
        window.addEventListener("resize",()=>{
            this.svgResize()
        })
        const element = document.querySelector('.SVG_TABLE')
        const svgCtn = document.querySelector(".svgCtn")
        element.onscroll = (e)=>{
            svgCtn.scrollLeft = element.scrollLeft
        }
        svgCtn.onscroll = (e)=>{
            element.scrollLeft = svgCtn.scrollLeft
        }
    }
}