"use client"

import { useState, useRef, useEffect } from 'react';
import s from '../styles/Reel.module.css';
import ReelDetail from './ReelDetail';
import Image from "next/image"
import { Project } from '@/interfaces';

interface props {
  projects: Project[];
  id: string;
  orientation: string
}

export default function Reel({ projects, id, orientation }: props) {
  /*
    This ref references the grid container
  */
  const container = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false); // toggles details box
  const [indx, setIndx] = useState<number>(0); // sets the index of the clicked element in the grid sequence
  const [grid, setGrid] = useState<number[]>([]); // sets the [columns, rows] of the currently displayed grid
  const [fadeIn, setFadeIn] = useState<boolean>(true); // toggles fade-in/fade-out animation

  function griderzize(){
    const cols: number = getComputedStyle(container.current!).gridTemplateColumns.split(' ').length; // gets column count
    const rows: number = getComputedStyle(container.current!).gridTemplateRows.split(' ').length; // gets row count
    const gridMeasurement: number[] = [cols, rows];
    setGrid(gridMeasurement);
  }

  function handleClick(index: number) {
    griderzize()
    
    setIndx(index); // sets index of currently clicked element in container grid
    // if text box is not visible
    if (!open) {
      setOpen(true);
      setFadeIn(true);
      setTimeout(function () {
        document.getElementById(`bigscreen_${id}`)?.scrollIntoView({
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
        document.getElementById(`bigscreen_${id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }, 500);
    }
  }

  const imageStyle:React.CSSProperties = {
    objectFit: "contain",
    width: "100%",
    height: "auto",
    position: "absolute",
    top: 0,
    zIndex: 999,
  }

  return (
    <div className={orientation === "landscape" ? s.container : s.container_portrait} ref={container}>
      {projects.map((project: Project, index: number) => {
        return (
          <div
            className={orientation === "landscape" ? s.tile : s.tile_portrait}
            key={`projectTile_${index}`}
            onClick={() => handleClick(index)}
          >
            <div className={s.inner}>
              <Image
                src={`https://cms.mrweber.ch/storage/uploads/${project.image.path}`}
                alt={project.name}
                  width={project.image.width}
                  height={project.image.height}
                style={imageStyle}
                title={project.name}
              >
              </Image>
              <div className={s.fallback}>{project.name}</div>
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
          id={id}
        />
      ) : null}
    </div>
  );
}
