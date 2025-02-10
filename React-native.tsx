// 1. Debug function - debugPrint ()
//  After any data treatment or complex operation on your code, it should be employed a debugPrint() call.

// There should be on index.tsx:

export const debugConfig = {
  enableDebug: true, // Ativa/desativa logs globalmente
  disableLogsFrom: ["page1.tsx", "components/", "utils/"], // Pode ser um arquivo ou pasta inteira
  onlyLogsFrom: null, // Se definido, apenas logs desses arquivos/pastas aparecerão
  onlyLogsWithTags: null, // Ex: ["API", "PERFORMANCE"] → Só exibe logs que tenham essas tags
  disableLogsWithTags: ["DEBUG"], // Bloqueia logs de certas tags
};


// There should be a function debugprint.ts:
import { debugConfig } from "./index";

export const debugPrint = (message: string, ...tags: string[]) => {
  if (!debugConfig.enableDebug) return; // Debug global desligado

  // Captura a stack trace e extrai o nome do arquivo de origem
  const stack = new Error().stack;
  let sourceFile = "unknown";
  let sourcePath = "";

  if (stack) {
    const match = stack.match(/\/([^\/]+\.tsx):\d+:\d+/); // Extrai nome do arquivo
    if (match) {
      sourceFile = match[1];
      sourcePath = stack.split("\n")[1]?.trim() || "";
    }
  }

  // Filtragem por pasta ou arquivo bloqueado
  if (debugConfig.disableLogsFrom.some((pattern) => sourcePath.includes(pattern))) return;

  // Se há uma restrição para apenas logs de certas pastas/arquivos
  if (debugConfig.onlyLogsFrom &&
      !debugConfig.onlyLogsFrom.some((pattern) => sourcePath.includes(pattern))) {
    return;
  }

  // Se houver tags obrigatórias e nenhuma delas estiver presente
  if (debugConfig.onlyLogsWithTags && tags.length > 0) {
    const hasValidTag = tags.some((tag) => debugConfig.onlyLogsWithTags?.includes(tag));
    if (!hasValidTag) return;
  }

  // Se houver tags bloqueadas
  if (debugConfig.disableLogsWithTags && tags.length > 0) {
    const hasDisabledTag = tags.some((tag) => debugConfig.disableLogsWithTags?.includes(tag));
    if (hasDisabledTag) return;
  }

  console.log(`[${sourceFile.toUpperCase()}]:`, message);
};






//Example:

// page1.tsx
export const DEBUG_TAGS = ["API", "PERFORMANCE"]; //optional

import { debugPrint } from "./debugPrint";

debugPrint("Fetching user data", ...DEBUG_TAGS);



//2. Use default colour pallet from constants.ts to ensure smooth transition from night mode and skins.
//3. Spell check variable and file names;
//4. Global variables should be on variables.ts and therefore imported.
//5. Implement the "tip" feature on every page.
//6. Test the code locally before pull request.
