import React, { useRef, useEffect } from 'react';

const AnimationCanvas3DTilt = ({ numBodies = 69 }) => {
  const canvasRef = useRef(null);
  const planeRotation = useRef(0); // Tracks the tilt angle of the rotation plane
  const bodyOffsetX = useRef(0.25 * window.innerWidth); // Tracks the offset based on input movement

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const bodies = Array.from({ length: numBodies }, () => ({
      radius: Math.random() * window.innerWidth / 3.5 + 50,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() - 0.5) * 0.01,
      size: Math.random() * 8 + 3,
      depth: Math.random() * 0.7 + 0.3,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      trail: [],
    }));

    const updatePlaneRotation = (x, y) => {
      const normalizedY = y / window.innerHeight; // Range: 0 to 1
      const targetTilt = normalizedY * Math.PI / 6; // Map to 0 to 60 degrees in radians
      planeRotation.current += (targetTilt - planeRotation.current) * 0.1; // Smooth transition
    };

    const updateBodyOffset = (x) => {
      const normalizedX = x / window.innerWidth; // Range: 0 to 1
      const targetOffset = normalizedX * 0.1 * window.innerWidth; // 10% of screen width
      bodyOffsetX.current += (targetOffset - bodyOffsetX.current + 0.25 * window.innerWidth) * 0.1; // Smooth transition
    };

    const handleMouseMove = (event) => {
      updatePlaneRotation(event.clientX, event.clientY);
      updateBodyOffset(event.clientX);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0]; // Get the first touch point
      updatePlaneRotation(touch.clientX, touch.clientY);
      updateBodyOffset(touch.clientX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#213555';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const planeTilt = planeRotation.current;
        const offsetX = bodyOffsetX.current;

        bodies.forEach((body) => {
          body.angle += body.speed;

          const xRotated = body.radius * Math.cos(body.angle);
          const yRotated = body.radius * Math.sin(body.angle) * Math.cos(planeTilt);
          const zRotated = body.radius * Math.sin(body.angle) * Math.sin(planeTilt);

          const xProjected = centerX + xRotated + offsetX;
          const yProjected = centerY - yRotated;

          const scale = 1 + zRotated * 0.003;
          const size = body.size * scale;

          const color = body.color;

          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          body.trail.forEach((pos, idx) => {
            if (idx === 0) {
              ctx.moveTo(pos.x, pos.y);
            } else {
              ctx.lineTo(pos.x, pos.y);
            }
          });
          ctx.stroke();

          body.trail.push({ x: xProjected, y: yProjected });
          if (body.trail.length > 100) {
            body.trail.shift();
          }

          ctx.beginPath();
          ctx.arc(xProjected, yProjected, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        });
      } catch (error) {
        console.error("Error in animation loop:", error);
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [numBodies]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default AnimationCanvas3DTilt;

