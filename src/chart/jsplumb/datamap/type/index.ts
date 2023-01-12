import type {jsPlumbInstance,Endpoint,Connection} from 'jsplumb'
export type NodeType = {
    id:string,
    parentId:string,
    name:string,
    icon:string,
    sort:number,
    type:'layer'|'category'|'icon',
    level:number
    mode:'row'|'col',
    space: string,
    spaceUnit: 1 | 2,
    color:string
}

export type LineType = {
    source:string,
    target:string,
    weight:number
}

type PaintStyle = {
    strokeWidth:number,
    stroke:string
}
export type ConnectionType = Connection & {
    canvas: HTMLCanvasElement & {
        width:{
            baseVal:{
                value: number
            }
        },
        height:{
            baseVal:{
                value: number
            }
        }
    }
}
export type SelectType = ReturnType<jsPlumbInstance["select"]> & {
    setPaintStyle:(p:PaintStyle)=>void
}
export type JsPlumbInstanceType = jsPlumbInstance & {
    selectEndpoints:()=>Endpoint
}
