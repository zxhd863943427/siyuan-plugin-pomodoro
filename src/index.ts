import {
    Plugin,
    showMessage,
    adaptHotkey,
    getFrontend,
    getBackend,
} from "siyuan";
import "@/index.scss";


import { setI18n, setIsMobile, setMainSvg, setTransition } from "./utils";
import * as d3 from "d3"
import { renderTarget } from "./components/target";
import { renderProcess } from "./components/process";
import { renderClock } from "./components/clock";
import { test_data } from "./testData";

window.d3 = d3

const STORAGE_NAME = "menu-config";
const DOCK_TYPE = "dock_tab";

export default class PluginSample extends Plugin {

    private isMobile: boolean;

    async onload() {
        this.data[STORAGE_NAME] = {readonlyText: "Readonly"};

        console.log("loading plugin-sample", this.i18n);

        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";
        setI18n(this.i18n)
        setIsMobile(this.isMobile)
        this.addDock({
            config: {
                position: "LeftBottom",
                size: {width: 200, height: 0},
                icon: "iconSaving",
                title: "Custom Dock",
            },
            data: {
                text: "This is my custom dock"
            },
            type: DOCK_TYPE,
            init() {
                this.element.innerHTML = `<div class="fn__flex-1 fn__flex-column">
    <div class="block__icons">
        <div class="block__logo">
            <svg><use xlink:href="#iconEmoji"></use></svg>
            Custom Dock
        </div>
        <span class="fn__flex-1 fn__space"></span>
        <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min ${adaptHotkey("⌘W")}"><svg><use xlink:href="#iconMin"></use></svg></span>
    </div>
    <svg id = "pomodoro_dock" viewBox="0 0 1024 1024"></svg>
    <div class="fn__flex-1 plugin-sample__custom-dock">
        ${this.data.text}
    </div>
</div>`;
let test_process = {type:"test"}
setMainSvg();
setTransition(test_process);
renderTarget(test_data);
renderProcess([test_process])
renderClock([test_process],function repeat(){
    setTransition(test_process);
    renderTarget(test_data);
    renderProcess([test_process])
    renderClock([test_process],repeat)
})
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
