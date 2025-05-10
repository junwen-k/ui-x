import { Kbd } from "@/registry/new-york/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Kbd>
          <span className="text-xs">⌘</span>K
        </Kbd>
        <span className="text-muted-foreground text-sm">Show command menu</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>
          <span className="text-xs">⌘</span>C
        </Kbd>
        <span className="text-muted-foreground text-sm">Copy</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>
          <span className="text-xs">⌘</span>V
        </Kbd>
        <span className="text-muted-foreground text-sm">Paste</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>
          <span className="text-xs">⌘</span>Z
        </Kbd>
        <span className="text-muted-foreground text-sm">Undo</span>
      </div>
    </div>
  );
}
