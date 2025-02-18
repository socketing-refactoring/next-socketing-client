"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/common/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
    </QueryClientProvider>
  );
}
