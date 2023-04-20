import { Video } from "../../types/Videos";
import { mapVideoToForm } from "./util";
// id: video.id,
// title: video.title,
// rating: video.rating,
// opened: video.opened,
// duration: video.duration,
// description: video.description,
// year_launched: video.year_launched,
// genres_id: video.genres?.map((genre) => genre.id),
// categories_id: video.categories?.map((category) => category.id),
// cast_members_id: video.cast_members?.map((cast_member) => cast_member.id),
describe("mapVideoToForm", () => {
  it("maps video to form", () => {
    const video = {
      id: "1",
      title: "title",
      rating: "rating",
      opened: true,
      duration: "200",
      description: "description",
      year_launched: "2020",
      genres_id: ["1", "2"],
      categories_id: ["1", "2"],
      cast_members_id: ["1", "2"],
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      thumb_file_url: "thumb_file_url",
      banner_file_url: "banner_file_url",
      trailer_file_url: "trailer_file_url",
      video_file_url: "video_file_url",
    };
    const result = mapVideoToForm(video);

    expect(result).toEqual({
      id: "1",
      title: "title",
      rating: "rating",
      opened: true,
      duration: "200",
      description: "description",
      year_launched: "2020",
      genres_id: undefined,
      categories_id: undefined,
      cast_members_id: undefined,
    });
  });

  it("maps video to form with undefined values", () => {
    const result = mapVideoToForm({} as Video);

    expect(result).toEqual({
      id: undefined,
      title: undefined,
      rating: undefined,
      opened: undefined,
      duration: undefined,
      description: undefined,
      year_launched: undefined,
      genres_id: undefined,
      categories_id: undefined,
      cast_members_id: undefined,
    });
  });

  it("maps video to form", () => {
    const video = {
      id: "1",
      title: "title",
      rating: "rating",
      opened: true,
      duration: "200",
      description: "description",
      year_launched: "2020",
      genres: [{ id: "1" }, { id: "2" }],
      categories: [{ id: "1" }, { id: "2" }],
      cast_members: [{ id: "1" }, { id: "2" }],
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      thumb_file_url: "thumb_file_url",
      banner_file_url: "banner_file_url",
      trailer_file_url: "trailer_file_url",
      video_file_url: "video_file_url",
    } as Video;

    const result = mapVideoToForm(video);

    expect(result).toEqual({
      id: "1",
      title: "title",
      rating: "rating",
      opened: true,
      duration: "200",
      description: "description",
      year_launched: "2020",
      genres_id: ["1", "2"],
      categories_id: ["1", "2"],
      cast_members_id: ["1", "2"],
    });
  });
});
