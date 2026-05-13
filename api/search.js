export default async function handler(req, res) {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({
        error: 'Query required'
      });
    }

    const url =
      `https://m.stock.naver.com/api/search/all?keyword=${encodeURIComponent(q)}&type=stock`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      return res.status(500).json({
        error: 'Naver API failed'
      });
    }

    const data = await response.json();

    const stocks = data?.stocks || [];

    if (!stocks.length) {
      return res.status(404).json({
        error: 'No stocks found'
      });
    }

    const stock = stocks[0];

    let symbol = stock?.reutersCode || stock?.stockCode;

    if (!symbol) {
      return res.status(404).json({
        error: 'No symbol found'
      });
    }

    // Yahoo 형식 변환
    if (/^\d{6}$/.test(symbol)) {
      symbol += '.KS';
    }

    return res.status(200).json({
      query: q,
      name: stock.stockName,
      symbol
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message
    });
  }
}
