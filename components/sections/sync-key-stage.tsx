"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const blenderModelPath = "/models/oportunidades/sync-key-stage-blender.glb";
const blenderPosterPath =
  "/images/oportunidades/sync-key-stage-poster-blender.png";
const syncKeys = ["S", "Y", "N", "C"] as const;
const syncKeyLookup = new Set(syncKeys.map((letter) => letter.toLowerCase()));

type SyncLetter = (typeof syncKeys)[number];

type MotionProfile =
  | "heavy-drift"
  | "loose-tumble"
  | "steady-hover"
  | "deep-orbit";

type KeyMotion = {
  profile: MotionProfile;
  drift: [number, number, number];
  driftFrequency: [number, number, number];
  driftPhase: [number, number, number];
  driftHarmonic: [number, number, number];
  spin: [number, number, number];
  spinFrequency: [number, number, number];
  spinPhase: [number, number, number];
  spinHarmonic: [number, number, number];
  pressOffset: [number, number, number];
  pressRotation: [number, number, number];
  pressScale: number;
  shellSway: [number, number, number];
  detailLift: number;
  letterLift: number;
  glintTravel: number;
};

type KeyParts = {
  body: THREE.Object3D;
  face: THREE.Object3D;
  letter: THREE.Object3D;
  shell: THREE.Object3D;
  shellEdges: THREE.Object3D;
  sideReflection: THREE.Object3D;
  topGlint: THREE.Object3D;
  coolReflection: THREE.Object3D;
};

type KeyConfig = {
  letter: SyncLetter;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  phase: number;
  motion: KeyMotion;
};

const keyConfigs: KeyConfig[] = [
  {
    letter: "S",
    position: [-2.34, 0.28, -0.26],
    rotation: [0.2, -0.28, -0.18],
    scale: 1.08,
    phase: 0,
    motion: {
      profile: "heavy-drift",
      drift: [0.1, 0.12, 0.085],
      driftFrequency: [0.00032, 0.00049, 0.00037],
      driftPhase: [0.2, 1.15, 2.2],
      driftHarmonic: [0.28, 0.18, 0.16],
      spin: [0.028, 0.036, 0.03],
      spinFrequency: [0.00036, 0.0003, 0.00028],
      spinPhase: [0.8, 1.4, 0.3],
      spinHarmonic: [0.22, 0.2, 0.18],
      pressOffset: [0.01, -0.1, -0.28],
      pressRotation: [0.028, -0.018, 0.01],
      pressScale: -0.012,
      shellSway: [0.018, 0.014, 0.014],
      detailLift: 0.012,
      letterLift: 0.014,
      glintTravel: 0.1,
    },
  },
  {
    letter: "Y",
    position: [-0.9, -0.54, 0.18],
    rotation: [0.38, 0.08, -0.14],
    scale: 0.98,
    phase: 1.6,
    motion: {
      profile: "loose-tumble",
      drift: [0.12, 0.18, 0.13],
      driftFrequency: [0.00055, 0.00078, 0.00062],
      driftPhase: [1.8, 0.35, 2.65],
      driftHarmonic: [0.42, 0.32, 0.26],
      spin: [0.07, 0.054, 0.086],
      spinFrequency: [0.00068, 0.00051, 0.00074],
      spinPhase: [0.55, 2.1, 1.3],
      spinHarmonic: [0.32, 0.26, 0.34],
      pressOffset: [-0.02, -0.16, -0.22],
      pressRotation: [0.046, 0.012, -0.038],
      pressScale: -0.018,
      shellSway: [0.026, 0.022, 0.024],
      detailLift: 0.018,
      letterLift: 0.02,
      glintTravel: 0.16,
    },
  },
  {
    letter: "N",
    position: [0.88, 0.18, -0.12],
    rotation: [0.18, -0.14, 0.08],
    scale: 1.05,
    phase: 3.1,
    motion: {
      profile: "steady-hover",
      drift: [0.055, 0.09, 0.065],
      driftFrequency: [0.00038, 0.00045, 0.00034],
      driftPhase: [2.5, 1.1, 0.45],
      driftHarmonic: [0.16, 0.14, 0.12],
      spin: [0.022, 0.032, 0.024],
      spinFrequency: [0.00028, 0.00036, 0.00031],
      spinPhase: [1.1, 0.15, 2.8],
      spinHarmonic: [0.14, 0.16, 0.12],
      pressOffset: [0, -0.09, -0.18],
      pressRotation: [0.02, -0.01, 0.006],
      pressScale: -0.009,
      shellSway: [0.012, 0.01, 0.012],
      detailLift: 0.008,
      letterLift: 0.01,
      glintTravel: 0.07,
    },
  },
  {
    letter: "C",
    position: [2.32, -0.25, 0.08],
    rotation: [0.28, 0.22, 0.2],
    scale: 0.99,
    phase: 4.45,
    motion: {
      profile: "deep-orbit",
      drift: [0.14, 0.13, 0.18],
      driftFrequency: [0.00044, 0.0006, 0.0005],
      driftPhase: [0.7, 2.4, 1.15],
      driftHarmonic: [0.34, 0.22, 0.38],
      spin: [0.058, 0.078, 0.052],
      spinFrequency: [0.00049, 0.00064, 0.00042],
      spinPhase: [2.2, 0.9, 1.6],
      spinHarmonic: [0.24, 0.34, 0.22],
      pressOffset: [0.02, -0.12, -0.3],
      pressRotation: [0.034, -0.034, 0.026],
      pressScale: -0.014,
      shellSway: [0.024, 0.016, 0.032],
      detailLift: 0.014,
      letterLift: 0.016,
      glintTravel: 0.14,
    },
  },
];

