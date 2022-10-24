import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      // @ts-ignore
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: Number(process.env.PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
    }),
  ],
  // imports: [
  //   SequelizeModule.forRoot({
  //     dialect: 'postgres',
  //     host: 'localhost',
  //     port: 5432,
  //     username: 'postgres',
  //     password: 'root',
  //     database: 'posts-nest-course',
  //     models: [],
  //     autoLoadModels: true,
  //   }),
  // ],
})

export class AppModule {}
