'use client';

import { useEffect, useRef, useState } from 'react';

const imageSources = [
  '/book1.svg',
  '/book2.svg',
  '/book3.svg',
  '/book4.svg',
  '/book5.svg',
];

type FloatingImageData = {
  src: string;
  x: number;
  y: number;
  size: number;
  zIndex: number;
  speed: number;
  id: string;
};

const FloatingImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<FloatingImageData[]>([]);

  useEffect(() => {
    const generatedImages = imageSources.map((src, index) => ({
      id: `img-${index}`,
      src,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 220, // 96px to 144px
      zIndex: 10 + index,
      speed: 1,
    }));
    setImages(generatedImages);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setImages((prevImages) =>
        prevImages.map((img) => {
          const dx = Math.sin(Date.now() * 0.001 * img.speed) * 0.5;
          const dy = Math.cos(Date.now() * 0.0012 * img.speed) * 0.5;
          return {
            ...img,
            x: (img.x + dx + window.innerWidth) % window.innerWidth,
            y: (img.y + dy + window.innerHeight) % window.innerHeight,
          };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const imgs = document.querySelectorAll('.floating-image');
      imgs.forEach((img: any) => {
        const speed = parseFloat(img.dataset.speed || '1');
        const x = (window.innerWidth / 2 - e.clientX) * 0.01 * speed;
        const y = (window.innerHeight / 2 - e.clientY) * 0.01 * speed;
        img.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          className="floating-image absolute object-contain pointer-events-auto transition-transform duration-200"
          style={{
            top: img.y,
            left: img.x,
            width: `${img.size}px`,
            height: `${img.size}px`,
            zIndex: img.zIndex,
          }}
          data-speed={img.speed}
          alt=""
          onClick={() => alert(`Clicked ${img.src}`)}
        />
      ))}
    </div>
  );
};

export default FloatingImages;
