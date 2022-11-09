import {defineField, defineType} from 'sanity'
import {LocationCanvasNode} from './LocationCanvasNode'

export const locationType = defineType({
  type: 'object',
  name: 'location',
  title: 'Location',
  components: {
    canvas: {node: LocationCanvasNode},
  },
  fields: [
    defineField({
      type: 'number',
      name: 'longitude',
      title: 'Longitude',
    }),
    defineField({
      type: 'number',
      name: 'latitude',
      title: 'Latitude',
    }),
  ],
})
