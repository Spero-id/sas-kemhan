# Gunakan image official Next.js
FROM node:21.5.0-alpine AS base

# Build Next.js app
FROM base AS builder
WORKDIR /app

COPY . .

RUN npm install

# Jalankan server Next.js
FROM base AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["sh", "-c", "npm run start"]