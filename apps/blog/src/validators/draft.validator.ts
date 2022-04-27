import * as Yup from 'yup'

export const DraftValidator = Yup.object().shape({
  content: Yup.string().trim().required('Conteúdo é obrigatório'),
  title: Yup.string().trim().required('Título é obrigatório'),
  description: Yup.string().trim(),
  cover: Yup.string().trim(),
})
