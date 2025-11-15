'use server';

import {generateSocialMediaContentIdeas} from '@/ai/flows/generate-social-media-content-ideas';
import {z} from 'zod';

const inputSchema = z.object({
  brandKeywords: z.string().min(3, 'Please enter at least 3 characters.'),
});

export interface ActionState {
  postIdeas?: string[];
  visualConcepts?: string[];
  error?: string;
  inputErrors?: {
    brandKeywords?: string[];
  };
}

export async function generateContent(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = inputSchema.safeParse({
    brandKeywords: formData.get('brandKeywords'),
  });

  if (!validatedFields.success) {
    return {
      inputErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateSocialMediaContentIdeas({
      brandKeywords: validatedFields.data.brandKeywords,
    });
    return {
      postIdeas: result.postIdeas,
      visualConcepts: result.visualConcepts,
    };
  } catch (e) {
    console.error(e);
    return {error: 'Failed to generate ideas. Please try again.'};
  }
}
