import { Video, VideoPayload } from "../../types/Videos";

export function mapVideoToForm(video: Video): VideoPayload {
  return {
    id: video.id,
    title: video.title,
    rating: video.rating,
    opened: video.opened,
    duration: video.duration,
    description: video.description,
    year_launched: video.year_launched,
    genres_id: video.genres?.map((genre) => genre.id),
    categories_id: video.categories?.map((category) => category.id),
    cast_members_id: video.cast_members?.map((cast_member) => cast_member.id),
  };
}
