# 🔐 NestJS Authentication Service

A robust, extensible authentication service built with **NestJS**, **MongoDB**, and **JWT**, including features like:

- ✅ Register / Login / Logout / Refresh Token
- ✅ Role-based Access Control
- ✅ Request/Response logging with sensitive field censoring
- ✅ Global error handler & standardized response format
- ✅ Modular architecture with DI & DTO validation

---

## 📦 Tech Stack

- **NestJS** (v10+)
- **MongoDB** via `mongoose`
- **JWT** for access & refresh token handling
- **Zod** for runtime config validation
- **Pino** for logging
- **Class-validator** for DTO validation
- **TypeScript** strict mode

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Setup environment
cp config/default.yaml config/development.yaml

# Run development
pnpm start:dev
```

---

## 🔐 Auth Flow

### Register
```http
POST /auth/register
```

### Login
```http
POST /auth/login
```

### Logout
```http
POST /auth/logout
```

### Refresh Token
```http
POST /auth/refresh
```

---

## 🛡 Authorization

- Add `@Roles('user')` to any controller
- Guard stack:
  - `AuthGuard` checks valid JWT
  - `RolesGuard` validates user roles

---

## 🧰 Logging

- Built-in request/response interceptor
- Sensitive fields (`accessToken`, `refreshToken`, `password`, etc.) are censored
- Configurable via:
  ```yaml
  logger:
    sensitives:
      - accessToken
      - refreshToken
      - password
  ```

---

## 🧪 Testing

```bash
# Run unit tests
pnpm test
```

---

## 📂 Project Structure

```
src/
├── auth/              # Auth logic: login, register, refresh
├── users/             # User model, DTO, controller
├── common/            # Guards, decorators, interceptors
├── config/            # Zod + YAML config loader
├── utils/             # Helpers (e.g., password hashing)
├── logger/            # LogService using pino
├── main.ts            # App bootstrap
```

---

## 📖 Configuration

Stored in YAML via [`config`](https://www.npmjs.com/package/config):

```yaml
# config/default.yaml

port: 3000

auth:
  secret: your_jwt_secret
  salt: 10
  accessTokenExpiresIn: 900  # seconds
  refreshTokenExpiresIn: 604800

mongodb:
  uri: mongodb://localhost:27017
  databaseName: authenticate
  migration:
    path: src/migration
    collectionName: migrations_changelog

logger:
  sensitives:
    - accessToken
    - refreshToken
    - password
```

---

## ✅ Todo (Optional)

- [ ] Add email verification
- [ ] Password reset flow
- [ ] Audit logs
- [ ] Rate limiting / brute-force prevention

---

## 🧠 Tips

- Use `@User()` decorator to extract user info from token.
- Logging interceptor auto-censors all sensitive data recursively.
- Zod ensures config safety at boot time.

---

## 📄 License

MIT