"use client";

import { useEffect } from "react";

/**
 * Safely attaches CKEditor 4 to a `<textarea id={textareaId}>`.
 * Handles React remounts (key/nonce changes), Strict Mode double effects, and
 * slow script load — avoids stale instances that throw inside CK (e.g. `hasAttribute` on undefined).
 */
export function useCkeditorLongDescription(
  textareaId: string,
  remountNonce: number,
): void {
  useEffect(() => {
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let raf1 = 0;
    let raf2 = 0;

    function destroyInstance(): void {
      const inst = window.CKEDITOR?.instances?.[textareaId];
      if (!inst) return;
      try {
        inst.destroy(true);
      } catch {
        /* ignore */
      }
    }

    function tryReplace(): boolean {
      if (cancelled) return true;
      const CK = window.CKEDITOR;
      if (!CK?.replace) return false;

      const orphan = CK.instances[textareaId];
      if (orphan) {
        try {
          const raw = orphan.element?.$ as Element | undefined;
          if (raw?.isConnected) return true;
        } catch {
          /* stale editor */
        }
        destroyInstance();
      }

      const el = document.getElementById(textareaId);
      if (
        !el ||
        !el.isConnected ||
        el.tagName !== "TEXTAREA" ||
        !(el instanceof HTMLTextAreaElement)
      ) {
        return false;
      }

      try {
        CK.replace(el, {
          height: 320,
          removePlugins: "scayt,wsc",
        });
      } catch {
        return false;
      }

      return Boolean(CK.instances[textareaId]);
    }

    destroyInstance();

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;
        if (tryReplace()) return;
        intervalId = setInterval(() => {
          if (cancelled) {
            if (intervalId !== undefined) clearInterval(intervalId);
            intervalId = undefined;
            return;
          }
          if (tryReplace() && intervalId !== undefined) {
            clearInterval(intervalId);
            intervalId = undefined;
          }
        }, 100);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (intervalId !== undefined) clearInterval(intervalId);
      destroyInstance();
    };
  }, [textareaId, remountNonce]);
}

export function syncCkeditorLongDescriptionToTextarea(textareaId: string): void {
  try {
    window.CKEDITOR?.instances?.[textareaId]?.updateElement();
  } catch {
    /* ignore */
  }
}
