# Limitações atuais e próximos passos recomendados

## 1) Migração Prisma não versionada no template
- O schema foi atualizado com `User`, mas a pasta de migrations não existe neste template mínimo.
- **Risco:** ambientes diferentes sem histórico reprodutível de banco.
- **Próximo passo:** adicionar migration inicial versionada.

## 2) Falta de cobertura de integração com banco real
- Há testes unitários e de integração HTTP usando mock repository.
- **Risco:** regressões específicas de Prisma/Postgres podem passar despercebidas.
- **Próximo passo:** incluir testes de integração com banco em ambiente de CI (ex: container postgres).
