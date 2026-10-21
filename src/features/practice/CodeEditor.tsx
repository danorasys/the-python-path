import Editor, { loader } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor";
import { useEffect, useRef } from "react";

type MonacoApi = typeof Monaco;

const MONACO_VERSION = "0.55.1";
loader.config({ paths: { vs: `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min/vs` } });

const THEME = "the-python-path";

const defineTheme = (monaco: MonacoApi) => {
  monaco.editor.defineTheme(THEME, {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "5a6675", fontStyle: "italic" },
      { token: "keyword", foreground: "1f4e78", fontStyle: "bold" },
      { token: "string", foreground: "15703f" },
      { token: "number", foreground: "8a4b00" },
      { token: "identifier", foreground: "000000" },
      { token: "delimiter", foreground: "3d4754" },
    ],
    colors: {
      "editor.background": "#ffffff",
      "editor.lineHighlightBackground": "#f4f8fc",
      "editorLineNumber.foreground": "#8f9bab",
      "editorLineNumber.activeForeground": "#000000",
      "editor.selectionBackground": "#ffe58a",
      "editorCursor.foreground": "#3776ab",
    },
  });
};

interface CodeEditorProps {
  initialCode: string;
  label: string;
  loadingLabel: string;
  onChange: (code: string) => void;
  onRun: () => void;
}

export function CodeEditor({ initialCode, label, loadingLabel, onChange, onRun }: CodeEditorProps) {
  const onRunRef = useRef(onRun);
  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);

  const handleMount = (editor: Monaco.editor.IStandaloneCodeEditor, monaco: MonacoApi) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => onRunRef.current());
    void document.fonts.ready.then(() => {
      monaco.editor.remeasureFonts();
    });
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      defaultValue={initialCode}
      theme={THEME}
      beforeMount={defineTheme}
      onMount={handleMount}
      onChange={(value) => onChange(value ?? "")}
      loading={loadingLabel}
      options={{
        ariaLabel: label,
        automaticLayout: true,
        fontFamily: "'JetBrains Mono Variable', Consolas, monospace",
        fontSize: 15,
        lineHeight: 24,
        minimap: { enabled: false },
        padding: { top: 16, bottom: 16 },
        scrollBeyondLastLine: false,
        tabSize: 4,
        wordWrap: "on",
        renderLineHighlight: "line",
      }}
    />
  );
}
