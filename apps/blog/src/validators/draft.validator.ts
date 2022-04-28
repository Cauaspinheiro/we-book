import * as Yup from 'yup'

export const DraftValidator = Yup.object().shape({
  content: Yup.string().trim().required('Conteúdo é obrigatório'),
  title: Yup.string().trim().required('Título é obrigatório'),
  description: Yup.string().trim(),
  ogCover: Yup.string().url('Precisa ser uma URL').trim(),
  urlPath: Yup.string()
    .trim()
    .optional()
    .matches(
      /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/,
      'Precisa ser um caminho de url válido',
    )
    .max(64, 'Não pode ter mais de 64 caracteres'),
})
