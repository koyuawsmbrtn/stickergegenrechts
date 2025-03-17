import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hidden',
      type: 'boolean',
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Center', value: 'center'}
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        },
        {
          title: 'Card',
          name: 'card',
          type: 'object',
          fields: [
            {
              title: 'Card',
              name: 'cardReference',
              type: 'reference',
              to: [{ type: 'card' }]
            }
          ]
        },
        {
          title: 'Block',
          name: 'blockref',
          type: 'object',
          fields: [
            {
              title: 'Block',
              name: 'blockReference',
              type: 'reference',
              to: [{ type: 'blockdocument' }]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'sortOrder',
      type: 'number',
      initialValue: 0,
    }),
  ],
})