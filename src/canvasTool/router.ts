import {route} from 'sanity/router'

export const router = route.create('/', [
  route.create('/:type', [route.create('/:id', [route.create('/:path')])]),
])
