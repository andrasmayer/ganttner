const {calendar} = await import(`../Hooks/Date/Date.js${app_version}`)
const drawSVG = (obj) =>{
    let context = ``
    for(let month = 1; month <= 12; month++){
        const color = month % 2 == 0 ? `style="background-color:#ccc"`: ""
        const cal = calendar(`${obj.year}-${month}-01`)
        Object.keys(cal).forEach(day=>{
            context += `<th ${color} class="cal-day" id="day_${cal[day].date}">
                            <div>${cal[day].monthNameShort}</div>
                            <div>${cal[day].dayNameShort}</div>
                            <div>${day}</div>
                        </th>`
        })
    }
    let rows = ``
    for(let i=0; i<=obj.rowLength; i++){
        rows += `<tr class="svg-table-row"></tr>`
    }
    return `<div class="controls-view">
                <button class="left"><</button>
                <button class="center">O</button>
                <button class="right">></button>
            </div>
            <table class="SVG_TABLE">
                <thead>
                    ${context}
                </thead>
                <tbody>${rows}<tbody>
            </table>
            <div class="svgCtn">
                <svg class="SVG"></svg>
            </div>`

}

export const drawTable = (obj) =>{
    obj.rowLength = obj.data.length
    let context = ``
    for(let i=0; i<=obj.rowLength; i++){
        context += `
            <tr class="data-row" id="row_${i}">
                <td>${i}</td>
                <td>
                    <button class="row-color">&nbsp</button>
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
                        <th>color</th>
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
            ${drawSVG({year:obj.year, rowLength:obj.rowLength})}
            `

}