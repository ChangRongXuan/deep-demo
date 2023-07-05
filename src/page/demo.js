import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import deepfake_state from '../json/state.json';

export default function DemoPage() {
  studio.initialize();
  const project = getProject('project demo', { state: deepfake_state });

  // Play the animation on repeat
  project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity }));

  return <></>;
}
