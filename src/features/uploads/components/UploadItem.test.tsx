import { render } from "@testing-library/react";
import { STATUS } from "../UploadSlice";
import { UploadItem } from "./UploadItem";

const Props = {
  upload: {
    id: "test",
    videoId: "test",
    field: "test",
    progress: 0,
    status: STATUS.IDDLE,
    file: new File(["test"], "test.txt", { type: "text/plain" }),
  },
};

describe("UploadItem", () => {
  it("should render UploadItem", () => {
    const { asFragment } = render(<UploadItem upload={Props.upload} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render failed UploadItem", () => {
    const upload = { ...Props.upload, status: STATUS.FAILED };
    const { asFragment } = render(<UploadItem upload={upload} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render uploading UploadItem", () => {
    const upload = { ...Props.upload, status: STATUS.SUCCESS };
    const { asFragment } = render(<UploadItem upload={upload} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
