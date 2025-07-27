
function getToday() {
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
  return y + "年" + m + "月" + d + "日";
}

function getGua(month) {
  const gua = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];
  const wuxing = { "乾": "金", "兑": "金", "离": "火", "震": "木", "巽": "木", "坎": "水", "艮": "土", "坤": "土" };
  const index = month % 8;
  return { name: gua[index], wuxing: wuxing[gua[index]] };
}

function analyze() {
  const birth = document.getElementById("birthday").value;
  const date = new Date(birth);
  const m = date.getMonth() + 1;
  let result = "命理分析：";

  if ([3, 8].includes(m)) {
    result += " 木旺 → 建议补金/土（多选金属性数字）";
  } else if ([1, 6].includes(m)) {
    result += " 水旺 → 建议补木/土";
  } else if ([4, 9].includes(m)) {
    result += " 火旺 → 建议补水/金";
  } else {
    result += " 中和 → 可全盘选号";
  }

  document.getElementById("wuxing").innerText = result;
}

function generate() {
  const redPool = [2, 5, 8, 10, 12, 16, 18, 22, 25, 28, 30, 33];
  const bluePool = [1, 3, 5, 6, 8, 11, 13, 15];
  const sets = [];

  for (let i = 0; i < 3; i++) {
    let reds = [];
    while (reds.length < 6) {
      const r = redPool[Math.floor(Math.random() * redPool.length)];
      if (!reds.includes(r)) reds.push(r);
    }
    reds.sort((a, b) => a - b);
    const blue = bluePool[Math.floor(Math.random() * bluePool.length)];
    sets.push(`红球：${reds.join(", ")} | 蓝球：${blue}`);
  }

  document.getElementById("numbers").innerHTML = sets.map(n => `<li>${n}</li>`).join("");
}

document.getElementById("today").innerText = "今天是：" + getToday();
const gua = getGua(new Date().getMonth() + 1);
document.getElementById("gua").innerText = `今日卦象：${gua.name}卦，五行属：${gua.wuxing}`;
const todayStr = new Date().toISOString().slice(0, 10); // 2025-07-27
const cacheKey = "ssq_last_generated_date";

function shouldRegenerate() {
  return localStorage.getItem(cacheKey) !== todayStr;
}

function generate() {
  if (!shouldRegenerate()) {
    document.getElementById("numbers").innerHTML = localStorage.getItem("ssq_today_numbers");
    return;
  }

  const redPool = [2, 5, 8, 10, 12, 16, 18, 22, 25, 28, 30, 33];
  const bluePool = [1, 3, 5, 6, 8, 11, 13, 15];
  const sets = [];

  for (let i = 0; i < 3; i++) {
    let reds = [];
    while (reds.length < 6) {
      const r = redPool[Math.floor(Math.random() * redPool.length)];
      if (!reds.includes(r)) reds.push(r);
    }
    reds.sort((a, b) => a - b);
    const blue = bluePool[Math.floor(Math.random() * bluePool.length)];
    sets.push(`红球：${reds.join(", ")} | 蓝球：${blue}`);
  }

  const html = sets.map(n => `<li>${n}</li>`).join("");
  localStorage.setItem("ssq_last_generated_date", todayStr);
  localStorage.setItem("ssq_today_numbers", html);
  document.getElementById("numbers").innerHTML = html;
}

