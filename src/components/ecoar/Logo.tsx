import logo from "@/assets/ecoar-logo.png";

export function Logo({ size = 36, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="ECOAR"
        width={size}
        height={size}
        className="rounded-full shadow-soft"
        style={{ width: size, height: size }}
      />
      {withText && (
        <div className="leading-tight">
          <div className="font-display text-lg font-bold tracking-tight text-foreground">
            ECOAR
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Prefeitura de Arcoverde
          </div>
        </div>
      )}
    </div>
  );
}
