import './sources.css';
import type { SourcePreview } from '../../../types/news';

class Sources {
    public draw(data: readonly SourcePreview[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            return;
        }

        data.forEach((item: Readonly<SourcePreview>) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const source = sourceClone.querySelector<HTMLElement>('.source__item');

            if (name) {
                name.textContent = item.name;
            }

            if (source) {
                source.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
