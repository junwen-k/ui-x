import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

export function VersionBanner() {
  return (
    <div className="group bg-primary px-4 py-1.5 text-primary-foreground">
      <Link
        href={process.env.NEXT_PUBLIC_APP_URL_V4!}
        className="flex items-center justify-center gap-1 text-center text-sm font-medium"
      >
        You are viewing the docs for Tailwind CSS v3. Switch to latest
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
