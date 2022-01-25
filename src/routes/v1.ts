import { withBodyValidation } from '@cig-platform/core'
import express from 'express'

import AdvertisingQuestionController from '@Controllers/AdvertisingQuestionController'

import { storeAdvertisingQuestionSchema } from '@Schemas/AdvertisingQuestionSchema'

import withTokenAuthoritzation from '@Middlewares/withTokenAuthoritzation'

const router = express.Router()

router.post(
  '/breeders/:breederId/poultries/:poultryId/advertisings/:advertisingId/questions',
  withBodyValidation(storeAdvertisingQuestionSchema),
  withTokenAuthoritzation,
  AdvertisingQuestionController.store
)

export default router
