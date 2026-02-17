import type { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'event', 'price', 'limit'],
    group: 'Tickets',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Ticket Name', // e.g., "Adulto", "Criança"
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Inventory Limit',
      min: 0,
    },
  ],
}
