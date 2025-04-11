import Rsvp from "../components/Rsvp"


export default function Pizza() {
    return(
        <>
    
    <header>
        <h1>Today, 4/11, Pizza Night is cancelled due to illness</h1>
        <p>Next week Megan is hosting, and the Jubilees will depart OI on the 23rd until the Fall</p>
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
        <p> Megan's House </p>
        <p> Obstruction Pass - Contact for address</p>
    </div>
   
    <div className="info-section">
        <h2>Well have...</h2>
        <ul>
            <li>Homemade pizza dough</li>
            <li>Tomato sauce </li>
            <li>Mozzarella</li>
            <li>Oven </li>
            <li>Plates</li>
        </ul>
    </div>
   
    <div className="info-section">
        <h2>You are welcome to bring</h2>
        <ul>
            <li>Pizza toppings</li>
            <li>Sides and snacks</li>
            <li>Beverages</li>
            <li>Yourself as you are</li>
            <li>Friends</li>
        </ul>
    </div>
   
    <div>
        <h2>Let Us Know You&apos;re Coming!</h2>
        <Rsvp />
    </div>
   
    <div className="info-section">
        <h2>Special Notes</h2>
        <ul>
            <li>The event is kid-friendly</li>
            <li>Please let us know about any dietary restrictions in your RSVP</li>
            <li>Feel free to bring friends, please include them in your RSVP or text Eileen</li>
        </ul>
    </div>
   
    <footer>
        <p>Looking forward to seeing you :-</p>
        <p>Questions? Contact Eileen at eileen@jubil.ee or (206) 612-0118</p>
    </footer>
        </>
    )
}