export interface Metadata{
    page: string;
    title: string;
    description: string;
    image: Medium,
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
  }

  export interface Medium{
    path: string;
    title: string;
    mime: string;
    type: string;
    description: string;
    tags: string[];
    size: number;
    colors: string[];
    width: number;
    height: number;
    _hash: string;
    _created: number;
    _modified: number;
    _cby: string;
    folder: string;
    _id: string;
  }


export interface Blog {
    title: string
    intro: string
    hero: Medium
    content: Content[]
    tag: Tag[]
    _modified: number
    _mby: string
    _created: number
    _state: number
    _cby: string
    _id: string
  }
  
  export interface Content {
    text: string[]
    image?: Medium[]
  }
  
  export interface Tag{
    tag: string;
    color?: string;
    _state: number;
    _modified: number;
    _mby: string;
    _created: number;
    _cby: string;
    _id: string;
  }