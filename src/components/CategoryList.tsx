"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { Category } from "@/types"; // استيراد النوع

// واجهة جديدة للـ props
interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  // --- لا يوجد تغيير في هذا الجزء ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const speed = 1;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;
    const container = containerRef.current;
    let requestId: number;
    let offset = 0;
    const animate = () => {
      offset -= speed;
      if (container.scrollWidth / 2 <= -offset) offset = 0;
      container.style.transform = `translateX(${offset}px)`;
      requestId = requestAnimationFrame(animate);
    };
    animate();
    const handleMouseEnter = () => cancelAnimationFrame(requestId);
    const handleMouseLeave = () => animate();
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      cancelAnimationFrame(requestId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!isMobile || categories.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, categories.length]);
  // --- نهاية الجزء الذي لا يوجد به تغيير ---

  const placeholderImage = "https://via.placeholder.com/400x500.png?text=No+Image";

  return (
    <div className="overflow-hidden relative mt-8">
      {/* Desktop Continuous Slider */}
      {!isMobile && (
        <div
          ref={containerRef}
          className="flex gap-4 whitespace-nowrap will-change-transform scrollbar-hide"
        >
          {/* استخدام البيانات الديناميكية */}
          {[...categories, ...categories].map((category, i ) => (
            <Link key={`${category._id}-${i}`} href={`/list?cat=${category.slug}`} className="flex-shrink-0 w-1/4 inline-block hover:scale-[1.01]">
              <div className="relative bg-slate-100 w-full h-96">
                <Image
                  src={category.image?.secure_url || placeholderImage}
                  alt={category.name}
                  fill
                  sizes="20vw"
                  className="object-cover rounded-md"
                />
              </div>
              <h1 className="mt-4 font-light text-xl tracking-wide">{category.name}</h1>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Slider */}
      {isMobile && (
        <div className="relative w-full overflow-hidden h-96">
          <div
            className="flex transition-all ease-in-out duration-1000"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {/* استخدام البيانات الديناميكية */}
            {categories.map((category) => (
              <div key={category._id} className="min-w-full px-4">
                <Link href={`/list?cat=${category.slug}`} className="block w-full">
                  <div className="relative bg-slate-100 w-full h-96 rounded-xl overflow-hidden">
                    <Image
                      src={category.image?.secure_url || placeholderImage}
                      alt={category.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <h1 className="mt-4 font-light text-xl tracking-wide">
                    {category.name}
                  </h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
