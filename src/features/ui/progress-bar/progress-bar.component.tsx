"use client";

import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return (
    <AppProgressBar
      height="3px"
      color="#228be6"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
