import './Hamburger.css';

function Hamburger({ active, setActive }) {
    return(
        <button type='button' className="hamburger" onClick={() => { setActive(!active) }}>
            <span className={`hamburger__icon ${active ? 'hamburger__icon_active' : ''}`}></span>
        </button>
    );
}

export default Hamburger;