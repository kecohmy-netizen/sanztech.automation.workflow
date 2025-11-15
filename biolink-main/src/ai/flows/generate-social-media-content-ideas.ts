"use server"

/**
 * @fileOverview Generates social media content ideas based on brand keywords.
 *
 * - generateSocialMediaContentIdeas - A function that generates social media content ideas.
 * - GenerateSocialMediaContentIdeasInput - The input type for the generateSocialMediaContentIdeas function.
 * - GenerateSocialMediaContentIdeasOutput - The return type for the generateSocialMediaContentIdeas function.
 */

import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

const GenerateSocialMediaContentIdeasInputSchema = z.object({
  brandKeywords: z.string().describe("Keywords related to the brand for content generation."),
})
export type GenerateSocialMediaContentIdeasInput = z.infer<typeof GenerateSocialMediaContentIdeasInputSchema>

const GenerateSocialMediaContentIdeasOutputSchema = z.object({
  postIdeas: z.array(z.string()).describe("An array of social media post ideas."),
  visualConcepts: z.array(z.string()).describe("An array of visual concepts for the posts."),
})
export type GenerateSocialMediaContentIdeasOutput = z.infer<typeof GenerateSocialMediaContentIdeasOutputSchema>

export async function generateSocialMediaContentIdeas(
  input: GenerateSocialMediaContentIdeasInput,
): Promise<GenerateSocialMediaContentIdeasOutput> {
  const prompt = `You are a social media expert. Generate social media content ideas based on the following brand keywords:

Brand Keywords: ${input.brandKeywords}

Create a list of 5 engaging social media post ideas and 5 matching visual concepts. Return ONLY valid JSON in this format:
{
  "postIdeas": ["Post idea 1", "Post idea 2", "Post idea 3", "Post idea 4", "Post idea 5"],
  "visualConcepts": ["Visual concept 1", "Visual concept 2", "Visual concept 3", "Visual concept 4", "Visual concept 5"]
}`

  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt,
  })

  // Parse the JSON response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error("Failed to parse AI response")
  }

  const result = JSON.parse(jsonMatch[0])
  return GenerateSocialMediaContentIdeasOutputSchema.parse(result)
}
