export interface INewsArticleEntity {
  id: number;
  published_at: string;
  created_at: string;
  url: string;
  title?: string;
  slug?: string;
  kind_: string;
  domain?: string;
  source?: INewsArticleSource;
  votes?: INewsArticleVote;
}

interface INewsArticleSource {
  title?: string;
  region?: string;
  domain?: string;
  path?: string;
}

interface INewsArticleVote {
  negative?: number;
  positive?: number;
  important?: number;
  liked?: number;
  disliked?: number;
  lol?: number;
  toxic?: number;
  saved?: number;
  comments?: number;
}
