import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addUpload } from "../features/uploads/UploadSlice";
import { updateVideo } from "../features/uploads/uploadThunk";

const uploadQueue = createListenerMiddleware();

uploadQueue.startListening({
  actionCreator: addUpload,
  effect: async (action, store) => {
    await store.dispatch(updateVideo(action.payload));
  },
});

export { uploadQueue };
