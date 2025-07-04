import { Module } from '@nestjs/common';

import { ISecretsAdapter, SecretsModule } from '@/infra/secrets';

import { IRabbitMQAdapter } from './adapter';
import { RabbitMQService } from './service';

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: IRabbitMQAdapter,
      useFactory: (secret: ISecretsAdapter) => new RabbitMQService(secret),
      inject: [ISecretsAdapter]
    }
  ],
  exports: [IRabbitMQAdapter]
})
export class RabbitMQLibModule {}
