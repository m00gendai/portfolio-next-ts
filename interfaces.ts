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
    asset?: Medium[]
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

  export interface Project {
    name: string;
    url: string;
    description: string;
    details: string;
    image: Medium;
    tech: Stack[];
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
  }

  export interface Stack {
    stack: Stack_entry;
  }

  export interface Stack_entry {
    brand: string;
    url: string;
    excerpt: string;
    image: Medium;
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
    Bildquelle: string;
    _model: string;
  }

  export interface Info{
    intro: string;
    projects: string;
    apps: string;
    demos: string;
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
  }

export interface Offer_item{
  title: string;
  tagline: string;
  price: string;
  intro: string;
  parts: Offer_part[];
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

export interface Offer_part{
  title: string;
  description: string;
  content: string;
}

export interface Information{
  title: string;
  text: string;
  content: Content[];
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

export interface Stack{
  brand: string;
  url: string;
  excerpt: string;
  image: Medium;
  Bildquelle: string;
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

export interface isFocus {
  name: boolean;
  mail: boolean;
  subject: boolean;
  message: boolean;
}

export interface isFormValue {
  name: string;
  mail: string;
  subject: string;
  message: string;
}

export interface isFormValid {
  name: boolean;
  mail: boolean;
  subject: boolean
  message: boolean;
}

export interface isFeedback {
  color: string;
  content: string;
}