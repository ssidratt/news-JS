import './news.css';
import type { Article } from '../../../types/news';

class News {
    public draw(data: Article[]): void {
        const news = data.slice(0, 10);
        const fragment = document.createDocumentFragment();
        const template = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!template) return;

        news.forEach((item, idx) => {
            const clone = template.content.cloneNode(true) as DocumentFragment;

            const newsItem = clone.querySelector<HTMLElement>('.news__item');
            const photo = clone.querySelector<HTMLElement>('.news__meta-photo');
            const author = clone.querySelector<HTMLElement>('.news__meta-author');
            const date = clone.querySelector<HTMLElement>('.news__meta-date');
            const title = clone.querySelector<HTMLElement>('.news__description-title');
            const source = clone.querySelector<HTMLElement>('.news__description-source');
            const description = clone.querySelector<HTMLElement>('.news__description-content');
            const link = clone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (idx % 2 !== 0) newsItem?.classList.add('alt');

            if (photo) {
                photo.style.backgroundImage = `url("${item.urlToImage || 'img/news_placeholder.jpg'}")`;
            }

            if (author) author.textContent = item.author || item.source.name;
            if (date) {
                date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }
            if (title) title.textContent = item.title;
            if (source) source.textContent = item.source.name;
            if (description) description.textContent = item.description ?? '';
            if (link) link.href = item.url;

            fragment.append(clone);
        });

        document.querySelector<HTMLElement>('.news')?.replaceChildren(fragment);
    }
}

export default News;
