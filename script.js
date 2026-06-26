/* =========================================================
   Quiz Generator — Vanilla JS
   - Category selection
   - Randomized questions, 30s per-question timer
   - Progress, scoring, review, high scores (localStorage)
   ========================================================= */
// ---------- Question Bank (20+ per category) ----------
const QUIZ_DATA = {
  ai: {
    name: "Artificial Intelligence",
    emoji: "🤖",
    questions: [
      { q: "What does 'AI' stand for?", options: ["Automated Input", "Artificial Intelligence", "Algorithmic Interface", "Applied Internet"], a: 1 },
      { q: "Which is a classic AI search algorithm?", options: ["A*", "TCP/IP", "RSA", "MP3"], a: 0 },
      { q: "The Turing Test measures a machine's ability to:", options: ["Compute faster", "Exhibit human-like intelligence", "Store more data", "Connect to internet"], a: 1 },
      { q: "Which language is most associated with classical AI?", options: ["Lisp", "HTML", "CSS", "SQL"], a: 0 },
      { q: "An 'agent' in AI perceives its environment via:", options: ["Effectors", "Sensors", "Cables", "Disks"], a: 1 },
      { q: "Which is NOT a type of machine learning?", options: ["Supervised", "Unsupervised", "Reinforcement", "Deterministic"], a: 3 },
      { q: "Expert systems primarily use:", options: ["Rule-based reasoning", "Neural nets", "Genetic algorithms", "Blockchains"], a: 0 },
      { q: "Which famous AI defeated Go champion Lee Sedol?", options: ["Deep Blue", "Watson", "AlphaGo", "ChatGPT"], a: 2 },
      { q: "NLP stands for:", options: ["Natural Language Processing", "Network Layer Protocol", "Neural Logic Pattern", "New Learning Process"], a: 0 },
      { q: "A heuristic function in search is used to:", options: ["Guarantee optimal solution", "Estimate cost to goal", "Encrypt data", "Sort arrays"], a: 1 },
      { q: "Which is a knowledge representation technique?", options: ["Semantic networks", "Bubble sort", "Quicksort", "TCP"], a: 0 },
      { q: "Backpropagation is used in:", options: ["Decision trees", "Neural networks", "SQL queries", "Linked lists"], a: 1 },
      { q: "Which is an example of weak AI?", options: ["Self-aware robot", "Voice assistant", "AGI", "Sentient machine"], a: 1 },
      { q: "Computer vision deals with:", options: ["Audio processing", "Image understanding", "Text translation", "Disk I/O"], a: 1 },
      { q: "The 'no free lunch' theorem states:", options: ["No model is best on all problems", "AI is always free", "All algorithms are equal in speed", "Free data is best"], a: 0 },
      { q: "GAN stands for:", options: ["Generative Adversarial Network", "Global Area Network", "Genetic Algorithm Node", "Graph Analysis Net"], a: 0 },
      { q: "Which AI lab created GPT?", options: ["DeepMind", "OpenAI", "Meta AI", "IBM Research"], a: 1 },
      { q: "Reinforcement learning is based on:", options: ["Labelled data", "Rewards and penalties", "Clustering", "Regression"], a: 1 },
      { q: "An LLM is a:", options: ["Large Language Model", "Linear Logic Machine", "Local Learning Module", "Low-Level Memory"], a: 0 },
      { q: "Which algorithm is used for shortest path in graphs?", options: ["Dijkstra's", "KNN", "K-Means", "PCA"], a: 0 },
      { q: "Overfitting means the model:", options: ["Generalizes well", "Memorizes training data", "Has too few parameters", "Trains too slowly"], a: 1 }
    ]
  },
  ml: {
    name: "Machine Learning",
    emoji: "📊",
    questions: [
      { q: "Which is a supervised learning algorithm?", options: ["K-Means", "Linear Regression", "DBSCAN", "PCA"], a: 1 },
      { q: "K-Means is used for:", options: ["Classification", "Clustering", "Regression", "Reduction"], a: 1 },
      { q: "Which metric is for classification?", options: ["RMSE", "Accuracy", "MAE", "R²"], a: 1 },
      { q: "Overfitting is reduced by:", options: ["More features", "Regularization", "Larger learning rate", "Removing data"], a: 1 },
      { q: "Bias-variance tradeoff balances:", options: ["Speed vs memory", "Underfit vs overfit", "Data vs labels", "Train vs test split"], a: 1 },
      { q: "Decision trees split on:", options: ["Random rules", "Information gain", "Alphabetic order", "Row index"], a: 1 },
      { q: "Random forests are an example of:", options: ["Boosting", "Bagging", "Stacking", "Clustering"], a: 1 },
      { q: "Gradient descent minimizes:", options: ["Loss function", "Accuracy", "Tree depth", "Cluster count"], a: 0 },
      { q: "Which is an activation function?", options: ["ReLU", "SQL", "FTP", "DNS"], a: 0 },
      { q: "PCA stands for:", options: ["Principal Component Analysis", "Predictive Class Algorithm", "Partial Cluster Average", "Probability Curve Adjustment"], a: 0 },
      { q: "Cross-validation helps to:", options: ["Tune randomness", "Evaluate generalization", "Train faster", "Reduce features"], a: 1 },
      { q: "Confusion matrix shows:", options: ["Model speed", "TP, FP, TN, FN", "Memory usage", "Dataset size"], a: 1 },
      { q: "Logistic regression outputs:", options: ["Probabilities", "Distances", "Clusters", "Trees"], a: 0 },
      { q: "Which is unsupervised?", options: ["SVM", "Naive Bayes", "K-Means", "Logistic Regression"], a: 2 },
      { q: "Feature scaling matters most for:", options: ["Decision trees", "Distance-based models", "Random forests", "Rule mining"], a: 1 },
      { q: "Which boosts weak learners?", options: ["AdaBoost", "K-Means", "PCA", "DBSCAN"], a: 0 },
      { q: "Recall measures:", options: ["TP / (TP+FN)", "TP / (TP+FP)", "Correct / Total", "TN / All"], a: 0 },
      { q: "An epoch is:", options: ["One pass over the dataset", "One batch", "One sample", "One layer"], a: 0 },
      { q: "Dropout is used to:", options: ["Add layers", "Prevent overfitting", "Speed up GPUs", "Encode text"], a: 1 },
      { q: "Which loss is for regression?", options: ["Cross-entropy", "MSE", "Hinge", "KL Divergence"], a: 1 },
      { q: "Hyperparameters are:", options: ["Learned by the model", "Set before training", "Output values", "Dataset rows"], a: 1 }
    ]
  },
  stats: {
    name: "Statistics",
    emoji: "📈",
    questions: [
      { q: "Mean is also called:", options: ["Mode", "Median", "Average", "Range"], a: 2 },
      { q: "Median is the:", options: ["Most frequent value", "Middle value", "Average", "Largest value"], a: 1 },
      { q: "Standard deviation measures:", options: ["Center", "Spread", "Skew", "Mode"], a: 1 },
      { q: "Probability values lie between:", options: ["-1 and 1", "0 and 1", "0 and 100", "Any real"], a: 1 },
      { q: "A p-value < 0.05 typically means:", options: ["Accept null", "Reject null", "No conclusion", "Repeat test"], a: 1 },
      { q: "Normal distribution is:", options: ["Bimodal", "Bell-shaped", "Uniform", "Skewed right"], a: 1 },
      { q: "Variance is std deviation:", options: ["Halved", "Doubled", "Squared", "Square root"], a: 2 },
      { q: "Correlation ranges from:", options: ["0 to 1", "-1 to 1", "-∞ to ∞", "0 to 100"], a: 1 },
      { q: "Type I error is:", options: ["False positive", "False negative", "True positive", "True negative"], a: 0 },
      { q: "Sampling without replacement uses:", options: ["Binomial", "Hypergeometric", "Poisson", "Normal"], a: 1 },
      { q: "Central Limit Theorem concerns:", options: ["Population mean", "Sample mean distribution", "Median", "Mode"], a: 1 },
      { q: "Which is a measure of central tendency?", options: ["IQR", "Variance", "Median", "Skewness"], a: 2 },
      { q: "A histogram shows:", options: ["Categorical proportions", "Distribution of values", "Time series", "Correlation"], a: 1 },
      { q: "Bayes' theorem relates:", options: ["Mean and variance", "Prior and posterior probability", "Sum and product", "Sample and population"], a: 1 },
      { q: "Outliers most affect:", options: ["Median", "Mode", "Mean", "Min"], a: 2 },
      { q: "ANOVA compares:", options: ["Two variances", "Three or more means", "Two proportions", "Medians"], a: 1 },
      { q: "Chi-square test is for:", options: ["Means", "Categorical data", "Slopes", "Variances only"], a: 1 },
      { q: "A confidence interval shows:", options: ["Exact value", "Range of plausible values", "Error rate", "p-value"], a: 1 },
      { q: "Skewness measures:", options: ["Peakedness", "Asymmetry", "Spread", "Center"], a: 1 },
      { q: "Kurtosis measures:", options: ["Asymmetry", "Tail heaviness", "Mean", "Range"], a: 1 },
      { q: "Regression's R² indicates:", options: ["Slope", "Variance explained", "Intercept", "Sample size"], a: 1 }
    ]
  },
  sql: {
    name: "SQL",
    emoji: "🗄️",
    questions: [
      { q: "SQL stands for:", options: ["Structured Query Language", "Simple Query List", "Sequential Question Logic", "Stored Quick Lookup"], a: 0 },
      { q: "Which command retrieves data?", options: ["GET", "FETCH", "SELECT", "PULL"], a: 2 },
      { q: "Which clause filters rows?", options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"], a: 0 },
      { q: "Which JOIN returns only matched rows?", options: ["LEFT", "RIGHT", "INNER", "FULL"], a: 2 },
      { q: "Primary key is:", options: ["Nullable", "Unique and not null", "Foreign reference", "Always integer"], a: 1 },
      { q: "Which removes a table entirely?", options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"], a: 2 },
      { q: "TRUNCATE differs from DELETE because:", options: ["It can be rolled back easily", "It removes data without logging each row", "It only deletes one row", "It needs WHERE"], a: 1 },
      { q: "Which aggregates count rows?", options: ["SUM()", "COUNT()", "AVG()", "MAX()"], a: 1 },
      { q: "GROUP BY is used with:", options: ["Aggregates", "Indexes", "Joins only", "Constraints"], a: 0 },
      { q: "HAVING filters:", options: ["Rows", "Groups", "Columns", "Indexes"], a: 1 },
      { q: "Which constraint links tables?", options: ["UNIQUE", "FOREIGN KEY", "CHECK", "NOT NULL"], a: 1 },
      { q: "Which is a DDL statement?", options: ["SELECT", "UPDATE", "CREATE", "INSERT"], a: 2 },
      { q: "Which keyword removes duplicates in SELECT?", options: ["UNIQUE", "DISTINCT", "ONLY", "DIFFERENT"], a: 1 },
      { q: "LIMIT 5 returns:", options: ["First 5 rows", "Last 5 rows", "5 random rows", "5 columns"], a: 0 },
      { q: "ORDER BY default is:", options: ["DESC", "ASC", "Random", "None"], a: 1 },
      { q: "Which operator matches patterns?", options: ["=", "LIKE", "IN", "BETWEEN"], a: 1 },
      { q: "NULL means:", options: ["Zero", "Empty string", "Unknown / missing", "False"], a: 2 },
      { q: "An index improves:", options: ["Insert speed", "Read speed", "Storage usage", "Backup speed"], a: 1 },
      { q: "A view is:", options: ["A stored table", "A virtual table from a query", "A backup", "An index"], a: 1 },
      { q: "ACID stands for:", options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Index, Data", "Audit, Commit, Insert, Drop", "Aggregate, Calc, Index, Data"], a: 0 },
      { q: "Which JOIN keeps all left rows?", options: ["INNER", "LEFT", "RIGHT", "CROSS"], a: 1 }
    ]
  },
  gk: {
    name: "General Knowledge",
    emoji: "🌍",
    questions: [
      { q: "Capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], a: 2 },
      { q: "Largest planet in the solar system?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], a: 2 },
      { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"], a: 1 },
      { q: "Currency of Japan?", options: ["Won", "Yuan", "Yen", "Ringgit"], a: 2 },
      { q: "How many continents are there?", options: ["5", "6", "7", "8"], a: 2 },
      { q: "Longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], a: 1 },
      { q: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], a: 2 },
      { q: "Who wrote 'Hamlet'?", options: ["Dickens", "Shakespeare", "Austen", "Tolstoy"], a: 1 },
      { q: "Smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], a: 1 },
      { q: "Speed of light is approximately:", options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "30,000 km/s"], a: 0 },
      { q: "Tallest mountain on Earth?", options: ["K2", "Kilimanjaro", "Everest", "Denali"], a: 2 },
      { q: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], a: 3 },
      { q: "Who discovered penicillin?", options: ["Curie", "Fleming", "Pasteur", "Darwin"], a: 1 },
      { q: "How many bones in adult human body?", options: ["206", "201", "212", "198"], a: 0 },
      { q: "The Great Wall is in:", options: ["Japan", "China", "Korea", "Mongolia"], a: 1 },
      { q: "Which language has the most native speakers?", options: ["English", "Spanish", "Mandarin", "Hindi"], a: 2 },
      { q: "Who was the first man on the Moon?", options: ["Aldrin", "Armstrong", "Gagarin", "Glenn"], a: 1 },
      { q: "Which element has symbol 'Au'?", options: ["Silver", "Gold", "Aluminum", "Argon"], a: 1 },
      { q: "Eiffel Tower is in:", options: ["Rome", "London", "Paris", "Berlin"], a: 2 },
      { q: "Year WW2 ended?", options: ["1942", "1945", "1948", "1939"], a: 1 },
      { q: "Hardest natural substance?", options: ["Iron", "Gold", "Diamond", "Quartz"], a: 2 }
    ]
  }
};
// ---------- App State ----------
const TIME_PER_Q = 30; // seconds
const HS_KEY = "quizgen_highscores_v1";
const state = {
  categoryKey: null,
  questions: [],   // randomized for current session
  index: 0,
  score: 0,
  selected: null,  // index of selected option for current q
  answers: [],     // {q, options, correct, picked}
  timer: null,
  timeLeft: TIME_PER_Q,
  locked: false
};
// ---------- DOM helpers ----------
const $ = (sel) => document.querySelector(sel);
const screens = {
  landing: $("#landing"),
  quiz:    $("#quiz"),
  results: $("#results")
};
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderHighscores();
  $("#nextBtn").addEventListener("click", handleNext);
  $("#restartBtn").addEventListener("click", () => startQuiz(state.categoryKey));
  $("#changeCategoryBtn").addEventListener("click", () => {
    showScreen("landing");
    renderHighscores();
  });
});
// ---------- Landing: Categories ----------
function renderCategories() {
  const grid = $("#categoryGrid");
  grid.innerHTML = "";
  Object.entries(QUIZ_DATA).forEach(([key, cat]) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <span class="emoji">${cat.emoji}</span>
      <div class="title">${cat.name}</div>
      <div class="meta">${cat.questions.length} questions • 30s each</div>
    `;
    card.addEventListener("click", () => startQuiz(key));
    grid.appendChild(card);
  });
}
// ---------- Start Quiz ----------
function startQuiz(key) {
  const cat = QUIZ_DATA[key];
  state.categoryKey = key;
  state.questions = shuffle([...cat.questions]); // copy + shuffle
  state.index = 0;
  state.score = 0;
  state.answers = [];
  state.selected = null;
  $("#categoryLabel").textContent = `${cat.emoji} ${cat.name}`;
  showScreen("quiz");
  renderQuestion();
}
// Fisher-Yates shuffle
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
// ---------- Render Question ----------
function renderQuestion() {
  const total = state.questions.length;
  const q = state.questions[state.index];
  state.selected = null;
  state.locked = false;
  $("#questionCounter").textContent = `${state.index + 1} / ${total}`;
  $("#progressBar").style.width = `${(state.index / total) * 100}%`;
  $("#questionText").textContent = q.q;
  $("#nextBtn").disabled = true;
  $("#nextBtn").textContent = state.index === total - 1 ? "Finish ✓" : "Next →";
  // Render options
  const optsWrap = $("#options");
  optsWrap.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectOption(i, btn));
    optsWrap.appendChild(btn);
  });
  startTimer();
}
// ---------- Option Click ----------
function selectOption(i, btn) {
  if (state.locked) return;
  state.locked = true;
  stopTimer();
  const q = state.questions[state.index];
  state.selected = i;
  // Visual feedback
  const buttons = document.querySelectorAll(".option");
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.a) b.classList.add("correct");
    if (idx === i && i !== q.a) b.classList.add("wrong");
  });
  if (i === q.a) state.score++;
  // Record answer
  state.answers.push({
    q: q.q, options: q.options, correct: q.a, picked: i
  });
  $("#nextBtn").disabled = false;
}
// ---------- Next / Finish ----------
function handleNext() {
  if (state.index < state.questions.length - 1) {
    state.index++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}
// ---------- Timer ----------
function startTimer() {
  state.timeLeft = TIME_PER_Q;
  updateTimerUI();
  state.timer = setInterval(() => {
    state.timeLeft--;
    updateTimerUI();
    if (state.timeLeft <= 0) {
      stopTimer();
      // Auto-submit as wrong (no selection)
      const q = state.questions[state.index];
      state.locked = true;
      document.querySelectorAll(".option").forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.a) b.classList.add("correct");
      });
      state.answers.push({
        q: q.q, options: q.options, correct: q.a, picked: -1
      });
      $("#nextBtn").disabled = false;
    }
  }, 1000);
}
function stopTimer() {
  if (state.timer) { clearInterval(state.timer); state.timer = null; }
}
function updateTimerUI() {
  const el = $("#timer");
  el.textContent = `${state.timeLeft}s`;
  el.classList.toggle("warning", state.timeLeft <= 10 && state.timeLeft > 5);
  el.classList.toggle("danger",  state.timeLeft <= 5);
}
// ---------- Finish ----------
function finishQuiz() {
  stopTimer();
  $("#progressBar").style.width = "100%";
  const total = state.questions.length;
  $("#finalScore").textContent = state.score;
  $("#totalScore").textContent = total;
  const pct = (state.score / total) * 100;
  let msg = "Keep practicing — you've got this!";
  if (pct === 100) msg = "Perfect score! Outstanding! 🏆";
  else if (pct >= 80) msg = "Excellent work! 🌟";
  else if (pct >= 60) msg = "Good job — solid performance.";
  else if (pct >= 40) msg = "Not bad — review and try again.";
  $("#scoreMessage").textContent = msg;
  renderReview();
  saveHighscore(state.categoryKey, state.score, total);
  showScreen("results");
}
// ---------- Review ----------
function renderReview() {
  const wrap = $("#review");
  wrap.innerHTML = "";
  state.answers.forEach((a, i) => {
    const isCorrect = a.picked === a.correct;
    const item = document.createElement("div");
    item.className = "review-item" + (isCorrect ? "" : " wrong");
    const pickedText = a.picked === -1 ? "<em>No answer (time up)</em>" : a.options[a.picked];
    item.innerHTML = `
      <div class="q">${i + 1}. ${a.q}</div>
      <div class="a">Your answer: <strong>${pickedText}</strong></div>
      <div class="a">Correct answer: <strong>${a.options[a.correct]}</strong></div>
    `;
    wrap.appendChild(item);
  });
}
// ---------- High Scores (localStorage) ----------
function loadHighscores() {
  try { return JSON.parse(localStorage.getItem(HS_KEY)) || []; }
  catch { return []; }
}
function saveHighscore(categoryKey, score, total) {
  const list = loadHighscores();
  list.push({
    category: QUIZ_DATA[categoryKey].name,
    emoji: QUIZ_DATA[categoryKey].emoji,
    score, total,
    pct: Math.round((score / total) * 100),
    date: new Date().toISOString()
  });
  // Keep top 10 by percentage
  list.sort((a, b) => b.pct - a.pct);
  localStorage.setItem(HS_KEY, JSON.stringify(list.slice(0, 10)));
}
function renderHighscores() {
  const ul = $("#highscoresList");
  const list = loadHighscores();
  if (!list.length) {
    ul.innerHTML = `<li class="empty">No scores yet — be the first!</li>`;
    return;
  }
  ul.innerHTML = list.map(h => `
    <li>
      <span>${h.emoji} ${h.category}</span>
      <span><strong>${h.score}/${h.total}</strong> · ${h.pct}%</span>
    </li>
  `).join("");
}
