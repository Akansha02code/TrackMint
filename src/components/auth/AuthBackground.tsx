import { motion } from 'framer-motion'
import { Wallet, Coins, Receipt, CreditCard, TrendingUp, PieChart, Banknote } from 'lucide-react'

export const AuthBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[linear-gradient(to_bottom_right,var(--bg0),var(--bg1))]">
    {/* Soft glowing orbs */}
    <motion.div
      animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] left-[15%] w-72 h-72 bg-mint-400/20 rounded-full blur-[80px]"
    />
    <motion.div
      animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-[10%] right-[15%] w-[30rem] h-[30rem] bg-peach-400/20 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{ y: [0, -20, 0], x: [0, -40, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[40%] right-[30%] w-64 h-64 bg-base-400/20 rounded-full blur-[60px]"
    />

    {/* Floating Expense Tracker Elements */}
    <motion.div 
      animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 15, 0] }} 
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} 
      className="absolute top-[15%] left-[8%] text-mint-500 opacity-[0.12] dark:opacity-20 flex"
    >
      <Wallet size={160} strokeWidth={1} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, 50, 0], x: [0, -30, 0], rotate: [0, -20, 0] }} 
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
      className="absolute bottom-[15%] left-[12%] text-peach-500 opacity-[0.12] dark:opacity-20 flex"
    >
      <CreditCard size={200} strokeWidth={1} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, -60, 0], x: [0, 40, 0], rotate: [0, 25, 0] }} 
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }} 
      className="absolute top-[20%] right-[8%] text-mint-600 opacity-[0.1] dark:opacity-20 flex"
    >
      <TrendingUp size={180} strokeWidth={1} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: [0, -15, 0] }} 
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
      className="absolute bottom-[20%] right-[15%] text-peach-600 opacity-[0.12] dark:opacity-20 flex"
    >
      <Receipt size={140} strokeWidth={1} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, -20, 0], x: [0, 30, 0], rotate: [0, 10, 0] }} 
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }} 
      className="absolute top-[10%] right-[35%] text-base-500 opacity-[0.1] dark:opacity-[0.15] flex"
    >
      <PieChart size={120} strokeWidth={1} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, 40, 0], x: [0, -40, 0], rotate: [0, -30, 0] }} 
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }} 
      className="absolute bottom-[35%] left-[5%] text-mint-400 opacity-[0.12] dark:opacity-20 flex"
    >
      <Coins size={150} strokeWidth={1} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 20, 0] }} 
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }} 
      className="absolute top-[45%] right-[5%] text-peach-400 opacity-[0.12] dark:opacity-20 flex"
    >
      <Banknote size={160} strokeWidth={1} />
    </motion.div>
    
    <motion.div 
      animate={{ rotate: [0, 360] }} 
      transition={{ duration: 150, repeat: Infinity, ease: "linear" }} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] border-2 border-mint-500/10 rounded-full border-dashed"
    />
    <motion.div 
      animate={{ rotate: [360, 0] }} 
      transition={{ duration: 200, repeat: Infinity, ease: "linear" }} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] border border-peach-500/10 rounded-full border-dashed"
    />
  </div>
)
