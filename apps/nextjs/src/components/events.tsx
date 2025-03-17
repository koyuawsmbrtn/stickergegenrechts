import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { DocumentIcon, MusicalNoteIcon, CameraIcon } from '@heroicons/react/24/outline'

interface Event {
  _id: string
  title: string
  description?: string
  date: string
  location?: string
  url?: string
  actions?: string[]
}

const getActionIcon = (action: string) => {
  switch (action) {
    case 'stickers':
      return <DocumentIcon className="w-5 h-5" />
    case 'music':
      return <MusicalNoteIcon className="w-5 h-5" />
    case 'camera':
      return <CameraIcon className="w-5 h-5" />
    default:
      return null
  }
}

const translateAction = (action: string) => {
    switch (action) {
        case 'stickers':
        return 'Sticker'
        case 'music':
        return 'Musik'
        case 'camera':
        return 'Sofortbilder'
        default:
        return null
    }
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch<Event[]>(`
          *[_type == "event"] | order(date asc) {
            _id,
            title,
            description,
            date,
            location,
            url,
            actions
          }
        `)
        setEvents(data)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg border border-border">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 my-6">
      {events.map((event) => (
        <div
          key={event._id}
          className="p-6 rounded-lg border border-border hover:border-border/60 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {event.url ? (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {event.title}
                  </a>
                ) : (
                  event.title
                )}
              </h3>
              <div className="text-muted-foreground mb-2">
                <time dateTime={event.date}>
                  {format(new Date(event.date), 'PPP', { locale: de })}
                </time>
                {event.location && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{event.location}</span>
                  </>
                )}
              </div>
              {event.description && (
                <p className="text-muted-foreground">{event.description}</p>
              )}
            </div>
            {event.actions && event.actions.length > 0 && (
              <div className="flex gap-3 md:self-start">
                {event.actions.map((action) => (
                  <div
                    key={action}
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    title={translateAction(action) || action}
                  >
                    {getActionIcon(action)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {events.length === 0 && (
        <p className="text-muted-foreground text-center">Keine Demos gefunden</p>
      )}
    </div>
  )
}