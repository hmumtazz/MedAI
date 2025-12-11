
export interface PubMedArticle {
  title: string;
  authors: string;
  source: string;
  pubdate: string;
  url: string;
}

export interface PubMedSearchResult {
  articles?: PubMedArticle[];
  result?: string;
  error?: string;
}

export class PubMedService {
  private readonly baseSearchUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
  private readonly baseSummaryUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi';
  private readonly maxResults = 3;

  async search(query: string): Promise<PubMedSearchResult> {
    try {
      const ids = await this.searchForIds(query);

      if (!ids || ids.length === 0) {
        return { result: "No results found on PubMed for this query." };
      }

      const articles = await this.fetchArticleSummaries(ids);
      return { articles };
    } catch (error) {
      console.error("PubMed API Error:", error);
      return { error: "Failed to fetch data from PubMed." };
    }
  }

  private async searchForIds(query: string): Promise<string[]> {
    const url = `${this.baseSearchUrl}?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&retmax=${this.maxResults}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.esearchresult?.idlist || [];
  }

  private async fetchArticleSummaries(ids: string[]): Promise<PubMedArticle[]> {
    const idsString = ids.join(',');
    const url = `${this.baseSummaryUrl}?db=pubmed&id=${idsString}&retmode=json`;
    const response = await fetch(url);
    const data = await response.json();

    return Object.keys(data.result)
      .filter(key => key !== 'uids')
      .map(id => this.mapArticle(data.result[id], id));
  }

  private mapArticle(item: any, id: string): PubMedArticle {
    return {
      title: item.title,
      authors: item.authors?.map((a: any) => a.name).join(', ') || 'Unknown',
      source: item.source,
      pubdate: item.pubdate,
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
    };
  }
}

export const pubMedService = new PubMedService();
