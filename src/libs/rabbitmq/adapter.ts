export abstract class IRabbitMQAdapter {
  abstract publish<T>(routingKey: string, payload: T): Promise<void>;
  abstract subscribe<T>(routingKey: string, handler: (data: T) => void): Promise<void>;
}
