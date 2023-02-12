import "./More.css";

function More({ handleMoreButton }) {
  return (
    <section className="more">
      <button type="button" className="more__button" onClick={handleMoreButton}>
        Еще
      </button>
    </section>
  );
}

export default More;
