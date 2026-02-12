import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  as: 'link';
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
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

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

  if (props.as === 'link') {
    const { as, href, ...linkProps } = props;
    return (
      <Link href={href} className={combinedClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { as, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
