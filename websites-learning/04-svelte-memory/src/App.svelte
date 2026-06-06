<script>
  import { onMount } from "svelte";
  import Card from "./lib/Card.svelte";

  const EMOJI = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];

  let cards = $state([]);
  let flipped = $state([]);
  let moves = $state(0);
  let time = $state(0);
  let won = $state(false);
  let timerId;
  let difficulty = $state("medium");

  const SIZES = { easy: 8, medium: 12, hard: 16 };

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function newGame() {
    stopTimer();
    const size = SIZES[difficulty];
    const chosen = EMOJI.slice(0, size / 2);
    const pairs = shuffle([...chosen, ...chosen]).map((value, i) => ({
      id: i,
      value,
      flipped: false,
      matched: false
    }));
    cards = pairs;
    flipped = [];
    moves = 0;
    time = 0;
    won = false;
    startTimer();
  }

  function startTimer() {
    timerId = setInterval(() => { time += 1; }, 1000);
  }
  function stopTimer() {
    if (timerId) clearInterval(timerId);
  }

  function handleFlip(index) {
    if (won) return;
    if (flipped.length >= 2) return;
    if (cards[index].flipped || cards[index].matched) return;

    cards[index].flipped = true;
    flipped = [...flipped, index];

    if (flipped.length === 2) {
      moves += 1;
      const [a, b] = flipped;
      if (cards[a].value === cards[b].value) {
        cards[a].matched = true;
        cards[b].matched = true;
        flipped = [];
        if (cards.every(c => c.matched)) {
          won = true;
          stopTimer();
        }
      } else {
        setTimeout(() => {
          cards[a].flipped = false;
          cards[b].flipped = false;
          flipped = [];
        }, 800);
      }
    }
  }

  function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  onMount(() => {
    newGame();
    return stopTimer;
  });
</script>

<main class="app">
  <header>
    <h1>Svelte Memory</h1>
    <p class="lead">Flip two cards, find a match. Built with Svelte 5 runes.</p>
  </header>

  <div class="controls">
    <div class="difficulty">
      <label for="diff">Difficulty</label>
      <select id="diff" bind:value={difficulty} onchange={newGame}>
        <option value="easy">Easy (4 pairs)</option>
        <option value="medium">Medium (6 pairs)</option>
        <option value="hard">Hard (8 pairs)</option>
      </select>
    </div>
    <div class="stats">
      <span><strong>Moves</strong> {moves}</span>
      <span><strong>Time</strong> {formatTime(time)}</span>
    </div>
    <button class="primary" onclick={newGame}>New game</button>
  </div>

  {#if won}
    <div class="banner">
      <h2>You won!</h2>
      <p>{moves} moves in {formatTime(time)}.</p>
    </div>
  {/if}

  <div class="board" style="--cols: {Math.sqrt(cards.length)};">
    {#each cards as card, i (card.id)}
      <Card
        value={card.value}
        flipped={card.flipped}
        matched={card.matched}
        onflip={() => handleFlip(i)}
      />
    {/each}
  </div>

  <footer>
    <p>Match all the pairs in as few moves and as little time as possible.</p>
  </footer>
</main>

<style>
  .app { max-width: 560px; margin: 0 auto; padding: 48px 20px 64px; }

  header h1 {
    margin: 0;
    font-size: 2.4rem;
    letter-spacing: -.03em;
    background: linear-gradient(120deg, #f472b6, #fb923c);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .lead { color: #94a3b8; margin: 4px 0 24px; }

  .controls {
    display: flex;
    gap: 16px;
    align-items: end;
    flex-wrap: wrap;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 20px;
  }
  .difficulty { display: flex; flex-direction: column; gap: 4px; }
  .difficulty label { font-size: .75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; }
  .difficulty select {
    background: #1e293b;
    color: #f1f5f9;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 8px 10px;
    font: inherit;
  }
  .stats {
    display: flex;
    gap: 18px;
    margin-left: auto;
    color: #cbd5e1;
    font-size: .9rem;
  }
  .stats strong { color: #94a3b8; font-weight: 500; margin-right: 6px; }

  button {
    font: inherit;
    background: #f472b6;
    color: #1e1b4b;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background .2s;
  }
  button:hover { background: #ec4899; }

  .board {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    gap: 10px;
  }

  .banner {
    background: linear-gradient(135deg, #10b981, #059669);
    color: #ecfdf5;
    padding: 18px 20px;
    border-radius: 12px;
    margin-bottom: 18px;
    text-align: center;
  }
  .banner h2 { margin: 0 0 4px; }
  .banner p { margin: 0; opacity: .9; }

  footer { margin-top: 24px; color: #94a3b8; font-size: .85rem; text-align: center; }
</style>
