alter table "public"."collections" drop constraint "collections_user_id_fkey";

alter table "public"."cards" add column "user_uuid" uuid;

alter table "public"."collections" drop column "user_id";

alter table "public"."collections" add column "user_uuid" uuid;

alter table "public"."cards" add constraint "cards_user_uuid_fkey" FOREIGN KEY (user_uuid) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."cards" validate constraint "cards_user_uuid_fkey";

alter table "public"."collections" add constraint "collections_user_uuid_fkey" FOREIGN KEY (user_uuid) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."collections" validate constraint "collections_user_uuid_fkey";

create policy "Enable select for users based on user_id"
on "public"."collections"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_uuid));



