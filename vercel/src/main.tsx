import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import MachMemoSite, { type PageKey } from "../../app/MachMemoSite";
import "../../app/globals.css";

const routes: Record<string, PageKey> = {
  "/": "home",
  "/products/docs": "docs",
  "/products/fix": "fix",
  "/products/health": "health",
  "/solutions/machine-shops": "machine-shops",
  "/solutions/maintenance-teams": "maintenance-teams",
  "/solutions/industrial-suppliers": "industrial-suppliers",
  "/pricing": "pricing",
  "/about": "about",
  "/contact": "contact",
  "/request-demo": "request-demo",
  "/signin": "signin",
  "/security": "security",
  "/resources/case-studies": "case-studies",
  "/resources/faq": "faq",
  "/resources/roi-calculator": "roi-calculator",
};

function currentPage(): PageKey {
  const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/";
  return routes[normalizedPath] ?? "home";
}

function VercelApp() {
  const [page, setPage] = useState<PageKey>(() => currentPage());

  useEffect(() => {
    function syncRoute() {
      setPage(currentPage());
    }

    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  return <MachMemoSite page={page} />;
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <VercelApp />
  </React.StrictMode>,
);
