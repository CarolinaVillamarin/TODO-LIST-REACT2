FROM node:18-alpine

WORKDIR /app

# Copiar solo package.json del backend
COPY backend/package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar código del backend
COPY backend/ ./

EXPOSE 4000

CMD ["npm", "start"]
