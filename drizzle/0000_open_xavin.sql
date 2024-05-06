CREATE TABLE `cards` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`is_favorite` integer,
	`collection_id` integer
);
--> statement-breakpoint
CREATE TABLE `collections` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
