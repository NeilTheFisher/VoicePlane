import { MathUtils } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import Plane from "./components/Plane";
import { Environment, Clouds } from "./components/Environment";
import { useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const et = new EventTarget();

function Scene() {
  const planeRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  useEffect(() => {
    et.addEventListener("speech", (e) => {
      const { detail: transcript } = e as CustomEvent<string>;

      function pitchUp(command: string, transcript: string) {
        console.log("pitch up!");
        let [_pitch] = transcript
          .substring(transcript.lastIndexOf(command) + command.length)
          .trim()
          .split(" ");
        const pitch = Number(_pitch);
        if (!pitch) return;
        planeRef.current.rotation.x += MathUtils.degToRad(pitch);
        camera.lookAt(planeRef.current.position);
      }

      const commands: Record<string, (t: string) => void> = {
        "pitch up": (t) => pitchUp("pitch up", t),
        "catch up": (t) => pitchUp("catch up", t),
        "pet shop": (t) => pitchUp("catch up", t),
      };

      console.log(transcript);
      Object.keys(commands).forEach((command) => {
        if (transcript.toLowerCase().includes(command)) {
          commands[command](transcript);
        }
      });
    });
  }, []);

  // useFrame(() => {
  //   console.log(camera.rotation);
  // });

  return (
    <>
      <Plane ref={planeRef} />

      <Clouds position={[0, -20, 0]} />

      <Environment />

      <ambientLight intensity={0.1} />
      {/* <PointerLockControls /> */}
      <OrbitControls />
    </>
  );
}

function SpeechUpdater() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });

    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  useEffect(() => {
    if (!transcript) return;
    et.dispatchEvent(new CustomEvent("speech", { detail: transcript }));
    setTimeout(() => {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }, 3000);
  }, [transcript]);

  return null;
}

function App() {
  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <SpeechUpdater />
      <Canvas
        camera={{
          rotation: [MathUtils.degToRad(15), 0, 0],
          position: [-1 * 0.01, 8 * 0.01, 2 * 0.01],
        }}
      >
        <gridHelper />
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
