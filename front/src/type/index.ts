import { EVENT_INFO_LABEL } from './../constants/index';

//TODO domain 별 타입 분리
export interface Program {
  id: number;
  name: string;
  genre: string;
  place: {
    id: number;
    name: string;
  };
  profileUrl: string;
  actors: string;
}
export type Place = {
  id: number;
  name: string;
};
export interface EventDetail {
  id: number;
  name: string;
  price: number;
  place: Place;
  events: ProgramEvent[];
  runningTime: number;
  reservationOpenDate: Date;
  reservationCloseDate: Date;
}
export type ProgramEvent = { id: number; runningDate: Date };
export interface ProgramDetail {
  id: number;
  name: string;
  runningTime: number;
  genre: string;
  actors: string;
  place: Place;
  profileUrl: string;
  price: number;
  events: ProgramEvent[];
}
export interface PlaceInformation {
  id: number;
  layout: Layout;
}

interface Layout {
  overview: string;
  overviewWidth: number;
  overviewHeight: number;
  overviewPoints: string;
  sections: Section[];
}
export interface SectionCoordinate {
  id: string;
  points: number[][];
}

export interface Section {
  id: number;
  name: string;
  seats: boolean[];
  colLen: number;
}

export type EventInfo = {
  [key in keyof typeof EVENT_INFO_LABEL]: string;
};
