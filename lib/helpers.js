import { layoutConfig } from "./data";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}


export function getColumnWidth(id){
    return layoutConfig.columnsWidth[id]
}