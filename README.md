# Stonks Backend Server

## Adding to GraphQL

1. Add the schema changes to `src/graphql/schema/*-schema.ts` files
1. Ensure the server is running
1. Run `npm run generate`
1. Import `QueryResolvers` from `src/types/graphql-types.ts`, reference the correct resolver with bracket notation, e.g. `QueryResolvers['me']`
1. Attach to `src/graphql/resolvers/root-resolver.ts`

## Bugs

- [ ] layout not scrolling on home page (ionic-related)
- [ ] "undefined" as a key in the users

## TODOs

- [ ] `JoinGame` page
  - [x] text area for nickname, text area for code
  - [x] submit button
  - [x] fetch call for joining a game
  - [ ] error handling
  - [x] on success, go to `Game` page.
- [ ] `Game` page
  - [x] new fetch call for retrieving game information
  - [ ] show users, info about game
    - [ ] show which user is the owner
  - [ ] open socket connection
  - [ ] close socket connection when leaving page
- [ ] Handle socket.io connections on server
  - [ ] create a socket store
- [ ] Don't require login to join

## Nice-to-haves

- [ ] redis-based session storage
- [ ] better error handling/redirect when oauth fails
