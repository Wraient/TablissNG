import React from "react";
import { useObjectUrl, useBackgroundRotation } from "../../../hooks";
import { db } from "../../../db/state";
import { useValue } from "../../../lib/db/react";
import BaseBackground from "../base/BaseBackground";
import "./Media.sass";
import { defaultCache, defaultData, Props } from "./types";

const Media: React.FC<Props> = ({
  cache = defaultCache,
  setCache,
  data = defaultData,
}) => {
  // If legacy cache is an old File[] array, convert it to the new cache format
  if (Array.isArray(cache)) {
    cache = {
      items: cache as File[],
      cursor: 0,
      rotated: Date.now(),
      deps: [],
    };
    setCache?.(cache); // Without doing this, weird infinite loops are created (with multiple imgages). Idk why.
  }

  const { item, go, handlePause } = useBackgroundRotation({
    fetch: () => Promise.resolve([]),
    cacheObj: { cache, setCache },
    data,
    setData: undefined,
    deps: [],
  });

  const file = item;
  const url = useObjectUrl(file);
  const background = useValue(db, "background");
  const { scale } = background.display;

  if (!file || !url) return null;

  const isVideo = file.type.match(/^video\/(mp4|webm|ogg)$/);

  return (
    <BaseBackground
      containerClassName="Image fullscreen"
      url={isVideo ? null : url}
      ready={!!url}
      paused={data?.paused ?? false}
      onPause={handlePause}
      onPrev={go(-1)}
      onNext={go(1)}
    >
      {isVideo && (
        <video
          autoPlay
          muted
          playsInline
          loop
          className="video"
          src={url}
          style={{
            objectFit: scale ? "cover" : "contain",
          }}
        />
      )}
    </BaseBackground>
  );
};

export default Media;
