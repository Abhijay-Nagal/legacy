"use client";

import { motion } from "motion/react";
import { Sidebar } from "@/components/layout/Sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
          },
        },
      }}
      className="flex min-h-screen flex-col gap-4 p-4 md:flex-row"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -16 },
          show: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Sidebar />
      </motion.div>

      <motion.main
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass flex flex-1 items-center justify-center rounded-2xl p-8"
      >
        {children}
      </motion.main>
    </motion.div>
  );
}
