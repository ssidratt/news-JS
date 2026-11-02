import './news.css';
import type { Article, ArticleUpdate } from '../../../types/news';

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

            const optionalData: ArticleUpdate = {
                author: item.author,
                description: item.description,
                urlToImage: item.urlToImage,
            };

            if (idx % 2 !== 0) {
                newsItem?.classList.add('alt');
            }

            const hideImage = (): void => {
                newsItem?.classList.add('news__item--no-image');
            };

            if (photo && optionalData.urlToImage) {
                const image = new Image();

                image.onload = (): void => {
                    photo.style.backgroundImage = `url("${optionalData.urlToImage}")`;
                };

                image.onerror = hideImage;

                image.src = optionalData.urlToImage;
            } else {
                hideImage();
            }

            if (author) {
                author.textContent = optionalData.author || item.source.name;
            }

            if (date) {
                date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            if (title) {
                title.textContent = item.title;
            }

            if (source) {
                source.textContent = item.source.name;
            }

            if (description) {
                description.textContent = optionalData.description ?? '';
            }

            if (link) {
                link.href = item.url;
            }

            fragment.append(clone);
        });

        document.querySelector<HTMLElement>('.news')?.replaceChildren(fragment);
    }
}

export default News;
