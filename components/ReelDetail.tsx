"use client"

import s from '../styles/Reel.module.css';
import { BiLinkExternal } from "react-icons/bi";
import Link from 'next/link';
import Image from "next/image"
import { Project, Stack } from '@/interfaces';

interface Props {
  fadeIn: boolean;
  index: number;
  project: Project;
  grid: number[];
  id: string;
}

export default function ReelDetail({ fadeIn, index, project, grid, id }: Props) {
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
      id={`bigscreen_${id}`}
      style={{
        gridRowStart: rowPosition + 1,
        gridRowEnd: rowPosition + 2,
        gridColumnStart: 1,
        gridColumnEnd: gridCol + 1,
      }}
    >
      <div className={s.bigText}>
        <div className={s.title}>
          <h2><Link className={s.link} href={project.url} target="_blank" title={project.name}>{project.name}<BiLinkExternal style={{margin: "0 0 0 0.5rem"}}/></Link></h2>
          <p>{project.description}</p>
        </div>
        <div
          className={s.details}
          dangerouslySetInnerHTML={{ __html: project.details }}
        ></div>
        <div className={s.tech}>
          {sortedTech.map((entry) => {
            return entry.stack.image !== null ? (
              <div className={s.stack} key={entry.stack._id}>
                <Image
                  src={`https://cms.mrweber.ch/storage/uploads/${entry.stack.image.path}`}
                  alt={entry.stack.brand}
                  fill={true}
                  style={{objectFit: "contain"}}
                  title={entry.stack.brand}
                >
                </Image>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
