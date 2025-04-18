'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Points as ThreePoints } from 'three';

function ParticleField() {
  const ref = useRef<ThreePoints>(null);
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5, randomize: true });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_100%)]" />
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
} 