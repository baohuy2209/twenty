import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { SupportDriver } from 'src/engine/core-modules/twenty-config/interfaces/support.interface';

import {
  ModelId,
  ModelProvider,
} from 'src/engine/core-modules/ai/constants/ai-models.const';
import { BillingTrialPeriodDTO } from 'src/engine/core-modules/billing/dtos/billing-trial-period.dto';
import { CaptchaDriverType } from 'src/engine/core-modules/captcha/interfaces';
import { FeatureFlagKey } from 'src/engine/core-modules/feature-flag/enums/feature-flag-key.enum';
import { AuthProviders } from 'src/engine/core-modules/workspace/dtos/public-workspace-data-output';

registerEnumType(FeatureFlagKey, {
  name: 'FeatureFlagKey',
});

registerEnumType(ModelProvider, {
  name: 'ModelProvider',
});

@ObjectType()
export class ClientAIModelConfig {
  @Field(() => String)
  modelId: ModelId;

  @Field(() => String)
  label: string;

  @Field(() => ModelProvider)
  provider: ModelProvider;

  @Field(() => Number)
  inputCostPer1kTokensInCredits: number;

  @Field(() => Number)
  outputCostPer1kTokensInCredits: number;
}

@ObjectType()
class Billing {
  @Field(() => Boolean)
  isBillingEnabled: boolean;

  @Field(() => String, { nullable: true })
  billingUrl?: string;

  @Field(() => [BillingTrialPeriodDTO])
  trialPeriods: BillingTrialPeriodDTO[];
}

@ObjectType()
class Support {
  @Field(() => SupportDriver)
  supportDriver: SupportDriver;

  @Field(() => String, { nullable: true })
  supportFrontChatId?: string;
}

@ObjectType()
class Sentry {
  @Field(() => String, { nullable: true })
  environment?: string;

  @Field(() => String, { nullable: true })
  release?: string;

  @Field(() => String, { nullable: true })
  dsn?: string;
}

@ObjectType()
class Captcha {
  @Field(() => CaptchaDriverType, { nullable: true })
  provider: CaptchaDriverType | undefined;

  @Field(() => String, { nullable: true })
  siteKey: string | undefined;
}

@ObjectType()
class ApiConfig {
  @Field(() => Number, { nullable: false })
  mutationMaximumAffectedRecords: number;
}

@ObjectType()
class PublicFeatureFlagMetadata {
  @Field(() => String)
  label: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: false, defaultValue: '' })
  imagePath: string;
}

@ObjectType()
class PublicFeatureFlag {
  @Field(() => FeatureFlagKey)
  key: FeatureFlagKey;

  @Field(() => PublicFeatureFlagMetadata)
  metadata: PublicFeatureFlagMetadata;
}

@ObjectType()
export class ClientConfig {
  @Field(() => String, { nullable: true })
  appVersion?: string;

  @Field(() => AuthProviders, { nullable: false })
  authProviders: AuthProviders;

  @Field(() => Billing, { nullable: false })
  billing: Billing;

  @Field(() => [ClientAIModelConfig])
  aiModels: ClientAIModelConfig[];

  @Field(() => Boolean)
  signInPrefilled: boolean;

  @Field(() => Boolean)
  isMultiWorkspaceEnabled: boolean;

  @Field(() => Boolean)
  isEmailVerificationRequired: boolean;

  @Field(() => String, { nullable: true })
  defaultSubdomain: string;

  @Field(() => String)
  frontDomain: string;

  @Field(() => Boolean)
  debugMode: boolean;

  @Field(() => Boolean)
  analyticsEnabled: boolean;

  @Field(() => Support)
  support: Support;

  @Field(() => Boolean)
  isAttachmentPreviewEnabled: boolean;

  @Field(() => Sentry)
  sentry: Sentry;

  @Field(() => Captcha)
  captcha: Captcha;

  @Field(() => String, { nullable: true })
  chromeExtensionId: string | undefined;

  @Field(() => ApiConfig)
  api: ApiConfig;

  @Field(() => Boolean)
  canManageFeatureFlags: boolean;

  @Field(() => [PublicFeatureFlag])
  publicFeatureFlags: PublicFeatureFlag[];

  @Field(() => Boolean)
  isMicrosoftMessagingEnabled: boolean;

  @Field(() => Boolean)
  isMicrosoftCalendarEnabled: boolean;

  @Field(() => Boolean)
  isGoogleMessagingEnabled: boolean;

  @Field(() => Boolean)
  isGoogleCalendarEnabled: boolean;

  @Field(() => Boolean)
  isConfigVariablesInDbEnabled: boolean;

  @Field(() => Boolean)
  isImapSmtpCaldavEnabled: boolean;

  @Field(() => String, { nullable: true })
  calendarBookingPageId?: string;
}
