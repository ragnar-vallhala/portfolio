import { render_glsl } from './graphics/SpaceCanvasRenderer';
import './SpaceCanvas.css'
import React, { useRef, useEffect } from 'react';

const SpaceCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    // Set the canvas resolution to match CSS size multiplied by devicePixelRatio
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    render_glsl(canvasRef);
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block'
      }}
    />
  );
};

export default SpaceCanvas;

