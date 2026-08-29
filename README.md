# Industrial Asset Management API

An Express and MySQL backend for industrial equipment lifecycle management. It
supports inventory, inspections, dispatch and return records, customers,
authentication, realtime events, and secure attachment uploads.

## Capabilities

- REST resources for equipment, inspections, movements, customers, and users.
- Socket.IO events for realtime dashboard and mobile synchronization.
- MySQL persistence through parameterized queries.
- Password hashing with bcrypt and JWT-based authentication.
- Short-lived S3 presigned URLs, keeping cloud credentials off client devices.

## Requirements

- Node.js 18 or newer
- MySQL 8
- An S3-compatible bucket for optional attachment uploads

## Configuration

Copy `.env.example` to `.env` and provide local values. Never commit `.env`,
private keys, certificates, database dumps, or customer data.

AWS credentials are resolved through the standard SDK credential chain. Use a
local AWS profile or an IAM role instead of embedding credentials in source.

## Development

```bash
npm install
npm run dev
```

For production-like execution:

```bash
npm start
```

The health endpoint is available at `GET /health`.

## Main API areas

- `/api/equipo/`: equipment inventory
- `/api/inspeccion/`: digital inspections
- `/api/movimiento/`: dispatch and return movements
- `/api/cliente/`: customer records
- `/api/modelo/`: equipment model images
- `/api/usuario/`: authentication and users
- `/generatePresignedUrl`: temporary object-storage upload URLs

This public version intentionally excludes production credentials, TLS keys,
database dumps, generated dependencies, and customer records.
