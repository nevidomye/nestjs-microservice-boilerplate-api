import { Module } from '@nestjs/common';

import { CryptoLibModule } from './crypto';
import { EventLibModule } from './event';
import { I18nLibModule } from './i18n';
import { RabbitMQLibModule } from './rabbitmq';
import { TokenLibModule } from './token';

@Module({
  imports: [
    TokenLibModule,
    CryptoLibModule,
    EventLibModule,
    I18nLibModule,
    RabbitMQLibModule
  ]
})
export class LibModule {}
