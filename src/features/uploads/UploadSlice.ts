import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { updateVideo } from "./uploadThunk";

export interface UploadState {
  id: string;
  file: File;
  field: string;
  videoId: string;
  progress?: number;
  status?: "idle" | "loading" | "success" | "failed";
}

type UploadProgress = {
  id: string;
  progress: number;
};

const initialState: UploadState[] = [];

const uploadsSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    addUpload(state, action: PayloadAction<UploadState>) {
      state.push({ ...action.payload, status: "idle", progress: 0 });
    },
    removeUpload(state, action: PayloadAction<string>) {
      const index = state.findIndex((upload) => upload.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    setUploadProgress(state, action: PayloadAction<UploadProgress>) {
      const { id, progress } = action.payload;
      const upload = state.find((upload) => upload.id === id);
      if (upload) {
        upload.progress = progress;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVideo.pending, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id);
      if (upload) {
        upload.status = "loading";
      }
    });

    builder.addCase(updateVideo.fulfilled, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id);
      if (upload) {
        upload.status = "success";
      }
    });

    builder.addCase(updateVideo.rejected, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id);
      if (upload) {
        upload.status = "failed";
      }
    });
  },
});

export const { addUpload, removeUpload, setUploadProgress } =
  uploadsSlice.actions;

// selector
export const selectUploads = (state: RootState) => state.uploadSlice;

export const uploadReducer = uploadsSlice.reducer;
