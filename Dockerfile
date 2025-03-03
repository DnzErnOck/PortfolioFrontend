# Temel imaj olarak Node.js kullanın
FROM node:22

# Çalışma dizinini belirleyin
WORKDIR /app

# Bağımlılıkları kopyalayın ve yükleyin
COPY package*.json ./
RUN npm install

# Proje dosyalarını kopyalayın
COPY . .

# Uygulamayı build edin
RUN npm run build

# Uygulamanın çalışacağı portu belirleyin
EXPOSE 3000

# Uygulamayı başlatın
CMD ["npm", "run","dev"]