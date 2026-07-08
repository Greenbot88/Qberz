import { useEffect, useRef } from 'react';

interface CanvasBackgroundProps {
  scrollIndex: number; // 0 to 20
  glitchActive: boolean;
}

export default function CanvasBackground({ scrollIndex, glitchActive }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles system
    const particleCount = 75;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        color: i % 10 === 0 ? '#F25260' : i % 15 === 0 ? '#6614D9' : '#ffffff',
      });
    }

    // Stars system for later scrolls (15+)
    const starCount = 150;
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      brightness: number;
    }> = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        brightness: Math.random(),
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    let tick = 0;

    const render = () => {
      tick++;

      // Ease mouse coordinates for smooth inertia lagging cursor
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Dark movie background
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw subtle custom radial vignette representing glowing orb backlight
      if (mouseRef.current.active) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          width * 0.4
        );
        // Soft violet/cyan hue that fades out completely
        gradient.addColorStop(0, 'rgba(102, 20, 217, 0.045)');
        gradient.addColorStop(0.5, 'rgba(242, 82, 96, 0.015)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // ANIMATION STYLE 1: Network / Quantum Particles (Scroll index <= 6)
      if (scrollIndex <= 6) {
        particles.forEach((p, idx) => {
          // Drift
          p.x += p.vx;
          p.y += p.vy;

          // Wrap borders
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Interactive magnetic cursor attraction/repulsion
          if (mouseRef.current.active) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
              const force = (150 - dist) / 150;
              p.x -= (dx / dist) * force * 0.6;
              p.y -= (dy / dist) * force * 0.6;
            }
          }

          // Draw particles
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Connect close particles with delicate filaments
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 100) {
              const alpha = (100 - dist) / 100 * 0.08;
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      }

      // ANIMATION STYLE 2: Morphing Quantum Waveforms (Scroll index 7 to 13)
      if (scrollIndex >= 6 && scrollIndex <= 14) {
        const wavesCount = 4;
        ctx.lineWidth = 1;

        for (let w = 0; w < wavesCount; w++) {
          ctx.beginPath();
          // Mix violet, cyan, red and white
          const colors = [
            'rgba(242, 82, 96, 0.06)',
            'rgba(102, 20, 217, 0.06)',
            'rgba(242, 80, 65, 0.04)',
            'rgba(255, 255, 255, 0.03)'
          ];
          ctx.strokeStyle = colors[w % colors.length];

          const frequency = 0.002 + w * 0.001;
          const amplitude = 30 + w * 15;
          const speed = 0.015 - w * 0.002;

          for (let x = 0; x < width; x += 10) {
            // Standard wave formula with a modifier for mouse Y positions
            const mouseYModifier = mouseRef.current.active
              ? (1 - Math.abs(mouseRef.current.y - height / 2) / (height / 2)) * 30
              : 0;

            const y =
              height / 2 +
              Math.sin(x * frequency + tick * speed) * (amplitude + mouseYModifier) +
              Math.cos(x * 0.005 - tick * 0.01) * 10;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      }

      // ANIMATION STYLE 3: Slow Moving Stars / Cosmic Depth (Scroll index >= 14)
      if (scrollIndex >= 14) {
        stars.forEach((star) => {
          star.z -= 0.3; // Speed forward
          if (star.z <= 0) {
            star.z = width;
            star.x = (Math.random() - 0.5) * width * 2;
            star.y = (Math.random() - 0.5) * height * 2;
          }

          const k = 128.0 / star.z;
          const px = star.x * k + width / 2;
          const py = star.y * k + height / 2;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const size = (1 - star.z / width) * 2;
            const alpha = (1 - star.z / width) * star.brightness * 0.8;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();

            // Connect lines occasionally to simulate constellations/entanglements
            if (size > 1.2 && mouseRef.current.active) {
              const dx = mouseRef.current.x - px;
              const dy = mouseRef.current.y - py;
              if (Math.hypot(dx, dy) < 120) {
                ctx.strokeStyle = `rgba(242, 82, 96, ${alpha * 0.15})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                ctx.stroke();
              }
            }
          }
        });
      }

      // GLOBAL GLITCH EFFECT: Draw random glitches if glitchActive or during scroll 3/7/12
      if (glitchActive || scrollIndex === 3 || scrollIndex === 7 || scrollIndex === 12) {
        if (Math.random() < 0.2) {
          // Draw horizontal strip glitches
          const numGlitches = Math.floor(Math.random() * 4) + 1;
          for (let g = 0; g < numGlitches; g++) {
            const gy = Math.random() * height;
            const gh = Math.random() * 40 + 5;
            const gShift = (Math.random() - 0.5) * 30;

            ctx.drawImage(canvas, 0, gy, width, gh, gShift, gy, width, gh);

            // Add chromatic color filters over them
            ctx.fillStyle = Math.random() > 0.5 ? 'rgba(242, 82, 96, 0.15)' : 'rgba(242, 80, 65, 0.15)';
            ctx.fillRect(0, gy, width, gh);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scrollIndex, glitchActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none transition-all duration-1000"
      style={{ opacity: scrollIndex === 20 ? 0.2 : 0.8 }}
    />
  );
}
