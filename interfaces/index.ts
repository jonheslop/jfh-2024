import { Photo } from '@prisma/client';

export type headingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Job = {
  company: string;
  role: string;
  period: string;
  description: string;
  logos: Logo[];
  blogPosts?: Post[];
};

export type Logo = {
  imageURL: string;
  imageAlt: string;
  imageBg: string;
  width: number;
  height: number;
};

export type Post = {
  href: string;
  label: string;
};

export type StreamPhoto = Photo;

export type GroupedStream = {
  week: number;
  weekBegins: Date;
  posts: Array<StreamPhoto>;
};

export type Exif = {
  Make: string;
  Model: string;
  FNumber: number;
  ExposureTime: number;
  ExposureCompensation: number;
  ISO: number;
  CreateDate: string;
  FocalLengthIn35mmFormat: number;
  LensModel: string;
  latitude?: number;
  longitude?: number;
};

export function pickExif(rawObject: any): Exif {
  const validProperties: Exif = {
    Make: rawObject.Make,
    Model: rawObject.Model,
    FNumber: rawObject.FNumber,
    ExposureTime: rawObject.ExposureTime,
    ExposureCompensation: rawObject.ExposureCompensation,
    ISO: rawObject.ISO,
    CreateDate: rawObject.CreateDate,
    FocalLengthIn35mmFormat: rawObject.FocalLengthIn35mmFormat,
    LensModel: rawObject.LensModel,
  };
  if (rawObject.longitude !== undefined) {
    validProperties.longitude = rawObject.longitude;
  }
  if (rawObject.latitude !== undefined) {
    validProperties.latitude = rawObject.latitude;
  }

  return validProperties;
}
