# VCRPG Backend Server

## Adding to GraphQL

1. Add the schema changes to `src/graphql/schema/*-schema.ts` files
1. Ensure the server is running
1. Run `npm run generate`
1. Import `QueryResolvers` from `src/types/graphql-types.ts`, reference the correct resolver with bracket notation, e.g. `QueryResolvers['me']`
1. Attach to `src/graphql/resolvers/root-resolver.ts`

## Bugs

[ ] Weird callstack exceeded intermittently... probably auth-related, and auth bugs

## TODOs

[X] move avatar template json to graphql
[X] move avatar template json logic from client to server
[ ] create avatar db model
[ ] "create avatar" mutation
[ ] "update avatar" mutation
[ ] avatars page with "new" button
[ ] render profile info in nav
[ ] cycle through animations
[ ] skin color choice screen
[ ] eye color choice screen

## Nice-to-haves

[ ] redis-based session storage
[ ] better error handling/redirect when oauth fails
