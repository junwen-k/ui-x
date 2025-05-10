import { CopyButton } from "@/components/copy-button";

export interface CodeBlockProps extends React.ComponentProps<"pre"> {
  __rawString__?: string;
}

export function CodeBlock({ __rawString__, ...props }: CodeBlockProps) {
  return (
    <div data-slot="code-block" className="group relative">
      <pre
        data-slot="code-block-pre"
        className="my-6 max-h-[650px] overflow-auto rounded-xl shadow-[0_1.5px_2px_0_theme(colors.black/32%),0_0_0_1px_theme(colors.white/10%),0_-1px_0_0_theme(colors.white/4%)]"
        {...props}
      />
      {__rawString__ && (
        <CopyButton
          data-slot="code-block-copy-button"
          className="group/button absolute top-3.5 right-4 overflow-hidden opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100"
          value={__rawString__}
        />
      )}
    </div>
  );
}
