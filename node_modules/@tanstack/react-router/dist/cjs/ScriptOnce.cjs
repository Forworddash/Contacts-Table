"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
function ScriptOnce({
  className,
  children,
  log,
  ...rest
}) {
  if (typeof document !== "undefined") {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "script",
    {
      ...rest,
      className: `tsr-once ${className || ""}`,
      dangerouslySetInnerHTML: {
        __html: [
          children,
          (log ?? true) && process.env.NODE_ENV === "development" ? `console.info(\`Injected From Server:
${children}\`)` : ""
        ].filter(Boolean).join("\n")
      }
    }
  );
}
exports.ScriptOnce = ScriptOnce;
//# sourceMappingURL=ScriptOnce.cjs.map
