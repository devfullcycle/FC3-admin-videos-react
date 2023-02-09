import { apiSlice } from "../api/apiSlice";
import {
  Result,
  Results,
  Video,
  VideoParams,
  VideoPayload,
} from "../../types/Videos";
import { Results as CategoriesResults } from "../../types/Category";
import { Genres as GenresResults } from "../../types/Genres";
import { Results as CastMembersResults } from "../../types/CastMembers";

const endpointUrl = "/videos";

export const initialState: Video = {
  id: "",
  title: "",
  rating: "",
  genres: [],
  duration: "0",
  opened: false,
  deleted_at: "",
  created_at: "",
  updated_at: "",
  categories: [],
  description: "",
  year_launched: "0",
  cast_members: [],
  thumb_file_url: "",
  video_file_url: "",
  banner_file_url: "",
  trailer_file_url: "",
};

function parseQueryParams(params: VideoParams) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value.toString());
    }
  });

  return query.toString();
}

const getVideos = ({ page = 1, perPage = 10, search = "" }: VideoParams) => {
  return `${endpointUrl}?${parseQueryParams({ page, perPage, search })}`;
};

function deleteVideo({ id }: { id: string }) {
  return { url: `${endpointUrl}/${id}`, method: "DELETE" };
}

function getVideo({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function updateVideo(video: VideoPayload) {
  return {
    url: `${endpointUrl}/${video.id}`,
    method: "PUT",
    body: video,
  };
}
function createVideo(video: VideoPayload) {
  return {
    url: endpointUrl,
    method: "POST",
    body: video,
  };
}

function getAllCategories() {
  return `categories?all=true`;
}

function getAllGenres() {
  return `genres?all=true`;
}

function getAllCastMembers() {
  return `cast_members?all=true`;
}

export const videosSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createVideo: mutation<Result, VideoPayload>({
      query: createVideo,
      invalidatesTags: ["Videos"],
    }),
    getVideos: query<Results, VideoParams>({
      query: getVideos,
      providesTags: ["Videos"],
    }),
    updateVideo: mutation<Result, VideoPayload>({
      query: updateVideo,
      invalidatesTags: ["Videos"],
    }),
    getVideo: query<Result, { id: string }>({
      query: getVideo,
      providesTags: ["Videos"],
    }),

    getAllCategories: query<CategoriesResults, void>({
      query: getAllCategories,
      providesTags: ["Categories"],
    }),

    getAllGenres: query<GenresResults, void>({
      query: getAllGenres,
      providesTags: ["Genres"],
    }),

    getAllCastMembers: query<CastMembersResults, void>({
      query: getAllCastMembers,
      providesTags: ["CastMembers"],
    }),

    deleteVideo: mutation<Result, { id: string }>({
      query: deleteVideo,
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useGetVideosQuery,
  useGetAllGenresQuery,
  useDeleteVideoMutation,
  useUpdateVideoMutation,
  useGetAllCategoriesQuery,
  useGetAllCastMembersQuery,
  useCreateVideoMutation,
} = videosSlice;
