"use client";

import { Suspense } from "react";
import EsqueceuSenha from "./page";

export const dynamic = "force-dynamic";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Carregando...</div>}>
      <EsqueceuSenha />
    </Suspense>
  );
}