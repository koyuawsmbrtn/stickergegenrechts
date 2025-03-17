import { defineField, defineType } from 'sanity'

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'date',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            type: 'string',
        }),
        defineField({
            name: 'url',
            type: 'url',
            title: 'Event URL',
        }),
        defineField({
            name: 'actions',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Stickers', value: 'stickers' },
                    { title: 'Music', value: 'music' },
                    { title: 'Camera', value: 'camera' },
                ],
            },
        }),
    ],
})