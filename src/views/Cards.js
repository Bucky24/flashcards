import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from '../styles.css';

import useCards from '../utils/useCards';

export default function Cards() {
	const [correct, setCorrect] = useState(0);
	const [wrong, setWrong] = useState(0);
	const [message, setMessage] = useState("");
	const [guess, setGuess] = useState(null);
	const { cards, shuffle, categories } = useCards();
	const [activeCard, setActiveCard] = useState(0);

    function reset() {
		setWrong(0);
		setCorrect(0);
		setActiveCard(0);

		shuffle();
	}

	useEffect(() => {
		reset();
	}, [categories]);

    const done = activeCard >= cards.length;
	const currentCard = done ? null : cards[activeCard];

    return (
        <>
            <header className={styles.header}>
				<div className={styles.headerInner}>
					<span>Correct: {correct}/{cards.length}</span>
					<span>Wrong: {wrong}/{cards.length}</span>
				</div>
			</header>
			<div className={styles.message}>{message}</div>
			{!done && <section className={styles.cardHolder}>
				<div className={styles.card}>
					<h2>
						{currentCard.question}
					</h2>
					<div className={styles.buttonHolder}>
						{currentCard.answers.map((answer, index) => {
							const correctAnswer = currentCard.correctAnswer === answer;
							const guessed = guess === answer;
							return (
								<button
									key={`answer_${index}`}
									className={classNames(
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
        </>
    )
}