component: Index,
});
// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  // The quiz app is a self-contained static site under /public/quiz.
  // Render it full-screen via an iframe so it appears at "/".
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#fcfbf8" }}
    >
      <img
        data-lovable-blank-page-placeholder="REMOVE_THIS"
        src="https://cdn.gpteng.co/blank-app-v1.svg"
        alt="Your app will live here!"
      />
    </div>
    <iframe
      src="/quiz/index.html"
      title="Quiz Generator"
      style={{ border: "none", width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
