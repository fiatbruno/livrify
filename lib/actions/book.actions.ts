import { connectToDatabase } from "@/database/mongoose";
import { CreateBook } from "@/types";
import { error } from "node:console";
import { success } from "zod";
import { generateSlug, serializeData } from "../utils";
import Book from "@/database/models/book.model";

export const createBook = async (data: CreateBook) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(data.title);

    const existingBook = await Book.findOne({ slug }).lean();

    if (existingBook) {
      return {
        success: true,
        data: serializeData(existingBook),
        alreadyExists: true,
      };
    }

    // check subscription limits before creating a book

    const book = await Book.create({ ...data, slug, totalSegments: 0 });

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.error("Error creating a book", e);

    return {
      success: false,
      error: e,
    };
  }
};
