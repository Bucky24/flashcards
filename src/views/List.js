import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from '../styles.css';
import useCards from '../utils/useCards';

const MAX_QUEUE = 5;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  

export default function List() {
    const [message, setMessage] = useState("");
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [queue, setQueue] = useState([]);
    const [answerQueue, setAnswerQueue] = useState([]);
    const { cards, popCard } = useCards();
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        const undone = queue.filter((item) => !item.done).length;
        // only refill if all items are done
        if (undone === 0 && cards.length > 0) {
            const todo = MAX_QUEUE - undone;
            // pop all the cards
            const newCards = [];
            const newAnswers = [];
            for (let i=0;i<todo;i++) {
                const card = popCard();
                newCards.push(card);
                newAnswers.push(card);
            }

            // sort the new answers randomly
            const shuffledNewAnswers = [];
            while (newAnswers.length > 0) {
                const randomIndex = getRandomInt(newAnswers.length);
                shuffledNewAnswers.push(newAnswers.splice(randomIndex, 1)[0]);
            }

            // find all positions that are done or unfilled
            const newQueue = [...queue];
            for (let i=0;i<MAX_QUEUE;i++) {
                if (i > newQueue.length-1) {
                    const card = newCards.pop();
                    newQueue.push({
                        done: false,
                        ...card,
                    });
                } else if (newQueue[i].done) {
                    const card = newCards.pop();
                    newQueue[i] = {
                        done: false,
                        ...card,
                    };
                }
            }
            setQueue(newQueue);

            // now the same for the answers
            const newAnswersQueue = [...answerQueue];
            for (let i=0;i<MAX_QUEUE;i++) {
                if (i > newAnswersQueue.length-1) {
                    const card = shuffledNewAnswers.pop();
                    newAnswersQueue.push({
                        done: false,
                        ...card,
                    });
                } else if (newAnswersQueue[i].done) {
                    const card = shuffledNewAnswers.pop();
                    newAnswersQueue[i] = {
                        done: false,
                        ...card,
                    };
                }
            }

            setAnswerQueue(newAnswersQueue);
        }
    }, [queue, cards]);

    useEffect(() => {
        if (selectedAnswer != null && selectedQuestion != null) {
            setSelectedAnswer(null);
            setSelectedQuestion(null);
            const question = queue[selectedQuestion];
            const answer = answerQueue[selectedAnswer];
            if (question.correctAnswer === answer.correctAnswer) {
                setCorrect((correct) => correct + 1);
                setQueue(queue.map((item, index) => {
                    if (index === selectedQuestion) {
                        return {
                            ...item,
                            done: true,
                        };
                    }

                    return item;
                }));
                setAnswerQueue(answerQueue.map((item, index) => {
                    if (index === selectedAnswer) {
                        return {
                            ...item,
                            done: true,
                        };
                    }

                    return item;
                }));
            } else {
                setWrong((wrong) => wrong + 1);
            }
        }
    }, [selectedAnswer, selectedQuestion]);

    return <>
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <span>Correct: {correct}</span>
                <span>Wrong: {wrong}</span>
            </div>
        </header>
        <div className={styles.message}>{message}</div>
        <section className={styles.cardHolder}>
            {queue.map(({ question, done }, index) => {
                const { correctAnswer, done: answerDone } = answerQueue[index];
                return <div className={styles.list_outer}>
                    <div
                        className={classNames(
                            styles.list_item,
                            selectedQuestion === index && styles.selected,
                            done && styles.done,
                        )}
                        onClick={() => {
                            if (done) return;
                            setSelectedQuestion(index);
                        }}
                    >{question}</div>
                    <div
                        className={classNames(
                            styles.list_item,
                            selectedAnswer === index && styles.selected,
                            answerDone && styles.done,
                        )}
                        onClick={() => {
                            if (answerDone) return;
                            setSelectedAnswer(index);
                        }}
                    >{correctAnswer}</div>
                </div>
            })}
        </section>
    </>;
}