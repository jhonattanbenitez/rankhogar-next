// components/Logo.tsx
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "", }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.png" 
        alt="Logo"
        width={300}
        height={40}
        priority
      />
     
    </Link>
  );
}
