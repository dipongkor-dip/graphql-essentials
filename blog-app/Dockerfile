FROM node:22-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@12.8.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma
COPY prisma7.config.ts tsconfig.json ./

COPY src ./src

EXPOSE 4000

CMD ["sh", "-c", "pnpm exec prisma generate && pnpm exec prisma migrate deploy && pnpm dev"]
