import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle("Yubin's shoppingmall")
    .setDescription('api 문서입니다')
    .setVersion('1.0')
    .addTag('Yubin', 'shoppingmall')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // http://localhost:3000/api-docs

  await app.listen(3000);
}
bootstrap();
