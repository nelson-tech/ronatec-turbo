import payload from 'payload'

const syncLanco = async () => {
  console.log('Syncing')

  const products = await payload.find({ collection: 'products' })

  console.log('Products', products)
}

export default syncLanco
