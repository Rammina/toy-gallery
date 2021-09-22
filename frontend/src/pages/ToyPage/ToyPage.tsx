// Package imports
import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// Non-package imports
// components
import EditToyButton from "components/EditToyButton/EditToyButton";
import DeleteToyButton from "components/DeleteToyButton/DeleteToyButton";
import UploadToyImageButton from "components/UploadToyImageButton/UploadToyImageButton";
import LoadingSpinner from "components/ui/loaders/LoadingSpinner";
import WikipediaSection from "components/WikipediaSection/WikipediaSection";
//  redux actions
import { AppDispatch, ActionTypes, getToy } from "redux/actions";
import { RootState } from "redux/reducers";
import { WindowContext } from "AppContext";
import { Toy, User } from "appTypes";
import { convertToMDY } from "helpers";
import "./ToyPage.scss";
import DefaultToyImg from "assets/images/image-not-found.png";

const ToyPage = () => {
  const { isNonMobileWidth } = useContext(WindowContext);
  let { toyId }: { toyId: string } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const toy: Toy = useSelector((state: RootState) => state.selectedToy);
  const { isSignedIn, user } = useSelector((state: RootState) => state.auth);

  const getToyHandler = (): void => {
    dispatch(getToy(toyId));
  };

  const unmountToyPageHandler = (): void => {
    dispatch({ type: ActionTypes.CLOSE_TOY_PAGE });
  };

  // retrieve toy information after rendering the component
  useEffect(() => {
    getToyHandler();
    // cleanup redux store on unmount
    return () => {
      unmountToyPageHandler();
    };
  }, []);

  const renderUploaderActionButtons = () => {
    // Only allow these to render when it is the toy uploader that is viewing the page
    const toyUser = toy.user as User;
    if (!isSignedIn || user!.username !== toyUser.username) return null;
    return (
      <>
        <EditToyButton toy={toy} className="toy-page__button" text="Edit Toy" />
        <UploadToyImageButton className="toy-page__button" />
        <DeleteToyButton
          toy={toy}
          className="toy-page__button danger"
          text="Delete Toy"
        />
      </>
    );
  };

  // conditionally render action buttons depending on whether donate form is shown
  const renderActionButtons = () => {
    if (!toy || (!toy.id && !toy._id)) return null;
    return (
      <div className="toy-page__actions-container">
        {renderUploaderActionButtons()}
      </div>
    );
  };

  const renderUser = () => {
    if (toy.user && typeof toy.user !== "string")
      return (
        <p className={`toy-page__p--username `}>
          Posted by <em>{toy.user.username}</em>
        </p>
      );
    return null;
  };

  const renderMobileToyInfo = () => {
    if (isNonMobileWidth || !toy || (!toy.id && !toy._id)) return null;
    return (
      <>
        <br />
        <h2 className="toy-page__h2--franchise">
          {toy.franchise || "Franchise not specified."}
        </h2>

        {renderUser()}

        {toy.series && <p className="toy-page__p">Series: {toy.series}</p>}
        {toy.manufacturer && (
          <p className="toy-page__p">Manufacturer: {toy.manufacturer}</p>
        )}
        <p className={`toy-page__p--date `}>
          Posted on <em>{convertToMDY(toy.date_posted)}</em>
        </p>
      </>
    );
  };

  const renderDesktopToyInfo = () => {
    if (!isNonMobileWidth || !toy || (!toy.id && !toy._id)) return null;
    return (
      <>
        <h2 className="toy-page__h2--franchise">
          {toy.franchise || "Franchise not specified."}
        </h2>
        {renderUser()}

        {toy.series && <p className="toy-page__p">Series: {toy.series}</p>}
        {toy.manufacturer && (
          <p className="toy-page__p">Manufacturer: {toy.manufacturer}</p>
        )}
        <p className={`toy-page__p--date `}>
          Posted on: {convertToMDY(toy.date_posted)}
        </p>
      </>
    );
  };

  const renderToyDetails = () => {
    if (!toy || (!toy.id && !toy._id))
      return <LoadingSpinner className="toy-page__loader" showLoader={true} />;
    return (
      <>
        <h1 className="toy-page__h1">{toy.name} </h1>
        <hr className="hr hide-on-desktop" />
        {renderMobileToyInfo()}

        <img
          className="toy-page__image"
          src={toy.image_url || DefaultToyImg}
          alt="Toy Image"
        />
        {toy.description && (
          <p className="toy-page__description">{toy.description}</p>
        )}
      </>
    );
  };

  const renderToyActionSection = () => {
    if (!toy || (!toy.id && !toy._id)) return null;
    return (
      <div className="toy-page__details-and-action-container">
        {renderDesktopToyInfo()}
        {renderActionButtons()}
      </div>
    );
  };

  return (
    <main className="toy-page page-container">
      <section className="toy-page__section--flex">
        <div className="toy-page__div--details">{renderToyDetails()}</div>
        {renderToyActionSection()}
      </section>
      <WikipediaSection />
    </main>
  );
};

export default ToyPage;
