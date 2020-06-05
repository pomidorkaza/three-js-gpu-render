import * as React from 'react';
import * as THREE from 'three';
import { useAnimatedLayout } from './hooks';

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

function updateInstancedMeshMatrices({ mesh, data }) {
  if (!mesh) return;

  // set the transform matrix for each instance
  for (let i = 0; i < data.length; ++i) {
    const { x, y, z } = data[i];

    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

export const InstansePoints = ({ data, layout }) => {
  const meshRef = React.useRef();
  const numPoints = data.length;

  // run the layout, animating on change
  useAnimatedLayout({
    data,
    layout,
    onFrame: () => {
      updateInstancedMeshMatrices({ mesh: meshRef.current, data });
    },
  });

 

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}
    >
 <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />      {/* < attach="geometry" args={[0.5, 0.5, 0.15, 32]} /> */}
      <meshStandardMaterial attach="material" color="#fff" />
    </instancedMesh>
  );
};

