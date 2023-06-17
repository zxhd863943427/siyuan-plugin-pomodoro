import * as d3 from "d3"
import { processSvg, transition } from "@/utils"

const radius = (512) * 0.7
const width = 10
let arc = d3.arc().innerRadius(radius-width).outerRadius(radius).cornerRadius(0.01*radius)
let color = d3.scaleOrdinal().domain(["work","rest","test"]).range(["#e4582b", "#97ce28","#97ce28"])
//计算弧长
let arcLong = d3.interpolateNumber(0, Math.PI*2)
let Tween = (time)=>{return (t) => arc({
    startAngle: 0,
    endAngle: arcLong(t)})}

export function renderProcess(process:any){

    let target = new Process(process)
}

class Process{
    constructor(data:any){
        console.log(data)
        processSvg.selectAll('path').data(data)
        .join('path')
        .attr('fill',d=>color(d.type))
        .transition(transition)
        .ease(d3.easeLinear)
        .attrTween('d', Tween)
    }
}

