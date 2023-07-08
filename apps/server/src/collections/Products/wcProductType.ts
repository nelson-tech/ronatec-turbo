type WCPrices = {
  price: string
  regular_price: string
  sale_price: string
  price_range: null
  currency_code: string
  currency_symbol: string
  currency_minor_unit: number
  currency_decimal_separator: string
  currency_thousand_separator: string
  currency_prefix: string
  currency_suffix: string
}

type WCProductCategory = {
  id: number
  name: string
  slug: string
  link: string
}

type WCTag = any

type WCVariation = any

type WCAttributeTerm = {
  id: number
  name: string
  slug: string
}

type WCAttribute = {
  id: number
  name: string
  taxonomy: string
  has_variations: boolean
  terms: WCAttributeTerm[]
}

type WCAddToCart = {
  text: string
  description: string
  url: string
  minimum: number
  maximum: number
  multiple_of: number
  extensions: any
}

type WCImage = {
  id: number
  src: string
  thumbnail: string
  srcset: string
  sizes: string
  name: string
  alt: string
}

export type WCProduct = {
  id: number
  name: string
  slug: string
  parent: number
  type: string
  variation: string
  permalink: string
  sku: string
  short_description: string
  description: string
  on_sale: boolean
  prices: WCPrices
  price_html: string
  average_rating: string
  review_count: number
  images: WCImage[]
  categories: WCProductCategory[]
  tags: WCTag[]
  attributes: WCAttribute[]
  variations: WCVariation[]
  has_options: boolean
  is_purchasable: boolean
  is_in_stock: boolean
  is_on_backorder: boolean
  low_stock_remaining: null
  sold_individually: boolean
  add_to_cart: WCAddToCart
}
