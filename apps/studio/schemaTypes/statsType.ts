import { defineField, defineType } from 'sanity'

export const statsType = defineType({
    name: 'stats',
    title: 'Stats',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
            initialValue: 'Stats',
            readOnly: true,
        }),
        defineField({
            name: 'stickers',
            type: 'number',
            title: 'Stickers shared',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'money',
            type: 'number',
            title: 'Money earned (in EUR)',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'stickersAquired',
            type: 'number',
            title: 'Stickers aquired',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'polaroids',
            type: 'number',
            title: 'Polaroids taken',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'filmBought',
            type: 'number',
            title: 'Film bought',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tracksPlayed',
            type: 'number',
            title: 'Tracks played',
            validation: (rule) => rule.required(),
        }),
    ],
})