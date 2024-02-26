// import { useState, useEffect } from 'react';
// import { retrieveSimilarHistory } from '@utils/embedding'; // Assuming this is the correct path to your utility function

// export const useSimilarHistory = (
//   userId: string,
//   sessionId: number,
//   isModalOpen: boolean
// ) => {
//   const [historyRecords, setHistoryRecords] = useState<any[]>([]);

//   useEffect(() => {
//     if (!isModalOpen) return;

//     const fetchHistory = async () => {
//       try {
//         // const similarRecords = await retrieveSimilarHistory(userId, sessionId);
//         const similarRecords: SetStateAction<any[]> = null;
//         setHistoryRecords(similarRecords);
//       } catch (error) {
//         console.error('Failed to fetch history records:', error);
//       }
//     };

//     fetchHistory();
//   }, [userId, sessionId, isModalOpen]);

//   return historyRecords;
// };

export {};
