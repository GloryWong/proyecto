import path from "node:path";
import { ROOT_DIR } from "../constants";

export function getProjectPath(name: string) {
  return path.join(ROOT_DIR, name)
}
