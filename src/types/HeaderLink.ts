export default interface HeaderLink { 
    id: number;
    title: string;
    link: string;
    sublinks?: HeaderLink[];
}