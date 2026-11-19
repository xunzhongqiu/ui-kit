# @portfolio/api-guard

[English](#english) | [简体中文](#简体中文)

## English

Framework-neutral middleware primitives for Node.js HTTP servers. Uses only Node built-ins at runtime.

```ts
import { createServer } from "node:http";
import { requestId, rateLimit } from "@portfolio/api-guard";

const id = requestId();
const limit = rateLimit({ windowMs: 60_000, max: 100 });
createServer((req, res) => id(req, res, () => limit(req, res, () => {
  res.end(`request ${res.getHeader("x-request-id")}`);
}))).listen(3000);
```

### Included

- `requestId`: generates a UUID response header for log correlation.
- `rateLimit`: in-memory fixed-window limiter with standard limit headers and `Retry-After`.
- `errorHandler`: logs the original exception and returns a generic JSON 500 response.

### Production notes

The limiter is process-local and resets on restart. Use a shared store for multi-instance deployments, configure trusted proxy handling before deriving client IPs, and add cleanup and observability suitable for your deployment.

## 简体中文

适用于 Node.js HTTP 服务器、与具体框架无关的中间件基础工具。运行时仅使用 Node.js 内置模块。

```ts
import { createServer } from "node:http";
import { requestId, rateLimit } from "@portfolio/api-guard";

const id = requestId();
const limit = rateLimit({ windowMs: 60_000, max: 100 });
createServer((req, res) => id(req, res, () => limit(req, res, () => {
  res.end(`request ${res.getHeader("x-request-id")}`);
}))).listen(3000);
```

### 功能

- `requestId`：生成 UUID 响应头，便于关联日志。
- `rateLimit`：基于内存的固定窗口限流器，返回标准限流响应头和 `Retry-After`。
- `errorHandler`：记录原始异常，并返回通用 JSON 500 响应。

### 生产环境说明

限流状态仅保存在当前进程中，服务重启后会清空。多实例部署应使用共享存储；根据可信代理配置获取客户端 IP，并按部署需求补充清理和可观测性机制。
