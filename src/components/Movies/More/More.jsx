import './More.css';

function More({ isVisible }) {
    return(
        isVisible && 
        <section className="more">
            <button type="button" className="more__button">Еще</button>
        </section>
    );
}

export default More;