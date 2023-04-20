import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosProgressEvent } from "axios";
import { uploadProgress, uploadService } from "./uploadAPI";
import { setUploadProgress, UploadState } from "./UploadSlice";

export const updateVideo = createAsyncThunk(
  "uploads/uploadVideo",
  async ({ videoId, id, file, field }: UploadState, thunkAPI) => {
    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      const progress = uploadProgress(progressEvent);
      thunkAPI.dispatch(setUploadProgress({ id, progress }));
    };

    try {
      const params = { videoId, id, file, field, onUploadProgress };
      const response = await uploadService(params);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
      // You can provide a generic error message here if the error is not an instance of Error
      return thunkAPI.rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
