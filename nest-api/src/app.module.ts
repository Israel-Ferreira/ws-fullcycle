import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [RoutesModule, MongooseModule.forRoot(process.env.MONGO_DSN)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
