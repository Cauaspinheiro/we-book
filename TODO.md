## Auth service

Autenticação de usuários

### Terminar configuração

- Terminar as configurações do supertokens [deste link](https://supertokens.com/docs/emailpassword/nestjs/guide#6-add-the-supertokens-error-handler)

### Sistema de roles

Criar o sistema de roles (atualmente usuários e publishers)

- Adicionar publishers by publishers

### Comunicação com outros serviços

Conforme outros serviços são criados, comunicar o serviço de autenticação para falar quando um usuário é criado ou updated.

### Personalizar - melhorias

Depois de terminar todo o sistema, customizar toda a UI do supertokens (páginas de auth e emails)

## Redaction service

### v1

- Criação de writers baseado nos eventos da API
- Criação de drafts
- Chamar outros publishers

### v2

- [Sistema de roles](#sistema-de-roles)

### v3 - depois de blog service

- Publicar ou publicar agendado para blog service

### v4 - melhorias

- Realtime update e save
- Recovery de dead-lettering (principalmente para messages de publishers que não existiam)
