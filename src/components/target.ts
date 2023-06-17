import * as d3 from "d3"
import { mainSvg } from "@/utils"

const radius = (512)*0.8
let arc = d3.arc().innerRadius(radius-10).outerRadius(radius).padAngle(0.03).cornerRadius(0.01*radius)
let pie = d3.pie().value(d=>d.value)
let color = d3.scaleOrdinal().domain(["unstart","finish" ,"skip"]).range(['rgba(0, 0, 0, 0.15)','#39b6eb','rgba(57,182,235,.5)'])

export function renderTarget(data:any){
    console.log(mainSvg)
    let target = new Target(mainSvg,pie(data))
}

class Target{
    constructor(svg:d3.select, data:any){
        svg.append("g").attr("transform","translate(512,512)")
        .selectAll('path').data(data)
        .join('path')
        .attr('d', arc)
        .attr('fill',d=>color(d.data.status))
    }
}

