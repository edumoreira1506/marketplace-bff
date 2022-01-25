import { BaseController, withTokenAuthorizationFactory } from '@cig-platform/core'

import TokenService from '@Services/TokenService'
import AccountClient from '@Clients/AccountServiceClient'

export default withTokenAuthorizationFactory(TokenService, BaseController.errorResponse, AccountClient)
