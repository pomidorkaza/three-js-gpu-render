import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { Canvas } from 'react-three-fiber';
import Controls from './Controls';
import {InstansePoints} from './InstansePoints'

export const Cylinders = ({data, layout}) => {
    return (<Canvas
        camera={{
            position: [0, 0, 40]
        }}
    >
        <Controls/>

        <ambientLight intensity={1.0}
                        color="#fff"
        />
        <hemisphereLight
            color="#ffffff"
            skyColor="#ffffbb"
            groundColor="#080820"
        />
        <InstansePoints data={data} layout={layout}/>

        </Canvas>);
}
