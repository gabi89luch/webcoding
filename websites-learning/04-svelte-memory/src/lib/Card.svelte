<script>
  let { value, flipped = false, matched = false, onflip } = $props();
</script>

<button
  class="card"
  class:flipped
  class:matched
  onclick={onflip}
  disabled={matched}
  aria-label={flipped ? value : "Hidden card"}
>
  <div class="inner">
    <div class="face front">?</div>
    <div class="face back">{value}</div>
  </div>
</button>

<style>
  .card {
    aspect-ratio: 1;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    perspective: 800px;
    font: inherit;
  }
  .card:disabled { cursor: default; }

  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(.4, 0, .2, 1);
  }
  .flipped .inner,
  .matched .inner {
    transform: rotateY(180deg);
  }

  .face {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    font-size: 2.5rem;
    font-weight: 600;
    backface-visibility: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  .front {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
  }
  .back {
    background: #1e293b;
    color: #f1f5f9;
    transform: rotateY(180deg);
    border: 2px solid #334155;
  }
  .matched .back {
    background: #065f46;
    border-color: #10b981;
    color: #a7f3d0;
  }
</style>
