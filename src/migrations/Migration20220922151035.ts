import { Migration } from '@mikro-orm/migrations';

export class Migration20220922151035 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "last_logout" timestamptz(0) not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "last_logout";');
  }
}
