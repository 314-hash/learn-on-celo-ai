import { useState, useEffect } from 'react';
import { useCelo } from '@celo/react-celo';
import contractABI from '..//../abi/ContentRegistry-ABI.json';

const CONTRACT_ADDRESS = '0x70eb8f655a401064c5f8a45eeed399365b651b82';

interface LearningItem {
  id: string;
  sourceURI: string;
  flashcards: any[];
  quiz: any;
  audio: string;
  timestamp: number;
  processed: boolean;
}

export const useLearningData = () => {
  const { address, kit } = useCelo();
  const [items, setItems] = useState<LearningItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address || !kit) return;
    
    const loadUserContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const contract = new kit.web3.eth.Contract(contractABI as any, CONTRACT_ADDRESS);
        const ids = await contract.methods.getUserContentIds(address).call();
        
        const promises = ids.map(async (id: string) => {
          const content = await contract.methods.getContent(id).call();
          
          let flashcards = [];
          let quiz = {};
          let audio = '';
          
          if (content.processed) {
            try {
              if (content.flashcardsCID) {
                const flashResponse = await fetch(`https://ipfs.io/ipfs/${content.flashcardsCID}`);
                flashcards = await flashResponse.json();
              }
              if (content.quizCID) {
                const quizResponse = await fetch(`https://ipfs.io/ipfs/${content.quizCID}`);
                quiz = await quizResponse.json();
              }
              if (content.audioCID) {
                audio = `https://ipfs.io/ipfs/${content.audioCID}`;
              }
            } catch (fetchError) {
              console.warn('Error fetching IPFS content:', fetchError);
            }
          }
          
          return {
            id,
            sourceURI: content.sourceURI,
            flashcards,
            quiz,
            audio,
            timestamp: Number(content.timestamp),
            processed: content.processed
          };
        });
        
        const results = await Promise.all(promises);
        setItems(results.reverse()); // Show newest first
      } catch (err) {
        console.error('Error loading learning data:', err);
        setError('Failed to load learning data');
      } finally {
        setLoading(false);
      }
    };

    loadUserContent();
  }, [address, kit]);

  const submitContent = async (sourceURI: string) => {
    if (!address || !kit) throw new Error('Wallet not connected');
    
    try {
      const contract = new kit.web3.eth.Contract(contractABI as any, CONTRACT_ADDRESS);
      const tx = await contract.methods.submitContent(sourceURI).send({ from: address });
      return tx;
    } catch (err) {
      console.error('Error submitting content:', err);
      throw err;
    }
  };

  return { items, loading, error, submitContent };
};