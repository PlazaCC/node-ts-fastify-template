# Revisão técnica do template (Node + Fastify + TS)

## Resumo executivo

O template está com **boa intenção arquitetural** (DDD + Clean Architecture), mas para o tamanho atual do projeto ele introduz um nível de abstração maior do que o necessário em alguns pontos. Isso aumenta custo de manutenção sem ganho proporcional.

As principais simplificações recomendadas:

1. **Remover container DI global mutável** e fazer composição explícita no `server.ts`.
2. **Manter DTO/schema Zod e Entity/VO**, mas evitar duplicação excessiva de contratos e mapeamentos.
3. **Reduzir mappers “cerimoniais”** quando houver transformação trivial.
4. **Endereçar concorrência no nível correto**: banco de dados (índice único + tratamento de erro), não container de DI.

---

## 1) DI container: avaliação real

### Situação anterior

Havia um container próprio baseado em `Map<string, any>` com `register/get`, configurado por ambiente e acessado na rota.

### Problemas

- **Estado global mutável**: ruim para isolamento de testes e risco de sobrescrita acidental.
- **Sem type-safety forte**: chave string + `any` traz risco em runtime.
- **Complexidade sem necessidade**: para poucas dependências, composição explícita é mais simples e legível.

### Mudança aplicada

- Dependência do `UserRepository` é resolvida no `server.ts` (composition root).
- `userRoutes` agora recebe `userRepository` em `options` tipadas.
- Arquivos de container/setup foram removidos.

> Para um projeto desse porte, esse desenho já atende Clean Architecture sem custo extra de um framework de DI.

---

## 2) DTO + schema + entidade + VO: precisa de tudo?

Resposta curta: **nem sempre**.

### Quando vale manter

- **Zod schema (DTO de transporte)**: válido para borda HTTP/contrato externo.
- **Entity/VO**: válido para regras de domínio que precisam ser centrais e reutilizáveis.

### Onde simplificar

- Evitar replicar múltiplos tipos quase idênticos sem necessidade.
- Se a transformação `Entity -> Output` for direta, pode ser feita no use case/controller sem `Mapper` dedicado.
- Só criar mapper quando existir:
  - transformação não-trivial,
  - anti-corruption layer,
  - ou múltiplas fontes de dados.

### Regra prática

- **Borda (HTTP)**: Zod.
- **Núcleo (domínio)**: Entity/VO só para invariantes reais.
- **Glue code**: mínimo necessário.

---

## 3) Concorrência e “multi-thread” no Node

### Contexto

Node é single-thread por processo no event loop, mas sua API lida com **concorrência assíncrona** e pode escalar em múltiplos processos/containers.

### Pontos críticos reais nesse template

1. `findByEmail` seguido de `save` pode sofrer race condition sob carga.
2. Repositório mock em memória não representa concorrência real de produção.

### Mitigação correta

- Garantir **índice único no banco** para email.
- Tratar erro de violação de unicidade e traduzir para erro de domínio (`DuplicatedItem`).
- Se necessário, usar transação para cenários mais complexos.

### DI e concorrência

- O container DI em si **não resolve concorrência de dados**.
- Composição explícita (instância única por processo) já é suficiente e mais previsível.

---

## 4) Próximos passos sugeridos

1. Criar testes unitários para `CreateUserUseCase` (cenário sucesso + duplicidade).
2. Adicionar teste de integração para rota `POST /users` cobrindo validação Zod.
3. Capturar e mapear erro de unicidade do Prisma no repositório/use case.
4. Padronizar estilo de código (há mistura de aspas/semicolon em alguns arquivos).

