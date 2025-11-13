# 🚀 Node TypeScript Fastify Template

Template moderno e escalável para desenvolvimento de APIs REST com Node.js, TypeScript e Fastify, seguindo os princípios de Clean Architecture e Domain-Driven Design (DDD).

## 📋 Índice

- [Sobre o Template](#-sobre-o-template)
- [Arquitetura](#-arquitetura)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Uso e Exemplos](#-uso-e-exemplos)
- [Configuração](#-configuração)
- [Testes](#-testes)
- [Boas Práticas](#-boas-práticas)

---

## 🎯 Sobre o Template

Este template foi criado para acelerar o desenvolvimento de APIs robustas e escaláveis, fornecendo uma estrutura organizada baseada em **Clean Architecture** e **DDD**. Ideal para projetos que precisam de:

- ✅ Separação clara de responsabilidades
- ✅ Código testável e manutenível
- ✅ Validação de dados com schemas
- ✅ Documentação automática de API
- ✅ Integração com banco de dados via ORM
- ✅ Tratamento centralizado de erros
- ✅ TypeScript para type-safety

---

## 🏗️ Arquitetura

O template segue a **Clean Architecture** com organização modular, dividindo o código em camadas bem definidas:

```
┌─────────────────────────────────────────┐
│      Feature Modules (users/)           │  ← Módulos organizados por funcionalidade
│  ┌─────────────────────────────────┐   │
│  │  Controllers (Presentation)     │   │  ← HTTP Handlers
│  ├─────────────────────────────────┤   │
│  │  Use Cases (Application)        │   │  ← Business Logic
│  ├─────────────────────────────────┤   │
│  │  DTOs/Schemas (Validation)      │   │  ← Input/Output Validation
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│         Domain Layer                    │  ← Entities, Value Objects, Contracts
├─────────────────────────────────────────┤
│         Infrastructure Layer            │  ← Repositories, Database, Mappers
└─────────────────────────────────────────┘
```

### Organização Modular (Feature-Based)

Este template utiliza uma **arquitetura modular baseada em funcionalidades** (Feature Modules). Cada módulo (ex: `users/`, `products/`) contém:

- **Use Cases**: Lógica de aplicação específica da funcionalidade
- **Controllers**: Handlers HTTP para a funcionalidade
- **DTOs/Schemas**: Validações Zod de entrada e saída
- **Routes**: Rotas HTTP da funcionalidade

**Vantagens:**

- ✅ Organização por contexto de negócio (não por tipo técnico)
- ✅ Facilita encontrar código relacionado
- ✅ Permite crescimento independente de módulos
- ✅ Ideal para equipes trabalhando em funcionalidades diferentes

### Princípios Aplicados

- **Dependency Inversion**: Camadas externas dependem de abstrações (contratos) definidas no domínio
- **Single Responsibility**: Cada classe/módulo tem uma única responsabilidade
- **Open/Closed**: Aberto para extensão, fechado para modificação
- **Interface Segregation**: Interfaces específicas e coesas

---

## 📁 Estrutura de Pastas

```
src/
├── domain/                      # 🟦 CAMADA DE DOMÍNIO (Core Business)
│   ├── entities/               # Entidades de negócio (User, Product, etc)
│   │   └── user.entity.ts     # Regras de negócio da entidade User
│   ├── value-objects/         # Objetos de valor imutáveis
│   │   ├── email.vo.ts       # Validação e lógica do Email
│   │   └── address.vo.ts     # Validação e lógica do Address
│   └── contracts/            # Interfaces/contratos do domínio
│       └── user.repository.ts # Contrato que o repositório deve seguir
│
├── users/                     # 🟩 MÓDULO DE USUÁRIOS (Feature Module)
│   ├── usecases/             # Casos de uso (Application Layer)
│   │   └── create-user.usecase.ts
│   ├── controllers/          # Controllers HTTP (Presentation Layer)
│   │   └── create-user.controller.ts
│   ├── dtos/                # Schemas Zod para validação
│   │   └── user.schema.ts
│   └── user.routes.ts       # Definição de rotas do módulo
│
├── infraestructure/          # 🟧 CAMADA DE INFRAESTRUTURA
│   ├── repositories/        # Implementações concretas dos repositórios
│   │   └── user.repository.prisma.ts
│   ├── mappers/            # Conversores entre entidades e DTOs/modelos
│   │   └── user.mapper.ts
│   ├── mocks/              # Repositórios mockados para testes
│   │   └── user.repository.mock.ts
│   └── prisma/             # Configuração do Prisma ORM
│       └── client.ts
│
├── helpers/                 # 🛠️ UTILITÁRIOS E CONFIGURAÇÕES
│   ├── config/             # Configurações da aplicação
│   │   ├── environments.ts # Variáveis de ambiente
│   │   └── types.ts       # Tipos TypeScript globais
│   ├── errors/             # Classes de erro customizadas
│   │   └── errors.ts
│   ├── enum/               # Enums compartilhados
│   │   └── http_status_code_enum.ts
│   └── middlewares/        # Middlewares do Fastify
│       ├── error_handler_middleware.ts
│       └── multipart_middleware.ts
│
└── server.ts               # 🚀 Ponto de entrada da aplicação

prisma/
└── schema.prisma          # Schema do banco de dados
```

### Quando usar cada camada?

#### 🟦 **Domain** (Domínio)

**Quando usar:**

- Definir regras de negócio puras
- Criar entidades que representam conceitos do negócio
- Validar dados que são conceitos do domínio (Email, CPF, etc)
- Definir contratos (interfaces) que a infraestrutura deve implementar

**Exemplo:** A validação de que um email deve conter "@" fica na classe `Email` (value object)

#### 🟩 **Feature Modules** (Módulos por Funcionalidade - ex: users/)

**Quando usar:**

- Organizar código por funcionalidade/domínio
- Agrupar use cases, controllers, DTOs e rotas relacionadas
- Facilitar navegação e manutenção do código
- Cada módulo contém sua própria camada de aplicação e apresentação

**Estrutura de um módulo:**

```
users/
├── usecases/          # Lógica de aplicação (Use Cases)
├── controllers/       # Handlers HTTP
├── dtos/             # Schemas de validação (Zod)
└── user.routes.ts    # Rotas do módulo
```

**Exemplo:** O módulo `users/` agrupa tudo relacionado a usuários

#### 🟧 **Infrastructure** (Infraestrutura)

**Quando usar:**

- Implementar acesso ao banco de dados
- Integrar com APIs externas
- Implementar serviços de email, storage, etc
- Converter entre formatos (mappers)

**Exemplo:** `UserRepositoryPrisma` implementa a persistência usando Prisma

---

## 🛠️ Tecnologias

### Core

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Fastify](https://fastify.dev/)** - Framework web de alta performance
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript

### Validação e Documentação

- **[Zod](https://zod.dev/)** - Schema validation com inferência de tipos
- **[Fastify Swagger](https://github.com/fastify/fastify-swagger)** - Documentação OpenAPI automática
- **[fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod)** - Integração Zod + Fastify

### Qualidade de Código

- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários

### Desenvolvimento

- **[tsx](https://github.com/esbuild-kit/tsx)** - Executor TypeScript com hot reload
- **[Docker](https://www.docker.com/)** - Container para banco de dados local

---

## ✅ Pré-requisitos

- **Node.js** >= 18.x
- **Yarn** >= 4.9.2 (ou npm/pnpm)
- **Docker** (para executar o banco de dados local)
- **PostgreSQL** 17+ (ou use o container Docker fornecido)

---

## 🚀 Instalação

### 1. Clone ou use o template

```bash
git clone https://github.com/PlazaCC/node-ts-fastify-template.git
cd node-ts-fastify-template
```

### 2. Instale as dependências

```bash
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/localdb"

# Server
PORT=3000
STAGE=DEV

# Node
NODE_ENV=development
```

### 4. Suba o banco de dados local (Docker)

```bash
yarn dev:db-init
```

Este comando cria um container PostgreSQL rodando na porta 5433.

### 5. Execute as migrações

```bash
yarn migrate:dev
```

### 6. Inicie o servidor de desenvolvimento

```bash
yarn dev
```

O servidor estará rodando em `http://localhost:3000` 🎉

Acesse a documentação da API em `http://localhost:3000/docs`

---

## 📜 Scripts Disponíveis

### Desenvolvimento

```bash
# Inicia o servidor em modo watch (hot reload)
yarn dev

# Inicializa banco de dados PostgreSQL no Docker
yarn dev:db-init

# Inicia container do banco + gera Prisma Client
yarn dev:db
```

### Build e Produção

```bash
# Compila TypeScript para JavaScript
yarn build

# Inicia aplicação compilada (produção)
yarn start
```

### Database (Prisma)

```bash
# Gera o Prisma Client
yarn generate

# Cria e aplica migração no ambiente de desenvolvimento
yarn migrate:dev

# Aplica migrações em produção
yarn migrate:deploy

# Reseta banco de dados (apaga todos os dados!)
yarn migrate:reset

# Abre interface visual para visualizar/editar dados
yarn studio

# Executa seed (popular banco com dados iniciais)
yarn seed

# Limpa todos os dados do banco
yarn wipe
```

### Qualidade de Código

```bash
# Executa o linter e corrige problemas automaticamente
yarn lint

# Verifica tipagem TypeScript sem compilar
yarn typecheck

# Executa testes unitários
yarn test
```

---

## 💡 Uso e Exemplos

### Criar um novo módulo

Para criar um novo módulo de funcionalidade (ex: `products/`):

#### 1. Crie a estrutura de pastas

```
src/
└── products/
    ├── usecases/
    ├── controllers/
    ├── dtos/
    └── product.routes.ts
```

#### 2. Defina o contrato no domínio

```typescript
// src/domain/contracts/product.repository.ts
import { Product } from '@/domain/entities/product.entity'

export interface ProductRepository {
  save(product: Product): Promise<Product>
  findById(id: string): Promise<Product | null>
  findAll(): Promise<Product[]>
}
```

#### 3. Crie a entidade de domínio

```typescript
// src/domain/entities/product.entity.ts
export interface ProductProps {
  id?: string
  name: string
  price: number
  description?: string
}

export class Product {
  readonly id?: string
  readonly name: string
  readonly price: number
  readonly description?: string

  constructor(props: ProductProps) {
    if (!props.name) throw new Error('Nome é obrigatório')
    if (props.price <= 0) throw new Error('Preço deve ser positivo')

    this.id = props.id
    this.name = props.name
    this.price = props.price
    this.description = props.description
  }
}
```

#### 4. Implemente o repositório

```typescript
// src/infraestructure/repositories/product.repository.prisma.ts
import { prisma } from '../prisma/client'
import { Product } from '@/domain/entities/product.entity'
import { ProductRepository } from '@/domain/contracts/product.repository'

export class ProductRepositoryPrisma implements ProductRepository {
  async save(product: Product): Promise<Product> {
    const data = await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
      },
    })
    return new Product(data)
  }

  async findById(id: string): Promise<Product | null> {
    const record = await prisma.product.findUnique({ where: { id } })
    return record ? new Product(record) : null
  }

  async findAll(): Promise<Product[]> {
    const records = await prisma.product.findMany()
    return records.map((r) => new Product(r))
  }
}
```

#### 5. Crie os schemas de validação

```typescript
// src/products/dtos/product.schema.ts
import { z } from 'zod'

export const createProductInputDto = z
  .object({
    name: z.string().min(3),
    price: z.number().positive(),
    description: z.string().optional(),
  })
  .strict()

export const productOutputDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
})

export type CreateProductInput = z.infer<typeof createProductInputDto>
export type ProductOutput = z.infer<typeof productOutputDto>
```

#### 6. Implemente o use case

```typescript
// src/products/usecases/create-product.usecase.ts
import { ProductRepository } from '@/domain/contracts/product.repository'
import { Product } from '@/domain/entities/product.entity'
import { CreateProductInput } from '../dtos/product.schema'

export class CreateProductUseCase {
  constructor(private readonly repo: ProductRepository) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const product = new Product({
      name: input.name,
      price: input.price,
      description: input.description,
    })

    return await this.repo.save(product)
  }
}
```

#### 7. Crie o controller

```typescript
// src/products/controllers/create-product.controller.ts
import { CreateProductUseCase } from '../usecases/create-product.usecase'
import { CreateProductInput, ProductOutput } from '../dtos/product.schema'
import { FastifyRequest, FastifyReply } from 'fastify'

export function createProductController(usecase: CreateProductUseCase) {
  return async function (
    request: FastifyRequest<{ Body: CreateProductInput }>,
    reply: FastifyReply
  ) {
    const product = await usecase.execute(request.body)
    return reply.status(201).send(product)
  }
}
```

#### 8. Registre as rotas

```typescript
// src/products/product.routes.ts
import { FastifyTypedInstance } from '@/helpers/config/types'
import { ProductRepositoryPrisma } from '@/infraestructure/repositories/product.repository.prisma'
import { createProductController } from './controllers/create-product.controller'
import { CreateProductUseCase } from './usecases/create-product.usecase'
import { createProductInputDto, productOutputDto } from './dtos/product.schema'

export async function productRoutes(server: FastifyTypedInstance) {
  const productRepository = new ProductRepositoryPrisma()
  const createProductUseCase = new CreateProductUseCase(productRepository)

  server.post(
    '/',
    {
      schema: {
        tags: ['Products'],
        description: 'Create a new product',
        body: createProductInputDto,
        response: {
          201: productOutputDto,
        },
      },
    },
    createProductController(createProductUseCase)
  )
}
```

#### 9. Registre no servidor

```typescript
// src/server.ts
import { productRoutes } from './products/product.routes'

// ... outras configurações

server.register(productRoutes, { prefix: '/products' })
```

### Criar um novo endpoint

Vamos criar um endpoint para **listar usuários**:

#### 1. **Domain** - Defina o contrato (se necessário)

```typescript
// src/domain/contracts/user.repository.ts
export interface UserRepository {
  findAll(): Promise<User[]> // ← Adicione este método
  // ... outros métodos
}
```

#### 2. **Use Cases** - Crie o Use Case no módulo

```typescript
// src/users/usecases/list-users.usecase.ts
import { UserRepository } from '@/domain/contracts/user.repository'
import { User } from '@/domain/entities/user.entity'

export class ListUsersUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.repo.findAll()
  }
}
```

#### 3. **Infrastructure** - Implemente no repositório

```typescript
// src/infraestructure/repositories/user.repository.prisma.ts
async findAll(): Promise<User[]> {
  const records = await prisma.user.findMany()
  return records.map(UserMapper.toDomain)
}
```

#### 4. **DTOs** - Crie o schema de validação

```typescript
// src/users/dtos/user.schema.ts
export const listUsersOutputSchema = z.array(userSchema)
export type ListUsersOutput = z.infer<typeof listUsersOutputSchema>
```

#### 5. **Controllers** - Crie o controller

```typescript
// src/users/controllers/list-users.controller.ts
import { ListUsersUseCase } from '@/users/usecases/list-users.usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

export function listUsersController(usecase: ListUsersUseCase) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const users = await usecase.execute()

    return reply.status(200).send(users)
  }
}
```

#### 6. **Routes** - Registre a rota no módulo

```typescript
// src/users/user.routes.ts
import { listUsersController } from './controllers/list-users.controller'
import { ListUsersUseCase } from './usecases/list-users.usecase'
import { FastifyTypedInstance } from '@/helpers/config/types'

export async function userRoutes(server: FastifyTypedInstance) {
  const userRepository = new UserRepositoryMock()
  const listUsersUseCase = new ListUsersUseCase(userRepository)

  server.get(
    '/',
    {
      schema: {
        tags: ['Users'],
        description: 'List all users',
        response: {
          200: listUsersOutputSchema,
        },
      },
    },
    listUsersController(listUsersUseCase)
  )
}
```

### Criar um novo Value Object

```typescript
// src/domain/value-objects/cpf.vo.ts
export class CPF {
  private constructor(readonly value: string) {}

  static create(value: string): CPF {
    const cleaned = value.replace(/\D/g, '')

    if (cleaned.length !== 11) {
      throw new Error('CPF deve ter 11 dígitos')
    }

    if (!this.isValid(cleaned)) {
      throw new Error('CPF inválido')
    }

    return new CPF(cleaned)
  }

  private static isValid(cpf: string): boolean {
    // Lógica de validação do CPF
    // ...
    return true
  }

  format(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  toString(): string {
    return this.value
  }
}
```

### Tratar erros customizados

```typescript
// src/users/usecases/create-user.usecase.ts
import { DuplicatedItem, EntityError } from '@/helpers/errors/errors'

export class CreateUserUseCase {
  async execute(input: CreateUserInput): Promise<User> {
    // Valida regra de negócio
    const existing = await this.repo.findByEmail(input.email)
    if (existing) {
      throw new DuplicatedItem('Usuário já cadastrado') // HTTP 409
    }

    try {
      const user = new User({ ...input })
      return await this.repo.save(user)
    } catch (error) {
      throw new EntityError('Erro ao criar usuário') // HTTP 400
    }
  }
}
```

Os erros são automaticamente tratados pelo middleware `error_handler_middleware.ts` e retornam respostas HTTP adequadas.

---

## ⚙️ Configuração

### Variáveis de Ambiente

Edite o arquivo `src/helpers/config/environments.ts` para adicionar novas variáveis:

```typescript
export class Environments {
  static stage: STAGE = (process.env.STAGE as STAGE) || STAGE.DEV

  static database_url: string = process.env.DATABASE_URL || 'postgres://...'

  // Adicione suas variáveis aqui
  static jwtSecret: string = process.env.JWT_SECRET || 'default-secret'

  static awsRegion: string = process.env.AWS_REGION || 'us-east-1'
}
```

### Prisma Schema

Defina seus modelos no arquivo `prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  street    String
  city      String
  state     String
  zipCode   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          String   @id @default(uuid())
  name        String
  price       Float
  description String?
  createdAt   DateTime @default(now())
}
```

Após modificar o schema:

```bash
yarn migrate:dev --name add_products_table
```

### CORS

Edite `src/server.ts` para configurar CORS:

```typescript
server.register(fastifyCors, {
  origin: ['https://seudominio.com', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})
```

---

## 🧪 Testes

### Estrutura de Testes

```typescript
// src/users/__tests__/create-user.usecase.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateUserUseCase } from '../usecases/create-user.usecase'
import { UserRepositoryMock } from '@/infraestructure/mocks/user.repository.mock'

describe('CreateUserUseCase', () => {
  let usecase: CreateUserUseCase
  let repository: UserRepositoryMock

  beforeEach(() => {
    repository = new UserRepositoryMock()
    usecase = new CreateUserUseCase(repository)
  })

  it('should create a user successfully', async () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      address: {
        street: 'Main St',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000000',
      },
    }

    const user = await usecase.execute(input)

    expect(user.name).toBe('John Doe')
    expect(user.email.value).toBe('john@example.com')
  })

  it('should throw error if email already exists', async () => {
    const input = {
      /* ... */
    }

    await usecase.execute(input)

    await expect(usecase.execute(input)).rejects.toThrow(
      'Usuário já cadastrado'
    )
  })
})
```

### Executar Testes

```bash
# Roda todos os testes
yarn test

# Roda em modo watch
yarn test --watch

# Roda com coverage
yarn test --coverage
```

---

## 📚 Boas Práticas

### 1. Mantenha as camadas independentes

❌ **Evite:**

```typescript
// Use Case conhecendo detalhes de HTTP
export class CreateUserUseCase {
  async execute(request: FastifyRequest) {
    // ❌ Acoplamento com Fastify
    // ...
  }
}
```

✅ **Faça:**

```typescript
// Use Case recebe apenas dados
export class CreateUserUseCase {
  async execute(input: CreateUserInput) {
    // ✅ Desacoplado
    // ...
  }
}
```

### 2. Use Value Objects para validações de domínio

❌ **Evite:**

```typescript
class User {
  constructor(public email: string) {
    if (!email.includes('@')) throw new Error('Invalid') // Validação na entidade
  }
}
```

✅ **Faça:**

```typescript
class Email {
  static create(value: string): Email {
    if (!value.includes('@')) throw new Error('Invalid')
    return new Email(value)
  }
}

class User {
  constructor(public email: Email) {} // Email já validado
}
```

### 3. Injete dependências

❌ **Evite:**

```typescript
class CreateUserUseCase {
  async execute() {
    const repo = new UserRepositoryPrisma() // ❌ Acoplamento forte
  }
}
```

✅ **Faça:**

```typescript
class CreateUserUseCase {
  constructor(private repo: UserRepository) {} // ✅ Injeção de dependência
}
```

### 4. Use Mappers para converter dados

```typescript
// src/infraestructure/mappers/user.mapper.ts
export class UserMapper {
  static toDomain(record: any): User {
    return new User({
      id: record.id,
      name: record.name,
      email: Email.create(record.email),
      address: Address.create({
        street: record.street,
        city: record.city,
        state: record.state,
        zipCode: record.zipCode,
      }),
    })
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      street: user.address.street,
      city: user.address.city,
      state: user.address.state,
      zipCode: user.address.zipCode,
    }
  }
}
```

### 5. Schemas Zod para validação de API

```typescript
// src/users/dtos/product.schema.ts
import { z } from 'zod'

export const createProductInputSchema = z
  .object({
    name: z.string().min(3).max(100),
    price: z.number().positive(),
    description: z.string().optional(),
  })
  .strict()

export type CreateProductInput = z.infer<typeof createProductInputSchema>
```

### 6. Documentação automática

Todos os endpoints registrados com schemas Zod são automaticamente documentados no Swagger UI (`/docs`).

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 🙋 FAQ

### Por que Clean Architecture?

Facilita manutenção, testes e evolução do código. Camadas bem definidas permitem trocar tecnologias (ex: Prisma por TypeORM) sem afetar a lógica de negócio.

### Quando usar Value Objects?

Use para conceitos do domínio que precisam de validação e não têm identidade própria (Email, CPF, Money, Address).

### Devo sempre criar Use Cases?

Sim, use cases representam intenções do usuário/sistema. Mesmo operações simples devem ter use cases para manter consistência.

### Como adicionar autenticação?

1. Instale `@fastify/jwt`
2. Crie um middleware de autenticação em `helpers/middlewares/`
3. Aplique o middleware nas rotas protegidas
4. Adicione `userId` no contexto da requisição

### Posso usar MongoDB ao invés de PostgreSQL?

Sim! Basta:

1. Trocar o provider no `schema.prisma` para `mongodb`
2. Atualizar a `DATABASE_URL`
3. Executar `yarn migrate:dev`

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub.

**Happy Coding! 🚀**
