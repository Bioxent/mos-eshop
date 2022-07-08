import { useRef } from "react";

function AddNewFavorite(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      descrpiption: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>add to favorites</label>
          <input type="hidden" id="productId" />
        </div>

        <div>
          <button>Add Meetup</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewFavorite;
