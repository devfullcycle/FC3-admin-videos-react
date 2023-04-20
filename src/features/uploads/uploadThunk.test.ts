import { configureStore } from "@reduxjs/toolkit";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { addUpload, uploadReducer } from "./UploadSlice";
import { updateVideo } from "./uploadThunk";
// Mocking axios
import axios from "axios";
import { baseUrl } from "../api/apiSlice";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const store = configureStore({
  reducer: {
    uploadSlice: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "uploads/addUpload",
          "uploads/updateUpload",
          "uploads/uploadVideo/rejected",
        ],
        ignoredPaths: [
          "uploadSlice.file",
          "payload.file",
          `uploadSlice.0.file`,
          `uploadSlice.1.file`,
        ],
      },
    }),
});

const handlers = [
  rest.post(`${baseUrl}/videos/1`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "File uploaded successfully" })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("updateVideo async thunk", () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  test("upload success", async () => {
    const file = new File(["dummy content"], "test.mp4", { type: "video/mp4" });
    const uploadState = {
      id: "1",
      videoId: "1",
      file,
      field: "file",
    };

    store.dispatch(addUpload(uploadState));

    mockedAxios.post.mockResolvedValue({
      data: { message: "File uploaded successfully" },
    });

    await store.dispatch(updateVideo(uploadState));

    const currentState = store.getState().uploadSlice;
    const upload = currentState.find((upload) => upload.id === uploadState.id);
    expect(upload?.status).toBe("success");
  });

  test("upload failed", async () => {
    const file = new File(["dummy content"], "test.mp4", { type: "video/mp4" });
    const uploadState = {
      id: "1",
      videoId: "1",
      file,
      field: "file",
    };

    // Add the upload to the state
    store.dispatch(addUpload(uploadState));

    mockedAxios.post.mockRejectedValue(new Error("Failed to upload file"));

    await store.dispatch(updateVideo(uploadState));

    const currentState = store.getState().uploadSlice;
    const upload = currentState.find((upload) => upload.id === uploadState.id);
    expect(upload?.status).toBe("failed");
  });
});
