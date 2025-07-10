import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [studyPlan, setStudyPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    const plan = localStorage.getItem("studyPlan");

    if (profile && plan) {
      setUserProfile(JSON.parse(profile));
      setStudyPlan(JSON.parse(plan));
    } else {
      router.push("/test");
    }
    setIsLoading(false);
  }, [router]);

  const resetProfile = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("studyPlan");
    router.push("/test");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userProfile || !studyPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No study plan found
          </h1>
          <button
            onClick={() => router.push("/test")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Your Personalized Dashboard
              </h1>
              <p className="text-gray-600">
                AI-Generated Study Plan tailored just for you
              </p>
            </div>
            <button
              onClick={resetProfile}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              New Profile
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Learning Style
              </h3>
              <p className="text-gray-600 capitalize">
                {userProfile.learningStyle}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Available Time
              </h3>
              <p className="text-gray-600">{userProfile.timeAvailable}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Academic Level
              </h3>
              <p className="text-gray-600 capitalize">
                {userProfile.currentLevel.replace("-", " ")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Hobbies</h3>
              <p className="text-gray-600">{userProfile.hobbies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your AI-Generated Study Plan
          </h2>

          {studyPlan.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-2">
                Error Generating Plan
              </h3>
              <p className="text-red-600">{studyPlan.error}</p>
              <button
                onClick={resetProfile}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Study Plan Overview
                </h3>
                <div className="prose prose-blue max-w-none">
                  <p className="text-blue-700 leading-relaxed">
                    {studyPlan.overview}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Weekly Schedule
                </h3>
                <div className="grid gap-4">
                  {studyPlan.weeklySchedule &&
                    studyPlan.weeklySchedule.map((day, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">
                          {day.day}
                        </h4>
                        <div className="space-y-2">
                          {day.activities.map((activity, actIndex) => (
                            <div
                              key={actIndex}
                              className="flex items-center justify-between"
                            >
                              <span className="text-gray-600">
                                {activity.subject}
                              </span>
                              <span className="text-sm text-gray-500">
                                {activity.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Recommended Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {studyPlan.resources &&
                    studyPlan.resources.map((resource, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">
                          {resource.type}
                        </h4>
                        <p className="text-green-700 text-sm">
                          {resource.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Personalized Tips
                </h3>
                <div className="bg-yellow-50 rounded-lg p-6">
                  <ul className="space-y-2">
                    {studyPlan.tips &&
                      studyPlan.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-600 mr-2">•</span>
                          <span className="text-yellow-800">{tip}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