function tagInteractive(object: THREE.Object3D, letter: SyncLetter) {
  object.userData.key = letter.toLowerCase();
}

function rememberBaseTransform(object: THREE.Object3D) {
  object.userData.basePosition = object.position.clone();
  object.userData.baseRotation = object.rotation.clone();
  object.userData.baseScale = object.scale.clone();

  if (
    object instanceof THREE.Mesh &&
    object.material instanceof THREE.Material
  ) {
    object.userData.baseOpacity = object.material.opacity;
  }
}

function wave(
  time: number,
  amplitude: number,
  frequency: number,
  phase: number,
  harmonic: number,
) {
  return (
    Math.sin(time * frequency + phase) * amplitude +
    Math.sin(time * frequency * 0.43 + phase * 1.71) * amplitude * harmonic
  );
}

function materialList(material: THREE.Material | THREE.Material[]) {
  return Array.isArray(material) ? material : [material];
}

function setMaterialNumber(
  material: THREE.Material,
  key: string,
  value: number,
) {
  if (key in material) {
    (material as unknown as Record<string, number>)[key] = value;
  }
}

function tuneMeshMaterial(mesh: THREE.Mesh) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const name = mesh.name.toLowerCase();
  const materials = materialList(mesh.material).map((material) => {
    const clone = material.clone();
    clone.needsUpdate = true;

    if (name.includes("shell")) {
      clone.transparent = true;
      clone.opacity = name.includes("edges") ? 0.32 : 0.2;
      clone.depthWrite = false;
      clone.side = THREE.DoubleSide;
      setMaterialNumber(clone, "roughness", name.includes("edges") ? 0.2 : 0.28);
      setMaterialNumber(clone, "metalness", name.includes("edges") ? 0.04 : 0.2);
    }

    if (name.includes("reflection") || name.includes("glint")) {
      clone.transparent = true;
      clone.opacity = name.includes("cool") ? 0.16 : 0.22;
      clone.depthWrite = false;
      clone.side = THREE.DoubleSide;
      setMaterialNumber(clone, "roughness", 0.12);
      setMaterialNumber(clone, "metalness", 0);
    }

    if (name.includes("letter")) {
      clone.depthWrite = false;
      setMaterialNumber(clone, "roughness", 0.2);
      setMaterialNumber(clone, "metalness", 0.02);
    }

    if (name.includes("body") || name.includes("face")) {
      setMaterialNumber(clone, "roughness", name.includes("body") ? 0.42 : 0.36);
      setMaterialNumber(clone, "metalness", name.includes("body") ? 0.16 : 0.12);
    }

    return clone;
  });

  mesh.material = Array.isArray(mesh.material) ? materials : materials[0];

  if (name.includes("shell")) {
    mesh.renderOrder = name.includes("edges") ? 5 : 4;
  } else if (name.includes("reflection") || name.includes("glint")) {
    mesh.renderOrder = 6;
  } else if (name.includes("letter")) {
    mesh.renderOrder = 7;
  }
}

