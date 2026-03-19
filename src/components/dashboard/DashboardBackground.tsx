import { motion } from 'framer-motion'
import { useMemo } from 'react'

export function DashboardBackground() {
  // Memoize static styles to prevent unnecessary re-renders
  const backgroundStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 100%)',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.65'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  }), [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-br from-base-50 to-base-100 dark:from-base-950 dark:to-black">
      {/* Heavy filters and blend modes are expensive; use only where critical */}
      
      {/* 3D-like Large Background Sphere 1 */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[5%] left-[5%] w-[25rem] h-[25rem] md:w-[35rem] md:h-[35rem] rounded-full opacity-40 dark:opacity-20 translate-z-0 will-change-transform"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(101,244,196,0.4), transparent 70%)',
          filter: 'blur(40px)'
        }}
      />
      
      {/* 3D-like Large Background Sphere 2 */}
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 2 }}
        className="absolute bottom-[-10%] right-[0%] w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] rounded-full opacity-30 dark:opacity-10 translate-z-0 will-change-transform"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(255,171,126,0.4), transparent 70%)',
          filter: 'blur(50px)'
        }}
      />

      {/* DISTINCT 3D FLOATING ELEMENTS (Optimized) */}

      {/* 3D Glass Pill 1 */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [15, 20, 15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] -left-16 md:left-[5%] w-32 h-64 md:w-32 md:h-72 flex items-center justify-center rounded-full border border-white/40 dark:border-white/10 shadow-2xl backdrop-blur-sm z-0 will-change-transform"
        style={{
          background: 'linear-gradient(135deg, rgba(255,171,126,0.6) 0%, rgba(255,127,66,0.3) 100%)',
        }}
      >
        <div className="absolute inset-2 rounded-full border border-white/20 dark:border-white/5 opacity-40" />
      </motion.div>

      {/* 3D Glass Donut */}
      <motion.div
        animate={{ y: [0, 40, 0], rotate: [-15, -10, -15] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[20%] -right-20 md:right-[5%] w-48 h-48 md:w-64 md:h-64 rounded-full border-[20px] md:border-[30px] border-white/20 dark:border-white/10 shadow-xl backdrop-blur-md z-0 will-change-transform"
        style={{
          background: 'rgba(22, 196, 149, 0.25)'
        }}
      />

      {/* 3D Floating Cube/Box Layer */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [45, 50, 45] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[60%] -left-10 md:left-[8%] w-24 h-24 md:w-36 md:h-36 rounded-3xl border border-white/40 dark:border-white/10 shadow-lg backdrop-blur-sm z-0 will-change-transform"
        style={{
          background: 'linear-gradient(45deg, rgba(147,175,216,0.5) 0%, rgba(107,144,197,0.3) 100%)',
        }}
      />

      {/* Orbiting rings - Simplified */}
      <div className="absolute top-[10%] right-[0%] w-[60rem] h-[60rem] md:-mr-[200px] border border-mint-500/10 dark:border-mint-500/5 rounded-full border-dashed opacity-30 animate-spin-slow" />

      {/* Optimized Noise Layer (Inlined SVG) */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
        style={backgroundStyle}
      />
    </div>
  )
}

