import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { typeORMConfig } from './configs/typeorm.configs';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardModule
  ],
})
export class AppModule {}
