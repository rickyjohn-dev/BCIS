
function analyzeContent() {
  const text = document.getElementById("contentInput").value.trim();
  const keywords = document.getElementById("keywords").value.toLowerCase().split(",").map(k => k.trim());

  let score = 100;
  const suggestions = [];

  if (text.length < 150) {
    score -= 20;
    suggestions.push("Content is too short. Consider expanding your ideas.");
  }

  if (!text.match(/\b(you|your|we|us)\b/i)) {
    score -= 10;
    suggestions.push("Content lacks user-focused language (e.g. 'you', 'your').");
  }

  if (!text.match(/\bcall\s?to\s?action|subscribe|click here|buy now\b/i)) {
    score -= 10;
    suggestions.push("Missing a clear call to action (CTA). Add phrases like 'subscribe' or 'buy now'.");
  }

  if (text.length > 500 && !text.match(/\n\n/)) {
    score -= 10;
    suggestions.push("Break long paragraphs to improve readability.");
  }

  if (keywords.length > 0) {
    let keywordFound = false;
    for (let keyword of keywords) {
      if (text.toLowerCase().includes(keyword)) {
        keywordFound = true;
        break;
      }
    }
    if (!keywordFound) {
      score -= 10;
      suggestions.push("No target keywords found in content. Include relevant keywords for SEO.");
    }
  }

  if (score < 0) score = 0;

  document.getElementById("resultBox").style.display = "block";
  document.getElementById("contentScore").innerText = `Score: ${score}/100`;

  const list = document.getElementById("suggestionsList");
  list.innerHTML = "";
  suggestions.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    list.appendChild(li);
  });

  if (suggestions.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Excellent! Your content is well-written and performance-optimized.";
    list.appendChild(li);
  }
}
