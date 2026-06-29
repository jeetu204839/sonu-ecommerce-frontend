import { getShopBootstrap } from "@/app/(shop)/lib/bootstrap-loader";

const DRAWER_ID = "shopNavDrawer";

export function hideShopNavDrawer(): void {
  if (typeof document === "undefined") {
    return;
  }

  const drawer = document.getElementById(DRAWER_ID);
  if (!drawer) {
    return;
  }

  const api = getShopBootstrap();
  api?.Offcanvas.getInstance(drawer)?.hide();
}
