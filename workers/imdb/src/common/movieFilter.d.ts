export default interface MovieFilter {
  crawl_id: string;
  title?: 'abc';
  title_type?: string[];
  release_date_from?: string;
  release_date_until?: string;
  min_rating?: number;
  max_rating?: number;
  genres?: string[];
  groups?: string[];
  sort: string;
  count: number;
}
