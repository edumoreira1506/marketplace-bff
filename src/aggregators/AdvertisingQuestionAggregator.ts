import { AdvertisingServiceClient as IAdvertisingServiceClient  } from '@cig-platform/core'
import { IAdvertisingQuestion, IAdvertisingQuestionAnswer } from '@cig-platform/types'

import AdvertisingServiceClient from '@Clients/AdvertisingServiceClient'

export class AdvertisingQuestionAggregator {
  private _advertisingServiceClient: IAdvertisingServiceClient;
  
  constructor(
    advertisingServiceClient: IAdvertisingServiceClient,
  ) {
    this._advertisingServiceClient = advertisingServiceClient

    this.postQuestion = this.postQuestion.bind(this)
  }

  async postQuestion(
    merchantId: string,
    advertisingId: string,
    question: Partial<IAdvertisingQuestion>
  ) {
    return this._advertisingServiceClient.postAdvertisingQuestion(
      merchantId, advertisingId, question
    )
  }

  async postQuestionAnswer(
    merchantId: string,
    advertisingId: string,
    questionId: string,
    answer: Partial<IAdvertisingQuestionAnswer>
  ) {
    return this._advertisingServiceClient.postAdvertisingQuestionAnswer(
      merchantId, advertisingId, questionId, answer
    )
  }
}

export default new AdvertisingQuestionAggregator(AdvertisingServiceClient)
