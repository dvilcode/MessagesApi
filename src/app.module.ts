import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageControllerController } from './message-controller/message-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './message-controller/messages/messages.service';
import { Mensaje } from './message-controller/entities/mensaje.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type        : 'postgres',
      host        : 'localhost',
      port        : 5432,
      username    : 'nest',
      password    : 'nest',
      database    : 'sendmessageapp',
      entities    : [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize : true
    
    }),
    TypeOrmModule.forFeature([Mensaje]),
  ],
  controllers: [AppController, MessageControllerController],
  providers: [AppService, MessagesService],
})
export class AppModule {}
