import React, { memo } from 'react';

export const Button = memo(({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  href,
  className = '',
  ariaLabel
}) => {
  const baseClasses = "group relative flex items-center justify-center gap-3 overflow-hidden font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer z-20";

  const variants = {
    primary: "px-8 py-4 border shadow-sm hover:shadow-md border-black bg-black text-white hover:bg-orange-600 hover:border-orange-600",
    outline: "px-8 py-4 border shadow-sm hover:shadow-md border-black bg-white text-black hover:border-orange-600 hover:text-white",
    minimal: "px-0 py-2 border-none bg-transparent text-black hover:text-white justify-start"
  };

  const content = (
    <>
      {/* Decorative layers */}
      <div className="absolute inset-0 -translate-x-full bg-black/10 transition-transform duration-500 ease-out-quint group-hover:translate-x-0 group-hover:delay-75" />
      <div className="absolute inset-0 -translate-x-full bg-orange-600 transition-transform duration-500 ease-out-quint group-hover:translate-x-0" />

      <span className="z-10 flex items-center gap-2 relative transition-transform duration-500 group-hover:scale-[1.02]">
        {Icon && (
          <Icon
            size={14}
            className="transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white"
          />
        )}
        <span className="relative group-hover:text-white transition-colors duration-500">
          {children}
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
        </span>
      </span>
    </>
  );

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    const isAnchor = href.startsWith('#');

    const handleClick = (e) => {
      if (isAnchor) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    return (
      <a
        href={href}
        onClick={handleClick}
        target={isExternal && !href.startsWith('mailto:') ? "_blank" : undefined}
        rel={isExternal && !href.startsWith('mailto:') ? "noopener noreferrer" : undefined}
        className={combinedClasses}
        aria-label={ariaLabel || children}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel || children}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
