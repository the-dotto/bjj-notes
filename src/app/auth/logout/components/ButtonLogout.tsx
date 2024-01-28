"use client";

import { Button } from "~/components/Button";
import { onLogOut } from "./button-logout.actions";

export function ButtonLogout() {
  return (
    <Button onClick={() => onLogOut()} isOutlined>
      Log Out
    </Button>
  );
}
