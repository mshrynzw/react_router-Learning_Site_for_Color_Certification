import React from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryRouter } from "react-router";
import { routeConfig } from "./app/routes";

/** ビルド時に静的 HTML を書き出すパス一覧（routeConfig から導出） */
export const prerenderPaths = routeConfig
  .map((r) => r.path)
  .filter((p): p is string => typeof p === "string");

export function renderRoute(url: string): string {
  const router = createMemoryRouter(routeConfig, { initialEntries: [url] });
  return renderToString(
    React.createElement(RouterProvider, { router }),
  );
}
