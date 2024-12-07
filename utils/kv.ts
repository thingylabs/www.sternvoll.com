// utils/kv.ts
import { DenoKvClient } from '@/utils/denokv-bridge/client/mod.ts'

export const kv = {
  german: new DenoKvClient(
    'https://' + Deno.env.get('BRIDGE_URL')!,
    Deno.env.get('BRIDGE_TOKEN')!,
  ),
  global: await Deno.openKv(),
}
