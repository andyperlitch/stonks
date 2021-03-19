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

- [ ] graph of player's equity
- [ ] outside price movement
- [ ] Show other games the user is in
- [ ] countdown to start
- [ ] a way to return to home screen from join
- [ ] ended game view
  - [ ] entire-game view
  - [ ] current round view
- [ ] Limit user to just one game at a time
- [ ] limit chat messages
- [ ] Figure out why subscribing to games that have ended
- [ ] show which user is the owner on game page
- [ ] graphic of green "+1" floats away every time you click buy, same with red "-1" for sell
- [x] fix leaderboard sort order
- [x] force code to be uppercase
- [x] graphs of stonks
- [x] Try to reproduce `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 buy listeners added to [Socket]. Use emitter.setMaxListeners() to increase limit`
- [x] make the buy and sell buttons disabled during after-hours trading
- [x] `JoinGame` page
  - [x] text area for nickname, text area for code
  - [x] submit button
  - [x] fetch call for joining a game
  - [x] on success, go to `Game` page.
- [x] `Game` page
  - [x] new fetch call for retrieving game information
  - [x] show users, info about game
  - [x] open socket connection
- [x] Handle socket.io connections on server
  - [x] create a socket store
- [x] Don't require login to join

## Nice-to-haves

- [x] redis-based session storage
- [ ] better error handling/redirect when oauth fails
