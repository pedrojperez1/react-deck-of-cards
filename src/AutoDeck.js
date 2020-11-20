import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

const AutoDeck = () => {
    const [card, setCard] = useState();
    const [isRunning, setIsRunning] = useState(false);
    const deckId = useRef();

    useEffect(() => { // runs once when component is mounted to get deck
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

    useEffect(() => {
        if (isRunning) {
            setInterval(drawCard, 1000);
        }
        return setIsRunning(false);
    }, [isRunning]);

    const handleClick = () => {
        setIsRunning(true);
    }
    return (
        <div>
            <button onClick={handleClick}>Start drawing cards</button><br></br>
            {card && <img src={card}></img>}
        </div>
    )
};

export default AutoDeck;