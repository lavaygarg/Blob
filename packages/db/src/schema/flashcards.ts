import { index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { topics } from "./topics";

const difficulties = ["easy", "medium", "hard"] as const;

export const difficultyEnum = pgEnum('difficulty', difficulties);

export const flashcards = pgTable("flashcards", {
        id: uuid("id").defaultRandom().primaryKey(),
        topicId: uuid("topic_id")
            .notNull()
            .references(() => topics.id, { onDelete: "cascade" }),
        front: text("front").notNull(),
        back: text("back").notNull(),
        difficulty: difficultyEnum("difficulty"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
        source: text("source"),
    },
    (table) => ({
        topicIdx: index("flashcards_topic_id_idx").on(table.topicId)
    })
);

export type Flashcard = typeof flashcards.$inferSelect;
export type NewFlashcard = typeof flashcards.$inferInsert;
