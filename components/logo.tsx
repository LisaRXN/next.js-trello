import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "../public/fonts/CalSans.woff2"
});

const Logo = () => {

  return (
    <Link href="/">
      <div className="hoover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
        <p className={cn("text-lg text-neutral-700 pb-1",
            headingFont.className
        )}>Taskify</p>
      </div>
    </Link>
  );
};

export default Logo;
