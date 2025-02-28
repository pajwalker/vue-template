import type News from "@/types/News";

export interface INewsFetchService { 
    fetchNews: () => Promise<News[]>;
}