import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/registry/default/ui/timeline"

export default function TimelineAlternate() {
  return (
    <Timeline>
      <TimelineItem className="before:flex-1">
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Eat</TimelineTitle>
          <TimelineDescription>Because you need strength</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="after:flex-1">
        <TimelineContent>
          <TimelineTitle>Code</TimelineTitle>
          <TimelineDescription>Because it&apos;s awesome!</TimelineDescription>
        </TimelineContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem className="before:flex-1">
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Sleep</TimelineTitle>
          <TimelineDescription>Because you need rest</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="after:flex-1">
        <TimelineContent>
          <TimelineTitle>Repeat</TimelineTitle>
          <TimelineDescription>
            Because this is the life you love!
          </TimelineDescription>
        </TimelineContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
      </TimelineItem>
    </Timeline>
  )
}