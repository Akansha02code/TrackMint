import { motion } from 'framer-motion'

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <motion.div
      className="relative grid place-items-center rounded-2xl"
      style={{ width: size, height: size }}
      initial={false}
      whileHover={{ rotate: -6, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mint-300/70 via-white/40 to-peach-300/60 dark:from-mint-500/20 dark:via-white/5 dark:to-peach-500/15" />
      <div className="absolute inset-[1px] rounded-2xl glass" />
      <motion.svg
        viewBox="0 0 48 48"
        className="relative"
        width={Math.round(size * 0.62)}
        height={Math.round(size * 0.62)}
        aria-hidden="true"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="etwCoin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16c495" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#6b90c5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff7f42" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M24 6c8.5 0 15 3.7 15 8.2S32.5 22.4 24 22.4 9 18.7 9 14.2 15.5 6 24 6Z"
          fill="url(#etwCoin)"
        />
        <path
          d="M39 14.6c0 4.5-6.5 8.2-15 8.2S9 19.1 9 14.6V20c0 4.5 6.5 8.2 15 8.2S39 24.5 39 20v-5.4Z"
          fill="url(#etwCoin)"
          opacity="0.9"
        />
        <path
          d="M39 20.4c0 4.5-6.5 8.2-15 8.2S9 24.9 9 20.4V26c0 4.5 6.5 8.2 15 8.2S39 30.5 39 26v-5.6Z"
          fill="url(#etwCoin)"
          opacity="0.78"
        />
        <path
          d="M25.6 12.1c1.9.2 3.2 1.1 3.3 2.6h-2.1c-.1-.6-.6-.9-1.3-1-.8-.1-1.4.2-1.5.8-.1.6.4.9 1.6 1.2 2.4.5 3.5 1.3 3.3 3-.2 1.6-1.6 2.4-3.5 2.4l-.3 1.6h-1.6l.3-1.6c-2-.2-3.3-1.2-3.4-2.8h2.1c.1.7.7 1.1 1.6 1.2 1 .1 1.6-.2 1.7-.9.1-.6-.5-.9-1.8-1.2-2.2-.5-3.3-1.2-3.1-2.9.2-1.5 1.5-2.3 3.3-2.3l.3-1.6h1.6l-.3 1.5Z"
          fill="rgba(255,255,255,0.92)"
        />
      </motion.svg>
    </motion.div>
  )
}

