import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

export interface BusinessUnitType {
    id: number;
    name: string;
}

export interface BusinessUnit {
    id: number;
    name: string;
    butId: number;
}

export const drama = [
    '10 Items or Less',
    '12 and Holding',
    '50 Ways of Saying Fabulous',
    'The 9/11 Commission Report',
    'Ad-lib Night',
    'After the Wedding',
    'Akeelah and the Bee',
    'ATL',
    'Babel',
    'Barakat!',
    'Children of Men',
    'Climates',
    'Colossal Youth',
    'Dreamgirls',
    'Flags of Our Fathers',
    'Flight 93 - television film',
    'Half Nelson',
    'Home of the Brave',
    'The Illusionist',
    'Just Like the Son',
    'Kidulthood',
    'Letters from Iwo Jima',
    'Le Lièvre de Vatanen',
    'Lights in the Dusk',
    'Little Children',
    'Little Miss Sunshine',
    'Maundy Thursday',
    'Nana 2[3]',
    'Pan\'s Labyrinth',
    'The Pursuit of Happyness',
    'The Queen',
    'Traces of Love',
    'United 93',
    'We Are Marshall',
    'The Wind That Shakes the Barley',
];

export const fantasy = [
    'Harry Potter and the Deathly Hallows',
    'Harry Potter and the Half-Blood Prince',
    'Pirates of the Caribbean: On Stranger Tides',
    'Pirates of the Caribbean',
    'The Twilight Saga: Breaking Dawn',
    'Harry Potter and the Order of the Phoenix',
    'Harry Potter and the Deathly Hallows',
    'The Twilight Saga: Breaking Dawn',
    'The Twilight Saga: New Moon',
    'Pirates of the Caribbean: Dead Men Tell No Tales',
    'Fantastic Beasts: The Crimes of Grindelwald',
    'The Lord of the Rings: The Return of the King',
    'The Twilight Saga: Eclipse',
    'The Hobbit: An Unexpected Journey',
    'Fantastic Beasts and Where to Find Them',
    'Aladdin',
    'Alice in Wonderland',
    'The Hobbit: The Desolation of Smaug',
];

export const comedy = [
    'To All the Boys: Always and Forever',
    'Bad Trip',
    'Barb and Star Go to Vista Del Mar',
    'Benny Loves You',
    'The Boss Baby: Family Business',
    'Breaking News in Yuba County',
    'Clifford the Big Red Dog',
    'Coming 2 America',
    'Cruella',
    'Dream Horse',
    'Encanto',
    'Finding You',
    'Flora & Ulysses',
    'French Exit',
    'Ghostbusters: Afterlife',
    'Happily',
    'I Care a Lot',
    'Long Weekend',
    'Locked Down',
    'The Map of Tiny Perfect Things',
    'The Mitchells vs. the Machines',
    'Moxie',
    'The Paper Tigers',
    'Peter Rabbit 2: The Runaway',
    'Plan B',
    'Senior Moment',
    'Shiva Baby',
    'Sing 2',
    'Space Jam: A New Legacy',
    'The SpongeBob Movie: Sponge on the Run',
    'Thunder Force',
    'Together Together',
    'Tom & Jerry',
    'The Ultimate Playlist of Noise',
    'We Broke Up',
    'Willy\'s Wonderland',
    'Wish Dragon',
    'Yes Day',
];

export const thriller = [
    'Bad Times at the El Royale',
    'Calibre',
    'The Commuter',
    'Death Wish',
    'The Girl in the Spider\'s Web',
    'Golden Slumber',
    'Missing',
    'The Neighbor',
    'The Realm',
    'Red Sparrow',
    'Searching',
    'A Simple Favor',
    'Traffik'
];

export const adventure = [
    '47 Meters Down: Uncaged',
    'The Aeronauts',
    'Avengers: Endgame',
    'How to Train Your Dragon: The Hidden World',
    'Jumanji: The Next Level',
    'The Kid Who Would Be King',
    'The Peanut Butter Falcon',
    'Rocko\'s Modern Life: Static Cling',
    'Star Wars: The Rise of Skywalker',
    'Triple Frontier'
];

@Injectable({ providedIn: 'root' })
export class Service {
    butList: Array<BusinessUnitType> = [
        { id: 1, name: 'HQ' },
        { id: 2, name: 'Country' },
        { id: 3, name: 'City' },
        { id: 4, name: 'Neighbourhood' },
        { id: 5, name: 'Store' },
    ];

    buList: Array<BusinessUnit> = this.createBusinessUnitDB();

    private createBusinessUnitDB(): Array<BusinessUnit> {
        return this.butList.reduce((acc: Array<BusinessUnit>, g: BusinessUnitType) => {
            return acc.concat(Array.from({ length: 50 }, (_, index) => index + 1).map((id: number) => ({
                id, name: `${ g.name } - Business Unit#${ id }`, butId: g.id
            })));
        }, []) as Array<BusinessUnit>;
    }

    findBusinessUnits(butId: number, term: string): Observable<Array<BusinessUnit>> {
        return of(this.buList)
            .pipe(
                map((buList: Array<BusinessUnit>) => buList.filter(m => m.butId === butId && m.name.toLowerCase().includes(term.toLowerCase()))),
                delay(1000)
            );
    }
}