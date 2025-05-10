import { h } from "hastscript";

export function createPreCodeElement(language: string, code: string) {
  return h("pre", [
    h(
      "code",
      {
        className: [`language-${language}`],
      },
      code,
    ),
  ]);
}
