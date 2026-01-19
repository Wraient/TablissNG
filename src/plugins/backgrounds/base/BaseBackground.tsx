import React from "react";
import { Icon } from "@iconify/react";
import Backdrop from "../../../views/shared/Backdrop";
import "./BaseBackground.sass";

interface CreditLink {
  label: React.ReactNode;
  url?: string;
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
  showControls?: boolean;
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
  showControls = true,
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
          <React.Fragment key={index}>
            {index > 0 && ", "}
            {info.url ? (
              <a href={info.url} rel="noopener noreferrer">
                {info.label}
              </a>
            ) : (
              <span>{info.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {showControls && (
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
      )}

      {rightInfo && (
        <div className="right-info">
          {rightInfo.url ? (
            <a href={rightInfo.url} target="_self" rel="noopener noreferrer">
              {rightInfo.label}
            </a>
          ) : (
            <span>{rightInfo.label}</span>
          )}
        </div>
      )}
    </div>
  </div>
);

export default React.memo(BaseBackground);
