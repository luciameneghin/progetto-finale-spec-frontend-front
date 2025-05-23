export type Album = {
  readonly title: string;
  readonly category: string;
  readonly artist: string;
  readonly year: number;
  cover: string;
  label: string;
  duration: string;
  readonly tracksNumber: number;
  readonly tracks: {
    readonly title: string;
    readonly duration: string;
  }[];
  rating: number;
  origin: string;
  description: string;
  price: {
    cd: number;
    vinyl: number;
  }
}

export type Quote = {
  readonly title: string;
  readonly category: string;
  author: string;
  song: string;
  location: string;
  year: number;
};


