import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Packet {
  startNode: Node;
  endNode: Node;
  progress: number;
  speed: number;
  color: string;
}

export default function AutomationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; active: boolean }>({
    x: null,
    y: null,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const maxDistance = 140; // Max distance for drawing connection lines
    let nodeCount = 45;

    // Adjust node count based on screen size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      if (canvas.width < 768) {
        nodeCount = 20; // Fewer nodes on mobile
      } else {
        nodeCount = 45;
      }
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      packets = [];
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35, // Very slow velocities
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 1.5, // 1.5px to 3px
          baseAlpha: Math.random() * 0.15 + 0.15, // 15% to 30% baseline opacity
          alpha: 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.005,
        });
      }
    };

    // Get a random connected node
    const getConnectedNode = (currNode: Node): Node | null => {
      const candidates = nodes.filter((n) => {
        if (n === currNode) return false;
        const dx = n.x - currNode.x;
        const dy = n.y - currNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < maxDistance;
      });

      if (candidates.length === 0) return null;
      return candidates[Math.floor(Math.random() * candidates.length)];
    };

    // Spawns a packet if there's room
    const spawnPacket = () => {
      if (packets.length >= 8 || nodes.length < 2) return;
      const startIdx = Math.floor(Math.random() * nodes.length);
      const startNode = nodes[startIdx];
      const endNode = getConnectedNode(startNode);

      if (endNode) {
        packets.push({
          startNode,
          endNode,
          progress: 0,
          speed: Math.random() * 0.006 + 0.004, // 0.4% to 1.0% per frame
          color: Math.random() > 0.3 ? '#00D4FF' : '#3B82F6', // cyan or blue
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    // Listen to container/window pointer movements
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;

      // Update & Draw Nodes
      nodes.forEach((node) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges with buffer
        const buffer = 40;
        if (node.x < -buffer) node.x = w + buffer;
        if (node.x > w + buffer) node.x = -buffer;
        if (node.y < -buffer) node.y = h + buffer;
        if (node.y > h + buffer) node.y = -buffer;

        // Pulsing opacity
        node.pulsePhase += node.pulseSpeed;
        node.alpha = node.baseAlpha + Math.sin(node.pulsePhase) * 0.1;

        // Mouse reaction: gentle pull towards mouse if active
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            // Very subtle offset calculation
            const force = (180 - dist) / 180;
            node.x += dx * force * 0.015;
            node.y += dy * force * 0.015;
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${node.alpha})`;
        ctx.fill();

        // Node glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${node.alpha * 0.25})`;
        ctx.fill();
      });

      // Draw Connection Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Fade lines as they get further apart
            const opacity = (1 - dist / maxDistance) * 0.06;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Periodically spawn packets
      if (Math.random() < 0.02) {
        spawnPacket();
      }

      // Update & Draw Packets (representing lead flows / automations)
      packets.forEach((pkt, idx) => {
        pkt.progress += pkt.speed;

        // If arrived at end node, reroute or destroy
        if (pkt.progress >= 1) {
          const nextNode = getConnectedNode(pkt.endNode);
          if (nextNode && Math.random() > 0.2) {
            pkt.startNode = pkt.endNode;
            pkt.endNode = nextNode;
            pkt.progress = 0;
            // slightly randomize speed for dynamic feel
            pkt.speed = Math.random() * 0.006 + 0.004;
          } else {
            packets.splice(idx, 1);
            return;
          }
        }

        // Calculate packet coordinates
        const px = pkt.startNode.x + (pkt.endNode.x - pkt.startNode.x) * pkt.progress;
        const py = pkt.startNode.y + (pkt.endNode.y - pkt.startNode.y) * pkt.progress;

        // Draw packet glow & center dot
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadowBlur for other elements
      });

      // Draw Mouse Follow Glow
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const glowRadius = 180;
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.075)'); // Soft cyan glow
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.025)'); // Fades to indigo
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
