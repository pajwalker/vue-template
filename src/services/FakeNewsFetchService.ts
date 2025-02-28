import type News from "@/types/News";
import type { INewsFetchService } from "./INewsFetchService";

export function useFakeNewsFetchService(): INewsFetchService {
    const fetchNews = async (): Promise<News[]> => {
        const news = [
            { 
                title: "Lehrerin, Lehrer werden",
                description: "Die Studiengänge Kindergarten/Unterstufe, Primarstufe und Sekundarstufe I werden am 10. März 2025 um 18.15 Uhr am Standort Sentimatt vorgestellt.",
                thumbnail: "https://www.phlu.ch/_Resources/Persistent/8/4/6/d/846da8ad0e0dfdbabe930c19f42efdb7c7840a16/Studium_Infoveranstaltungen65-892x594-880x586.jpg"
            },
            {
                title: "Gestärkte Hochschulpartnerschaft",
                description: "Bei einem Besuch der PH Luzern bei der PH Heidelberg wurde die Partnerschaft vertieft. Im Fokus standen das Doktoratsprogramm EFFORT und strategische Schwerpunkte.",
                thumbnail: "https://www.phlu.ch/_Resources/Persistent/8/2/3/9/8239294141b3fd6b9782a365ef8a80433505e8a6/20250214_schweizaustausch%201-3200x2133-3200x2132-1040x693.jpg"
            },
        ];

        return Promise.resolve(news);
    }

    return {
        fetchNews,
    }
}