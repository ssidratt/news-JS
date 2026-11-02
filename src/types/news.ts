export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type ApiResponse = SourcesResponse | NewsResponse;

export type ApiCallback<T> = (data: T) => void;

export type SourcePreview = Pick<Source, 'id' | 'name'>;

export type ArticleUpdate = Partial<Article>;

export type ReadonlySource = Readonly<Source>;

export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}
