import React from 'react';
import { RootPage } from '@payloadcms/next/views';
import config from '@/payload.config';
import { importMap } from '@/app/(payload)/admin/importMap';

export default function Page({ params, searchParams }: { params: any; searchParams: any }) {
  return <RootPage config={Promise.resolve(config)} importMap={importMap} params={params} searchParams={searchParams} />;
}
