import { Cloud, Sky } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { forwardRef, useRef } from "react";

function Sun() {
  return (
    <Sky
      distance={4000}
      inclination={0.494}
      turbidity={8}
      rayleigh={2.5}
      azimuth={60 / 360}
      mieCoefficient={0.005}
      mieDirectionalG={0.65}
    />
  );
}

function Moon() {
  return (
    <Sky
      distance={4000}
      inclination={0.52}
      turbidity={0}
      rayleigh={0.02}
      azimuth={60 / 360}
      mieCoefficient={0}
      mieDirectionalG={0}
    />
  );
}

export function Environment() {
  return (
    <>
      <Sun />
    </>
  );
}

export const Clouds = forwardRef<THREE.Group, GroupProps>((props, ref) => {
  const cloudLength = 500;

  const cloudsRef = useRef<THREE.Group>(null!);
  const cloudsRef2 = useRef<THREE.Group>(null!);

  // const boxRef = useRef<THREE.Box3>(new THREE.Box3());
  // const boxRef2 = useRef<THREE.Box3>(new THREE.Box3());
  const increment = 2;
  useFrame(() => {
    cloudsRef.current.position.z += increment;
    cloudsRef2.current.position.z += increment;
    if (cloudsRef.current.position.z >= cloudLength / 2) {
      cloudsRef.current.position.z = -cloudLength / 2;
    } else if (cloudsRef2.current.position.z >= cloudLength / 2) {
      cloudsRef2.current.position.z = -cloudLength / 2;
    }

    // boxRef.current.setFromObject(cloudsRef.current);
    // boxRef2.current.setFromObject(cloudsRef2.current);
  });

  // useHelper(boxRef as any, Box3Helper, new THREE.Color("hotpink"));
  // useHelper(boxRef2 as any, Box3Helper, new THREE.Color("red"));

  const cloud = <Cloud segments={cloudLength} opacity={0.2} width={20} depth={1} color="#fff1c9" />;
  return (
    <group ref={ref} {...props}>
      <object3D ref={cloudsRef} position={[0, 0, 0]}>
        {cloud}
      </object3D>
      <object3D ref={cloudsRef2} position={[0, 0, -(cloudLength / 2) - cloudLength]}>
        {cloud}
      </object3D>
    </group>
  );
});
