import React, { useState } from 'react';
import axios from 'axios';
import "./Feedback.css";

function Feedback() {
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/feedback', { feedback });
            setMessage('Feedback submitted successfully!');
            setFeedback('');
        } catch (err) {
            setMessage('Failed to submit feedback.');
        }
    };

    return (
        <div className="feedback-container">
            <h2 className="feedback-title">We Value Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="feedback-textarea"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your feedback here..."
                />
                <button className="feedback-button" type="submit">Submit</button>
            </form>
            {message && <p className="feedback-message">{message}</p>}
        </div>
    );
}

export default Feedback;
