import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter, createTRPCContext } from '@a/api'
import { auth } from '@a/auth'

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
const setCorsHeaders = (res: Response) => {
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Request-Method', '*')
    res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.headers.set('Access-Control-Allow-Headers', '*')
  },
  OPTIONS = () => {
    const response = new Response(null, { status: 204 })
    setCorsHeaders(response)
    return response
  },
  handler = auth(async req => {
    const response = await fetchRequestHandler({
      createContext: () =>
        createTRPCContext({
          headers: req.headers,
          session: req.auth
        }),
      endpoint: '/api/trpc',
      onError: ({ error, path }) => {
        console.error(`>>> tRPC Error on '${path}'`, error)
      },
      req,
      router: appRouter
    })

    setCorsHeaders(response)
    return response
  })

export { handler as GET, OPTIONS, handler as POST }
