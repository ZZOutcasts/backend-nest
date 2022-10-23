import { Migration } from '@mikro-orm/migrations';

export class Migration20221023160109 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "project" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "description" varchar(255) null, "hits" int not null, "capacity" int not null, "status" varchar(255) not null);',
    );
    this.addSql(
      'create index "project_deleted_at_index" on "project" ("deleted_at");',
    );
    this.addSql('create index "project_name_index" on "project" ("name");');
    this.addSql(
      'alter table "project" add constraint "project_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "project_tech_stack" ("project_id" int not null, "technology_id" int not null, constraint "project_tech_stack_pkey" primary key ("project_id", "technology_id"));',
    );

    this.addSql(
      'create table "project_member" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "project_id" int not null, "is_leader" boolean not null, "is_manager" boolean not null);',
    );

    this.addSql(
      'create table "project_member_tech_stack" ("project_member_id" int not null, "technology_id" int not null, constraint "project_member_tech_stack_pkey" primary key ("project_member_id", "technology_id"));',
    );

    this.addSql(
      'create table "project_member_roles" ("project_member_id" int not null, "developer_role_id" int not null, constraint "project_member_roles_pkey" primary key ("project_member_id", "developer_role_id"));',
    );

    this.addSql(
      'create table "project_roles" ("project_id" int not null, "developer_role_id" int not null, constraint "project_roles_pkey" primary key ("project_id", "developer_role_id"));',
    );

    this.addSql(
      'alter table "project_tech_stack" add constraint "project_tech_stack_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "project_tech_stack" add constraint "project_tech_stack_technology_id_foreign" foreign key ("technology_id") references "technology" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "project_member" add constraint "project_member_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "project_member" add constraint "project_member_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "project_member_tech_stack" add constraint "project_member_tech_stack_project_member_id_foreign" foreign key ("project_member_id") references "project_member" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "project_member_tech_stack" add constraint "project_member_tech_stack_technology_id_foreign" foreign key ("technology_id") references "technology" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "project_member_roles" add constraint "project_member_roles_project_member_id_foreign" foreign key ("project_member_id") references "project_member" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "project_member_roles" add constraint "project_member_roles_developer_role_id_foreign" foreign key ("developer_role_id") references "developer_role" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "project_roles" add constraint "project_roles_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "project_roles" add constraint "project_roles_developer_role_id_foreign" foreign key ("developer_role_id") references "developer_role" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "project_tech_stack" drop constraint "project_tech_stack_project_id_foreign";',
    );

    this.addSql(
      'alter table "project_member" drop constraint "project_member_project_id_foreign";',
    );

    this.addSql(
      'alter table "project_roles" drop constraint "project_roles_project_id_foreign";',
    );

    this.addSql(
      'alter table "project_member_tech_stack" drop constraint "project_member_tech_stack_project_member_id_foreign";',
    );

    this.addSql(
      'alter table "project_member_roles" drop constraint "project_member_roles_project_member_id_foreign";',
    );

    this.addSql('drop table if exists "project" cascade;');

    this.addSql('drop table if exists "project_tech_stack" cascade;');

    this.addSql('drop table if exists "project_member" cascade;');

    this.addSql('drop table if exists "project_member_tech_stack" cascade;');

    this.addSql('drop table if exists "project_member_roles" cascade;');

    this.addSql('drop table if exists "project_roles" cascade;');
  }
}
