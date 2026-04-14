import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"
import React from "react"

// Mock framer-motion globally — renders as plain DOM elements in tests
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion")
  return {
    ...actual,
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => {
          return function MotionComponent(props: Record<string, unknown>) {
            const {
              children,
              initial,
              animate,
              whileInView,
              variants,
              viewport,
              transition,
              exit,
              ...rest
            } = props
            return React.createElement(prop, rest, children as React.ReactNode)
          }
        },
      }
    ),
    AnimatePresence: function AnimatePresence(props: { children: React.ReactNode }) {
      return props.children
    },
    MotionConfig: function MotionConfig(props: { children: React.ReactNode }) {
      return props.children
    },
    useInView: () => true,
    useScroll: () => ({ scrollY: { get: () => 0 } }),
    useTransform: () => 0,
  }
})
