"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const formElement = e.currentTarget;
    const payload = Object.fromEntries(new FormData(formElement).entries());
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit application.");
      setSent(true);
      formElement.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand"><span className="brand-mark">B</span><span>BFAF <small>MEDIA DESK</small></span></div>
        <span className="edition">BAYELSA FOOD &amp; ART FESTIVAL</span>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MEDIA ACCREDITATION • APPLICATIONS OPEN</p>
          <h1>Be part of<br /><em>the story.</em></h1>
          <p className="intro">The Bayelsa Food &amp; Art Festival brings culture, food, art and people together. Tell us how you plan to document, amplify or contribute to the experience.</p>
          <div className="hero-note"><span>01</span><p>Submit your details and creative proposal. Every application is reviewed by the BFAF team.</p></div>
        </div>
        <div className="form-panel">
          {sent ? (
            <div className="success">
              <div className="check">✓</div><p className="eyebrow">APPLICATION RECEIVED</p><h2>Thank you.</h2>
              <p>Your application has been received and is under review. The team will contact you with an update.</p>
              <button onClick={() => setSent(false)} className="text-button">Submit another application →</button>
            </div>
          ) : (
            <>
              <p className="eyebrow">01 / YOUR APPLICATION</p><h2>Let’s get to know you.</h2>
              <form onSubmit={submit}>
                <label>Full name<input name="full_name" required placeholder="Your full name" /></label>
                <div className="two">
                  <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
                  <label>Phone / WhatsApp<input name="phone" required placeholder="+234..." /></label>
                </div>
                <label>What best describes you?
                  <select name="applicant_type" required defaultValue="">
                    <option value="" disabled>Select your role</option>
                    <option>Journalist / Media professional</option><option>Content creator</option><option>Influencer</option>
                    <option>Photographer / Videographer</option><option>PR / Communications professional</option><option>Other</option>
                  </select>
                </label>
                <label>Instagram profile<input name="instagram" placeholder="https://instagram.com/username" /></label>
                <label>TikTok profile<input name="tiktok" placeholder="https://tiktok.com/@username" /></label>
                <label>What do you plan to contribute to BFAF?<textarea name="contribution" required rows={4} placeholder="Tell us about your coverage plan, audience, creative idea or proposed contribution..." /></label>
                <button type="submit" disabled={busy}>{busy ? "Submitting..." : "Submit application"} <span>↗</span></button>
                {error && <p className="error">{error}</p>}
                <p className="fine">Submitting an application does not guarantee accreditation. All decisions are made by the BFAF team using its own review benchmarks.</p>
              </form>
            </>
          )}
        </div>
      </section>
      <footer><span>© BFAF — BAYELSA FOOD &amp; ART FESTIVAL</span><span>Culture. Creativity. Community.</span></footer>
    </main>
  );
}
