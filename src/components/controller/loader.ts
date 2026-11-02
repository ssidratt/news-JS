import { ApiCallback, ApiEndpoint } from '../../types/news';

interface LoaderOptions {
    apiKey?: string;
    sources?: string;
}

interface RequestOptions {
    endpoint: ApiEndpoint;
    options?: LoaderOptions;
}

class Loader {
    protected baseLink: string;
    protected options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions = {}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>({ endpoint, options = {} }: RequestOptions, callback: ApiCallback<T>): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    protected errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw new Error(res.statusText);
        }

        return res;
    }

    protected makeUrl(options: LoaderOptions, endpoint: ApiEndpoint): string {
        const url = new URL(`mocks/${endpoint}`, this.baseLink);

        if (options.sources) {
            url.searchParams.set('sources', options.sources);
        }

        return url.toString();
    }

    private load<T>(method: 'GET', endpoint: ApiEndpoint, callback: ApiCallback<T>, options: LoaderOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
