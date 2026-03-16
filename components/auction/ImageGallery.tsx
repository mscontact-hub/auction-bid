'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ImageGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] bg-zinc-100 rounded-2xl overflow-hidden">
        <Image
          src={images[activeIndex]}
          alt="Vehicle"
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
              activeIndex === idx ? "border-black scale-95" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
