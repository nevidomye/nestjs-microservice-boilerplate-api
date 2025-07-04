# Nestjs boilerplate Microservice API

[![node version][node-image]][node-url]

[node-image]: https://img.shields.io/badge/node.js-%3E=_18.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

In this microservice I used the best architecture concepts: Onion Architecture, DDD and Ports and Adapters.

| Statements                                                                               | Branches                                                                             | Functions                                                                              | Lines                                                                          |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

### Architecture overview

This repository is organized following the principles of Domain-Driven Design (DDD) and the Onion Architecture.

- **core** – domain layer with entities, repository contracts and use cases. Business logic such as `PermissionCreateUsecase` lives here independent of any framework.
- **infra** – infrastructure implementations (databases, logger, email, etc.) that satisfy interfaces defined in `core`.
- **libs** – shared libraries providing cross-cutting concerns like token or crypto utilities.
- **modules** – NestJS modules that expose controllers and wire adapters with `core` use cases. For instance, `UserModule` assembles controllers, repositories from `infra` and use cases from `core`.

Each layer depends only on the inner ones, forming the onion: modules → infra/libs → core.

### Adding new components

To introduce new features, follow these steps that tie Domain-Driven Design (DDD) with the concentric rings of the Onion Architecture:

1. **Define the domain** (**DDD**) – create a folder inside `src/core` for your concept (e.g. `product`). Add entities, repository interfaces and use cases such as `ProductCreateUsecase`.
2. **Provide infrastructure** (**Onion outer ring**) – implement the repository contracts under `src/infra` and configure any database schemas or services required.
3. **Expose through a module** (**Onion outer ring**) – in `src/modules`, wire a NestJS module that connects controllers and adapters to the use cases from `core`. For instance, `UserModule` wires `PermissionCreateUsecase` with its repository implementation.
4. **Share cross‑cutting libs** (optional) – place reusable code like cryptography or token helpers in `src/libs`.

This separation keeps business logic isolated from frameworks while allowing modules to integrate new infrastructure or libraries without breaking the domain layer.

#### Example: building a Product catalog

Below is a simple walkthrough demonstrating how a new domain maps to each layer.

1. **Create the domain (DDD)** – under `src/core/product` add:
   - `entity/product.ts` – the `Product` entity with validations.
   - `repository/product.ts` – `IProductRepository` interface.
   - `use-cases/product-create.ts` – `ProductCreateUsecase` containing business logic.
   These files represent the innermost Onion ring where business rules live.

2. **Implement infrastructure** – in `src/infra/repository/postgres/product.repository.ts` implement `IProductRepository` with a database model. Any schemas or adapters go here, sitting in the outer ring.

3. **Wire a module** – create `src/modules/product` containing `controller.ts`, `repository.ts` and `module.ts`. `ProductModule` injects the `ProductCreateUsecase` with the repository implementation and exposes an HTTP endpoint.

4. **Share libraries** – if the product domain needs helpers (e.g., a SKU generator), place them in `src/libs` so other modules can reuse them.

Algorithm summary:

1. Define your domain and use cases inside `core`.
2. Implement repositories or services under `infra`.
3. Assemble a NestJS module under `modules` that connects controllers to the domain through providers.
4. Extract reusable pieces to `libs` when needed.

### Building and Running the application

- install dependencies
  ```
  $ yarn
  ```
- infra
  ```
   $ yarn infra
  ```
- running

  - dev
    ```
    $ yarn start:dev
    ```
  - debug
    ```
    $ start:debug
    ```
  - production
    ```
    $ yarn start
    ```

- build

  ```
  $ yarn build
  ```

### CRUD Scaffolding

Creating a CRUD in Postgres and Mongo in seconds.

- run
  ```
  $ yarn scaffold
  ```
- Choose database for CRUD.
- `(x) POSTGRES:CRUD`
- `( ) MONGO:CRUD`
- `( ) LIB`
- `( ) INFRA`
- `( ) MODULE`
- type module name (use the singular name)
- After generating the CRUD, follow the instructions on the generated link.
- ✨Magic ✨

#### CRUD features

- List
  - mongo
    - search
    - pagination
    - sort
    - entity validation
  - postgres
    - search
    - pagination
    - sort
    - entity validation
- Delete
  - mongo
    - Logical deletion
    - entity validation
  - postgres
    - Logical deletion
    - entity validation
- Update
  - mongo
    - Update Partial entity
    - entity validation
  - postgres
    - Update Partial entity
    - entity validation
- Create
  - mongo
    - entity validation
    - Not allow creating duplicates
  - postgres
    - entity validation

### Postgres migrations

- create
  ```
  $ yarn migration-postgres:create
  ```
