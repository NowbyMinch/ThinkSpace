"use client";

import { createContext } from "react";

export const FavoritosContext = createContext({
  refreshFavoritos: () => {},
});
