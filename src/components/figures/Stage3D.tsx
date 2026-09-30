'use client';

import { View } from '@react-three/drei';
import type { FigureStore } from './store';
import type { SceneKind } from './FigureFrame';
import PipelineScene from './scenes/PipelineScene';
import StackScene from './scenes/StackScene';
import TreeScene from './scenes/TreeScene';
import styles from './figure.module.css';

/** Tracks the stage element; drei renders the scene into it from the shared canvas. */
export default function Stage3D({ kind, store }: { kind: SceneKind; store: FigureStore }) {
  return (
    <View className={styles.view}>
      {kind === 'stack' && <StackScene store={store} />}
      {kind === 'pipeline' && <PipelineScene store={store} />}
      {kind === 'tree' && <TreeScene store={store} />}
    </View>
  );
}
