import { useEffect, useState } from 'react';
import axios from 'axios';

const ArticlesPlan = () => {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get('http://localhost:8000/subs/prices');
    console.log(data);

    setPrices(data);
  };
  return <div>ArticlesPlan</div>;
};

export default ArticlesPlan;
