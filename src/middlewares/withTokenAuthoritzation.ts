import { BaseController, withTokenAuthorizationFactory } from '@cig-platform/core'

import AccountClient from '@Clients/AccountServiceClient'
import AuthClient from '@Clients/AuthBffClient'

export default withTokenAuthorizationFactory(AuthClient, BaseController.errorResponse, AccountClient)
