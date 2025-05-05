const {drawElement} = await import(`./Components/drawElement.js${app_version}`)
const {drawTable} = await import(`./Components/drawTable.js${app_version}`)
const {tableEvents} = await import(`./Components/tableEvents/tableEvents.js${app_version}`)
export class App{
    constructor(){
        this.year = new Date().getFullYear()
        this.viewOrder = "mid"
        const root = document.querySelector("#root")
        this.data = [
            {rowId:0, name:"Első",start:"2025-01-01",end:"2025-01-10",status:0,readyState:30,color:"blue",connections:[]},
           
            {rowId:1, name:"Első",start:"2025-01-03",end:"2025-01-05",status:0,readyState:0,color:"blue",connections:[]},
            {rowId:2, name:"Első",start:"2025-01-04",end:"2025-01-05",status:0,readyState:0,color:"blue",connections:[]},
            {rowId:3, name:"Első",start:"2025-01-04",end:"2025-01-12",status:0,readyState:0,color:"blue",connections:[]},
            {rowId:4, name:"Első",start:"2025-01-06",end:"2025-01-11",status:0,readyState:0,color:"blue",connections:[]},
        
            ]
        this.rowLength = this.data.length < 15 ? 14 : this.data.length
        //root.innerHTML = this.init()
        //console.log(this)
        root.innerHTML = drawTable(this)
        this.render()
    }

    init(){
        //return drawTable({rowLength:this.rowLength})
        return drawTable(this)
    }
    drawElement(obj){
        obj.drawTable = drawTable
        drawElement(obj)
    }
    render(){
        this.drawElement(this)
        this.svgResize()
    }
    svgResize(){
        
        const DATA = document.querySelector(".DATA")
        const SVG_TABLE = document.querySelector(".SVG_TABLE")
        const svgCtn = document.querySelector(".svgCtn")
        const SVG = document.querySelector(".SVG")
        const SVG_TABLE_THEAD = SVG_TABLE.querySelector("thead").getBoundingClientRect().height 
        //const controlsView = document.querySelector(".controls-view")
        
             if(this.viewOrder == "center"){
            DATA.style.width = "50%"
            SVG_TABLE.style.width = "50%"
            svgCtn.style.left = "50%"
            //controlsView.style.left = "50%"
        }
        else if(this.viewOrder == "left"){
            DATA.style.width = "calc(0% + 35px)"
            SVG_TABLE.style.width = "calc(100% - 35px)"
            svgCtn.style.left = "calc(0% + 43px)"
            //controlsView.style.left = "calc(0% + 43px)"
        }
        else if(this.viewOrder == "right"){
            DATA.style.width = "980px"
            SVG_TABLE.style.width = "calc(100% + 980px)"
            svgCtn.style.left = "988"
            //controlsView.style.left = "988"
        }        
       
        DATA.querySelector("thead").style.height = SVG_TABLE_THEAD 
        SVG.style.height = DATA.getBoundingClientRect().height - SVG_TABLE_THEAD - 20
        SVG.style.top =  SVG_TABLE_THEAD + 8   
              
    }

    events(){
        const now = new Date().toLocaleDateString("hu-Hu").split(". ").join("-").split(".").join("")
        window.addEventListener("resize",()=>{
            this.svgResize()
        })
        const element = document.querySelector('.SVG_TABLE')
        const svgCtn = document.querySelector(".svgCtn")
        //const curDay = document.querySelector("#day_2001-02-18")
       // svgCtn.scrollLeft = curDay.getBoundingClientRect().left -svgCtn.getBoundingClientRect().width*2 //a mai naphoz teker



        element.onscroll = (e)=>{
            svgCtn.scrollLeft = element.scrollLeft
        }
        svgCtn.onscroll = (e)=>{
            element.scrollLeft = svgCtn.scrollLeft
        }

        const left = document.querySelector(".controls-view .left")
        left.addEventListener("click",()=>{
            this.viewOrder = "left"
            this.svgResize()
        })
        const center = document.querySelector(".controls-view .center")
        center.addEventListener("click",()=>{
            this.viewOrder = "center"
            this.svgResize()
        })
        const right = document.querySelector(".controls-view .right")
        right.addEventListener("click",()=>{
            this.viewOrder = "right"
            this.svgResize()
        })
    

        tableEvents(this)


    }
}