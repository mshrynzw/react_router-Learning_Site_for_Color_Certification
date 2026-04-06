import type { RouteObject } from "react-router";
import Home from "./components/Home";
import PCCSColorWheel from "./components/PCCSColorWheel";
import JISColors from "./components/JISColors";
import EyeStructure from "./components/EyeStructure";

/** ルートごとの SSG およびクライアントルーターで共有する定義 */
export const routeConfig: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/pccs",
    Component: PCCSColorWheel,
  },
  {
    path: "/jis-colors",
    Component: JISColors,
  },
  {
    path: "/eye-structure",
    Component: EyeStructure,
  },
];
