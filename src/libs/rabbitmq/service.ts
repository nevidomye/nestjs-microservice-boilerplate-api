import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ISecretsAdapter } from '@/infra/secrets';

import { IRabbitMQAdapter } from './adapter';

export type PublishOutput = void;
export type SubscribeOutput = void;

@Injectable()
export class RabbitMQService implements IRabbitMQAdapter {
  private client: ClientProxy;

  constructor(private readonly secret: ISecretsAdapter) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.secret.RABBITMQ.URL],
        queue: this.secret.RABBITMQ.QUEUE,
        queueOptions: { durable: true }
      }
    });
  }

  async publish<T>(routingKey: string, payload: T): Promise<PublishOutput> {
    await firstValueFrom(this.client.emit(routingKey, payload));
  }

  async subscribe<T>(routingKey: string, handler: (data: T) => void): Promise<SubscribeOutput> {
    await this.client.connect();
    this.client.send<T, void>(routingKey, undefined).subscribe(handler);
  }
}
