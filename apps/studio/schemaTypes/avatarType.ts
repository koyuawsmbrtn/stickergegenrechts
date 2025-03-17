import { defineField, defineType } from 'sanity'

export const avatarType = defineType({
    name: 'avatar',
    title: 'Avatar',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
        }),
        defineField({
            name: 'caption',
            type: 'string'
        }),
        defineField({
            name: 'description',
            type: 'text'
        }),
        defineField({
            name: 'socials',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'social' }] }],
        }),
        defineField({
            name: 'showRight',
            type: 'boolean',
            title: 'Show on the right',
            initialValue: true,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "sortOrder",
            type: "number",
            initialValue: 0,
        }),
    ],
})