import React from 'react';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import config from '@/payload.config';
import { importMap } from '@/app/(payload)/admin/importMap';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout config={Promise.resolve(config)} importMap={importMap} serverFunction={null as any}>{children}</RootLayout>;
}
