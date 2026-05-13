export default async function handler(req,res){

  const { keyword } = req.query;

  if(!keyword){
    return res.status(400).json({
      error:'keyword required'
    });
  }

  try{

    const url =
      `https://m.stock.naver.com/api/search/all?keyword=${encodeURIComponent(keyword)}&type=stock`;

    const response = await fetch(url,{
      headers:{
        'User-Agent':'Mozilla/5.0'
      }
    });

    const data = await response.json();

    const stocks =
      data?.result?.stocks?.map(v=>({
        code:v.itemCode,
        market:v.market,
        name:v.stockName
      })) || [];

    res.status(200).json({
      stocks
    });

  }catch(e){

    res.status(500).json({
      error:e.message
    });
  }
}
