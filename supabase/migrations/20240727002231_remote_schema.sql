alter table "public"."collections" add column "user_id" uuid;

alter table "public"."collections" add constraint "collections_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."collections" validate constraint "collections_user_id_fkey";

create policy "Enable insert for authenticated users only"
on "public"."cards"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated users only"
on "public"."cards"
as permissive
for select
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."collections"
as permissive
for insert
to authenticated
with check (true);



