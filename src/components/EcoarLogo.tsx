import logo from "@/assets/ecoar-logo.png";

export function EcoarLogo({ size = 48, withText = true, tagline = false }: { size?: number, withText?: boolean, tagline?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="ECOAR Logo" style={{ width: size, height: size }} className="object-contain" />
      {withText && (
        <div className="flex flex-col">
          <span className="font-display text-2xl font-black leading-none tracking-tighter text-foreground">
            ECOAR
          </span>
          {tagline && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Portal do Sertão
            </span>
          )}
        </div>
      )}
    </div>
  );
}
