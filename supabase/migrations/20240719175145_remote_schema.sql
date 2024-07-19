alter table "public"."cards_table" add column "uuid" uuid not null default gen_random_uuid();

alter table "public"."users_table" add column "uuid" uuid not null default gen_random_uuid();


