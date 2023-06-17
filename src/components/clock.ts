import * as d3 from "d3"
import { clockSvg, transition, timeLong } from "@/utils"

const radius = (512) * 0.7
const width = 10
let arc = d3.arc().innerRadius(radius-width).outerRadius(radius).cornerRadius(0.01*radius)
let color = d3.scaleOrdinal().domain(["work","rest","test"]).range(["#e4582b", "#97ce28","#97ce28"])
//计算弧长
let arcLong = d3.interpolateNumber(0, Math.PI*2)
let Tween = (time)=>{return (t) => arc({
    startAngle: 0,
    endAngle: arcLong(t)})}

export function renderClock(process:any, callback:Function){
    let target = new Clock(process, callback)
}

var formatPercent = d3.format("02.0f")
var getMin = (n)=>Math.floor(n / 60000)
var getSec = (n)=>Math.floor(n / 1000) % 60

class Clock{
    svg
    constructor(data:any, callback:Function){
        // console.log(data)
        clockSvg.selectAll('text').data(data)
        .join('text')
        .attr('text-anchor', 'middle')
        .attr("font-size",100)
        .transition(transition)
        .ease(d3.easeLinear)
        .tween("text", function(d) {
            var i = d3.interpolate(0, timeLong(d.type));
            return function(t) {
                let ms = i(1-t)
                this.textContent = `${formatPercent(getMin(ms))}:${formatPercent(getSec(ms))}`;
            };
        })
        .transition().on("start",callback)
    }
}