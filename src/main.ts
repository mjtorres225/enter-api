import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import {
  FallbackExpectionFilter,
  ValidationFilter,
} from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.enableCors({ origin: 'http://119.8.10.22:3389' });
  app.enableCors({ origin: ['http://localhost:3000','http://localhost:3333'] });
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.useGlobalFilters(new FallbackExpectionFilter(), new ValidationFilter());

  await app.listen(process.env['API_PORT'] || 3333);
}
bootstrap();
