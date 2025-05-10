import { BadgeGroup, BadgeGroupItem } from "@/registry/new-york/ui/badge-group";

export default function BadgeGroupDemo() {
  return (
    <BadgeGroup type="single">
      <BadgeGroupItem value="chocolate">Chocolate</BadgeGroupItem>
      <BadgeGroupItem value="mint">Mint</BadgeGroupItem>
      <BadgeGroupItem value="strawberry">Strawberry</BadgeGroupItem>
      <BadgeGroupItem value="vanilla">Vanilla</BadgeGroupItem>
    </BadgeGroup>
  );
}