- run

  ```
  $ yarn migration-postgres:run
  ```

### Mongo migrations

- create
  ```
  $ yarn migration-mongo:create
  ```
- run

  ```
  $ yarn migration-mongo:run
  ```

### Test

- run
  ```
  $ yarn test
  ```
- coverage
  ```
  $ yarn test:cov
  ```

### Lint

- lint
  ```
  $ yarn lint
  ```
- prettier
  ```
  $ yarn prettier
  ```

### User diagram

![alt text](diagram.png)

### Microservice architecture.

- I18n
- Docker
- Observability
  - tracing
  - logs
  - metrics
- Lint-staged + Husky
- Commitlint
- Secrets Service
- HTTP Service
- Logger Service
  - mongodb transport
- Authentication
  - Login
  - Logout
  - Forgot Password
- Authorization
  - Role-based access
- Error Handler
- Libs Structure
- Dependency Inversion Pattern
- Usecase Pattern
- Interface Adapter Pattern
- Generic Repository Pattern
  - Mongo Repository (mongoose)
  - Postgres Repository (TypeORM)
- Swagger Documentation
- Cache Service
  - Redis
  - NodeCache
- Database
  - mongo
    - Migrations
  - postgres
    - Migrations
- Tests
  - unit
  - 100% coverage

-- App Skeleton

