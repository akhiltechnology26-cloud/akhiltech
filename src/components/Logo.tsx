interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export default function Logo({ variant = 'full', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative w-11 h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg shadow-primary-500/30 ring-1 ring-white/20">
        <img
          src="/logo%20copy.png"
          alt="Akhil Technology logo"
          className="w-full h-full object-cover"
        />
      </div>
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className="font-heading font-bold text-white text-lg tracking-tight">
            Akhil<span className="text-accent-300"> Technology</span>
          </span>
          <span className="text-[10px] text-gray-400 font-body font-medium tracking-wide mt-0.5">
            IT SALES · SERVICES · SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
}
