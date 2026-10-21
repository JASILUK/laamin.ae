"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import { site, whatsappUrl } from "@/data/site";

/* ------------------------------------------------------------------
   ICON FILES — change the file names here if yours are different.
   They are read from /public/images/icons/
------------------------------------------------------------------- */
const ICON_DIR = "/images/icons";
const ICONS = {
  whatsapp: `${ICON_DIR}/whatsapp.svg`,
  phone: `${ICON_DIR}/phone.svg`,
  mail: `${ICON_DIR}/gmail.svg`,
  instagram: `${ICON_DIR}/instagram.svg`,
} as const;

type ContactItem = {
  key: string;
  label: string;
  href: string;
  icon: string;
  external?: boolean;
};

const items: ContactItem[] = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: whatsappUrl,
    icon: ICONS.whatsapp,
    external: true,
  },
  {
    key: "phone",
    label: site.phones[0].display,
    href: `tel:${site.phones[0].tel}`,
    icon: ICONS.phone,
  },
  {
    key: "mail",
    label: "Email us",
    href: `mailto:${site.email}`,
    icon: ICONS.mail,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: site.instagram,
    icon: ICONS.instagram,
    external: true,
  },
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, staggerDirection: -1 as const } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: 1 as const } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 24 },
  },
  exit: { opacity: 0, y: 12, scale: 0.7, transition: { duration: 0.14 } },
};

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <MotionConfig reducedMotion="user">
      {/* Soft backdrop — click anywhere outside to close */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="contact-backdrop"
            aria-hidden
            onClick={close}
            className="fixed inset-0 z-40 bg-navy-950/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex flex-col items-end gap-3">
        {/* Expanded actions */}
        <AnimatePresence>
          {open && (
            <motion.ul
              key="contact-list"
              id={panelId}
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-auto flex flex-col items-end gap-3"
            >
              {items.map((item) => (
                <motion.li
                  key={item.key}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <a
                    href={item.href}
                    aria-label={item.label}
                    onClick={close}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-3"
                  >
                    <span className="rounded-full bg-navy-900 px-3.5 py-1.5 text-[13px] font-medium text-white shadow-lg shadow-navy-950/20 transition-transform duration-300 group-hover:-translate-x-1">
                      {item.label}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white shadow-lg shadow-navy-950/15 transition duration-300 group-hover:scale-110 group-hover:border-brand-400 group-focus-visible:scale-110">
                      <Image
                        src={item.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                      />
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Main toggle button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close contact options" : "Open contact options"}
          className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-xl shadow-navy-950/30 ring-1 ring-white/20 transition-colors duration-300 hover:bg-brand-700"
        >
          {!open && (
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-brand-400/40 animate-ping motion-reduce:hidden"
            />
          )}

          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="close"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
                <path d="M8.5 11h7M8.5 14h4" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
    </MotionConfig>
  );
}