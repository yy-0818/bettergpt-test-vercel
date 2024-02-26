import React, { useState, useEffect } from 'react';
import { retrieveSimilarHistory } from '@utils/embedding';

interface HistoryEntry {
  id: string;
  content: string;
  role: string;
}
interface HistoryModalProps {
  onClose: () => void;
  userId: string;
  sessionId: number;
  query: string;
  currentRole: string;
}
const HistoryModal: React.FC<HistoryModalProps> = ({
  onClose,
  userId,
  sessionId,
  query,
  currentRole,
}) => {
  const [historyData, setHistoryData] = useState<HistoryEntry[] | null>(null); // Set type of historyData
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await retrieveSimilarHistory(userId, sessionId, query);
        setHistoryData(data);
      } catch (error) {
        console.error(error);
        // 这里可以处理错误，例如显示错误信息等
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, sessionId, query]);

  const mostSimilarEntry = React.useMemo(() => {
    // Check if historyData is loaded and not empty
    if (!historyData || historyData.length === 0) {
      return null;
    }

    // Find the most similar entry with distinct content and matching role
    const entryWithDistinctContentAndRole = historyData.find(
      (entry) => entry && entry.content !== query && entry.role === currentRole
    );

    // Return the found entry or null if no such entry exists
    return entryWithDistinctContentAndRole || null;
  }, [historyData, query, currentRole]);
  // console.log(historyData);
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/2 max-w-2xl z-50'>
        <h2 className='text-lg font-semibold mb-4 text-gray-900 dark:text-white'>
          MostSimilarEntry
        </h2>
        {/* Display history data here */}
        {isLoading ? (
          <div>Loading...</div>
        ) : mostSimilarEntry ? (
          <div className='text-lg text-center text-gray-900 dark:text-white mb-4'>
            {mostSimilarEntry.content}
          </div>
        ) : (
          <div className='text-lg text-center text-gray-900 dark:text-white mb-4'>
            No similar history found.
          </div>
        )}
        <button
          onClick={onClose}
          className=' py-2 px-4 bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 rounded text-sm font-medium text-gray-900 dark:text-white'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;
