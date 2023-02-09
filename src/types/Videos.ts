import { CastMember } from "./CastMembers";
import { Category } from "./Category";
import { Genre } from "./Genres";

export type FileObject = {
  name: string;
  file: File;
};

export interface Results {
  data: Video[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Video;
  links: Links;
  meta: Meta;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  year_launched: string;
  opened: boolean;
  rating: string;
  duration: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  genres?: Genre[];
  categories?: Category[];
  cast_members?: CastMember[];
  thumb_file_url: string;
  banner_file_url: string;
  trailer_file_url: string;
  video_file_url: string;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface Meta {
  to?: number;
  from?: number;
  path?: string;
  total?: number;
  per_page?: number;
  last_page?: number;
  current_page?: number;
}

export interface VideoParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export interface VideoPayload {
  id?: string;
  title: string;
  rating: string;
  opened: boolean;
  duration: string;
  description: string;
  genres_id?: string[];
  year_launched: string;
  categories_id?: string[];
  cast_members_id?: string[];
}
