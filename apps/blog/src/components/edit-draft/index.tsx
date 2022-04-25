import { FC } from 'react'

export const EditDraft: FC = () => {
  // TITULO
  // DESCRIÇÃO
  // OG IMAGE (URL INPUT)
  // ADICIONAR CONTRIBUIDOR (POR EMAIL)
  // CONTENT (RICH TEXT EDITOR)
  // REMOVER CONTRIBUIDOR (SELECT)

  return (
    <div>
      <input type="text" placeholder="Titulo" />

      <div>
        <textarea placeholder="Description" />

        <input type="url" placeholder="OG image" />

        <div>
          <input type="email" placeholder="Adicionar contribuidor" />

          <span>Remover contribuidor</span>
        </div>
      </div>

      <div>Rich editor</div>
    </div>
  )
}
