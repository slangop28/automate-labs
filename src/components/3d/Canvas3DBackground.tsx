import React, { useEffect, useRef } from 'react';

interface Canvas3DBackgroundProps {
  interactive?: boolean;
  density?: number;
  className?: string;
}

export const Canvas3DBackground: React.FC<Canvas3DBackgroundProps> = ({
  interactive = true,
  density = 45,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
    };

    // Generate 3D perspective particle mesh
    interface Particle {
      x: number;
      y: number;
      z: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const colors = ['#FFB7C5', '#E6A0B0', '#FDF8F9', '#E2C2C9', '#FFD1DC'];

    const initParticles = () => {
      particles.length = 0;
      const count = Math.floor((width * height) / 18000) * (density / 40);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          z: Math.random() * 800 + 200,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.2,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw subtle futuristic cyber waves in background
      ctx.strokeStyle = 'rgba(255, 183, 197, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 30) {
          const y =
            height * (0.3 + i * 0.2) +
            Math.sin(x * 0.003 + time + i) * 60 +
            Math.cos(time * 0.5 + i) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw interactive 3D particle nodes & connection vectors
      const fov = 400;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wave motion & velocity
        p.originX += p.vx;
        p.originY += p.vy;

        if (p.originX < 0) p.originX = width;
        if (p.originX > width) p.originX = 0;
        if (p.originY < 0) p.originY = height;
        if (p.originY > height) p.originY = 0;

        // Mouse displacement with spring return
        const dx = mouse.x - p.originX;
        const dy = mouse.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 35;
          p.x = p.originX - (dx / dist) * force;
          p.y = p.originY - (dy / dist) * force;
        } else {
          p.x += (p.originX - p.x) * 0.1;
          p.y += (p.originY - p.y) * 0.1;
        }

        // 3D perspective projection
        const scale = fov / (fov + (p.z % 600));
        const projX = p.x;
        const projY = p.y;
        const projSize = p.size * scale;

        // Draw particle node
        ctx.save();
        ctx.globalAlpha = p.alpha * scale;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.5, projSize), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 110) {
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - distNodes / 110) * 0.15;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70 ${className}`}
    />
  );
};

export default Canvas3DBackground;
