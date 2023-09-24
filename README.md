## fridaylog

Setup environment variables

1- `cp packages/env/.env.example packages/env/.env`

2- `cd packages/database && ln -s "../../packages/env/.env" ".env"`

3- `cd apps/web && ln -s "../../packages/env/.env" ".env.local"`
