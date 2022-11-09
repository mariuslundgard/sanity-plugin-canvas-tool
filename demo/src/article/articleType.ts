import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {TitleElement} from './TitleElement'

export const articleType = defineType({
  type: 'document',
  name: 'post',
  title: 'Post',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      components: {
        canvas: {
          element: TitleElement,
        },
      },
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Image',
    }),
    defineField({
      type: 'location',
      name: 'location',
      title: 'Location',
    }),
  ],
})
