import { Migration } from '@mikro-orm/migrations';

export class Migration20220922144832 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "slug" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) null, "last_logged_in_at" timestamptz(0) not null, "auth_role" varchar(255) not null, "email_verified" boolean not null, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql('create index "user_username_index" on "user" ("username");');
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );
    this.addSql('create index "user_slug_index" on "user" ("slug");');
    this.addSql(
      'alter table "user" add constraint "user_slug_unique" unique ("slug");',
    );
    this.addSql('create index "user_email_index" on "user" ("email");');
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );

    this.addSql(
      'create table "refresh_token_entity" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "value" varchar(255) not null, "user_id" varchar(255) not null, "expires_at" timestamptz(0) null);',
    );
    this.addSql(
      'create index "refresh_token_entity_value_index" on "refresh_token_entity" ("value");',
    );
    this.addSql(
      'alter table "refresh_token_entity" add constraint "refresh_token_entity_value_unique" unique ("value");',
    );

    this.addSql(
      'alter table "refresh_token_entity" add constraint "refresh_token_entity_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "technology" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;',
    );

    this.addSql(
      'alter table "developer_role" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "refresh_token_entity" drop constraint "refresh_token_entity_user_id_foreign";',
    );

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "refresh_token_entity" cascade;');

    this.addSql('alter table "technology" drop column "created_at";');
    this.addSql('alter table "technology" drop column "updated_at";');

    this.addSql('alter table "developer_role" drop column "created_at";');
    this.addSql('alter table "developer_role" drop column "updated_at";');
  }
}
