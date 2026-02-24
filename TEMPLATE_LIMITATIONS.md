# Limitações atuais e próximos passos recomendados

## 1) Acoplamento de infraestrutura no `server.ts`
- O `server.ts` ainda conhece classes concretas de repositório.
- Em sistemas maiores, isso escala mal quando há muitos módulos.
- **Próximo passo:** criar uma pasta `composition/` com factories por módulo.

## 2) Entidade `User` anêmica para regras futuras
- Hoje as regras mais fortes estão em VO + schema.
- Se o domínio crescer (status, regras de atualização, eventos), a entidade precisa encapsular mais invariantes.
- **Próximo passo:** mover regras comportamentais para métodos da entidade.

## 3) Estratégia de erro ainda heterogênea
- `Email` e `Address` ainda lançam `Error` genérico, enquanto usecases/repositórios lançam `BaseError`.
- **Risco:** resposta HTTP inconsistente em alguns cenários.
- **Próximo passo:** padronizar para `EntityError`/`BaseError` no domínio.

## 4) Falta de testes de integração HTTP
- Foram adicionados testes unitários de use case, mas faltam testes de rota (`POST /users`) cobrindo schema + handler + middleware.
- **Próximo passo:** testes com `fastify.inject` para contrato HTTP.

## 5) Migração Prisma não versionada no template
- O schema foi atualizado com `User`, mas a pasta de migrations não existe neste template mínimo.
- **Risco:** ambientes diferentes sem histórico reprodutível de banco.
- **Próximo passo:** adicionar migration inicial versionada.

## 6) `prisma` singleton sem lifecycle explícito
- Não há `onClose` para `prisma.$disconnect()` no shutdown do app.
- **Próximo passo:** registrar hook de encerramento do Fastify.
