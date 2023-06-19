# NOTES

- [NOTES](#notes)
  - [Links](#links)
    - [Project](#project)
    - [tRPC Server](#trpc-server)
    - [tRPC Client](#trpc-client)
    - [Express](#express)
  - [Important use node version v18.16.0 else server crash with \[ERR\_UNKNOWN\_FILE\_EXTENSION\]](#important-use-node-version-v18160-else-server-crash-with-err_unknown_file_extension)
  - [Adapt Project to run in Linux](#adapt-project-to-run-in-linux)
    - [Server](#server)
    - [Open Firewall POrts](#open-firewall-ports)

## Links

### Project

- [Test trpc procedure](http://192.168.1.105:3000/trpc/greeting)

### tRPC Server

- [Data Transformers | tRPC](https://trpc.io/docs/server/data-transformers#3-add-to-createtrpcproxyclient-or-createtrpcnext)

### tRPC Client

- [Set up a tRPC Client | tRPC](https://trpc.io/docs/client/vanilla/setup)
- [Send cookies cross-origin | tRPC](https://trpc.io/docs/client/cors)

### Express

- [Express cors middleware](https://expressjs.com/en/resources/middleware/cors.html)

## Important use node version v18.16.0 else server crash with [ERR_UNKNOWN_FILE_EXTENSION]

```shell
$ node -v
v20.2.0

$ pnpm dev
@apps/server:dev: TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".mts" for /mnt/storage/Development/Svelte/SvelteKit/SvelteKitPayloadCMSTRPCTurborepo/sk-trpc-payload/apps/server/src/server.mts

$ nvm use v18.16.0
Now using node v18.16.0 (npm v9.5.1)

$ pnpm dev
...
@apps/web:dev:   VITE v4.3.9  ready in 1241 ms
@apps/web:dev: 
@apps/web:dev:   ➜  Local:   http://localhost:5173/
@apps/web:dev:   ➜  Network: http://192.168.1.105:5173/
@apps/web:dev:   ➜  Network: http://172.20.0.1:5173/
@apps/web:dev:   ➜  Network: http://192.168.96.1:5173/
@apps/web:dev:   ➜  Network: http://172.26.0.1:5173/
@apps/web:dev:   ➜  Network: http://172.18.0.1:5173/
@apps/server:dev: [20:41:29] INFO (payload): Connected to MongoDB server successfully!
@apps/server:dev: [20:41:29] INFO (payload): Starting Payload...
@apps/server:dev: [20:41:30] INFO (payload): Payload Admin URL: http://192.168.1.105:3000/admin
@apps/server:dev: API Server listening on port 3000
```

## Adapt Project to run in Linux

### Server

```shell
# change replacer permissions
$ sudo chmod +x apps/server/scripts/rail/replacer

# remove dum and replacer packages
$ rm packages/dum -r
$ rm packages/replacer -r

# install turborepo dependencies
$ pnpm i
```

`apps/server/tsconfig.json`

remove `"importsNotUsedAsValues": "error"` and add

```json
{
  "compilerOptions": {
    // "importsNotUsedAsValues": "error",
    "allowImportingTsExtensions": true,
    "noEmit": true
  },
  ...
}
```

`apps/server/package.json`

replace `dum` with `pnpm`

```json
{
  "name": "@apps/server",
  "version": "0.0.0",
  "private": true,
  "main": "src/trpc/router.mts",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "dev": "pnpm mod-off && cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts nodemon",
    "start:win": "pnpm mod-on && cross-env PAYLOAD_CONFIG_PATH=dist/payload.config.cjs NODE_ENV=production node dist/server.mjs",
    "build:win": "pnpm copyfiles-f && dum build:payload && dum build:server-win",
    ...
  }
}
```

### Open Firewall POrts

```shell
# command to add port to
$ sudo firewall-cmd --zone=public --add-port=1978/tcp
# command to keep the port open permanently
$ sudo firewall-cmd --runtime-to-permanent
```
