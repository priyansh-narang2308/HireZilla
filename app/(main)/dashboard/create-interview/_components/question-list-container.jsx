import React from 'react';

const QuestionListContainer = ({ questionList }) => {
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
                ✨ Your AI-Generated Interview Questions
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questionList.map((ques, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 transition-transform hover:scale-[1.02] hover:shadow-xl"
                    >
                        <p className="text-gray-800 font-medium text-lg mb-2">
                            {index + 1}. {ques.question}
                        </p>
                        <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${ques.type === 'Technical'
                                    ? 'bg-blue-100 text-blue-700'
                                    : ques.type === 'Behavioral'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : ques.type === 'Problem Solving'
                                            ? 'bg-purple-100 text-purple-700'
                                            : ques.type === 'Experience'
                                                ? 'bg-pink-100 text-pink-700'
                                                : ques.type === 'Leadership'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            {ques.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionListContainer;
