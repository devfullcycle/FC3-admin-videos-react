import { renderWithProviders, screen } from "../../../utils/test-utils";
import { VideosForm } from "./VideosForm";

const video = {
  id: "1",
  genres: [],
  rating: "0",
  opened: false,
  categories: [],
  duration: "2:30",
  cast_members: [],
  thumb_file: null,
  video_file: null,
  banner_file: null,
  trailer_file: null,
  title: "Test Video",
  year_launched: "2020",
  created_at: "2020-01-01",
  updated_at: "2020-01-01",
  description: "Test Description",
  thumb_file_url: "http://localhost:3000",
  video_file_url: "http://localhost:3000",
  banner_file_url: "http://localhost:3000",
  trailer_file_url: "http://localhost:3000",
};

const handleSubmit = jest.fn();
const handleChange = jest.fn();
const handleAddFile = jest.fn();
const handleRemoveFile = jest.fn();

describe("VideosForm", () => {
  it("should match the snapshot", () => {
    const { asFragment } = renderWithProviders(
      <VideosForm
        video={video}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleAddFile={handleAddFile}
        handleRemoveFile={handleRemoveFile}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should match the snapshot with loading", () => {
    const { asFragment } = renderWithProviders(
      <VideosForm
        video={video}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleAddFile={handleAddFile}
        handleRemoveFile={handleRemoveFile}
        isLoading={true}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
