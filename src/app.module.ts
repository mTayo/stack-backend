import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseManagerModule } from './response-manager/response-manager.module';
import { EventTypesModule } from './event-types/event-types.module';
import { EventsModule } from './events/events.module';
import { EventsMetaModule } from './events-meta/events-meta.module';
import { EventsListingModule } from './events-listing/events-listing.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ResponseManagerModule,
    EventTypesModule,
    EventsModule,
    EventsMetaModule,
    EventsListingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
