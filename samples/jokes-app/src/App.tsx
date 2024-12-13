import { useState, useEffect } from "react";
import JokesSDK, { Joke } from "random-jokes-sdk";
import "./App.css";

function App() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [savedJokes, setSavedJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPunchline, setShowPunchline] = useState(false);

  const loadSavedJokes = async () => {
    try {
      const jokes = await JokesSDK.getSavedJokes();
      setSavedJokes(jokes);
    } catch (error) {
      console.error("Failed to load saved jokes:", error);
    }
  };

  const getNewJoke = async () => {
    setIsLoading(true);
    setShowPunchline(false);
    try {
      const joke = await JokesSDK.getRandomJoke();
      setCurrentJoke(joke);
    } catch (error) {
      console.error("Failed to fetch joke:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveJoke = async (joke: Joke) => {
    try {
      await JokesSDK.saveJoke(joke);
      await loadSavedJokes();
      // 사용자 피드백
      const notification = document.getElementById("notification");
      if (notification) {
        notification.classList.add("show");
        setTimeout(() => notification.classList.remove("show"), 2000);
      }
    } catch (error) {
      console.error("Failed to save joke:", error);
    }
  };

  const deleteJoke = async (jokeId: number) => {
    try {
      await JokesSDK.deleteJoke(jokeId);
      setSavedJokes((jokes) => jokes.filter((joke) => joke.id !== jokeId));
    } catch (error) {
      console.error("Failed to delete joke:", error);
    }
  };

  useEffect(() => {
    loadSavedJokes();
    getNewJoke();
  }, []);

  return (
    <div className="app">
      <div id="notification" className="notification">
        Joke saved successfully!
      </div>

      <header className="header">
        <h1>🎭 Random Jokes</h1>
        <button
          className="refresh-button"
          onClick={getNewJoke}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get New Joke"}
        </button>
      </header>

      <main>
        <section className="current-joke">
          {currentJoke && (
            <div className="joke-card featured">
              <h3>{currentJoke.setup}</h3>
              {!showPunchline ? (
                <button
                  className="reveal-button"
                  onClick={() => setShowPunchline(true)}
                >
                  Reveal Punchline
                </button>
              ) : (
                <>
                  <p className="punchline">{currentJoke.punchline}</p>
                  <div className="joke-actions">
                    <button
                      className="save-button"
                      onClick={() => saveJoke(currentJoke)}
                    >
                      Save Joke
                    </button>
                    <button
                      className="next-button"
                      onClick={() => {
                        getNewJoke();
                        setShowPunchline(false);
                      }}
                    >
                      Next Joke
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        <section className="saved-jokes">
          <h2>📚 My Saved Jokes</h2>
          <div className="jokes-grid">
            {savedJokes.map((joke) => (
              <div key={joke.id} className="joke-card saved">
                <h3>{joke.setup}</h3>
                <p>{joke.punchline}</p>
                <button
                  className="delete-button"
                  onClick={() => deleteJoke(joke.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
