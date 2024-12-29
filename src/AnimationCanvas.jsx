import React, { useRef, useEffect } from 'react';

const AnimationCanvas3DTilt = ({ numBodies = 69 }) => {
  const canvasRef = useRef(null);
  const planeRotation = useRef(0); // Tracks the tilt angle of the rotation plane
  const bodyOffsetX = useRef(0.25*window.innerWidth); // Tracks the offset based on mouse movement

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

    // Create bodies with random properties
    const bodies = Array.from({ length: numBodies }, (_, i) => ({
      radius: Math.random() * window.innerWidth / 3.5 + 50, // Orbit radius
      angle: Math.random() * Math.PI * 2, // Initial angle
      speed: (Math.random() - 0.5) * 0.01, // Angular velocity
      size: Math.random() * 8 + 3, // Size of the body
      depth: Math.random() * 0.7 + 0.3, // Simulated depth
      // Generate a random colorful hue for each body
      color: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
      trail: [], // Store the trail of positions
    }));

    // Adjust plane tilt based on mouse movement
    const updatePlaneRotation = (event) => {
      const normalizedY = event.clientY / window.innerHeight; // Range: 0 to 1
      const targetTilt = normalizedY * Math.PI / 6; // Map to 0 to 60 degrees in radians
      planeRotation.current += (targetTilt - planeRotation.current) * 0.1; // Smooth transition
    };

    // Adjust horizontal movement based on mouse's X position
    const updateBodyOffset = (event) => {
      const normalizedX = event.clientX / window.innerWidth; // Range: 0 to 1
      const targetOffset = normalizedX * 0.1 * window.innerWidth; // 10% of screen width
      bodyOffsetX.current += (targetOffset - bodyOffsetX.current + 0.25*window.innerWidth) * 0.1; // Smooth transition
    };

    window.addEventListener('mousemove', updatePlaneRotation);
    window.addEventListener('mousemove', updateBodyOffset);

    const animate = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#213555';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Get current tilt angle of the rotation plane
        const planeTilt = planeRotation.current;
        const offsetX = bodyOffsetX.current; // Get the current X offset

        bodies.forEach((body) => {
          // Update the body's position
          body.angle += body.speed;

          // Rotate the orbit plane based on the tilt
          const xRotated = body.radius * Math.cos(body.angle);
          const yRotated = body.radius * Math.sin(body.angle) * Math.cos(planeTilt);
          const zRotated = body.radius * Math.sin(body.angle) * Math.sin(planeTilt);

          // Project the 3D position to 2D with the added X offset
          const xProjected = centerX + xRotated + offsetX; // Apply the offset
          const yProjected = centerY - yRotated; // Flip y-axis for canvas

          // Simulate depth-based scaling
          const scale = 1 + zRotated * 0.003; // Adjust scaling for depth effect
          const size = body.size * scale;

          // Adjust color brightness based on depth
          const color = body.color;

          // Draw the trail (only in direction of the plane's tilt)
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();

          // Only draw the trail in the direction of the plane tilt
          body.trail.forEach((pos, idx) => {
            if (idx === 0) {
              ctx.moveTo(pos.x, pos.y);
            } else {
              ctx.lineTo(pos.x, pos.y);
            }
          });
          ctx.stroke();

          // Add the current position to the trail
          body.trail.push({ x: xProjected, y: yProjected });
          if (body.trail.length > 100) {
            body.trail.shift(); // Remove the oldest position when trail exceeds 100 points
          }

          // Draw the body
          ctx.beginPath();
          ctx.arc(xProjected, yProjected, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        });
      }
      catch (error) {
        console.error("Error in animation loop:", error);
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', updatePlaneRotation);
      window.removeEventListener('mousemove', updateBodyOffset);
    };
  }, [numBodies]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default AnimationCanvas3DTilt;

