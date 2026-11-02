import News from './news/news';
import Sources from './sources/sources';
import type { NewsResponse, SourcesResponse } from '../../types/news';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsResponse): void {
        this.news.draw(data.articles ?? []);
    }

    public drawSources(data: SourcesResponse): void {
        this.sources.draw(data.sources ?? []);
    }
}

export default AppView;
