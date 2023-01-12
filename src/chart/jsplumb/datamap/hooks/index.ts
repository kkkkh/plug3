import {NodeType} from '../type/index';

export const emitHandle = <T extends Function>(emit:T)=>{
     const enter = (it:NodeType) => {
        emit('enter', it)
    }
     const leave = (it:NodeType) => {
        emit('leave', it)
    }
     const line = (it:NodeType) => {
        emit('line', it)
    }
    return {
        enter,
        leave,
        line,
    }
} 