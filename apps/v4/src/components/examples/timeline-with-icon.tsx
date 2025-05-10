import { Code, Heart, Moon, Pizza } from "lucide-react";

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

export default function TimelineWithIcon() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <Pizza />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Eat</TimelineTitle>
          <TimelineDescription>Because you need strength</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <Code />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Code</TimelineTitle>
          <TimelineDescription>Because it&apos;s awesome!</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <Moon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Sleep</TimelineTitle>
          <TimelineDescription>Because you need rest</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <Heart />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Repeat</TimelineTitle>
          <TimelineDescription>
            Because this is the life you love!
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
