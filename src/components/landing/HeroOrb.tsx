import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function HeroOrb() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const ry = clamp((px - 0.5) * 18, -10, 10)
      const rx = clamp((0.5 - py) * 18, -10, 10)
      setTilt({ rx, ry })
    }

    function onLeave() {
      setTilt({ rx: 0, ry: 0 })
    }

    const el = ref.current
    if (!el) return
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className="relative [perspective:900px] select-none">
      <motion.div
        className="glass shadow-glass rounded-[28px] p-6 md:p-8"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div
          className="absolute -inset-1 rounded-[30px] opacity-60 blur-xl"
          style={{
            background:
              'radial-gradient(420px 240px at 25% 25%, rgba(101,244,196,0.55), transparent 60%), radial-gradient(420px 240px at 80% 35%, rgba(255,171,126,0.5), transparent 60%), radial-gradient(520px 260px at 55% 80%, rgba(147,175,216,0.55), transparent 65%)',
          }}
        />

        <div className="relative grid place-items-center">
          <motion.div
            className="h-44 w-44 md:h-56 md:w-56 rounded-[40px] border border-white/40 dark:border-white/10"
            style={{
              background:
                'conic-gradient(from 210deg, rgba(22,196,149,0.85), rgba(107,144,197,0.75), rgba(255,127,66,0.78), rgba(22,196,149,0.85))',
              boxShadow: '0 18px 60px rgba(10, 20, 40, 0.22)',
              transform: 'translateZ(24px)',
            }}
            animate={{ rotate: [0, 8, 0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute rounded-[30px] px-3 py-2 text-xs font-medium"
            style={{
              transform: 'translateZ(44px)',
              background: 'rgba(255,255,255,0.70)',
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Live budget + charts
          </motion.div>

          <motion.div
            className="absolute -bottom-3 right-2 glass rounded-2xl px-3 py-2 text-xs text-[color:var(--muted)]"
            style={{ transform: 'translateZ(34px)' }}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            Calendar view
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
