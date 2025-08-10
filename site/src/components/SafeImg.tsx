"use client";

import { useState } from "react";

type SafeImgProps = {
  src: string;
  alt?: string;
  className?: string;
};

export function SafeImg({ src, alt = "", className }: SafeImgProps) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHidden(true)}
    />
  );
}


