"use client";

import { motion } from "framer-motion";
import { PropsWithChildren, type ReactElement } from "react";

type RevealMode = "inView" | "mount";

export function Reveal(
  {
    children,
    delay = 0,
    mode = "inView",
  }: PropsWithChildren<{ delay?: number; mode?: RevealMode }>
): ReactElement {
  if (mode === "mount") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
