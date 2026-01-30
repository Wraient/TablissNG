import React from "react";

interface DownloadButtonsProps {
  height?: number | string;
}

export default function DownloadButtons({ height = 60 }: DownloadButtonsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "20px",
        justifyContent: "center",
      }}
    >
      <a
        href="https://addons.mozilla.org/en-US/firefox/addon/tablissng/"
      >
        <img
          src="/TablissNG/docs/img/badges/firefox-badge.svg"
          height={height}
          alt="Get the Add-on for Firefox"
        />
      </a>
      <a
        href="https://chromewebstore.google.com/detail/tablissng/dlaogejjiafeobgofajdlkkhjlignalk"
      >
        <img
          src="/TablissNG/docs/img/badges/chrome-badge.png"
          alt="Get the Extension on Chrome"
          height={height}
          style={{ borderRadius: "4px" }}
        />
      </a>
      <a
        href="https://microsoftedge.microsoft.com/addons/detail/tablissng/mkaphhbkcccpgkfaifhhdfckagnkcmhm"
      >
        <img
          src="/TablissNG/docs/img/badges/edge-badge.png"
          alt="Get the Extension on Edge"
          height={height}
        />
      </a>
    </div>
  );
}
