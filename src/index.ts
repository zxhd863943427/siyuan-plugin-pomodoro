import {
    Plugin,
    showMessage,
    adaptHotkey,
    getFrontend,
    getBackend,
} from "siyuan";
import "@/index.scss";


import { setI18n, setIsMobile, setMainSvg, setTransition } from "./utils";
import { renderTarget } from "./components/target";
import { renderProcess } from "./components/process";
import { renderClock } from "./components/clock";
import { init_data } from "./initData";


const STORAGE_NAME = "menu-config";
const DOCK_TYPE = "dock_tab";
let currentTarget = 0
let data;
let currentProcess = {type:"work"}

export default class PluginSample extends Plugin {

    private isMobile: boolean;

    async onload() {
        this.data[STORAGE_NAME] = {readonlyText: "Readonly"};
        data = init_data

        console.log("loading plugin-sample", this.i18n);

        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";
        setI18n(this.i18n)
        setIsMobile(this.isMobile)
        this.addDock({
            config: {
                position: "LeftBottom",
                size: {width: 200, height: 0},
                icon: "iconSparkles",
                title: "Tiny Pomodoro",
            },
            data: {
                text: "Tiny Pomodoro"
            },
            type: DOCK_TYPE,
            init() {
                this.element.innerHTML = `<div class="fn__flex-1 fn__flex-column">
    <div class="block__icons">
        <div class="block__logo">
            <svg><use xlink:href="#iconEmoji"></use></svg>
            Tiny Pomodoro
        </div>
        <span class="fn__flex-1 fn__space"></span>
        <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min ${adaptHotkey("⌘W")}"><svg><use xlink:href="#iconMin"></use></svg></span>
    </div>
    <svg id = "pomodoro_dock" viewBox="0 0 1024 1024"></svg>
    <div>
    <div class="fn__flex-1 plugin-sample__custom-dock"
    style="
    display: flex;
    justify-content: space-between;
    margin: 10px;"
    >
    <button 
        class="b3-button b3-button--outline fn__flex-center" 
        data-type="config" 
        id="pomodoro_start">start</button>
    <button 
        class="b3-button b3-button--outline fn__flex-center" 
        data-type="config" 
        id="pomodoro_stop">stop</button>
    <button 
        class="b3-button b3-button--outline fn__flex-center" 
        data-type="config" 
        id="pomodoro_skip">skip</button>
    </div>
    </div>
</div>`;

setMainSvg();
renderTarget(data);
(document.getElementById("pomodoro_start") as HTMLButtonElement).onclick = start;
(document.getElementById("pomodoro_stop") as HTMLButtonElement).onclick = stop;
(document.getElementById("pomodoro_skip") as HTMLButtonElement).onclick = skip;
stop()
            },
            destroy() {
                console.log("destroy dock:", DOCK_TYPE);
            }
        });



        console.log(this.i18n.helloPlugin);
    }

    onLayoutReady() {
        this.loadData(STORAGE_NAME);
        console.log(`frontend: ${getFrontend()}; backend: ${getBackend()}`);
    }

    onunload() {
        console.log(this.i18n.byePlugin);
        showMessage("Goodbye SiYuan Plugin");
        console.log("onunload");
    }

    /**
     * A custom setting pannel provided by svelte
     */

}

function updateTarget(){
    if (data.length - currentTarget <= 1)
        data.push({value:1, status:"unstart"})
    currentProcess.type = currentProcess.type === "work" ? "rest" : "work"
    renderTarget(data);
}

function finishTarget(){
    if (currentProcess.type === "work"){
        data[currentTarget].status = "finish"
        currentTarget+=1
    }
    updateTarget()
}

function skipTarget(){

    data[currentTarget].status = "skip"
    currentTarget+=1
    updateTarget()
}

function start(){
    let process = currentProcess
    console.log(currentProcess)
    setTransition(process);
    renderProcess([process])
    renderClock([process],finishTarget)
}

function stop(){
    let process = {type:"stop"}
    setTransition(process);
    renderProcess([process])
    renderClock([process],()=>{})
}

function skip(){
    let process = {type:"stop"}
    setTransition(process);
    renderProcess([process])
    renderClock([process],skipTarget)
}