import Link from "next/link"
import { useEffect, useState } from "react"
import { client } from "@/sanity/client"

interface LegalPage {
  _id: string
  slug: string
  title: string
}
interface Settings {
  websiteName: string
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [legalPages, setLegalPages] = useState<LegalPage[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const [pagesData, settingsData] = await Promise.all([
        client.fetch<LegalPage[]>(`
          *[_type == "page" && slug.current in ["imprint", "privacy", "terms"]] {
            _id,
            "slug": slug.current,
            title
          }
        `),
        client.fetch<Settings>(`
          *[_type == "settings"][0] {
            websiteName
          }
        `)
      ])
      setLegalPages(pagesData)
      setSettings(settingsData)
    }

    fetchData()
  }, [])

  return (
    <footer className="bg-muted py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} {settings?.websiteName || 'Company'}. All rights reserved.
            </div>
          </div>
          {legalPages.length > 0 && (
            <nav className="flex space-x-6">
              {legalPages.map((page) => (
                <Link
                  key={page._id}
                  href={`/${page.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {page.title}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  )
}