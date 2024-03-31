import "./SubmitForm.scss";

const SubmitForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        <input
          type="text"
          name="from"
          placeholder="Your name..."
          className="form__input"
        />
      </label>
      <label>
        <input
          type="text"
          name="text"
          placeholder="The message..."
          className="form__input"
        />
      </label>
      <button type="submit" className="form__send">
        SEND
      </button>
    </form>
  );
};

export default SubmitForm;
