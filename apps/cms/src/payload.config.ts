import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import { Pages } from '@/collections/Pages'
import { Categories } from '@/collections/Categories'
import { Events } from '@/collections/Events'
import { Tickets } from '@/collections/Tickets'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Pages,
    Categories,
    Events,
    Tickets,
    {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  plugins: [
    ecommercePlugin({
      customers: {
        slug: 'users',
      },
      products: true,
      carts: true,
      orders: true,
      transactions: true,
      access: {
        adminOnlyFieldAccess: ({ req }) => !!req.user,
        adminOrPublishedStatus: () => true,
        isAdmin: ({ req }) => !!req.user,
        isDocumentOwner: ({ req }) => ({ id: { equals: req.user?.id } }),
      },
    }),
  ],
  sharp,
})
