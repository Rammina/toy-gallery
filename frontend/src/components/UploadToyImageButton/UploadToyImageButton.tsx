// package imports
import React, { useState, useRef, useContext, FC } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
// non- package imports
import Modal from "components/ui/Modal/Modal";
import LoadingSpinner from "components/ui/loaders/LoadingSpinner";
import { actionShowLoader, AppDispatch, uploadToyImage } from "redux/actions";
import { WindowContext } from "AppContext";
import { RootState } from "redux/reducers";
import { Toy } from "appTypes";
import "./UploadToyImageButton.scss";
import AddPhotoImg from "assets/icons/add-image.png";

interface Props {
  className?: string;
}

const UploadToyImageButton: FC<Props> = ({ className }) => {
  const dispatch: AppDispatch = useDispatch();
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);
  const toy: Toy = useSelector((state: RootState) => state.selectedToy);
  const { isSignedIn, user } = useSelector((state: RootState) => state.auth);
  const showLoader = useSelector(
    (state: RootState) => state.loader.showUploadToyImageFormLoader
  );
  // refs
  let inputImageRef = useRef(null);

  // guards against undefined errors
  const getAvatarUrl = () => {
    if (toy && toy.image_url) return toy.image_url;
    return "";
  };

  const uploadButtonOnClickHandler = () => {
    // only perform action if input is assigned a ref to prevent errors
    if (inputImageRef.current && typeof inputImageRef.current !== null) {
      let uploadButtonElem: HTMLButtonElement = inputImageRef.current;
      uploadButtonElem.click();
    }
  };

  // image upload related stuff
  // preview the file for the user to see before submission
  const previewFile = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // detects changes on the file input value, and updates both state and DOM
  const handleImageInputChange = (e: any) => {
    const file = e.target.files[0];
    setImageUploadName(file.name);
    previewFile(file);
  };

  // fires an action creator to upload the image to the backend, and closes the upload confirmation modal
  const uploadImage = async (base64EncodedImage: any) => {
    if (!toy) return null;
    let toyId: string = toy.id! || toy._id!;
    const successCb = () => {
      setImageUploadModalOpen(false);
    };
    dispatch(uploadToyImage(base64EncodedImage, toy.id!, successCb));
  };

  // upload form submission handler
  const handleSubmitFile = (e: any) => {
    e.preventDefault();
    if (!previewSource) return;
    dispatch(actionShowLoader("uploadToyImageForm", true));
    uploadImage(previewSource);
  };
  //// image upload related stuff is up there

  // render functions
  const renderLoader = () => <LoadingSpinner showLoader={showLoader} />;

  const renderImageUploadModal = () => {
    console.log(imageUploadName);
    console.log(imageUploadModalOpen);
    // do not render until image is chosen
    if (!imageUploadModalOpen) return null;
    return ReactDOM.createPortal(
      <React.Fragment>
        <Modal
          className="upload-toy-image"
          onModalClose={() => {
            setImageUploadModalOpen(false);
          }}
          headerClassName="upload-toy-image__header"
          headingText="Upload Room Icon"
        >
          <form
            id="upload-toy-image__modal-form"
            encType="multipart/form-data"
            onSubmit={handleSubmitFile}
          >
            {previewSource && (
              <img
                id="upload-toy-image__modal-image"
                src={previewSource}
                alt="Chosen Image"
              />
            )}
            <p className="upload-toy-image__p">{imageUploadName}</p>

            <p className="upload-toy-image__p">
              The uploaded image will look best at the size of at least 600x600.
            </p>
            <div className="form-button-container">
              <button
                id="create-toy-submit"
                className={"form-button submit mt-20"}
                type="submit"
                onClick={handleSubmitFile}
                autoFocus={true}
              >
                {renderLoader()} Upload Image
              </button>
            </div>
          </form>
        </Modal>
      </React.Fragment>,
      document.getElementById("modal")!
    );
  };

  return (
    <form
      id="upload-toy-image__form"
      encType="multipart/form-data"
      onSubmit={handleSubmitFile}
    >
      {/*this should not be visible to the user, and is just here for functionality purposes*/}
      <label
        htmlFor="upload-toy-image__input"
        className=""
        id="upload-toy-image__label"
      >
        Upload Toy Image
      </label>
      <input
        ref={inputImageRef}
        tabIndex={-1}
        type="file"
        id="upload-toy-image__input"
        name="toy-image"
        accept="image/*"
        value={fileInputState}
        onChange={(e) => {
          console.log("image input change");
          setImageUploadModalOpen(true);
          handleImageInputChange(e);
        }}
      />
      {/*this is what the user sees, just a button*/}
      <button
        type="button"
        className="toy-page__button btn"
        onClick={uploadButtonOnClickHandler}
      >
        <img
          className={`img--btn ${className || ""}`}
          src={AddPhotoImg}
          alt="Photo"
        />
        <span className={`span--btn ${className || ""}`}>Upload Image</span>
      </button>
      {renderImageUploadModal()}
    </form>
  );
};

export default UploadToyImageButton;