```
.
├── CHANGELOG.md
├── commitlint.config.js
├── diagram.png
├── docker
│   ├── collector
│   │   └── collector-config.yaml
│   ├── mongo
│   │   ├── rs-init.sh
│   │   └── start-replicaset.sh
│   ├── postgres
│   │   └── create-database.sql
│   └── prometheus
│       └── config.yml
├── docker-compose-infra.yml
├── docker-compose.yml
├── Dockerfile
├── jest.config.ts
├── nest-cli.json
├── package.json
├── README.md
├── scripts
│   └── npm-audit.sh
├── src
│   ├── app.module.ts
│   ├── core
│   │   ├── cat
│   │   │   ├── entity
│   │   │   │   └── cats.ts
│   │   │   ├── repository
│   │   │   │   └── cats.ts
│   │   │   └── use-cases
│   │   │       ├── cats-create.ts
│   │   │       ├── cats-delete.ts
│   │   │       ├── cats-get-by-id.ts
│   │   │       ├── cats-list.ts
│   │   │       ├── cats-update.ts
│   │   │       └── __tests__
│   │   │           ├── cats-create.spec.ts
│   │   │           ├── cats-delete.spec.ts
│   │   │           ├── cats-list.spec.ts
│   │   │           ├── cats-update.spec.ts
│   │   │           └── user-get-by-id.spec.ts
│   │   ├── permission
│   │   │   ├── entity
│   │   │   │   └── permission.ts
│   │   │   ├── repository
│   │   │   │   └── permission.ts
│   │   │   └── use-cases
│   │   │       ├── permission-create.ts
│   │   │       ├── permission-delete.ts
│   │   │       ├── permission-get-by-id.ts
│   │   │       ├── permission-list.ts
│   │   │       ├── permission-update.ts
│   │   │       └── __tests__
│   │   │           ├── permission-create.spec.ts
│   │   │           ├── permission-delete.spec.ts
│   │   │           ├── permission-get-by-id.spec.ts
│   │   │           ├── permission-list.spec.ts
│   │   │           └── permission-update.spec.ts
│   │   ├── reset-password
│   │   │   ├── entity
│   │   │   │   └── reset-password.ts
│   │   │   ├── repository
│   │   │   │   └── reset-password.ts
│   │   │   └── use-cases
│   │   │       ├── confirm.ts
│   │   │       ├── send-email.ts
│   │   │       └── __tests__
│   │   │           ├── confirm.spec.ts
│   │   │           └── send-email.spec.ts
│   │   ├── role
│   │   │   ├── entity
│   │   │   │   └── role.ts
│   │   │   ├── repository
│   │   │   │   └── role.ts
│   │   │   └── use-cases
│   │   │       ├── role-add-permission.ts
│   │   │       ├── role-create.ts
│   │   │       ├── role-delete-permission.ts
│   │   │       ├── role-delete.ts
│   │   │       ├── role-get-by-id.ts
│   │   │       ├── role-list.ts
│   │   │       ├── role-update.ts
│   │   │       └── __tests__
│   │   │           ├── role-add-permission.spec.ts
│   │   │           ├── role-create.spec.ts
│   │   │           ├── role-delete-permission.spec.ts
│   │   │           ├── role-delete.spec.ts
│   │   │           ├── role-get-by-id.spec.ts
│   │   │           ├── role-list.spec.ts
│   │   │           └── role-update.spec.ts
│   │   └── user
│   │       ├── entity
│   │       │   ├── user-password.ts
│   │       │   └── user.ts
│   │       ├── repository
│   │       │   └── user.ts
│   │       └── use-cases
│   │           ├── __tests__
│   │           │   ├── user-change-password.spec.ts
│   │           │   ├── user-create.spec.ts
│   │           │   ├── user-delete.spec.ts
│   │           │   ├── user-get-by-id.spec.ts
│   │           │   ├── user-list.spec.ts
│   │           │   ├── user-login.spec.ts
│   │           │   ├── user-logout.spec.ts
│   │           │   └── user-update.spec.ts
│   │           ├── user-change-password.ts
│   │           ├── user-create.ts
│   │           ├── user-delete.ts
│   │           ├── user-get-by-id.ts
│   │           ├── user-list.ts
│   │           ├── user-login.ts
│   │           ├── user-logout.ts
│   │           └── user-update.ts
│   ├── infra
│   │   ├── cache
│   │   │   ├── adapter.ts
│   │   │   ├── index.ts
│   │   │   ├── memory
│   │   │   │   ├── index.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── types.ts
│   │   │   ├── redis
│   │   │   │   ├── index.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── types.ts
│   │   │   └── types.ts
│   │   ├── database
│   │   │   ├── adapter.ts
│   │   │   ├── enum.ts
│   │   │   ├── index.ts
│   │   │   ├── mongo
│   │   │   │   ├── config.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── migrations
│   │   │   │   │   └── 1709943706267_createCatsCollection.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── schemas
│   │   │   │   │   └── cat.ts
│   │   │   │   └── service.ts
│   │   │   ├── postgres
│   │   │   │   ├── config.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── migrations
│   │   │   │   │   ├── 1717769593555-createPermissionTable.ts
│   │   │   │   │   ├── 1717769593666-createRoleTable.ts
│   │   │   │   │   ├── 1717769593777-createRolesPermissionsTable.ts
│   │   │   │   │   ├── 1717769593778-createUsersPasswordTable.ts
│   │   │   │   │   ├── 1717773444116-createUserTable.ts
│   │   │   │   │   ├── 1717773444118-addRoleIdToUserTable.ts
│   │   │   │   │   ├── 1717773889333-insertPermissions.ts
│   │   │   │   │   ├── 1717773889351-insertDefaultUser.ts
│   │   │   │   │   ├── 1717976911236-createResetPasswordTable.ts
│   │   │   │   │   ├── 1718133311187-changeResetPasswordCascadeOptions.ts
│   │   │   │   │   ├── 1718138151111-addUniqueToRoleAndPermissionName.ts
│   │   │   │   │   └── 1718294246477-addCOntraintsToPermissionsRole.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── schemas
│   │   │   │   │   ├── permission.ts
│   │   │   │   │   ├── resetPassword.ts
│   │   │   │   │   ├── role.ts
│   │   │   │   │   ├── userPassword.ts
│   │   │   │   │   └── user.ts
│   │   │   │   └── service.ts
│   │   │   └── types.ts
│   │   ├── email
│   │   │   ├── adapter.ts
│   │   │   ├── index.ts
│   │   │   ├── module.ts
│   │   │   ├── service.ts
│   │   │   └── templates
│   │   │       ├── reque-reset-password.handlebars
│   │   │       ├── reset-password.handlebars
│   │   │       └── welcome.handlebars
│   │   ├── http
│   │   │   ├── adapter.ts
│   │   │   ├── index.ts
│   │   │   ├── module.ts
│   │   │   └── service.ts
│   │   ├── logger
│   │   │   ├── adapter.ts
│   │   │   ├── index.ts
│   │   │   ├── module.ts
│   │   │   ├── service.ts
│   │   │   └── types.ts
│   │   ├── module.ts
│   │   ├── repository
│   │   │   ├── adapter.ts
│   │   │   ├── index.ts
│   │   │   ├── mongo
│   │   │   │   └── repository.ts
│   │   │   ├── postgres
│   │   │   │   └── repository.ts
│   │   │   ├── types.ts
│   │   │   └── util.ts
│   │   └── secrets
│   │       ├── adapter.ts
│   │       ├── index.ts
│   │       ├── module.ts
│   │       ├── service.ts
│   │       └── types.ts
│   ├── libs
│   │   ├── crypto
│   │   │   ├── adapter.ts
│   │   │   ├── index.ts
│   │   │   ├── module.ts
│   │   │   └── service.ts
│   │   ├── event
│   │   │   ├── adapter.ts
│   │   │   ├── index.ts
│   │   │   ├── module.ts
│   │   │   ├── service.ts
│   │   │   └── types.ts
│   │   ├── i18n
│   │   │   ├── adapter.ts
│   │   │   ├── index.ts
│   │   │   ├── languages
│   │   │   │   ├── en
│   │   │   │   │   └── info.json
│   │   │   │   └── pt
│   │   │   │       └── info.json
│   │   │   ├── module.ts
│   │   │   ├── service.ts
│   │   │   └── types.ts
│   │   ├── module.ts
│   │   └── token
│   │       ├── adapter.ts
│   │       ├── index.ts
│   │       ├── module.ts
│   │       └── service.ts
│   ├── main.ts
│   ├── modules
│   │   ├── cat
│   │   │   ├── adapter.ts
│   │   │   ├── controller.ts
│   │   │   ├── module.ts
│   │   │   ├── repository.ts
│   │   │   └── swagger.ts
│   │   ├── health
│   │   │   ├── controller.ts
│   │   │   ├── module.ts
│   │   │   └── __tests__
│   │   │       └── controller.spec.ts
│   │   ├── login
│   │   │   ├── adapter.ts
│   │   │   ├── controller.ts
│   │   │   ├── module.ts
│   │   │   └── swagger.ts
│   │   ├── logout
│   │   │   ├── adapter.ts
│   │   │   ├── controller.ts
│   │   │   ├── module.ts
│   │   │   └── swagger.ts
│   │   ├── permission
│   │   │   ├── adapter.ts
│   │   │   ├── controller.ts
│   │   │   ├── module.ts
│   │   │   ├── repository.ts
│   │   │   └── swagger.ts
│   │   ├── reset-password
│   │   │   ├── adapter.ts
│   │   │   ├── controller.ts
│   │   │   ├── module.ts
│   │   │   ├── repository.ts
│   │   │   └── swagger.ts
│   │   ├── role
│   │   │   ├── adapter.ts
│   │   │   ├── controller.ts
│   │   │   ├── module.ts
│   │   │   ├── repository.ts
│   │   │   └── swagger.ts
│   │   └── user
│   │       ├── adapter.ts
│   │       ├── controller.ts
│   │       ├── module.ts
│   │       ├── repository.ts
│   │       └── swagger.ts
│   ├── observables
│   │   ├── filters
│   │   │   ├── http-exception.filter.ts
│   │   │   └── index.ts
│   │   ├── guards
│   │   │   ├── auth.guard.ts
│   │   │   └── index.ts
│   │   ├── interceptors
│   │   │   ├── http-exception.interceptor.ts
│   │   │   ├── http-logger.interceptor.ts
│   │   │   ├── index.ts
│   │   │   ├── metrics.interceptor.ts
│   │   │   ├── request-timeout.interceptor.ts
│   │   │   └── tracing.interceptor.ts
│   │   └── middlewares
│   │       ├── index.ts
│   │       └── is-logged.middleware.ts
│   └── utils
│       ├── axios.ts
│       ├── collection.ts
│       ├── database
│       │   └── mongoose.ts
│       ├── date.ts
│       ├── decorators
│       │   ├── database
│       │   │   ├── mongo
│       │   │   │   ├── convert-mongoose-filter.decorator.ts
│       │   │   │   └── validate-mongoose-filter.decorator.ts
│       │   │   ├── postgres
│       │   │   │   └── convert-paginate-input-to-typeorm-filter.decorator.ts
│       │   │   └── validate-database-sort-allowed.decorator.ts
│       │   ├── index.ts
│       │   ├── request-timeout.decorator.ts
│       │   ├── role.decorator.ts
│       │   ├── types.ts
│       │   └── validate-schema.decorator.ts
│       ├── docs
│       │   ├── data
│       │   │   ├── cat
│       │   │   │   ├── request.ts
│       │   │   │   └── response.ts
│       │   │   ├── permission
│       │   │   │   ├── request.ts
│       │   │   │   └── response.ts
│       │   │   ├── role
│       │   │   │   ├── request.ts
│       │   │   │   └── response.ts
│       │   │   └── user
│       │   │       ├── request.ts
│       │   │       └── response.ts
│       │   └── swagger.ts
│       ├── entity.ts
│       ├── excel.ts
│       ├── exception.ts
│       ├── pagination.ts
│       ├── request.ts
│       ├── search.ts
│       ├── sort.ts
│       ├── static
│       │   └── http-status.json
│       ├── tests.ts
│       ├── text.ts
│       ├── tracing.ts
│       ├── usecase.ts
│       └── zod.ts
├── test
│   └── initialization.ts
├── TRACING.md
├── tsconfig.build.json
└── tsconfig.json
```

---

The following is a list of all the people that have contributed Nestjs monorepo boilerplate. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
