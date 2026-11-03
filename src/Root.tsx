import React from 'react';
import { Composition } from 'remotion';
import { Main } from './python-run/Main';
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from './python-run/timing';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="PythonRun" component={Main} durationInFrames={DURATION_IN_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
  </>
);
