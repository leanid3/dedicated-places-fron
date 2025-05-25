// lib/filter-posts.ts
import { PostFilterResult, FilterOption } from "@/types/filter";
import { Post } from "@/types/types";

export class FilterPosts {
  private posts: Post[];

  constructor(posts: Post[]) {
    this.posts = posts;
  }

  public getFilterOptions(): PostFilterResult {
    return {
      params: this.processParams(),
      work_hours: this.processWorkHours(),
      types: this.processTypes(),
    };
  }

  private processParams(): FilterOption[] {
    const paramsMap = new Map<string, number>();

    this.posts.forEach(post => {
      const params = this.parseParams(post.params);
      params.forEach(param => {
        const key = `${param.key}:${param.value}`;
        paramsMap.set(key, (paramsMap.get(key) || 0) + 1);
      });
    });

    return this.mapToArray(paramsMap);
  }

  private processWorkHours(): FilterOption[] {
    return this.countValues(this.posts.map(p => p.work_hours).filter(Boolean));
  }

  private processTypes(): FilterOption[] {
    return this.countValues(this.posts.map(p => p.type).filter(Boolean));
  }

  private parseParams(params: string | object | null): Array<{key: string, value: string}> {
    try {
      if (typeof params === 'string') {
        params = JSON.parse(params);
      }
      return Object.entries(params || {}).map(([key, value]) => ({
        key,
        value: String(value)
      }));
    } catch (e: unknown) {
      console.error('Error parsing params:', e);
      return [];
    }
  }

  private countValues(values: string[]): FilterOption[] {
    const countMap = values.reduce((acc, value) => {
      acc.set(value, (acc.get(value) || 0) + 1);
      return acc;
    }, new Map<string, number>());

    return this.mapToArray(countMap);
  }

  private mapToArray(map: Map<string, number>): FilterOption[] {
    return Array.from(map.entries()).map(([value, count]) => ({
      value,
      count
    }));
  }
}