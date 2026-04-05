import { Hero } from '@/components/sections/home/Hero';
import { Features } from '@/components/sections/home/Features';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Hero />
      <Features />
    </main>
  );
}