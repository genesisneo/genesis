import Image from "next/image";
import { reduxStore } from "@/redux/store";
import { IGlobal } from "@/redux/slices/global/types";

export default function NotFound() {
  const { versionHash }: IGlobal = reduxStore.getState().global;

  return (
    <div className="Error">
      <div className="Error__content">
        <h4 className="Error__content-title">Error</h4>
        <a href="/">
          <Image
            className="Error__content-image"
            src={`/images/error.png?v=${versionHash}`}
            alt="Error"
            width={1280}
            height={860}
          />
        </a>
        <p className="Error__content-description">
          Sorry, there has been some error on my page.
          <br className="d-none d-md-block" />
          Click the button below to start again.
        </p>
        <a className="Error__content-button button" href="/">
          Click Here
        </a>
      </div>
    </div>
  );
}
