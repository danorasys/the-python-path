import type { PrismTheme } from "prism-react-renderer";

export const codeTheme: PrismTheme = {
  plain: { color: "#000000", backgroundColor: "#ffffff" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#5a6675", fontStyle: "italic" } },
    { types: ["keyword", "boolean", "constant", "important"], style: { color: "#1f4e78", fontWeight: "700" } },
    { types: ["string", "char", "attr-value", "triple-quoted-string"], style: { color: "#15703f" } },
    { types: ["function", "class-name"], style: { color: "#b4361d" } },
    { types: ["number"], style: { color: "#8a4b00" } },
    { types: ["builtin", "decorator", "annotation"], style: { color: "#5b2fb3" } },
    { types: ["operator", "punctuation"], style: { color: "#3d4754" } },
  ],
};
