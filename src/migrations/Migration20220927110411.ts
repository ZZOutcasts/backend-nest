import { Migration } from '@mikro-orm/migrations';

export class Migration20220927110411 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "last_logged_in_at" type timestamptz(0) using ("last_logged_in_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "last_logged_in_at" drop not null;');
    this.addSql('alter table "user" alter column "last_logout" type timestamptz(0) using ("last_logout"::timestamptz(0));');
    this.addSql('alter table "user" alter column "last_logout" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "last_logged_in_at" type timestamptz(0) using ("last_logged_in_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "last_logged_in_at" set not null;');
    this.addSql('alter table "user" alter column "last_logout" type timestamptz(0) using ("last_logout"::timestamptz(0));');
    this.addSql('alter table "user" alter column "last_logout" set not null;');
  }

}
