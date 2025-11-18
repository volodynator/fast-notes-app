declare module 'bayes' {
  interface Classifier {
    learn(text: string, category: string): Promise<void>;
    categorize(text: string): string;
    toJson(): string;
  }

  function bayes(): Classifier;
  namespace bayes {
    function fromJson(json: string): Classifier;
  }

  export = bayes;
}
