import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import { motion } from 'framer-motion'

interface Stats {
  stickers: number
  money: number
  stickersAquired: number
  polaroids: number
  filmBought: number
  tracksPlayed: number
}

interface StatDisplay {
  title: string
  value: number | string
  prefix?: string
  suffix?: string
}

const CountingNumber = ({ value, prefix = '', suffix = '' }: { value: number | string, prefix: string, suffix: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {prefix}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {value}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {suffix}
      </motion.span>
    </motion.div>
  )
}

export default function Stats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await client.fetch<Stats>(`
          *[_type == "stats"][0] {
            stickers,
            money,
            stickersAquired,
            polaroids,
            filmBought,
            tracksPlayed
          }
        `)
        setStats(data)
      } catch (err) {
        console.error("Error fetching stats:", err)
        setError("Failed to load stats")
      }
    }

    fetchStats()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!stats) {
    return <div>Loading...</div>
  }

  const displayStats: StatDisplay[] = [
    { title: 'Sticker verteilt', value: stats.stickers },
    { title: 'Geld bekommen*', value: stats.money, suffix: ' €' },
    { title: 'Sticker gekauft', value: stats.stickersAquired },
    { title: 'Polaroids gemacht', value: stats.polaroids },
    { title: 'Fotofilm gekauft', value: stats.filmBought },
    { title: 'Tracks gespielt', value: stats.tracksPlayed }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        Allein diesen Monat haben wir...
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 bg-muted rounded-lg text-center"
          >
            <div className="text-lg text-muted-foreground mb-2">{stat.title}</div>
            <div className="text-3xl font-bold">
              <CountingNumber
                value={stat.value}
                prefix={stat.prefix || ''}
                suffix={stat.suffix || ''}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="text-center text-sm text-muted-foreground mt-8"
      >
        *Das Geld geht in Sticker und unsere Ausrüstung
      </motion.p>
    </div>
  )
}