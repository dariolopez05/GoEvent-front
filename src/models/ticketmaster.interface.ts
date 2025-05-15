export interface Ticketmaster {
    _embedded: TicketmasterEmbedded;
    _links:    TicketmasterLinks;
    page:      Page;
}

export interface TicketmasterEmbedded {
    events: Event[];
}

export interface Event {
    name:            string;
    type:            EventType;
    id:              string;
    test:            boolean;
    url:             string;
    locale:          Locale;
    images:          Image[];
    sales:           Sales;
    dates:           Dates;
    classifications: EventClassification[];
    promoter?:       Promoter;
    promoters?:      Promoter[];
    seatmap?:        Seatmap;
    ticketing:       Ticketing;
    _links:          EventLinks;
    _embedded:       EventEmbedded;
    outlets?:        Outlet[];
}

export interface EventEmbedded {
    venues:      Venue[];
    attractions: Attraction[];
}

export interface Attraction {
    name:            string;
    type:            AttractionType;
    id:              string;
    test:            boolean;
    url?:            string;
    locale:          Locale;
    externalLinks?:  ExternalLinks;
    images:          Image[];
    classifications: AttractionClassification[];
    upcomingEvents:  { [key: string]: number };
    _links:          AttractionLinks;
}

export interface AttractionLinks {
    self: First;
}

export interface First {
    href: string;
}

export interface AttractionClassification {
    primary:  boolean;
    segment:  Promoter;
    genre:    Promoter;
    subGenre: Promoter;
    type?:    Promoter;
    subType?: Promoter;
    family:   boolean;
}

export interface Promoter {
    id:   string;
    name: string;
}

export interface ExternalLinks {
    youtube?:     Facebook[];
    twitter?:     Facebook[];
    itunes?:      Facebook[];
    lastfm?:      Facebook[];
    spotify?:     Facebook[];
    wiki?:        Facebook[];
    facebook?:    Facebook[];
    musicbrainz?: Musicbrainz[];
    instagram?:   Facebook[];
    homepage?:    Facebook[];
}

export interface Facebook {
    url: string;
}

export interface Musicbrainz {
    id:  string;
    url: string;
}

export interface Image {
    ratio?:   Ratio;
    url:      string;
    width:    number;
    height:   number;
    fallback: boolean;
}

export enum Ratio {
    The16_9 = "16_9",
    The3_2 = "3_2",
    The4_3 = "4_3",
}

export enum Locale {
    EnUs = "en-us",
}

export enum AttractionType {
    Attraction = "attraction",
}

export interface Venue {
    name:           string;
    type:           VenueType;
    id:             string;
    test:           boolean;
    url?:           string;
    locale:         Locale;
    postalCode?:    string;
    timezone:       Timezone;
    city:           City;
    state:          State;
    country:        Country;
    address:        Address;
    location:       Location;
    upcomingEvents: UpcomingEvents;
    _links:         AttractionLinks;
    images?:        Image[];
}

export interface Address {
    line1: string;
}

export interface City {
    name: string;
}

export interface Country {
    name:        Name;
    countryCode: CountryCode;
}

export enum CountryCode {
    Es = "ES",
}

export enum Name {
    Spain = "Spain",
}

export interface Location {
    longitude: string;
    latitude:  string;
}

export interface State {
    name:       string;
    stateCode?: string;
}

export enum Timezone {
    EtcGMT = "Etc/GMT",
    EuropeMadrid = "Europe/Madrid",
}

export enum VenueType {
    Venue = "venue",
}

export interface UpcomingEvents {
    "mfx-es"?: number;
    _total:    number;
    _filtered: number;
}

export interface EventLinks {
    self:        First;
    attractions: First[];
    venues:      First[];
}

export interface EventClassification {
    primary:  boolean;
    segment:  Promoter;
    genre:    Promoter;
    subGenre: Promoter;
    family:   boolean;
}

export interface Dates {
    start:            Start;
    timezone?:        Timezone;
    status:           Status;
    spanMultipleDays: boolean;
}

export interface Start {
    localDate:      Date;
    localTime:      string;
    dateTime:       Date;
    dateTBD:        boolean;
    dateTBA:        boolean;
    timeTBA:        boolean;
    noSpecificTime: boolean;
}

export interface Status {
    code: Code;
}

export enum Code {
    Cancelled = "cancelled",
    Offsale = "offsale",
    Onsale = "onsale",
}

export interface Outlet {
    url:  string;
    type: string;
}

export interface Sales {
    public: Public;
}

export interface Public {
    startDateTime: Date;
    startTBD:      boolean;
    startTBA:      boolean;
    endDateTime:   Date;
}

export interface Seatmap {
    staticUrl: string;
    id:        string;
}

export interface Ticketing {
    safeTix?:             AllInclusivePricing;
    id:                   ID;
    allInclusivePricing?: AllInclusivePricing;
}

export interface AllInclusivePricing {
    enabled: boolean;
}

export enum ID {
    Ticketing = "ticketing",
}

export enum EventType {
    Event = "event",
}

export interface TicketmasterLinks {
    first: First;
    self:  First;
    next:  First;
    last:  First;
}

export interface Page {
    size:          number;
    totalElements: number;
    totalPages:    number;
    number:        number;
}
