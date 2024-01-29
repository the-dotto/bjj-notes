'use client';

import { useCallback, ComponentProps } from "react";
import { Element } from "./components/Element";
import { Leaf } from "./components/Leaf";

export function useRenderElement() {
  return useCallback(
    (props: ComponentProps<typeof Element>) => <Element {...props} />,
    []
  );
}

export function useRenderLeaf() {
  return useCallback(
    (props: ComponentProps<typeof Leaf>) => <Leaf {...props} />,
    []
  );
}
