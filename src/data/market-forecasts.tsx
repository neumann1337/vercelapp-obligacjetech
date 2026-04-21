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
    },
    {
        id: 4,
        date: "25.03.2026",
        tag: "Aktualizacja",
        color: "red",
        title: "MF obniża oprocentowanie na kwiecień 2026",
        content: "Ministerstwo Finansów ogłosiło obniżenie oprocentowania obligacji detalicznych od kwietnia 2026. EDO10-letnie: pierwsze oprocentowanie spada z 5,60% do 5,35% (marża 2,00% bez zmian). COI 4-letnie: z 5,00% do 4,75% (marża 1,50%). TOS 3-letnie: z 4,65% do 4,40%. OTS 3-miesięczne: z 2,50% do 2,00%. Marże w kolejnych okresach pozostają niezmienione."
    },
    {
        id: 5,
        date: "01.04.2026",
        tag: "Aktualizacja",
        color: "blue",
        title: "Rozpoczęcie sprzedaży obligacji kwietniowych",
        content: "Od 1 kwietnia 2026 r. w ofercie nowe serie: OTS0726 (2,00%), ROR0427 (4,00%), DOR0428 (4,15%), TOS0429 (4,40%), COI0430 (4,75%), EDO0436 (5,35%, inflacja + marża 2,00%). Posiadacze wygasających obligacji mogą dokonać zamiany na nowe serie bez konieczności fizycznego wykupu."
    },
    {
        id: 6,
        date: "01.04.2026",
        tag: "Kalendarz",
        color: "green",
        title: "Obniżka stopy referencyjnej NBP — wpływ na ROR i DOR",
        content: "Od 5 marca 2026 r. stopa referencyjna NBP wynosi 3,75%. Bezpośrednio wpływa to na oprocentowanie obligacji zmiennoprocentowych ROR (marża 0,00%) i DOR (marża 0,15%) w kolejnych okresach odsetkowych. Obligacje antyinflacyjne COI i EDO pozostają niezależne od decyzji RPP."
    }
];