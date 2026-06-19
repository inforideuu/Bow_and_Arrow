import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Target } from "lucide-react";

const links: { label: string; href: string; isExternal?: boolean }[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Programs", href: "#programs" },
  { label: "Achievements", href: "#achievements" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
  { label: "Admin", href: "/admin" },
];

export function Navbar({ onEnrollClick }: { onEnrollClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-elegant" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 flex h-16 lg:h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative">
            <img src="./b&a logo.png" alt="b&a logo.png" className="h-15 w-auto" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-widest text-foreground">BOW &amp; ARROW</div>
            <div className="text-[10px] tracking-[0.2em] text-muted-foreground -mt-0.5">ARCHERY ACADEMY</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.isExternal ? "_blank" : undefined}
              rel={l.isExternal ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onEnrollClick}
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-ember text-accent-foreground font-semibold text-sm hover:glow-ember transition-shadow cursor-pointer"
          >
            Join Now
          </button>
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass border-t border-border"
          >
            <div className="px-5 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.isExternal ? "_blank" : undefined}
                  rel={l.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="py-2 text-foreground hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onEnrollClick?.();
                }}
                className="mt-2 inline-flex justify-center items-center px-5 py-3 rounded-full bg-ember text-accent-foreground font-semibold cursor-pointer"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
