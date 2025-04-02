import path from "node:path";
import { cwd, env } from "node:process";
import openEditor from "open-editor";

interface EditorOptions {
  editor?: string;
  line?: number;
  column?: number;
}

export async function openInEditor(file: string, options: EditorOptions = {}) {
  try {
    const target = [{ file: path.resolve(cwd(), file), line: options?.line, column: options?.column }] as const;
    if (options?.editor)
      await openEditor(target, options);
    else
      await openEditor(target, {
        editor: env.EDITOR ?? env.VISUAL ?? env.TERM_PROGRAM
      });
    console.log(`'${path.basename(file)}'`, 'is opened in editor.')
    return true
  } catch (error) {
    console.error('Failed to open', file, 'in editor.', error)
    return false
  }
}
