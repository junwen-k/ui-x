import registry from "../../registry.json";

export const PAGES_NEW: string[] = [];

export const REGISTRY_NAMES = new Set(registry.items.map((item) => item.name));
