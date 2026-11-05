"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface NodeData {
  id: string;
  name: string;
  shortName: string;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  size: number;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  isHovered: boolean;
}

const PROJECT_NODES = [
  { id: "knowledge-ai-voice-agent", name: "Knowledge-AI-Voice-Agent", shortName: "Voice Agent", orbitRadius: 130, orbitSpeed: 0.0012, initialAngle: 0.2, size: 7 },
  { id: "ai-powered-intern-management-system", name: "AI-powered-intern-management-system", shortName: "Intern Mgmt", orbitRadius: 185, orbitSpeed: -0.0009, initialAngle: 1.3, size: 7 },
  { id: "smart-doc-expiry-app", name: "Smart_Doc_Expiry_App", shortName: "Doc Expiry", orbitRadius: 145, orbitSpeed: 0.0015, initialAngle: 2.5, size: 6 },
  { id: "ai-learning-roadmap", name: "AI-Learning-RoadMap", shortName: "Learning RoadMap", orbitRadius: 215, orbitSpeed: -0.0007, initialAngle: 3.7, size: 6.5 },
  { id: "smart-timetable-generation", name: "Smart-TimeTable-Generation", shortName: "Timetable AI", orbitRadius: 160, orbitSpeed: 0.0011, initialAngle: 4.8, size: 6 },
  { id: "portfolio", name: "Portfolio", shortName: "Portfolio (v1)", orbitRadius: 235, orbitSpeed: 0.0006, initialAngle: 5.6, size: 5.5 },
];

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  const nodesRef = useRef<NodeData[]>(
    PROJECT_NODES.map((p) => ({
      ...p,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      isHovered: false,
    }))
  );

  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const scrollToProject = useCallback((id: string) => {
    const el = document.getElementById(id) || document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReducedMotion);
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let angle = 0;

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause loop when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // Tab visibility handling
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop (60fps)
    const render = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      angle += 0.005;

      // Draw faint orbital guide tracks
      [130, 160, 185, 215].forEach((radius) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update node positions with physics & cursor magnetics
      const mouse = mouseRef.current;
      let hoveredNode: NodeData | null = null;

      nodesRef.current.forEach((node) => {
        const currentAngle = node.initialAngle + angle * (node.orbitSpeed * 1000);
        // Base orbit coordinate
        const baseX = centerX + Math.cos(currentAngle) * node.orbitRadius;
        const baseY = centerY + Math.sin(currentAngle) * node.orbitRadius;

        // Mouse magnetic pull within 110px radius
        let magnetX = 0;
        let magnetY = 0;

        if (mouse.active) {
          const dx = mouse.x - baseX;
          const dy = mouse.y - baseY;
          const dist = Math.hypot(dx, dy);
          const maxDist = 110;

          if (dist < maxDist) {
            const pull = (1 - dist / maxDist) * 35;
            magnetX = (dx / dist) * pull;
            magnetY = (dy / dist) * pull;
          }
        }

        node.targetX = baseX + magnetX;
        node.targetY = baseY + magnetY;

        // Smooth spring interpolation
        node.currentX += (node.targetX - node.currentX) * 0.08;
        node.currentY += (node.targetY - node.currentY) * 0.08;

        // Check if mouse hovers directly on node (radius + 8px padding)
        const hitDist = Math.hypot(mouse.x - node.currentX, mouse.y - node.currentY);
        const isHovered = mouse.active && hitDist < node.size + 10;
        node.isHovered = isHovered || focusedNodeId === node.id;
        if (node.isHovered) hoveredNode = node;

        // Draw hairline linking central "Vraj" core to project node
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.currentX, node.currentY);
        ctx.strokeStyle = node.isHovered
          ? "rgba(200, 255, 61, 0.45)"
          : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = node.isHovered ? 1.5 : 1;
        ctx.stroke();

        // Draw outer orbit dot
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.isHovered ? "#C8FF3D" : "#8C8A84";
        ctx.fill();

        // Outer glow on hover
        if (node.isHovered) {
          ctx.beginPath();
          ctx.arc(node.currentX, node.currentY, node.size + 5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(200, 255, 61, 0.35)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Central "Vraj" core node
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      ctx.fillStyle = "#C8FF3D";
      ctx.fill();

      // Outer pulse ring for center
      ctx.beginPath();
      ctx.arc(centerX, centerY, 26, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(200, 255, 61, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // "VG" center text
      ctx.font = "bold 10px JetBrains Mono, monospace";
      ctx.fillStyle = "#0B0B0C";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("VRAJ", centerX, centerY);

      // Tooltip update
      if (hoveredNode) {
        setActiveTooltip({
          name: (hoveredNode as NodeData).name,
          x: (hoveredNode as NodeData).currentX,
          y: (hoveredNode as NodeData).currentY,
        });
      } else {
        setActiveTooltip(null);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [focusedNodeId]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
    setActiveTooltip(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    nodesRef.current.forEach((node) => {
      const dist = Math.hypot(clickX - node.currentX, clickY - node.currentY);
      if (dist < node.size + 15) {
        scrollToProject(node.id);
      }
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center cursor-crosshair select-none"
      aria-label="Interactive Project Constellation Graph"
    >
      {/* Reduced Motion Static Fallback */}
      {isReducedMotion ? (
        <div className="flex flex-col items-center justify-center p-8 border border-border-hairline rounded-xl bg-bg-surface w-full max-w-md">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-contrast font-mono font-bold text-xs mb-6">
            VRAJ
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">
            Project Constellation (Static Mode)
          </p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {PROJECT_NODES.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => scrollToProject(node.id)}
                className="p-2.5 rounded border border-border-hairline bg-bg-elevated hover:border-accent text-left font-mono text-[11px] text-text-primary hover:text-accent transition-colors"
              >
                // {node.shortName}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="block w-full h-full" />

          {/* Interactive Tooltip Overlay */}
          {activeTooltip && (
            <div
              style={{
                left: `${activeTooltip.x}px`,
                top: `${activeTooltip.y - 28}px`,
                transform: "translate(-50%, -100%)",
              }}
              className="absolute pointer-events-none z-20 px-2.5 py-1 rounded border border-accent/40 bg-bg-surface/95 backdrop-blur-md shadow-lg"
            >
              <span className="font-mono text-[11px] text-accent tracking-wide whitespace-nowrap">
                // {activeTooltip.name}
              </span>
            </div>
          )}

          {/* Keyboard accessible focus overlay */}
          <div className="sr-only">
            <h3>Project Navigation Nodes</h3>
            {PROJECT_NODES.map((node) => (
              <button
                key={node.id}
                type="button"
                onFocus={() => setFocusedNodeId(node.id)}
                onBlur={() => setFocusedNodeId(null)}
                onClick={() => scrollToProject(node.id)}
              >
                View project {node.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Decorative Constellation Meta Tag */}
      <div className="absolute bottom-2 right-4 font-mono text-[10px] text-text-muted uppercase tracking-widest hidden sm:block pointer-events-none">
        [ Constellation: 6 Connected Nodes ]
      </div>
    </div>
  );
}

