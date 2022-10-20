import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './styles.css';

import dutchData from './data/dutch.json';

const allAnswers = Object.keys(dutchData).reduce((answers, key) => {
	return [
		...answers,
		dutchData[key],
	]
}, []);

export default function App() {
	const [cards, setCards] = useState([]);
	const [activeCard, setActiveCard] = useState(0);
	const [message, setMessage] = useState("");
	const [guess, setGuess] = useState(null);
	const [correct, setCorrect] = useState(0);
	const [wrong, setWrong] = useState(0);

	function reset() {
		setWrong(0);
		setCorrect(0);
		setActiveCard(0);

		const allCards = Object.keys(dutchData);
		const newCards = [];

		while (allCards.length > 0) {
			// find a random questnio
			const randomCardIndex = Math.floor(Math.random() * allCards.length);
			const cardKey = allCards[randomCardIndex];
			allCards.splice(randomCardIndex, 1);
			const correctAnswer = dutchData[cardKey];

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

	useEffect(reset, []);

	const done = activeCard >= cards.length;
	const currentCard = done ? null : cards[activeCard];

	return (<div className={styles.appRoot}>
		<header className={styles.header}>
			<div className={styles.headerInner}>
				<span>Correct: {correct}/{cards.length}</span>
				<span>Wrong: {wrong}/{cards.length}</span>
			</div>
		</header>
		<div class={styles.message}>{message}</div>
		{!done && <section class={styles.cardHolder}>
			<div class={styles.card}>
				<h2>
					{currentCard.question}
				</h2>
				<div class={styles.buttonHolder}>
					{currentCard.answers.map((answer) => {
						const correctAnswer = currentCard.correctAnswer === answer;
						const guessed = guess === answer;
						return (
							<button
								class={classNames(
									styles.button,
									correctAnswer && guessed && styles.correct,
									!correctAnswer && guessed && styles.wrong,
								)}
								onClick={() => {
									if (guess !== null) {
										return;
									}
									if (correctAnswer) {
										setMessage("Yes! The correct answer is \"" + currentCard.correctAnswer + "\"!");
										setCorrect((correct) => {
											return correct + 1;
										});
									} else {
										setMessage("Incorrect! The correct answer is \"" + currentCard.correctAnswer + "\"");
										setWrong((wrong) => {
											return wrong + 1;
										});
									}
									setGuess(answer);
									setTimeout(() => {
										setMessage("");
										setActiveCard((activeCard) => {
											return activeCard + 1;
										});
										setGuess(null);
									}, correctAnswer? 500 : 1000);
								}}
							>
								{answer}
							</button>
						);
					})}
				</div>
			</div>
		</section>}
		{done && <section style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		}}>
			All Done!<br/>
			<button
				onClick={reset}
			>
				Go Again
			</button>
		</section>}
	</div>);
}