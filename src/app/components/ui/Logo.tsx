import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "black" | "white";
}

export default function Logo({ className = "", variant = "black" }: LogoProps) {
  const logoSrc = variant === "white" ? "/logo-white.png" : "/logo-black.png";

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image src={logoSrc} alt="Logo" width={300} height={100} priority style={{height: 'auto'}} />
    </Link>
  );
}
