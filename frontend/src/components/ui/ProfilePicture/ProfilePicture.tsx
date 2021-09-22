import DefaultAvatarImg from "../../../assets/images/default-avatar.png";

import React, { FC, MouseEvent } from "react";

import "./ProfilePicture.scss";

interface Props {
  imageSrc?: string;
  className?: string;
  onClick?: Function;
  onContextMenu?: Function;
}

const ProfilePicture: FC<Props> = ({
  imageSrc,
  className,
  onClick,
  onContextMenu,
}) => {
  const onClickHandler = (e: MouseEvent) => {
    if (onClick) onClick(e);
  };

  const onContextMenuHandler = (e: MouseEvent) => {
    if (onContextMenu) onContextMenu(e);
  };

  return (
    <div
      className={`profile-picture__div ${className || ""}`}
      onClick={onClickHandler}
      onContextMenu={onContextMenuHandler}
    >
      <img
        className={`profile-picture__img ${className || ""}`}
        src={imageSrc || DefaultAvatarImg}
      />
    </div>
  );
};

export default ProfilePicture;
