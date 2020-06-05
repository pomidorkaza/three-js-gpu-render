
import React from 'react';
import {useSpring} from 'react-spring/three';


export function useAnimatedLayout({data,layout,onFrame}){
    useSourceTargetLayout({data, layout});
    const prevLayout =React.useRef(layout);
    useSpring({
        animationProgress:1,
        from:{
            animationProgress:0
        },
        reset:layout!==prevLayout.current,
        onFrame:({animationProgress})=>{
            
            interpolateSourceTarget(data,animationProgress);
            onFrame({animationProgress});
        }
    });
    prevLayout.current = layout;
}

function interpolateSourceTarget(data, progress){
    for(let i=0;i<data.length;i++){
        data[i].x = (1-progress)*data[i].sourseX+ progress*data[i].targetX;
        data[i].y = (1-progress)*data[i].sourseY+ progress*data[i].targetY;
        data[i].z = (1-progress)*data[i].sourseZ+ progress*data[i].targetZ;
        
    }
}

function SpiralLayout(data){
    let theta = 0;
    for(let i=0; i<data.length;i++){
        const datum = data[i];
        const radius = Math.max(1,Math.sqrt(i+1)*0.8);
        theta+=Math.asin(1/radius)*1;
        datum.x =radius* Math.cos(theta);
        datum.y =radius* Math.sin(theta);
        datum.z = 0;

        
    }
}


function GridLayout(data){
    const numPoints = data.length;
    const numCols = Math.ceil(Math.sqrt(numPoints));
    const numRows = numCols;
    for(let i=0;i<numPoints;++i){
        const datum = data[i];
        const col = (i%numCols) -numCols/2;
        const row = Math.floor(i/numCols) -numRows/2;
        datum.x = col*1.05;
        datum.y = row*1.05;
        datum.z =0;
        
    }
}

export const useLayout=({data, layout='grid'})=>{
    React.useEffect(()=>{
        switch(layout){
            case 'spiral':
                {
                    SpiralLayout(data);
                    break; 
                }
            case 'grid':
                default:{
                    GridLayout(data)
                }
        }
    },[data,layout]);
}
export function useSourceTargetLayout({data,layout}){
    React.useEffect(()=>{
        for(let i=0;i<data.length;i++){
            data[i].sourseX = data[i].x||0;
            data[i].sourseY = data[i].y||0;
            data[i].sourseZ = data[i].z||0;
            
            
        }
    },[data,layout]);
    useLayout({data,layout});
    React.useEffect(()=>{
        for(let i=0;i<data.length;i++){
            data[i].targetX = data[i].x;
            data[i].targetY = data[i].y;
            data[i].targetZ = data[i].z;
            
            
        }
    },[data,layout]);
}