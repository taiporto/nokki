CREATE INDEX cards_user_uuid_collection_id_idx ON public.cards USING btree (user_uuid, collection_id);

CREATE INDEX collections_user_uuid_idx ON public.collections USING btree (user_uuid);


