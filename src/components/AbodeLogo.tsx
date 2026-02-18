const AbodeLogo = ({ size = 32, showText = true }: { size?: number; showText?: boolean }) => {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* House-shaped A */}
        <path
          d="M20 4L4 18H10V34H17V24H23V34H30V18H36L20 4Z"
          className="fill-primary"
        />
        {/* Crossbar of the A */}
        <rect x="14" y="18" width="12" height="3" rx="1" className="fill-primary-foreground" />
      </svg>
      {showText && (
        <span className="font-heading text-xl font-bold tracking-tight text-foreground">
          bode
        </span>
      )}
    </div>
  );
};

export default AbodeLogo;
