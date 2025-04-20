# Gunakan image official Next.js
FROM node:21.5.0-alpine AS deps
WORKDIR /app

# Salin hanya yang dibutuhkan untuk install dependencies (termasuk schema)
COPY package.json package-lock.json* prisma ./ 
RUN npm install

# Build Next.js app
FROM node:21.5.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Jalankan server Next.js
FROM node:21.5.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]