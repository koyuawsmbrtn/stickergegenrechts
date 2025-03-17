"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/client"
import { urlForImage } from "@/sanity/image"
import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import { 
  faGithub, faMastodon, faDiscord, faInstagram, faLinkedin,
  faTwitch, faFacebook, faXTwitter, faYoutube, faTiktok,
  faTelegram, faFlickr, faWhatsapp, faSnapchat, faImdb,
  faLastfm, faDiaspora, faThreads, faXbox, faPlaystation,
  faSteam, faWordpress, faBluesky
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion"

interface Avatar {
  _id: string
  name: string
  caption: string
  description: string
  showRight: boolean
  socials: Array<{
    slug: string
    icon: string
    url: string
  }>
  image: {
    asset: {
      _ref: string
    }
  }
}

const getSocialIcon = (slug: string) => {
  switch (slug) {
    case "github":
      return faGithub
    case "mastodon":
      return faMastodon
    case "discord":
      return faDiscord
    case "instagram":
      return faInstagram
    case "linkedin":
      return faLinkedin
    case "bluesky":
      return faBluesky
    case "twitch":
      return faTwitch
    case "facebook":
      return faFacebook
    case "twitter":
      return faXTwitter
    case "youtube":
      return faYoutube
    case "tiktok":
      return faTiktok
    case "x":
      return faXTwitter
    case "telegram":
      return faTelegram
    case "flickr":
      return faFlickr
    case "whatsapp":
      return faWhatsapp
    case "snapchat":
      return faSnapchat
    case "imdb":
      return faImdb
    case "lastfm":
      return faLastfm
    case "diaspora":
      return faDiaspora
    case "threads":
      return faThreads
    case "xbox":
      return faXbox
    case "playstation":
      return faPlaystation
    case "steam":
      return faSteam
    case "wordpress":
      return faWordpress
    case "rss":
      return faRss
    default:
      return faGlobe
  }
}

export default function Avatars() {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = await client.fetch<Avatar[]>(`
          *[_type == "avatar"] | order(sortOrder asc) {
            _id,
            name,
            link,
            image,
            caption,
            description,
            showRight,
            sortOrder,
            "socials": socials[]-> {
              slug,
              icon,
              url
            }
          }
        `)
        setAvatars(data)
      } catch (err) {
        console.error("Error fetching avatars:", err)
        setError("Failed to load avatars")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvatars()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (isLoading) {
    return (
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            <a target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 transition-all duration-300"><Skeleton className="w-200 h-200 object-cover" /></div></a>
            <a target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 transition-all duration-300"><Skeleton className="w-200 h-200 object-cover" /></div></a>
            <a target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 transition-all duration-300"><Skeleton className="w-200 h-200 object-cover" /></div></a>
            <a target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 transition-all duration-300"><Skeleton className="w-200 h-200 object-cover" /></div></a>
            <a target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 transition-all duration-300"><Skeleton className="w-200 h-200 object-cover" /></div></a>
            <a target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 transition-all duration-300"><Skeleton className="w-200 h-200 object-cover" /></div></a>
            <a target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 transition-all duration-300"><Skeleton className="w-200 h-200 object-cover" /></div></a>
            <a target="_blank" rel="noopener noreferrer" className="group"><div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 transition-all duration-300"><Skeleton className="w-200 h-200 object-cover" /></div></a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {avatars.map((avatar) => (
            <motion.div
              key={avatar._id}
              variants={item}
              className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4 md:p-6"
            >
              {!avatar.showRight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0"
                >
                  <div className="aspect-square overflow-hidden rounded-full">
                    <Image
                      src={urlForImage(avatar.image)?.url() || "/placeholder.png"}
                      alt={avatar.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )}
              <div className="flex-1 text-center md:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold mb-2"
                >
                  {avatar.name}
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-muted-foreground mb-4"
                >
                  {avatar.caption}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 text-sm md:text-base"
                >
                  {avatar.description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap justify-center md:justify-start gap-4"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.5
                      }
                    }
                  }}
                >
                  {avatar.socials && avatar.socials.map((social) => (
                    <motion.a
                      key={`${social.slug}-${social.url}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        show: { opacity: 1, scale: 1 }
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="aspect-square overflow-hidden rounded-full border-1 border-border/40 hover:bg-accent transition-all duration-300 w-10 h-10 md:w-12 md:h-12">
                        <FontAwesomeIcon
                          icon={getSocialIcon(social.icon)}
                          className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors mt-[15px] ml-[11px]"
                        />
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
              {avatar.showRight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 order-first md:order-last"
                >
                  <div className="aspect-square overflow-hidden rounded-full">
                    <Image
                      src={urlForImage(avatar.image)?.url() || "/placeholder.png"}
                      alt={avatar.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}