import { Link } from 'react-router-dom'
import { APP_NAME } from '../../constants/app'
import logoUrl from '../../assets/logo.svg'

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link to="/" className={`flex flex-col md:flex-row items-center gap-3 hover:opacity-90 transition-opacity ${className}`}>
      <div className="w-12 h-12 md:w-10 md:h-10 shrink-0 transition-transform hover:scale-105">
        <img src={logoUrl} alt="Logo" className="w-full h-full object-contain filter drop-shadow-md" />
      </div>
      {showText && (
        <span className="font-serif text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-base-900 to-base-600 dark:from-white dark:to-white/70">
          {APP_NAME}
        </span>
      )}
    </Link>
  )
}
