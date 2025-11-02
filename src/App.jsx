import CommentSection from './components/CommentSection'
function App() {
return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          💬 Interactive Comment Section
        </h1>
        <CommentSection />
      </div>
    </div>
  );
}

export default App
