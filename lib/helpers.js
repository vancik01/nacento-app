import { layoutConfig } from "./data";

export function numberWithCommas(x) {
    return x.toString().replace(/.(?=(?:.{3})+$)/g, '$& ')

}


export function getColumnWidth(id){
    return layoutConfig.columnsWidth[id]
}