import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import config from '@/payload.config'
import { importMap } from '@/app/(payload)/admin/importMap'
import { serverFunction } from '@/app/(payload)/actions'

import './custom.scss'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout 
    config={config} 
    importMap={importMap} 
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
)

export default Layout
