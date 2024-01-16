import { useContext, useEffect, useState } from "react";

import SettingsContext from "../contexts/SettingsContext";
import dutchData from '../data/dutch.json';
import DataContext from "../contexts/DataContext";

export default function useCards() {
    const [cards, setCards] = useState([]);
	const { settings, initialized } = useContext(SettingsContext);
	const [allCategories, setAllCategories] = useState([]);
	const [categories, setCategories] = useState([]);
	const [allAnswers, setAnswers] = useState([]);
    const { data } = useContext(DataContext);

    useEffect(() => {
		if (initialized) {
			const hidden = settings.hiddenCategories;
			const categories = allCategories.filter((category) => {
				return !hidden.includes(category);
			});
			setCategories(categories);
		}
	}, [initialized, allCategories]);

    useEffect(() => {
        const allCategories = Object.keys(data);
        const allAnswers = allCategories.reduce((answers, category) => {
            const categoryData = dutchData[category];

            return [
                ...answers,
                ...Object.keys(categoryData).reduce((answers, key) => {
                    return [
                        ...answers,
                        categoryData[key],
                    ]
                }, []),
            ];
        }, []);

        setAllCategories(allCategories);
        setAnswers(allAnswers)
    }, [data]);

    const shuffle = () => {
        const allCards = {};
        for (const category of categories) {
            const cardData = dutchData[category];
            for (const key in cardData) {
                allCards[key] = cardData[key];
            }
        }

        const allCardNames = Object.keys(allCards);
        const newCards = [];
        while (allCardNames.length > 0) {
            // find a random question
            const randomCardIndex = Math.floor(Math.random() * allCardNames.length);
            const cardKey = allCardNames[randomCardIndex];
            allCardNames.splice(randomCardIndex, 1);
            const correctAnswer = allCards[cardKey];

            const answers = [
                correctAnswer,
            ];

            // build a list of 4 answers. 3 chosen at random
            const newAnswers = [...allAnswers];
            while (newAnswers.length > 0 && answers.length < 4) {
                const randomAnswerIndex = Math.floor(Math.random() * newAnswers.length);
                const answer = newAnswers[randomAnswerIndex];
                newAnswers.splice(randomAnswerIndex, 1);
                if (!answers.includes(answer)) {
                    answers.push(answer);
                }
            }

            // now shuffle the answers we found
            const shuffledAnswers = [];
            while (answers.length > 0) {
                const randomAnswerIndex = Math.floor(Math.random() * answers.length);
                const answer = answers[randomAnswerIndex];
                answers.splice(randomAnswerIndex, 1);
                shuffledAnswers.push(answer);
            }

            newCards.push({
                question: cardKey,
                answers: shuffledAnswers,
                correctAnswer,
            });
        }

        setCards(newCards);
    }

    useEffect(shuffle, [categories]);

    return {
        cards,
        shuffle,
        categories,
        popCard: () => {
            const card = cards[0];
            cards.splice(0, 1);
            const newCards = [...cards];
            setCards(newCards);
            if (newCards.length < 3) {
                // make sure we always have enough cards in the stack
                shuffle();
            }
            return card;
        },
    };
}