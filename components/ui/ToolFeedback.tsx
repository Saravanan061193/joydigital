"use client";

import React, { useState } from "react";

interface ToolFeedbackProps {
  toolName: string;
}

export default function ToolFeedback({ toolName }: ToolFeedbackProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg("Please select a rating star.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Please write a short message.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/free-tools/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolName,
          rating,
          message,
          name: name.trim() || "Anonymous",
          email: email.trim() || "N/A"
        })
      });

      if (res.ok) {
        setSuccess(true);
        // Reset form states
        setMessage("");
        setName("");
        setEmail("");
        setRating(0);
      } else {
        throw new Error("Failed to submit feedback.");
      }
    } catch (err: any) {
      setErrorMsg("Could not send feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#E9E4F2] p-6 sm:p-8 rounded-[24px] shadow-sm text-left relative overflow-hidden max-w-2xl mx-auto mt-12">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#7C3AED]" />
      
      {success ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 text-lg mx-auto mb-4">
            <i className="fa-solid fa-circle-check" />
          </div>
          <h4 className="text-sm font-black text-[#1F1B2D] mb-1">Thank you for your feedback!</h4>
          <p className="text-[10px] text-[#6B6478] font-semibold mb-4">Your rating has been logged in our feedback terminal.</p>
          <button
            onClick={() => setSuccess(false)}
            className="text-[10px] font-black text-[#7C3AED] hover:underline cursor-pointer"
          >
            Submit another feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-black text-[#1F1B2D] mb-1">Was this {toolName} helpful?</h4>
            <p className="text-[10px] text-[#6B6478] font-semibold leading-relaxed">
              We want to make our tools as useful as possible. Share your suggestions, bugs, or ratings.
            </p>
          </div>

          {/* Stars Selection */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-extrabold text-[#6B6478] uppercase tracking-wider block">Your Rating</span>
            <div className="flex items-center gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-lg cursor-pointer transition-all duration-150 transform hover:scale-115 focus:outline-none"
                  aria-label={`Rate ${star} Stars`}
                >
                  <i className={`fa-star ${(hoveredRating || rating) >= star ? "fa-solid text-amber-400" : "fa-regular text-slate-350"}`} />
                </button>
              ))}
              {rating > 0 && (
                <span className="text-[10px] font-black text-slate-450 ml-2 select-none">
                  ({rating} / 5 stars)
                </span>
              )}
            </div>
          </div>

          {/* Feedback details */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="feedback-msg-input" className="text-[9px] font-extrabold text-[#6B6478] uppercase block">
              Suggestions & Comments
            </label>
            <textarea
              id="feedback-msg-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              required
              placeholder="What could we improve? Did you face any bugs?"
              className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-semibold outline-none focus:bg-white focus:border-[#7C3AED] transition-colors"
            />
          </div>

          {/* Contact Fields (optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="feedback-name-input" className="text-[9px] font-extrabold text-[#6B6478] uppercase block">
                Your Name (Optional)
              </label>
              <input
                type="text"
                id="feedback-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="feedback-email-input" className="text-[9px] font-extrabold text-[#6B6478] uppercase block">
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="feedback-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="text-xs bg-[#FAF9FF] border border-[#E9E4F2] rounded-xl px-3 py-2.5 font-bold outline-none focus:bg-white focus:border-[#7C3AED] transition-colors"
              />
            </div>
          </div>

          {errorMsg && <p className="text-[9px] font-bold text-rose-500">{errorMsg}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer max-w-[160px]"
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      )}
    </div>
  );
}
