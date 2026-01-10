"use client"

import { analyzeGitHubRepository } from "@/lib/api";
import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Github } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { AnalysisResults } from "@/components/analysis-results";

interface GitHubAnalysisProps {
  onAnalysisComplete?: (data: any) => void;
}

export function GitHubAnalysis({ onAnalysisComplete }: GitHubAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [repoUrl, setRepoUrl] = useState("");
  const { toast } = useToast();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await analyzeGitHubRepository(repoUrl);
      setResults(data);
      onAnalysisComplete?.(data);

      toast({
        title: "Analysis complete!",
        description: "GitHub repository has been analyzed successfully.",
      });

      
    } catch (error) {
      console.error("[v0] GitHub analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Failed to analyze repository. Please try again.",
        variant: "destructive",
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="repo-url">GitHub Repository URL</Label>
          <Input
            id="repo-url"
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Repository...
            </>
          ) : (
            <>
              <Github className="mr-2 h-5 w-5" />
              Analyze Repository
            </>
          )}
        </Button>
      </form>

      {results && <AnalysisResults data={results} type="github" />}
    </div>
  );
}
