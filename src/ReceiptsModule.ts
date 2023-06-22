import type { DependencyManager, FeatureRegistry, Module } from '@aries-framework/core'

import { Protocol } from '@aries-framework/core'

import { ReceiptsApi } from './ReceiptsApi'
import { ReceiptsService } from './services'

export class ReceiptsModule implements Module {
  public readonly api = ReceiptsApi

  /**
   * Registers the dependencies of the question answer module on the dependency manager.
   */
  public register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry) {
    // Api
    dependencyManager.registerContextScoped(ReceiptsApi)

    // Services
    dependencyManager.registerSingleton(ReceiptsService)

    // Feature Registry
    featureRegistry.register(
      new Protocol({
        id: 'https://didcomm.org/receipts/1.0',
      })
    )
  }
}
