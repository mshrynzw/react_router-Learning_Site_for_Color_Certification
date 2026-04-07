import type { RouteObject } from "react-router";
import Home from "./components/Home";
import PCCSColorWheel from "./components/PCCSColorWheel";
import PCCSTones from "./components/PCCSTones";
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
    path: "/pccs-tones",
    Component: PCCSTones,
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
