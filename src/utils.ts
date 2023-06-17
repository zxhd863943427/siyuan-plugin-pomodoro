import zh_Hans from "./i18n/zh_CN.json";
import en_US from "./i18n/en_US.json";
export type I18N = typeof zh_Hans;
export let i18n: I18N;
export function setI18n(i18n_: any) {
    i18n = i18n_;
}

export let isMobile: boolean;
export function setIsMobile(isMobile_: boolean) {
    isMobile = isMobile_;
}