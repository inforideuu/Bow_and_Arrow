import { useEffect, useRef, useState } from "react";
import { useInView, motion, useMotionValue, useTransform, animate } from "framer-motion";

export function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());
  const [val, setVal] = useState("0");

  useEffect(() => {
    const unsub = rounded.on("change", setVal);
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, to, count, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}
