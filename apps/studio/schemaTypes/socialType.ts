import { defineField, defineType } from 'sanity'

/*
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
      */

export const socialType = defineType({
    name: 'social',
    title: 'Social',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'icon',
            type: 'string',
            validation: (rule) => rule.required(),
            options: {
                list: [
                    {title: 'GitHub', value: 'github'},
                    {title: 'Mastodon', value: 'mastodon'},
                    {title: 'Discord', value: 'discord'},
                    {title: 'Instagram', value: 'instagram'},
                    {title: 'LinkedIn', value: 'linkedin'},
                    {title: 'Bluesky', value: 'bluesky'},
                    {title: 'Twitch', value: 'twitch'},
                    {title: 'Facebook', value: 'facebook'},
                    {title: 'Twitter', value: 'twitter'},
                    {title: 'YouTube', value: 'youtube'},
                    {title: 'TikTok', value: 'tiktok'},
                    {title: 'Telegram', value: 'telegram'},
                    {title: 'Flickr', value: 'flickr'},
                    {title: 'WhatsApp', value: 'whatsapp'},
                    {title: 'Snapchat', value: 'snapchat'},
                    {title: 'IMDb', value: 'imdb'},
                    {title: 'Last.fm', value: 'lastfm'},
                    {title: 'Diaspora', value: 'diaspora'},
                    {title: 'Threads', value: 'threads'},
                    {title: 'Xbox', value: 'xbox'},
                    {title: 'PlayStation', value: 'playstation'},
                    {title: 'Steam', value: 'steam'},
                    {title: 'WordPress', value: 'wordpress'},
                    {title: 'RSS', value: 'rss'},
                    {title: 'Website', value: 'globe'}
                ]
            }
        }),
        defineField({
            name: 'url',
            type: 'url',
            validation: (rule) => rule.required(),
        }),
    ],
})