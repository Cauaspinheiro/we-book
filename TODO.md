## Roadmap

### Frontend

- [x] UI home
  - [x] Adicionar as [novas informações de post](#backend)
  - [x] Mobile
- [x] Toast de sucesso
- [x] Página de post
- [x] Página de posts

  - [x] Listar posts que nem na home só que apenas os do usuário (publisher ou contribuinte)

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
- [x] Deletar post e draft
- [x] Upsert de post quando publicar draft

- [ ] Adicionar features do serviço de profile
  - [ ] Quantidade de views totais dos seus posts
  - [ ] Quantidade de posts publicados
  - [ ] Quantidade de posts contribuídos
  - [ ] Quantidade de posts vistos

## Melhorias (opcionais)

- [ ] Pagination em home e posts
- [ ] Melhoria de UI?
  - [ ] Favicon
  - [ ] Adicionar confirmação mais bonita do que a nativa na hora de deletar
- [ ] Publicar agendado para blog service
- [ ] Realtime update e save de drafts
- [ ] Recovery de dead-lettering (principalmente para messages de users que não existiam)
- [ ] Melhoria de configuração do API Gateway (Nginx)
