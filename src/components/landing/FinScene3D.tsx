import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function FinScene3D() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onMove(e: PointerEvent) {
      const node = ref.current
      if (!node) return
      const r = node.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const ry = clamp((px - 0.5) * 22, -12, 12)
      const rx = clamp((0.5 - py) * 22, -12, 12)
      setTilt({ rx, ry })
    }

    function onLeave() {
      setTilt({ rx: 0, ry: 0 })
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className="relative w-full [perspective:1000px] select-none">
      <motion.div
        className="relative glass shadow-glass rounded-[28px] overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(520px 260px at 18% 30%, rgba(101,244,196,0.45), transparent 60%), radial-gradient(520px 260px at 78% 25%, rgba(255,171,126,0.42), transparent 62%), radial-gradient(640px 360px at 55% 86%, rgba(147,175,216,0.55), transparent 65%)',
          }}
        />

        <div className="relative p-6 md:p-8">
          <div className="grid place-items-center">
            <div className="relative h-56 w-56 md:h-72 md:w-72" style={{ transform: 'translateZ(22px)' }}>
              <motion.div
                className="absolute inset-0 rounded-[44px]"
                style={{
                  background:
                    'conic-gradient(from 210deg, rgba(22,196,149,0.95), rgba(107,144,197,0.75), rgba(255,127,66,0.78), rgba(22,196,149,0.95))',
                  filter: 'saturate(1.1)',
                  boxShadow: '0 22px 80px rgba(10, 20, 40, 0.22)',
                  transform: 'rotate(-10deg)',
                }}
                animate={{ rotate: [-10, -6, -10] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                className="absolute inset-6 rounded-[36px] border border-white/40 dark:border-white/10"
                style={{
                  background:
                    'radial-gradient(140px 120px at 30% 25%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(180px 160px at 70% 75%, rgba(255,255,255,0.18), transparent 70%), linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05))',
                  transform: 'translateZ(14px) rotate(8deg)',
                }}
                animate={{ rotate: [8, 10, 8] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                className="absolute left-8 top-10 h-16 w-16 md:h-20 md:w-20 rounded-[28px] border border-white/40 dark:border-white/10"
                style={{
                  background:
                    'radial-gradient(60px 60px at 30% 30%, rgba(255,255,255,0.75), rgba(255,255,255,0.12)), conic-gradient(from 240deg, rgba(22,196,149,0.95), rgba(107,144,197,0.65), rgba(255,127,66,0.7))',
                  transform: 'translateZ(44px) rotate(-12deg)',
                }}
                animate={{ y: [0, -6, 0], rotate: [-12, -8, -12] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                className="absolute right-10 bottom-10 h-14 w-14 md:h-18 md:w-18 rounded-[24px] border border-white/40 dark:border-white/10"
                style={{
                  background:
                    'radial-gradient(60px 60px at 30% 30%, rgba(255,255,255,0.7), rgba(255,255,255,0.12)), conic-gradient(from 240deg, rgba(255,127,66,0.85), rgba(107,144,197,0.6), rgba(22,196,149,0.75))',
                  transform: 'translateZ(36px) rotate(16deg)',
                }}
                animate={{ y: [0, 7, 0], rotate: [16, 20, 16] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              />

              <motion.svg
                viewBox="0 0 300 160"
                className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[86%] opacity-95"
                style={{ transform: 'translateZ(56px)' }}
              >
                <defs>
                  <linearGradient id="finLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
                    <stop offset="20%" stopColor="rgba(255,255,255,0.55)" />
                    <stop offset="80%" stopColor="rgba(255,255,255,0.8)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M18 118 C 60 82, 96 124, 140 86 C 174 58, 210 96, 244 62 C 264 42, 282 54, 292 38"
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M18 118 C 60 82, 96 124, 140 86 C 174 58, 210 96, 244 62 C 264 42, 282 54, 292 38"
                  fill="none"
                  stroke="url(#finLine)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

