export interface Forecast {
    id: number;
    date: string;
    tag: string;
    color: 'blue' | 'red' | 'green';
    title: string;
    content: string;
}

export const FORECASTS_DATA: Forecast[] = [
    {
        id: 1,
        date: "23.02.2026",
        tag: "Aktualizacja",
        color: "blue",
        title: "Oferta na marzec 2026 bez zmian",
        content: "Ministerstwo Finansów utrzymało oprocentowanie i marże obligacji detalicznych na poziomie z lutego. Dla obligacji 10-letnich EDO marża pozostaje 2,00%, pierwsze oprocentowanie wynosi 5,60%. Dla 3-letnich TOS oprocentowanie stałe 4,65%."
    },
    {
        id: 2,
        date: "01.03.2026",
        tag: "Aktualizacja",
        color: "red",
        title: "Rozpoczęcie sprzedaży obligacji marcowych",
        content: "Od 1 marca 2026 r. w ofercie są nowe serie: TOS0329 (stałe 4,65%) oraz EDO0336 (pierwszy rok 5,60%, potem inflacja + marża 2,00%). Parametry identyczne jak w lutowej ofercie."
    },
    {
        id: 3,
        date: "23.02.2026",
        tag: "Kalendarz",
        color: "green",
        title: "Publikacja warunków emisji na marzec 2026",
        content: "Oficjalne warunki emisji obligacji na marzec 2026 zostały podane do publicznej wiadomości przez Ministerstwo Finansów 23 lutego 2026. Sprzedaż ruszyła 1 marca 2026."
    }
];