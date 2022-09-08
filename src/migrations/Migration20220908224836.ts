import { Migration } from '@mikro-orm/migrations';

export class Migration20220908224836 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "technology" ("id" serial primary key, "name" varchar(255) not null, "icon" varchar(255) not null, "description" varchar(255) not null);',
    );
    this.addSql(
      'create index "technology_name_index" on "technology" ("name");',
    );
    this.addSql(
      'alter table "technology" add constraint "technology_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "developer_role" ("id" serial primary key, "name" varchar(255) not null, "icon" varchar(255) not null, "description" varchar(255) not null);',
    );
    this.addSql(
      'create index "developer_role_name_index" on "developer_role" ("name");',
    );
    this.addSql(
      'alter table "developer_role" add constraint "developer_role_name_unique" unique ("name");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "technology" cascade;');

    this.addSql('drop table if exists "developer_role" cascade;');
  }
}
