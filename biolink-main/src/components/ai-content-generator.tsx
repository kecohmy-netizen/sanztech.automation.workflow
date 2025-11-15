'use client';

import {generateContent, type ActionState} from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Loader2, Sparkles, Wand2} from 'lucide-react';
import {useState, useEffect, useRef} from 'react';
import {useToast} from '@/hooks/use-toast';
import {useFormStatus} from 'react-dom';

const initialState: ActionState = {};

function SubmitButton() {
  const {pending} = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Generate Ideas
    </Button>
  );
}

export default function AiContentGenerator() {
  const [state, setState] = useState<ActionState>(initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const {toast} = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  async function formAction(formData: FormData) {
    const result = await generateContent(state, formData);
    setState(result);
    return result;
  }

  return (
    <Card className="w-full bg-card/50 border-primary/20 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md border border-primary/20">
            <Wand2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-headline text-xl">
              AI Content Ideation
            </CardTitle>
            <CardDescription>Get instant social media ideas.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <form ref={formRef} action={formAction}>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow">
              <Input
                name="brandKeywords"
                placeholder="e.g., Sabar & Survive, AI & Bisnes"
                className="bg-background/80"
              />
              {state.inputErrors?.brandKeywords && (
                <p className="text-sm text-destructive mt-1">
                  {state.inputErrors.brandKeywords[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </div>
        </CardContent>
      </form>
      {(state.postIdeas || state.visualConcepts) && (
        <CardFooter className="flex flex-col md:flex-row gap-6 items-start pt-6">
          {state.postIdeas && (
            <div className="flex-1 w-full">
              <h3 className="font-bold mb-3 text-lg text-primary">Post Ideas</h3>
              <ul className="space-y-3">
                {state.postIdeas.map((idea, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 bg-background/50 rounded-lg"
                  >
                    <span className="text-primary pt-1 font-semibold">
                      #{(index + 1).toString().padStart(2, '0')}
                    </span>
                    <p className="text-foreground/90">{idea}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {state.visualConcepts && (
            <div className="flex-1 w-full">
              <h3 className="font-bold mb-3 text-lg text-primary">
                Visual Concepts
              </h3>
              <ul className="space-y-3">
                {state.visualConcepts.map((concept, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 bg-background/50 rounded-lg"
                  >
                    <span className="text-primary pt-1 font-semibold">
                      #{(index + 1).toString().padStart(2, '0')}
                    </span>
                    <p className="text-foreground/90">{concept}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
