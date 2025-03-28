import Rsvp from "../components/Rsvp"


export default function Pizza() {
    return(
        <>
    
    <header>
        <h1>Weekly Pizza Night</h1>
        <p>Join us for homemade pizza and good company!</p>
        <div className="pizza-animation">🍕</div>
        <div className="pizza-animation">🌽</div>
        <div className="pizza-animation">🥗</div>
        <div className="pizza-animation">🥙</div>
        <div className="pizza-animation">🍖</div>
    </header>
   
    <div className="date-banner">
        Fridays • 4:30-7 PM
    </div>
   
    <div className="info-section">
        <h2>Location</h2>
        <p>40 D Adele Ln Eastsound </p>
        <p>Next to Ace Hardware, Cottage D</p>
    </div>
   
    <div className="info-section">
        <h2>We will have...</h2>
        <ul>
            <li>Homemade pizza dough</li>
            <li>Tomato sauce </li>
            <li>Mozzarella</li>
            <li>Oven </li>
            <li>Plates</li>
            <li>Other food and refreshments including but not limited to... leftover curry, ice cream, tea, juice, water, and maybe even cookies if you get there early</li>
        </ul>
    </div>
   
    <div className="info-section">
        <h2>You are welcome to bring</h2>
        <ul>
            <li>Pizza toppings</li>
            <li>Sides and snacks</li>
            <li>Beverages</li>
            <li></li>
            <li>Yourself as you are</li>
            <li>Friends</li>
        </ul>
    </div>
   
    <div>
        <h2>sign up for our email updates</h2>
        <Rsvp />
    </div>
   
    <div className="info-section">
        <h2>Special Notes</h2>
        <ul>
            <li>The event is kid-friendly</li>
            <li>RSVP to Eileen by phone or email and let us know your dietary restritions</li>
            <li>Feel free to bring friends, please let us know so we are well supplied</li>
        </ul>
    </div>
   
    <footer>
        <p>Looking forward to seeing you!</p>
        <p>Questions? Contact Eileen at eileen@jubil.ee or (206) 612-0118</p>
    </footer>
        </>
    )
}
