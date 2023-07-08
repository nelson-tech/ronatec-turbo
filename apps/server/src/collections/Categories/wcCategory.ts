export type WCCategory = {
  id: number
  name: string
  slug: string
  description: string
  parent: number
  count: number
  image: {
    id: number
    src: string
    thumbnail: string
    srcset: string
    sizes: string
    name: string
    alt: string
  }
  review_count: number
  permalink: string
}
