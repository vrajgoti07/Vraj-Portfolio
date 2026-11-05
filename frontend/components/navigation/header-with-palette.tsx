"use client";

import { useState } from "react";
import { Navbar } from "./navbar";
import { CommandPalette } from "./command-palette";

export function HeaderWithPalette() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <Navbar onOpenCommandPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}

