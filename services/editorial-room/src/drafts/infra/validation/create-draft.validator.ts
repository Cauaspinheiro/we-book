import { CreateDraftDTO } from 'src/drafts/domain/create-draft.dto'
import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateDraftValidator implements CreateDraftDTO {
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  @MaxLength(64)
  title: string

  @IsOptional()
  @IsNotEmpty()
  description?: string | undefined

  @IsOptional()
  @IsUrl()
  ogCover?: string | undefined

  @IsOptional()
  @Matches(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/)
  @MinLength(4)
  @MaxLength(64)
  urlPath?: string | undefined
}
