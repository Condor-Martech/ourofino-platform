'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'

export async function serverFunction(args: any) {
  return handleServerFunctions(args)
}
