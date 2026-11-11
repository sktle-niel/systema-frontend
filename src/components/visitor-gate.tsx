import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Wordmark } from "@/components/ui/wordmark";
import { useProjectModal } from "@/components/project-modal/use-project-modal";
import { hasSeenGate, markGateSeen } from "@/lib/visitor-gate";

// First-visit welcome gate: asks a brand-new visitor (this device has never
// dismissed it before — see @/lib/visitor-gate) what brought them here, before
// they start scrolling the site. Every choice, including skip, dismisses it
// for good on this device.
export function VisitorGate() {
  const navigate = useNavigate();
  const { open: openProjectModal } = useProjectModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasSeenGate()) {
      // Let the landing page paint first so the gate doesn't feel like a
      // blocking splash before there's anything behind it.
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    markGateSeen();
    setVisible(false);
  };

  const chooseAgent = () => {
    dismiss();
    navigate("/apply");
  };

  const chooseClient = () => {
    dismiss();
    openProjectModal();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Welcome to SYSTEMA"
            className="w-full max-w-md rounded-t-2xl border border-line bg-surface p-7 sm:rounded-2xl sm:p-8"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Wordmark />
            <h2 className="font-display mt-5 text-2xl text-ink">
              Welcome! What brings you here?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Pick what fits — or skip and look around first.
            </p>

            <div className="mt-6 space-y-3">
              <GateOption
                title="I need a project built"
                desc="Jump straight to the project request form."
                onClick={chooseClient}
              />
              <GateOption
                title="I want to refer clients"
                desc="Apply as an agent and earn commission on projects you bring in."
                onClick={chooseAgent}
              />
            </div>

            <button
              type="button"
              onClick={dismiss}
              className="mt-5 w-full text-center text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              Skip, just browsing
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GateOption({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-canvas p-4 text-left transition-all hover:border-ink/30 hover:bg-surface"
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block text-[13px] text-muted">{desc}</span>
      </span>
      <Arrow />
    </button>
  );
}

function Arrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink"
      aria-hidden
    >
      <path
        d="M5 11L11 5M11 5H6M11 5V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
