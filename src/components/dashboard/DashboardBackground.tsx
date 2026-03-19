import { motion } from 'framer-motion'

export function DashboardBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-br from-base-50 to-base-100 dark:from-base-950 dark:to-black">
      {/* 3D-like Large Background Sphere 1 */}
      <motion.div
        animate={{ y: [0, -60, 0], x: [0, 40, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[5%] left-[5%] w-[25rem] h-[25rem] md:w-[35rem] md:h-[35rem] rounded-full opacity-60 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(101,244,196,0.6), rgba(22,196,149,0.15) 50%, transparent 70%)',
          filter: 'blur(30px)'
        }}
      />
      
      {/* 3D-like Large Background Sphere 2 */}
      <motion.div
        animate={{ y: [0, 80, 0], x: [0, -50, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-10%] right-[0%] w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] rounded-full opacity-50 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(255,171,126,0.6), rgba(255,127,66,0.15) 50%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* DISTINCT 3D FLOATING ELEMENTS */}

      {/* 3D Glass Pill 1 */}
      <motion.div
        animate={{ y: [0, -40, 0], rotate: [15, 25, 15] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] -left-16 md:left-[5%] w-32 h-64 md:w-32 md:h-72 flex items-center justify-center rounded-full border border-white/60 dark:border-white/20 shadow-[0_30px_60px_rgba(255,127,66,0.4)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-md z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,171,126,0.85) 0%, rgba(255,127,66,0.5) 100%)',
        }}
      >
        <div className="absolute inset-2 rounded-full border border-white/40 dark:border-white/10 opacity-70" />
      </motion.div>

      {/* 3D Glass Donut (Circle with hole) */}
      <motion.div
        animate={{ y: [0, 50, 0], rotate: [-20, -10, -20], scale: [1, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[20%] -right-20 md:right-[5%] w-48 h-48 md:w-64 md:h-64 rounded-full border-[20px] md:border-[30px] border-white/40 dark:border-white/20 shadow-[0_20px_50px_rgba(22,196,149,0.4)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl z-0"
        style={{
          boxShadow: 'inset 0 10px 30px rgba(255,255,255,0.4), 0 30px 60px rgba(22,196,149,0.3)',
          background: 'rgba(22, 196, 149, 0.45)'
        }}
      />

      {/* 3D Floating Cube/Box Layer */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [45, 60, 45] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[60%] -left-10 md:left-[8%] w-24 h-24 md:w-36 md:h-36 rounded-3xl border border-white/60 dark:border-white/20 shadow-[20px_20px_50px_rgba(107,144,197,0.4)] dark:shadow-[20px_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl z-0"
        style={{
          background: 'linear-gradient(45deg, rgba(147,175,216,0.9) 0%, rgba(107,144,197,0.5) 100%)',
        }}
      />

      {/* Orbiting rings for depth */}
      <motion.div 
        animate={{ rotate: [0, 360] }} 
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }} 
        className="absolute top-[10%] right-[0%] w-[60rem] h-[60rem] md:-mr-[20rem] border border-mint-500/15 dark:border-mint-500/5 rounded-full border-dashed opacity-50"
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay" />
    </div>
  )
}
