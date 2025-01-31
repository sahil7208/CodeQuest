// import React from 'react';

// const ResetQuestionsButton: React.FC = () => {
//   const handleReset = async () => {
//     try {
//       const response = await fetch('/api/reset', {
//         method: 'POST',
//       });

//       if (response.ok) {
//         alert('Questions updated successfully');
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error('Error resetting questions:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <button
//       onClick={handleReset}
//       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//     >
//       Reset Questions
//     </button>
//   );
// };

// export default ResetQuestionsButton;
