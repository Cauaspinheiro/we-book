import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import supertokens from 'supertokens-node'
import Session from 'supertokens-node/recipe/session'
import EmailPassword from 'supertokens-node/recipe/emailpassword'

import { ConfigInjectionToken, AuthModuleConfig } from './auth.config'
import { AuthRMQGateway } from './auth-rmq.gateway'

@Injectable()
export class SupertokensService {
  constructor(
    authRMQGateway: AuthRMQGateway,
    @Inject(ConfigInjectionToken) config: AuthModuleConfig,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Session.init(),
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'name',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw new InternalServerErrorException(
                      'Missing supertokens implementation',
                    )
                  }

                  // First we call the original implementation of signUpPOST.
                  const response = await originalImplementation.signUpPOST(
                    input,
                  )

                  // Post sign up response, we check if it was successful
                  if (response.status === 'OK') {
                    const nameField = input.formFields.find(
                      ({ id }) => id === 'name',
                    )

                    if (!nameField) {
                      throw new InternalServerErrorException(
                        'Name field not found',
                      )
                    }

                    const name = nameField.value

                    authRMQGateway.onSignup({ ...response.user, name })
                  }

                  return response
                },
              }
            },
          },
        }),
      ],
    })
  }
}
