"use client";

import { ReactNode } from "react";
// @ts-ignore: Clerk types may not be present yet
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./navbar";

interface Props {
  children: ReactNode;
}

export default function ClientProviders({ children }: Props) {
  return (
    <ClerkProvider>
      <Navbar />
      {children}
    </ClerkProvider>
  );
}
