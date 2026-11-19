# Casamento a Bordo — Migração independente

Branch de desenvolvimento: feature/blog-proprio-postgres. Não publicar antes dos testes.

## Arquitetura
Frontend React/Vite, API Node nativa, PostgreSQL, sessões com cookies HttpOnly/Secure/SameSite=Lax, CSRF e uploads persistentes em /data/uploads.

## Coolify
- Aplicação Dockerfile /Dockerfile, porta 80.
- PostgreSQL separado, na rede privada do Coolify.
- Variáveis DATABASE_URL, MASTER_EMAIL, MASTER_PASSWORD, ADMIN_EMAIL, ADMIN_PASSWORD.
- Senhas iniciais: no mínimo 12 caracteres, inseridas **somente no Coolify**.
- Volume persistente no contêiner: /data/uploads.
- Domínio HTTPS obrigatório para cookies Secure.
- Não configurar VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY.
- Backup regular do PostgreSQL e do volume /data/uploads.

## Comportamento de inicialização
As contas são criadas somente se o e-mail ainda não existir. Variáveis de senha não redefinem senhas de contas existentes. Não usar senhas reais em commits.

## Testes pendentes antes de mesclar na main
- npm ci, npm run build, npm run lint
- Autenticação master e admin, CSRF, bloqueio de tentativas
- Criar/editar/excluir/publicar artigo e upload de imagem
- Validar persistência após reiniciar e backup/restauração
- Revisar sanitização do HTML do editor e permissões de master
- Revisar acessibilidade, SEO e navegação pública

## Observações
Este trabalho não migra conteúdo armazenado no antigo Supabase; se houver posts existentes, é necessária exportação explícita.
