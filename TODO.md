## Roadmap

### Frontend

- [x] UI home
  - [x] Adicionar as [novas informações de post](#backend)
  - [x] Mobile
- [x] Toast de sucesso
- [x] Página de post
- [ ] Página de posts

  - [ ] Listar posts que nem na home só que apenas os do usuário (publisher ou contribuinte)

- [ ] Favicon

- [ ] Páginas de drafts
- [ ] Página de draft
- [ ] Página de perfil
- [ ] Customizar toda a UI do supertokens (páginas de auth e emails)

### Backend

- [x] Adicionar nome do usuário (só nome mesmo, sem first e last)
- [x] Adicionar mais informações de post
  - Titulo
  - SEO-url (gerar automaticamente com o titulo caso n seja provido)
  - Descrição
  - OG image (apenas URL)
- [ ] CORS via Nginx e melhorar toda a configuração (remover configs hard-coded)
- [ ] Deletar post e draft (deletar um leva a deletar o outro)
- [ ] Upsert de post quando publicar draft

- [ ] Adicionar features do serviço de profile
  - [ ] Quantidade de views totais dos seus posts
  - [ ] Quantidade de posts publicados
  - [ ] Quantidade de posts contribuídos
  - [ ] Quantidade de posts vistos

## Melhorias (opcionais)

- [ ] Melhoria de UI?
- [ ] Publicar agendado para blog service
- [ ] Realtime update e save de drafts
- [ ] Recovery de dead-lettering (principalmente para messages de users que não existiam)
- [ ] Melhoria de configuração do API Gateway (Nginx)
