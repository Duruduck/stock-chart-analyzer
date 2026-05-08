// 지지선/저항선 계산 (로컬 피벗 + 2% 클러스터링)
function calcSR(closes, current){
  const win=5, pivH=[], pivL=[];
  for(let i=win;i<closes.length-win;i++){
    const sl=closes.slice(i-win,i+win+1);
    if(closes[i]===Math.max(...sl)) pivH.push(closes[i]);
    if(closes[i]===Math.min(...sl)) pivL.push(closes[i]);
  }
  const cluster=(arr)=>{
    const sorted=[...new Set(arr)].sort((a,b)=>a-b);
    return sorted.filter((v,i)=>i===0||Math.abs(v-sorted[i-1])/sorted[i-1]>0.02);
  };
  const resistance=cluster(pivH.filter(v=>v>current)).slice(0,3);
  const support=cluster(pivL.filter(v=>v<current)).slice(-3).reverse();
  return{resistance,support};
}
