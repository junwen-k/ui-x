import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SiteMain } from "@/components/site-main"
import { VersionBanner } from "@/components/version-banner"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <VersionBanner />
      <SiteHeader />
      <SiteMain>{children}</SiteMain>
      <SiteFooter />
    </>
  )
}
