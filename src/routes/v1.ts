import { withBodyValidation } from '@cig-platform/core'
import express from 'express'

import AdvertisingQuestionController from '@Controllers/AdvertisingQuestionController'
import DealController from '@Controllers/DealController'

import { storeAdvertisingQuestionSchema } from '@Schemas/AdvertisingQuestionSchemas'
import { storeAdvertisingQuestionAnswerSchema } from '@Schemas/AdvertisingQuestionAnswerSchemas'
import { storeDealSchema } from '@Schemas/DealSchemas'

import withTokenAuthoritzation from '@Middlewares/withTokenAuthoritzation'
import withBreederPermission from '@Middlewares/withBreederPermission'

const router = express.Router()

router.post(
  '/breeders/:breederId/poultries/:poultryId/advertisings/:advertisingId/questions',
  withBodyValidation(storeAdvertisingQuestionSchema),
  withTokenAuthoritzation,
  AdvertisingQuestionController.store
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/advertisings/:advertisingId/questions/:questionId/answers',
  withBodyValidation(storeAdvertisingQuestionAnswerSchema),
  withTokenAuthoritzation,
  withBreederPermission,
  AdvertisingQuestionController.storeAnswer
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/advertisings/:advertisingId/deals',
  withTokenAuthoritzation,
  withBodyValidation(storeDealSchema),
  DealController.store
)

export default router
