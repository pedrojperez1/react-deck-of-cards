import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

const Deck = () => {
    const [card, setCard] = useState();
    const deckId = useRef();
    useEffect(() => { // this runs once when component is mounted
        async function getDeck () {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            deckId.current = res.data.deck_id;
        }
        getDeck();
    }, [])

    const drawCard = async () => {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`)
        console.log(`remaining: ${res.data.remaining}`);
        const newCard = res.data.cards[0];
        if (newCard) {
            setCard(newCard.image)
        } else {
            setCard(false);
            alert("No more cards!");
        }
    }

    return (
        <div>
            <button onClick={drawCard}>Draw a card</button><br></br>
            {card && <img src={card}></img>}
        </div>
    )
};

export default Deck;