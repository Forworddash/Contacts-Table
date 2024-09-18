import { jsx } from "react/jsx-runtime";
function ScriptOnce({
  className,
  children,
  log,
  ...rest
}) {
  if (typeof document !== "undefined") {
    return null;
  }
  return /* @__PURE__ */ jsx(
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
export {
  ScriptOnce
};
//# sourceMappingURL=ScriptOnce.js.map
