import zh_Hans from "./i18n/zh_CN.json";
import en_US from "./i18n/en_US.json";
import * as d3 from "d3"
export type I18N = typeof zh_Hans;
export let i18n: I18N;
export function setI18n(i18n_: any) {
    i18n = i18n_;
}

export let isMobile: boolean;
export function setIsMobile(isMobile_: boolean) {
    isMobile = isMobile_;
}



export let mainSvg, clockSvg, targetSvg, processSvg

export function setMainSvg(){
    mainSvg = d3.select("#pomodoro_dock");
    clockSvg = mainSvg.append("g").attr("transform","translate(512,532)")
    targetSvg = mainSvg.append("g").attr("transform","translate(512,512)")
    processSvg = mainSvg.append("g").attr("transform","translate(512,512)")
}

export type status = "unstart"|"finish"|"skip"

export type process = "work"|"rest"

export let transition
let timeLong = d3.scaleOrdinal().domain(["work","rest","test"]).range([1500000, 300000, 20000]) // 25min and 5 min and 20s
export function setTransition(d){
    transition = d3.transition()
    .duration(timeLong(d.type))
}