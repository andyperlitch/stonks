# VCRPG Backend Server

## Adding to GraphQL

1. Add the schema changes to `src/graphql/schema/*-schema.ts` files
1. Ensure the server is running
1. Run `npm run generate`
1. Import `QueryResolvers` from `src/types/graphql-types.ts`, reference the correct resolver with bracket notation, e.g. `QueryResolvers['me']`
1. Attach to `src/graphql/resolvers/root-resolver.ts`

## Bugs

[ ] Routing bug when creating new avatar
[ ] Weird display bug with new skins
[ ] Weird callstack exceeded intermittently... probably auth-related, and auth bugs

## TODOs

[X] move avatar template json to graphql
[X] move avatar template json logic from client to server
[X] create avatar db model
[X] "create avatar" mutation
[X] "update avatar" mutation
[X] "delete avatar" mutation
[ ] "select avatar" mutation
[X] avatars page with "new" button
[ ] render profile info in nav
[ ] cycle through animations
[ ] skin color choice screen
[ ] eye color choice screen

## Nice-to-haves

[ ] redis-based session storage
[ ] better error handling/redirect when oauth fails
