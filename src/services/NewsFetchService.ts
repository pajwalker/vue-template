import type News from "@/types/News";
import type { INewsFetchService } from "./INewsFetchService";
import axios from 'axios';
import * as cheerio from 'cheerio';

export function useNewsFetchService(): INewsFetchService {
    const fetchNews = async (): Promise<News[]> => {
        const data: string = await axios.get('https://www.phlu.ch/').then((response) => response.data);
        const $ = cheerio.load(data);

        const news: News[] = [];
        $('#aktuelles').find('ul > li').each((index, element) => {
            const title = $(element).find('h3').text().trim();
            const description = $(element).find('.lead-text').text().trim();
            const thumbnail = $(element).find('img').attr('data-srcset') || '';
            news.push({ title, description, thumbnail });
        });
         
        return Promise.resolve(news);
    }
    

    return {
        fetchNews,
    }
}