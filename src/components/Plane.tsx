import { forwardRef, useLayoutEffect, useRef } from "react";
import { MathUtils, Object3D, SpotLightHelper } from "three";
import { Float, SpotLight, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import PlaneBody from "../models/Plane";
import PlaneCockpit from "../models/PlaneCockpit";

const Plane = forwardRef<THREE.Group>((_, ref) => {
  const lightRef = useRef<THREE.SpotLight>(null!);
  useHelper(lightRef as any, SpotLightHelper, "hotpink");

  const targetRef = useRef<Object3D>(null!);
  useLayoutEffect(() => {
    lightRef.current.target = targetRef.current;
  }, [targetRef.current]);

  /* const floatRef = useRef<THREE.Group>(null!);
  const lastPosition = useRef<number>();
  const lastRotation = useRef<THREE.Euler>();
  useFrame(({ camera }) => {
    // bobbing motion
    if (lastPosition.current) {
      const delta = lastPosition.current - floatRef.current.position.y;
      camera.position.y -= delta;
      lastPosition.current = floatRef.current.position.y;
    } else {
      lastPosition.current = floatRef.current.position.y;
    }
    // rotation motion
    const scaleRotation = 0.8; // amount to adhere to the float's rotation
    if (lastRotation.current) {
      const deltaX = lastRotation.current.x - floatRef.current.rotation.x;
      const deltaY = lastRotation.current.y - floatRef.current.rotation.y;
      const deltaZ = lastRotation.current.z - floatRef.current.rotation.z;
      camera.rotation.x -= deltaX * scaleRotation;
      camera.rotation.y -= deltaY * scaleRotation;
      camera.rotation.z -= deltaZ * scaleRotation;
      lastRotation.current = floatRef.current.rotation.clone();
    } else {
      lastRotation.current = floatRef.current.rotation.clone();
    }
  }); */

  return (
    <group ref={ref}>
      {/* <Float
        ref={floatRef}
        floatingRange={[0, 0.1]}
        rotationIntensity={0.2}
        floatIntensity={2}
        speed={1}
      > */}
      <group scale={0.01} rotation={[0, MathUtils.degToRad(180), 0]}>
        <SpotLight
          ref={lightRef}
          attenuation={0}
          decay={0}
          penumbra={0.5}
          intensity={0.5}
          color="#dad7fa"
          position={[-32, 60, -12]}
          angle={MathUtils.degToRad(45)}
          scale={20}
          opacity={1}
          castShadow
        />
        <object3D ref={targetRef} position={[-32, 20, 0]} />
        {/* <pointLight intensity={1} position={[-32, 40, -12]} /> */}
        {/* <Box position={[-32, 40, -12]} /> */}
        <PlaneCockpit castShadow controlsPitch={-0.05} position={[-55.5, -50, 60]} />
        <PlaneBody receiveShadow position={[-95, -240, 400]} />
      </group>
      {/* </Float> */}
    </group>
  );
});

export default Plane;
