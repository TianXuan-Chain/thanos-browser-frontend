FROM node:12-alpine AS builder
WORKDIR '/app'
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build

#运行阶段
FROM nginx:alpine
# 使用中科大源
RUN echo -e http://mirrors.ustc.edu.cn/alpine/latest-stable/main/ > /etc/apk/repositories
# 设置时区
ENV TIME_ZONE=Asia/Shanghai
RUN \
    mkdir -p /usr/src/app \
    && apk add --no-cache tzdata \
    && echo "${TIME_ZONE}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime
COPY --from=builder /app/dist /usr/share/nginx/html
