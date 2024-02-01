"use client";

import Image from "next/image";
import { IGlobal } from "@/redux/slices/global/types";
import { useSelector, type ReduxState } from "@/redux/store";

/*
 * ⚠️ NOTES:
 * When doing SSR, we need to use 'reduxStore.getState()' function to access redux states
 * and use 'reduxStore.dispatch' to dispatch a function, to dispatch redux actions. The
 * 'useSelector' and 'useDispatch' are CSR only and it will show an error if used on SSR.
 *
 * Reference:
 * https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
 */

const Loading = () => {
  const { versionHash, loading }: IGlobal = useSelector((state: ReduxState) => state.global);

  return loading ? (
    <div className="Loading">
      <Image alt="Loading..." src={`/loading.gif?v=${versionHash}`} width={64} height={64} />
    </div>
  ) : null;
};

export default Loading;
