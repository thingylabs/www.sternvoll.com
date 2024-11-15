import { Axiom } from 'axiom'
import { IS_BROWSER } from '$fresh/runtime.ts'

const AXIOM_TOKEN = !IS_BROWSER && Deno.env.get('AXIOM_TOKEN')
const AXIOM_DATASET = !IS_BROWSER && Deno.env.get('AXIOM_DATASET')
type LogLevel = 'info' | 'warn' | 'error'

export const logger = {
  info: (message: string, data?: object) => send('info', message, data),
  warn: (message: string, data?: object) => send('warn', message, data),
  error: (message: string, data?: object) => send('error', message, data),
}

const axiom = !IS_BROWSER && AXIOM_TOKEN && AXIOM_DATASET
  ? new Axiom({ token: AXIOM_TOKEN! })
  : { ingest: () => {} }

function send(loglevel: LogLevel, message: string, data: object | undefined) {
  if (!data) {
    console[loglevel](`[${loglevel.toUpperCase()}] ${message}`)
  } else {
    console[loglevel](
      `[${loglevel.toUpperCase()}] ${message}`,
      JSON.stringify(data),
    )
  }

  if (!AXIOM_TOKEN || !AXIOM_DATASET) {
    return
  }

  axiom.ingest(AXIOM_DATASET!, {
    ...{
      loglevel,
      message,
    },
    ...(data && { data }),
  })
}
