"use client";

import { Loader2 } from "lucide-react";

type LoadingOverlayProps = {
  open: boolean;
  title?: string;
};

const LoadingOverlay = ({ open, title = "Processing your book…" }: LoadingOverlayProps) => {
  if (!open) return null;

  return (
    <div className="loading-wrapper" role="alertdialog" aria-busy aria-label={title}>
      <div className="loading-shadow-wrapper bg-white shadow-soft-md">
        <div className="loading-shadow">
          <Loader2 className="loading-animation text-[#663820] size-12" aria-hidden />
          <p className="loading-title font-serif text-center">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
