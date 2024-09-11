FROM node:18 AS builder

WORKDIR /app

# copy package.json and package-lock.json 
COPY package*.json ./

# install dependencies
RUN npm install

# copy the project files to the working directory
COPY . .

# build the app
RUN NEXT_SKIP_ESLINT=true npm run build

# serve the app using a node image
FROM node:18-alpine AS runner

WORKDIR /app

# copy the built files from the builder stage to the new image
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# install production dependencies
RUN npm install --production

# expose port 3000
EXPOSE 3000

# set the environment variable to production
ENV NODE_ENV production

# start the Next.js app
CMD ["npm", "start"]
