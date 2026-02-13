import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  as?: 'button' | 'link';
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  as = 'button',
  href,
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';

  const variants = {
    primary: 'bg-blue-400 text-white hover:bg-blue-500',
    secondary: 'bg-red-400 text-white hover:bg-red-500',
    outline: 'border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (as === 'link' && href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
