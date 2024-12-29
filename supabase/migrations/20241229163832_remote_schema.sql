alter table "public"."cards" add column "deleted" boolean default false;

alter table "public"."cards" add column "updated_at" timestamp with time zone default now();

alter table "public"."collections" add column "deleted" boolean default false;

alter table "public"."collections" add column "updated_at" timestamp with time zone default now();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_times()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
    BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSEIF (TG_OP = 'UPDATE') THEN
        NEW.created_at = OLD.created_at;
        NEW.updated_at = now();
    END IF;
    RETURN NEW;
    END;
    $function$
;

create policy "Enable delete for users based on user_uuid"
on "public"."cards"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_uuid));


create policy "Enable update for users based on user_id"
on "public"."cards"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT auth.uid() AS uid) = user_uuid));


create policy "Enable delete for users based on user_uuid"
on "public"."collections"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_uuid));


create policy "Enable update for users based on user_id"
on "public"."collections"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_uuid))
with check ((( SELECT auth.uid() AS uid) = user_uuid));


CREATE TRIGGER handle_times BEFORE INSERT OR UPDATE ON public.cards FOR EACH ROW EXECUTE FUNCTION handle_times();

CREATE TRIGGER handle_times BEFORE INSERT OR UPDATE ON public.collections FOR EACH ROW EXECUTE FUNCTION handle_times();


