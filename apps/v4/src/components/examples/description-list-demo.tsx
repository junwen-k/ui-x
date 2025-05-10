import {
  DescriptionDetail,
  DescriptionGroup,
  DescriptionList,
  DescriptionTerm,
} from "@/registry/new-york/ui/description-list";

export default function DescriptionListDemo() {
  return (
    <DescriptionList>
      <DescriptionGroup>
        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetail>
          <span className="focus:ring-ring inline-flex items-center rounded-md border bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 ring-green-600/20 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
            Published
          </span>
        </DescriptionDetail>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>Last Updated</DescriptionTerm>
        <DescriptionDetail>Yesterday at 12:34 PM</DescriptionDetail>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>Storage Usage</DescriptionTerm>
        <DescriptionDetail>2.4 GB of 5 GB</DescriptionDetail>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>API Endpoints</DescriptionTerm>
        <DescriptionDetail>4 active endpoints</DescriptionDetail>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>Database</DescriptionTerm>
        <DescriptionDetail>PostgreSQL v14.5</DescriptionDetail>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>Environment</DescriptionTerm>
        <DescriptionDetail>Production</DescriptionDetail>
      </DescriptionGroup>
    </DescriptionList>
  );
}
