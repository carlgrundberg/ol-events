"use client";

import { NextUIProvider } from "@nextui-org/react";
import PiwikProProvider from "@piwikpro/next-piwik-pro";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PiwikProProvider
      containerId="41f216ea-3a72-4440-9c8c-cd3b3a38c166"
      containerUrl="https://calle.piwik.pro"
    >
      <NextUIProvider>{children}</NextUIProvider>
    </PiwikProProvider>
  );
}
