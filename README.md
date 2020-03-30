# vue-admin-template

 **项目架构不是本人开发！！** 
 **项目架构不是本人开发！！** 
 **项目架构不是本人开发！！** 

本项目借鉴 [@花裤衩](http://gitee.com/panjiachen/vue-admin-template.git) 的开源项目，新增后端登录和vue动态路由，以及与后端配套的一系列功能。
后端地址[spring cloud](https://gitees.com/liaofuxing/springcloud)

## Build Setup

```bash

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 包含功能 （以下功能都需要后端项目配合）
1. 用户登录，登出 
2. 根据用户角色生成vue路由菜单
3. 用户管理，菜单管理，角色管理，部门管理
