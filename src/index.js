import React, { useState, useMemo } from "react";
import * as THREE from 'three';
import Controls from './Controls';
import ReactDOM from "react-dom";
import { Canvas, useFrame } from "react-three-fiber";
import './main.css';


const count = 60;
const Boxes =()=>{
  const meshRef = React.useRef();
  
   const scrathedObj3d = React.useMemo(()=>{
    return new THREE.Object3D();
  },[]);

  const particles = useMemo(()=>{
    const tmp = [];
    for(let i=0;i<count;i++){
      tmp.push({
        x: Math.random()*10,
        y: Math.random()*10,
        z:0
      })
    }
    return tmp;
  },[count]);

  useFrame(()=>{
    const mesh = meshRef.current;
    particles.forEach((particle,i)=>{

      scrathedObj3d.position.set(particle.x,particle.y,particle.z);
      scrathedObj3d.rotation.set(Math.PI/2,0,0);
      scrathedObj3d.updateMatrix();
      mesh.setMatrixAt(i,scrathedObj3d.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;

  })
  return (<instancedMesh
    ref={meshRef}
    args={[null, null, count]}
    frustumCulled={false}
  >
    <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
    <meshStandardMaterial attach="material" color="#fff" />
  </instancedMesh>)
}
function App() {
 
  return (

   <Canvas camera={{
     position:[0,0,40]
   }}>
       <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
     <Controls/>
   <Boxes/>
   </Canvas>
   );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
