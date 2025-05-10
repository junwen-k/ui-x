import { PackageCheck, ShoppingCart, Truck } from "lucide-react";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/registry/new-york/ui/timeline";

export default function TimelineHorizontal() {
  return (
    <Timeline orientation="horizontal" className="min-h-40">
      <TimelineItem className="before:flex-1">
        <TimelineSeparator>
          <TimelineDot>
            <ShoppingCart />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Ordered</TimelineTitle>
          <TimelineDescription className="whitespace-nowrap">
            9.15 AM, January 1, 2024
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="after:flex-1">
        <TimelineContent>
          <TimelineTitle>Shipped</TimelineTitle>
          <TimelineDescription className="whitespace-nowrap">
            12:20 PM, January 4, 2024
          </TimelineDescription>
        </TimelineContent>
        <TimelineSeparator>
          <TimelineDot>
            <PackageCheck />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem className="before:flex-1">
        <TimelineSeparator>
          <TimelineDot>
            <Truck />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Out for Delivery</TimelineTitle>
          <TimelineDescription className="whitespace-nowrap">
            07:00 AM, January 8, 2024
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