function findPart(
  group: THREE.Object3D,
  letter: SyncLetter,
  suffix: string,
) {
  return group.getObjectByName(`${letter}-${suffix}`) ?? group;
}

function getKeyParts(group: THREE.Object3D, letter: SyncLetter): KeyParts {
  return {
    body: findPart(group, letter, "body"),
    face: findPart(group, letter, "face"),
    letter: findPart(group, letter, "letter"),
    shell: findPart(group, letter, "shell"),
    shellEdges: findPart(group, letter, "shell-edges"),
    sideReflection: findPart(group, letter, "side-reflection"),
    topGlint: findPart(group, letter, "top-glint"),
    coolReflection: findPart(group, letter, "cool-reflection"),
  };
}

function setObjectOpacity(object: THREE.Object3D, opacity: number) {
  if (!(object instanceof THREE.Mesh)) {
    return;
  }

  for (const material of materialList(object.material)) {
    material.opacity = opacity;
  }
}

function disposeObject(object: THREE.Object3D) {
  const disposedMaterials = new Set<THREE.Material>();
  const disposedGeometries = new Set<THREE.BufferGeometry>();

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    if (!disposedGeometries.has(child.geometry)) {
      child.geometry.dispose();
      disposedGeometries.add(child.geometry);
    }

    for (const material of materialList(child.material)) {
      if (disposedMaterials.has(material)) {
        continue;
      }

      if ("map" in material) {
        const texture = (material as { map?: THREE.Texture | null }).map;
        texture?.dispose();
      }

      material.dispose();
      disposedMaterials.add(material);
    }
  });
}

