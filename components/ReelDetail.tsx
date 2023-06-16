import * as React from 'react';
import s from '../styles/Reel.module.css';

interface Stack_entry {
  brand: string;
  url: string;
  excerpt: string;
  image: Stack_image;
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
  Bildquelle: string;
  _model: string;
}

interface Stack {
  stack: Stack_entry;
}

interface Stack_image {
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

interface Project {
  name: string;
  url: string;
  description: string;
  details: string;
  image: string;
  tech: Stack[];
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

interface Props {
  fadeIn: boolean;
  index: number;
  project: Project;
  grid: number[];
}

export default function ReelDetail({ fadeIn, index, project, grid }: Props) {
  const gridCol: number = grid[0];
  const gridRow: number = grid[1]; // This is not really used but fun to know anyways

  // Do not question the MATH for the MATH is absolute (MATHäus 69:420)
  const rowPosition: number = Math.floor(index / gridCol) + 1;
  const colPosition: number = (index % gridCol) + 1; // This is not really used but fun to know anyways

  // Sorts the tech stack alphabetically
  const sortedTech: Stack[] = project.tech.sort((a: Stack, b: Stack) => {
    // toLowerCase is necessary for stuff like "git" that would otherwise follow all capitalized brands
    const x: string = a.stack.brand.toLocaleLowerCase();
    const y: string = b.stack.brand.toLocaleLowerCase();
    return x > y ? 1 : x < y ? -1 : 0;
  });

  return (
    <div
      className={`${s.bigScreen} ${fadeIn ? s.fadeIn : s.fadeOut}`}
      id="bigscreen"
      style={{
        gridRowStart: rowPosition + 1,
        gridRowEnd: rowPosition + 2,
        gridColumnStart: 1,
        gridColumnEnd: gridCol + 1,
      }}
    >
      <div className={s.bigText}>
        <div className={s.title}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
        <div
          className={s.details}
          dangerouslySetInnerHTML={{ __html: project.details }}
        ></div>
        <div className={s.tech}>
          {sortedTech.map((entry) => {
            return entry.stack.image !== null ? (
              <div
                className={s.stack}
                style={{
                  backgroundImage: `url("https://cms.mrweber.ch/storage/uploads/${entry.stack.image.path}")`,
                }}
                title={`${entry.stack.brand}`}
              ></div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
