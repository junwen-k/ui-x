import { format } from "date-fns";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TimeProps
  extends Omit<React.ComponentPropsWithoutRef<"time">, "children"> {
  children: Parameters<typeof format>[0];
  dateTimeFormatStr?: Parameters<typeof format>[1];
  formatStr?: Parameters<typeof format>[1];
}

function Time({
  children,
  dateTimeFormatStr = "yyyy-MM-dd",
  formatStr = "PPP",
  className,
  ...props
}: TimeProps) {
  return (
    <time
      data-slot="time"
      dateTime={format(children, dateTimeFormatStr)}
      className={cn("whitespace-nowrap", className)}
      {...props}
    >
      {format(children, formatStr)}
    </time>
  );
}

export { Time };
