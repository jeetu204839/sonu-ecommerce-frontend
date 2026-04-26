"use client";

import {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

import AdminLoaderVisual from "@/app/admin/component/AdminLoaderVisual";

type AdminLoaderContextValue = Readonly<{
  /** Wrap any async client work (fetch, server action from client, etc.). */
  runWithLoading: <T>(fn: () => Promise<T>) => Promise<T>;
  /** Manual increments — prefer runWithLoading when possible. */
  startLoading: () => void;
  stopLoading: () => void;
}>;

const AdminLoaderContext = createContext<AdminLoaderContextValue | null>(null);

export function useAdminLoader(): AdminLoaderContextValue {
  const ctx = useContext(AdminLoaderContext);
  if (!ctx) {
    throw new Error("useAdminLoader must be used within AdminLoaderProvider");
  }
  return ctx;
}

function AdminRouteChangeNotifier({
  onRouteChange,
}: Readonly<{ onRouteChange: () => void }>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteChange();
  }, [pathname, searchParams, onRouteChange]);

  return null;
}

type AdminLoaderProviderProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Shows a loader over the admin content area when:
 * - User follows an in-app `/admin` link (instant feedback before RSC finishes), or
 * - Code calls `runWithLoading` / `startLoading`–`stopLoading` around async API work.
 */
export default function AdminLoaderProvider({ children }: AdminLoaderProviderProps) {
  const [navPending, setNavPending] = useState(false);
  const [apiDepth, setApiDepth] = useState(0);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showOverlay = navPending || apiDepth > 0;

  const clearNavAndSafetyTimer = useCallback(() => {
    setNavPending(false);
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.download) return;
      const hrefAttr = anchor.getAttribute("href");
      if (!hrefAttr || hrefAttr.startsWith("#") || hrefAttr.startsWith("javascript:")) {
        return;
      }
      let url: URL;
      try {
        url = new URL(hrefAttr, globalThis.location.origin);
      } catch {
        return;
      }
      if (url.origin !== globalThis.location.origin) return;
      if (!url.pathname.startsWith("/admin")) return;

      setNavPending(true);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        setNavPending(false);
        safetyTimerRef.current = null;
      }, 45_000);
    };

    document.addEventListener("click", onClickCapture, true);
    return () => {
      document.removeEventListener("click", onClickCapture, true);
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }
    };
  }, []);

  const startLoading = useCallback(() => {
    setApiDepth((d) => d + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setApiDepth((d) => Math.max(0, d - 1));
  }, []);

  const runWithLoading = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T> => {
      setApiDepth((d) => d + 1);
      try {
        return await fn();
      } finally {
        setApiDepth((d) => Math.max(0, d - 1));
      }
    },
    [],
  );

  const value = useMemo(
    () => ({ runWithLoading, startLoading, stopLoading }),
    [runWithLoading, startLoading, stopLoading],
  );

  return (
    <AdminLoaderContext.Provider value={value}>
      <div
        className="admin-loader-host"
        style={{ position: "relative", minHeight: "100%" }}
      >
        <Suspense fallback={null}>
          <AdminRouteChangeNotifier onRouteChange={clearNavAndSafetyTimer} />
        </Suspense>
        {children}
        {showOverlay ? <AdminLoaderVisual variant="overlay" /> : null}
      </div>
    </AdminLoaderContext.Provider>
  );
}