export function SyncKeyStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;

    if (!canvas || !stage || typeof window.matchMedia !== "function") {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!desktopQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environmentTarget = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04,
    );

    const scene = new THREE.Scene();
    scene.environment = environmentTarget.texture;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.04, 9.7);

    const root = new THREE.Group();
    root.rotation.x = -0.035;
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0xffffff, 112, 20);
    keyLight.position.set(-3.9, 2.4, 4.3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const frontalLight = new THREE.PointLight(0xffffff, 38, 14);
    frontalLight.position.set(1.8, 0.2, 4.8);
    scene.add(frontalLight);

    const coolRim = new THREE.PointLight(0x8edcff, 26, 14);
    coolRim.position.set(2.9, -2.4, 3.2);
    scene.add(coolRim);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };
    const orbit = {
      yaw: 0,
      pitch: 0,
      targetYaw: 0,
      targetPitch: 0,
      dragging: false,
      lastX: 0,
      lastY: 0,
      moveDistance: 0,
      pointerId: -1,
    };
    const interactiveMeshes: THREE.Object3D[] = [];
    let animationFrame = 0;
    let assetScene: THREE.Object3D | undefined;
    let groups: THREE.Object3D[] = [];
    let disposed = false;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const triggerKey = (key: string) => {
      const group = groups.find((candidate) => candidate.userData.key === key);

      if (!group) {
        return;
      }

      group.userData.pressedUntil = performance.now() + 150;
    };

    const updatePointerFromEvent = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      pointer.x = x * 2 - 1;
      pointer.y = -(y * 2 - 1);
      pointerTarget.x = pointer.x;
      pointerTarget.y = pointer.y;
    };

    const pickKey = () => {
      raycaster.setFromCamera(pointer, camera);

      const hit = raycaster.intersectObjects(interactiveMeshes, false)[0];
      const key = hit?.object.userData.key;

      if (typeof key === "string") {
        triggerKey(key);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerFromEvent(event);

      if (!orbit.dragging) {
        return;
      }

      const deltaX = event.clientX - orbit.lastX;
      const deltaY = event.clientY - orbit.lastY;
      orbit.lastX = event.clientX;
      orbit.lastY = event.clientY;
      orbit.moveDistance += Math.abs(deltaX) + Math.abs(deltaY);
      orbit.targetYaw += deltaX * 0.0085;
      orbit.targetPitch += deltaY * 0.0065;
    };

    const handlePointerDown = (event: PointerEvent) => {
      event.preventDefault();
      updatePointerFromEvent(event);
      orbit.dragging = true;
      orbit.lastX = event.clientX;
      orbit.lastY = event.clientY;
      orbit.moveDistance = 0;
      orbit.pointerId = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!orbit.dragging) {
        return;
      }

      updatePointerFromEvent(event);
      orbit.dragging = false;

      if (orbit.pointerId === event.pointerId) {
        canvas.releasePointerCapture(event.pointerId);
      }

      if (orbit.moveDistance < 12) {
        pickKey();
      }
    };

    const handlePointerLeave = () => {
      if (!orbit.dragging) {
        pointerTarget.x = 0;
        pointerTarget.y = 0;
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (syncKeyLookup.has(key)) {
        triggerKey(key);
      }
    };

    const animate = (time: number) => {
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.085;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.085;
      orbit.yaw += (orbit.targetYaw - orbit.yaw) * 0.12;
      orbit.pitch += (orbit.targetPitch - orbit.pitch) * 0.12;
      root.rotation.y =
        orbit.yaw + pointerCurrent.x * 0.025 + Math.sin(time * 0.00021) * 0.025;
      root.rotation.x =
        -0.035 +
        orbit.pitch -
        pointerCurrent.y * 0.025 +
        Math.cos(time * 0.00018) * 0.014;
      root.rotation.z = Math.sin(time * 0.00016) * 0.01;
      keyLight.position.x = -3.9 + Math.sin(time * 0.00032) * 0.34;
      keyLight.position.y = 2.4 + Math.cos(time * 0.00028) * 0.2;
      frontalLight.intensity = 38 + Math.sin(time * 0.00042) * 4;
      coolRim.position.x = 2.9 + Math.cos(time * 0.0003) * 0.24;

      for (const group of groups) {
        const basePosition = group.userData.basePosition as THREE.Vector3;
        const baseRotation = group.userData.baseRotation as THREE.Euler;
        const baseScale = group.userData.baseScale as number;
        const phase = group.userData.phase as number;
        const motion = group.userData.motion as KeyMotion;
        const parts = group.userData.parts as KeyParts;
        const targetPress =
          time < (group.userData.pressedUntil as number) ? 1 : 0;
        const press =
          (group.userData.press as number) +
          (targetPress - (group.userData.press as number)) * 0.24;
        const driftX =
          wave(
            time,
            motion.drift[0],
            motion.driftFrequency[0],
            phase + motion.driftPhase[0],
            motion.driftHarmonic[0],
          ) + pointerCurrent.x * motion.drift[0] * 0.08;
        const driftY =
          wave(
            time,
            motion.drift[1],
            motion.driftFrequency[1],
            phase + motion.driftPhase[1],
            motion.driftHarmonic[1],
          ) - pointerCurrent.y * motion.drift[1] * 0.06;
        const driftZ = wave(
          time,
          motion.drift[2],
          motion.driftFrequency[2],
          phase + motion.driftPhase[2],
          motion.driftHarmonic[2],
        );
        const pitch =
          wave(
            time,
            motion.spin[0],
            motion.spinFrequency[0],
            phase + motion.spinPhase[0],
            motion.spinHarmonic[0],
          ) + pointerCurrent.y * motion.spin[0] * 0.16;
        const yaw = wave(
          time,
          motion.spin[1],
          motion.spinFrequency[1],
          phase + motion.spinPhase[1],
          motion.spinHarmonic[1],
        );
        const roll = wave(
          time,
          motion.spin[2],
          motion.spinFrequency[2],
          phase + motion.spinPhase[2],
          motion.spinHarmonic[2],
        );
        const scaleBreath =
          Math.sin(time * motion.driftFrequency[1] * 0.74 + phase * 2.4) *
          0.006;

        group.userData.press = press;
        group.position.set(
          basePosition.x + driftX + motion.pressOffset[0] * press,
          basePosition.y + driftY + motion.pressOffset[1] * press,
          basePosition.z + driftZ + motion.pressOffset[2] * press,
        );
        group.rotation.set(
          baseRotation.x + pitch + motion.pressRotation[0] * press,
          baseRotation.y + yaw + motion.pressRotation[1] * press,
          baseRotation.z + roll + motion.pressRotation[2] * press,
        );
        group.scale.setScalar(
          baseScale * (1 + scaleBreath + motion.pressScale * press),
        );

        const shellBasePosition = parts.shell.userData
          .basePosition as THREE.Vector3;
        const shellBaseRotation = parts.shell.userData
          .baseRotation as THREE.Euler;
        const shellSwayX = wave(
          time,
          motion.shellSway[0],
          motion.driftFrequency[0] * 1.34,
          phase + 1.9,
          0.24,
        );
        const shellSwayY = wave(
          time,
          motion.shellSway[1],
          motion.driftFrequency[1] * 1.18,
          phase + 0.7,
          0.18,
        );
        const shellSwayZ = wave(
          time,
          motion.shellSway[2],
          motion.driftFrequency[2] * 1.4,
          phase + 2.8,
          0.28,
        );

        parts.shell.position.set(
          shellBasePosition.x + shellSwayX,
          shellBasePosition.y + shellSwayY,
          shellBasePosition.z + shellSwayZ,
        );
        parts.shell.rotation.set(
          shellBaseRotation.x + shellSwayY * 0.08,
          shellBaseRotation.y - shellSwayX * 0.09,
          shellBaseRotation.z + shellSwayZ * 0.06,
        );
        parts.shellEdges.position.copy(parts.shell.position);
        parts.shellEdges.rotation.copy(parts.shell.rotation);

        const faceBasePosition = parts.face.userData
          .basePosition as THREE.Vector3;
        const letterBasePosition = parts.letter.userData
          .basePosition as THREE.Vector3;
        const sideReflectionBasePosition = parts.sideReflection.userData
          .basePosition as THREE.Vector3;
        const topGlintBasePosition = parts.topGlint.userData
          .basePosition as THREE.Vector3;
        const coolReflectionBasePosition = parts.coolReflection.userData
          .basePosition as THREE.Vector3;
        const detailFloat =
          Math.sin(time * motion.spinFrequency[2] * 1.55 + phase) *
          motion.detailLift;
        const letterFloat =
          Math.cos(time * motion.spinFrequency[0] * 1.42 + phase * 1.3) *
          motion.letterLift;
        const glintSweep =
          Math.sin(time * motion.driftFrequency[0] * 2.1 + phase * 1.6) *
          motion.glintTravel;

        parts.face.position.set(
          faceBasePosition.x + shellSwayX * 0.2,
          faceBasePosition.y + detailFloat,
          faceBasePosition.z - press * 0.035,
        );
        parts.letter.position.set(
          letterBasePosition.x,
          letterBasePosition.y + letterFloat,
          letterBasePosition.z + press * 0.045,
        );
        parts.sideReflection.position.set(
          sideReflectionBasePosition.x + glintSweep * 0.2,
          sideReflectionBasePosition.y + shellSwayY * 0.4,
          sideReflectionBasePosition.z + shellSwayZ * 0.24,
        );
        parts.topGlint.position.set(
          topGlintBasePosition.x + glintSweep,
          topGlintBasePosition.y + detailFloat * 0.5,
          topGlintBasePosition.z + press * 0.02,
        );
        parts.coolReflection.position.set(
          coolReflectionBasePosition.x - glintSweep * 0.25,
          coolReflectionBasePosition.y - shellSwayY * 0.2,
          coolReflectionBasePosition.z + shellSwayZ * 0.2,
        );

        setObjectOpacity(
          parts.sideReflection,
          (parts.sideReflection.userData.baseOpacity as number) *
            (0.82 + Math.sin(time * 0.00082 + phase) * 0.18),
        );
        setObjectOpacity(
          parts.topGlint,
          (parts.topGlint.userData.baseOpacity as number) *
            (0.72 + Math.cos(time * 0.00096 + phase * 1.7) * 0.26),
        );
        setObjectOpacity(
          parts.coolReflection,
          (parts.coolReflection.userData.baseOpacity as number) *
            (0.76 + Math.sin(time * 0.00074 + phase * 1.2) * 0.2),
        );
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const prepareLoadedAsset = (loadedScene: THREE.Object3D) => {
      assetScene = loadedScene;
      root.add(assetScene);
      groups = keyConfigs.map((config) => {
        const group = assetScene?.getObjectByName(`SYNC_KEY_${config.letter}`);

        if (!group) {
          throw new Error(`Missing Blender key asset ${config.letter}`);
        }

        tagInteractive(group, config.letter);
        group.position.set(...config.position);
        group.rotation.set(...config.rotation);
        group.scale.setScalar(config.scale);
        group.userData.basePosition = group.position.clone();
        group.userData.baseRotation = group.rotation.clone();
        group.userData.baseScale = config.scale;
        group.userData.phase = config.phase;
        group.userData.motion = config.motion;
        group.userData.press = 0;
        group.userData.pressedUntil = 0;
        group.userData.parts = getKeyParts(group, config.letter);

        group.traverse((child) => {
          tagInteractive(child, config.letter);

          if (child instanceof THREE.Mesh) {
            tuneMeshMaterial(child);
            interactiveMeshes.push(child);
          }
        });

        Object.values(group.userData.parts as KeyParts).forEach(
          rememberBaseTransform,
        );

        return group;
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    canvas.style.cursor = "default";
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("contextmenu", handleContextMenu);

    const loader = new GLTFLoader();
    loader.load(
      blenderModelPath,
      (gltf) => {
        if (disposed) {
          disposeObject(gltf.scene);
          return;
        }

        prepareLoadedAsset(gltf.scene);
      },
      undefined,
      (error) => {
        console.error("Failed to load Blender SYNC key asset", error);
      },
    );

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("contextmenu", handleContextMenu);

      if (assetScene) {
        disposeObject(assetScene);
      }

      environmentTarget.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      data-component="sync-key-stage"
      data-webgl-intent="resend-inspired-sync-key-scene"
      data-asset-source="blender-glb"
      data-orbit-control="free-360"
      data-pointer-cursor="default"
      data-blender-asset={blenderModelPath}
      aria-hidden="true"
      className="relative mx-auto mt-8 h-[22rem] w-full max-w-6xl overflow-visible sm:h-[24rem] lg:h-[34rem]"
    >
      <canvas
        ref={canvasRef}
        data-component="sync-key-webgl-canvas"
        className="relative z-10 hidden h-full w-full cursor-default touch-none lg:block"
      />
      <div
        data-component="sync-key-static-fallback"
        className="pointer-events-none absolute inset-0 lg:hidden"
      >
        <Image
          data-component="sync-key-mobile-poster"
          src={blenderPosterPath}
          width={620}
          height={832}
          alt=""
          loading="lazy"
          draggable={false}
          sizes="100vw"
          className="h-full w-full object-contain"
        />
        {keyConfigs.map(({ letter, motion }) => (
          <span
            key={letter}
            data-sync-key={letter}
            data-sync-motion-profile={motion.profile}
            className="sr-only"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
