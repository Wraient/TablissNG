import React from "react";
import { Icon } from "@iconify/react";
import Backdrop from "../../../views/shared/Backdrop";
import "./BaseBackground.sass";

interface CreditLink {
  label: React.ReactNode;
  url: string;
}

interface Props {
  containerClassName?: string;
  url: string | null;
  ready?: boolean;
  title?: React.ReactNode;
  paused?: boolean;
  onPause?: () => void;
  onPrev?: (() => void) | null;
  onNext?: (() => void) | null;
  leftInfo?: CreditLink[];
  rightInfo?: CreditLink | null;
  children?: React.ReactNode;
}

const BaseBackground: React.FC<Props> = ({
  containerClassName = "Unsplash fullscreen",
  url,
  ready = false,
  title,
  paused = false,
  onPause = () => {},
  onPrev = null,
  onNext = null,
  leftInfo = [],
  rightInfo = null,
  children,
}) => (
  <div className={`${containerClassName} bg-base`}>
    <Backdrop className="image fullscreen" ready={ready} url={url}>
      {title ? <div className="background-title">{title}</div> : null}

      {children}
    </Backdrop>

    <div className="info-bar">
      <div className="left-info">
        {leftInfo.map((info, index) => (
          <React.Fragment key={info.url}>
            {index > 0 && ", "}
            <a href={info.url} rel="noopener noreferrer">
              {info.label}
            </a>
          </React.Fragment>
        ))}
      </div>

      <div className="controls">
        <a className={onPrev ? "" : "hidden"} onClick={onPrev ?? undefined}>
          <Icon icon="feather:arrow-left" />
        </a>{" "}
        <a onClick={onPause}>
          <Icon icon={paused ? "feather:play" : "feather:pause"} />
        </a>{" "}
        <a className={onNext ? "" : "hidden"} onClick={onNext ?? undefined}>
          <Icon icon="feather:arrow-right" />
        </a>
      </div>

      {rightInfo && (
        <div className="right-info">
          <a href={rightInfo.url} target="_self" rel="noopener noreferrer">
            {rightInfo.label}
          </a>
        </div>
      )}
    </div>
  </div>
);

export default React.memo(BaseBackground);
