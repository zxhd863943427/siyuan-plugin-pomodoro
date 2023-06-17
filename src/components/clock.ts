import * as d3 from "d3"
import { mainSvg, transition } from "@/utils"

const radius = (512) * 0.7
const width = 10
let arc = d3.arc().innerRadius(radius-width).outerRadius(radius).cornerRadius(0.01*radius)
let timeLong = d3.scaleOrdinal().domain(["work","rest","test"]).range([1500000, 300000, 20000]) 
let color = d3.scaleOrdinal().domain(["work","rest","test"]).range(["#e4582b", "#97ce28","#97ce28"])
//计算弧长
let arcLong = d3.interpolateNumber(0, Math.PI*2)
let Tween = (time)=>{return (t) => arc({
    startAngle: 0,
    endAngle: arcLong(t)})}

export function renderClock(process:any){
    console.log(mainSvg)
    let target = new Clock(mainSvg,process)
}

var formatPercent = d3.format("02.0f")
var getMin = (n)=>Math.floor(n / 60000)
var getSec = (n)=>Math.floor(n / 1000) % 60

class Clock{
    constructor(svg:d3.select, data:any){
        console.log(data)
        svg.append("g").attr("transform","translate(512,512)")
        .selectAll('text').data(data)
        .join('text')
        .attr('text-anchor', 'middle')
        .attr("font-size",100)
        .transition(transition)
        .ease(d3.easeLinear)
        .tween("text", function(d) {
            var i = d3.interpolate(0, timeLong(d.type));
            return function(t) {
                let ms = i(t)
                this.textContent = `${formatPercent(getMin(ms))}:${formatPercent(getSec(ms))}`;
            };
        })
    }
}