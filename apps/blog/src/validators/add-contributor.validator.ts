import * as Yup from 'yup'

export const AddContributorValidator = Yup.object().shape({
  email: Yup.string()
    .email('Precisa ser um email')
    .required('Valor é obrigatório'),
})
