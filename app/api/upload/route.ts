import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/ai/embedding";
import { resources } from "@/lib/db/schema/resources";
import { embeddings } from "@/lib/db/schema/embeddings";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Schema for file upload validation
const uploadSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".md")) {
      return NextResponse.json(
        { error: "Only markdown files are allowed" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 },
      );
    }

    const content = await file.text();
    const fileName = file.name;

    // Validate the content
    const validatedData = uploadSchema.parse({
      name: fileName,
      content,
    });

    // Create the resource record
    const [newResource] = await db
      .insert(resources)
      .values({
        content: validatedData.content,
      })
      .returning();

    // Generate embeddings for the content
    const documentEmbeddings = await generateEmbeddings(validatedData.content);

    // Store embeddings in the database
    await db.insert(embeddings).values(
      documentEmbeddings.map((embedding) => ({
        resourceId: newResource.id,
        content: embedding.content,
        embedding: embedding.embedding,
      })),
    );

    return NextResponse.json({
      success: true,
      message: "File uploaded and processed successfully",
      fileName,
      resourceId: newResource.id,
      embeddingsCount: documentEmbeddings.length,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process file",
      },
      { status: 500 },
    );
  }
}
