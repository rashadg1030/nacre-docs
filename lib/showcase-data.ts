export interface ShowcaseTab {
  id: string;
  label: string;
  description: string;
  code: string;
}

export const showcaseTabs: ShowcaseTab[] = [
  {
    id: 'request',
    label: 'Request',
    description: 'Define HTTP method, path captures, query params, headers, and body in one composable block.',
    code: `input
  = request
  & method GET
  & path do
      lit "users"
      userId <- capture @Int "id"
      pure userId
  & query do
      page <- param @Int "page"
      limit <- paramOpt @Int "limit"
      pure (page, limit)
  & body none
  & headers do
      auth <- header @Text "Authorization"
      pure auth
  & security bearerAuth`,
  },
  {
    id: 'response',
    label: 'Response',
    description: 'Specify possible responses with status codes, typed bodies, and headers.',
    code: `outputs = either notFound ok

ok
  = response
  & status 200
  & body @User
  & headers do
      cache <- header @Text "Cache-Control"
      pure cache

notFound
  = response
  & status 404
  & body @ErrorResponse
  & headers none`,
  },
  {
    id: 'route',
    label: 'Route',
    description: 'Connect request and response specs to your handler with full type inference.',
    code: `getUserAction = route := handler
  where
    route = input :-> outputs

    handler = \\Input{..} -> do
      user <- findUser path.userId
      case user of
        Nothing ->
          pure $ Left $ Output
            { body = ErrorResponse "User not found"
            , headers = ()
            }
        Just u ->
          pure $ Right $ Output
            { body = u
            , headers = "max-age=3600"
            }`,
  },
  {
    id: 'server',
    label: 'Server',
    description: 'Compose routes into a server with do-notation.',
    code: `server = Server.do
  getUserAction
  createUserAction
  updateUserAction
  deleteUserAction
  listUsersAction
  searchUsersAction

main :: IO ()
main = do
  putStrLn "Starting server on port 8080"
  runServer 8080 server`,
  },
];
