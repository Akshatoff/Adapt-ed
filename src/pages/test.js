import { useState } from "react";
import { useRouter } from "next/router";

export default function TestRoute() {
  const [formData, setFormData] = useState({
    hobbies: "",
    interests: "",
    learningStyle: "",
    goals: "",
    timeAvailable: "",
    currentLevel: "",
    preferredSubjects: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      localStorage.setItem("userProfile", JSON.stringify(formData));

      const response = await fetch("/api/study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const studyPlan = await response.json();
        localStorage.setItem("studyPlan", JSON.stringify(studyPlan));
        router.push("/dashboard");
      } else {
        console.error("Failed to generate study plan");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              AdaptED Profile Builder
            </h1>
            <p className="text-gray-600">
              Tell us about yourself to get a personalized study plan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your hobbies?
              </label>
              <textarea
                name="hobbies"
                value={formData.hobbies}
                onChange={handleInputChange}
                placeholder="e.g., reading, gaming, sports, music..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What subjects interest you most?
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="e.g., science, history, art, technology..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you learn best?
              </label>
              <select
                name="learningStyle"
                value={formData.learningStyle}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your learning style</option>
                <option value="visual">
                  Visual (diagrams, charts, images)
                </option>
                <option value="auditory">
                  Auditory (listening, discussions)
                </option>
                <option value="kinesthetic">
                  Kinesthetic (hands-on, practical)
                </option>
                <option value="reading">Reading/Writing</option>
                <option value="mixed">Mixed approach</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your learning goals?
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="e.g., improve grades, prepare for exams, learn new skills..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How much time can you dedicate to studying daily?
              </label>
              <select
                name="timeAvailable"
                value={formData.timeAvailable}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select time available</option>
                <option value="30min">30 minutes</option>
                <option value="1hour">1 hour</option>
                <option value="2hours">2 hours</option>
                <option value="3hours">3+ hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your current academic level?
              </label>
              <select
                name="currentLevel"
                value={formData.currentLevel}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your level</option>
                <option value="middle-school">Middle School</option>
                <option value="high-school">High School</option>
                <option value="college">College</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Your Study Plan...
                </div>
              ) : (
                "Generate My Study Plan"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
