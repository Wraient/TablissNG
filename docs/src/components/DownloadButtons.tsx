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
        style={{ transition: "opacity 0.15s ease" }}
      >
        <img
          src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg"
          height={height}
          alt="Get the Add-on for Firefox"
        />
      </a>
      <a
        href="https://chromewebstore.google.com/detail/tablissng/dlaogejjiafeobgofajdlkkhjlignalk"
        style={{ transition: "opacity 0.15s ease" }}
      >
        <img
          src="https://developer.chrome.com/static/docs/webstore/branding/image/HRs9MPufa1J1h5glNhut.png"
          alt="Get the Extension on Chrome"
          height={height}
          style={{ border: "1px solid transparent", borderRadius: "6px" }}
        />
      </a>
      <a
        href="https://microsoftedge.microsoft.com/addons/detail/tablissng/mkaphhbkcccpgkfaifhhdfckagnkcmhm"
        style={{ transition: "opacity 0.15s ease" }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Get_it_from_Microsoft_Badge.svg/320px-Get_it_from_Microsoft_Badge.svg.png"
          alt="Get the Extension on Edge"
          height={height}
          style={{ border: "1px solid transparent", borderRadius: "4px" }}
        />
      </a>
    </div>
  );
}
