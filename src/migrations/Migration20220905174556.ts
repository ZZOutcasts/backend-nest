import { Migration } from '@mikro-orm/migrations';

export class Migration20220905174556 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "technology" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null);');
    this.addSql('create index "technology_name_index" on "technology" ("name");');
    this.addSql('alter table "technology" add constraint "technology_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "technology" cascade;');
  }

}
