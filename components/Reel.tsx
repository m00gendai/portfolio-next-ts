import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import s from '../styles/Reel.module.css';
import ReelDetail from './ReelDetail';

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

interface Project_image{
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
  image: Project_image;
  tech: Stack[];
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

interface props {
  projects: Project[];
}

export default function Reel({ projects }: props) {
  /*
    This ref references the grid container
  */
  const container = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false); // toggles details box
  const [indx, setIndx] = useState<number>(0); // sets the index of the clicked element in the grid sequence
  const [grid, setGrid] = useState<number[]>([]); // sets the [columns, rows] of the currently displayed grid
  const [fadeIn, setFadeIn] = useState<boolean>(true); // toggles fade-in/fade-out animation

  /*
    ResizeObserver logic copied from
    https://blog.sethcorker.com/resize-observer-api/
    This observes the container grid to always know the column/row ratio
  */
  const observer = useRef(
    new ResizeObserver((entries) => {
      const cols: number = getComputedStyle(
        entries[0].target
      ).gridTemplateColumns.split(' ').length; // gets column count
      const rows: number = getComputedStyle(
        entries[0].target
      ).gridTemplateRows.split(' ').length; // gets row count
      const gridMeasurement: number[] = [cols, rows];
      setGrid(gridMeasurement);
    })
  );

  useEffect(() => {
    if (container.current) {
      observer.current.observe(container.current);
    }

    return () => {
        if(container.current){
      observer.current.unobserve(container.current);
        }
    };
  }, [container, observer]);

  function handleClick(index: number, url: string) {
    setIndx(index); // sets index of currently clicked element in container grid
    // if text box is not visible
    if (!open) {
      setOpen(true);
      setFadeIn(true);
      setTimeout(function () {
        document.getElementById('bigscreen')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'center',
        });
      }, 500);
    }

    /* if the text box is visible and the index corresponds with the clicked element (i.e. if the element is clicked twice),
    if fades out the text box and closes it. */
    if (open && indx == index) {
      setFadeIn(!fadeIn);
      setTimeout(function () {
        setOpen(!open);
      }, 500);
    }

    // if the text box is visible but the newly clicked element is on a new row, it moves the text box accordingly and scrolls it into view
    if (open && indx != index) {
      setTimeout(function () {
        document.getElementById('bigscreen')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'center',
        });
      }, 500);
    }
  }

  return (
    <div className={s.container} ref={container}>
      {projects.map((project: Project, index: number) => {
        return (
          <div
            className={s.tile}
            key={`projectTile_${index}`}
            onClick={() => handleClick(index, project.url)}
          >
            <div
              className={s.inner}
              style={project.image === null ? {backgroundImage: "none"} :{
                backgroundImage: `url("https://cms.mrweber.ch/storage/uploads/${project.image.path}")`,
              }}
            >
              {project.image === null ? project.name : null}
            </div>
          </div>
        );
      })}
      {open ? (
        <ReelDetail
          fadeIn={fadeIn}
          index={indx}
          project={projects[indx]}
          grid={grid}
        />
      ) : null}
    </div>
  );
}
