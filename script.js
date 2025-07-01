document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const segments = [
    "Baby G", "Open Sesame", "Nicks", "Due Fiori", "Annatolia",
    "Thunderbolt", "Chiang Rai", "Terrible Baby Bliss", "Sura BBQ", "Thai District"
  ];
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#FF9800",
    "#9C27B0", "#03A9F4", "#E91E63", "#4CAF50", "#FFC107"
  ];

  function drawWheel() {
    const angle = 2 * Math.PI / segments.length;
    for (let i = 0; i < segments.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = colors[i];
      ctx.moveTo(200, 200);
      ctx.arc(200, 200, 200, i * angle, (i + 1) * angle);
      ctx.fill();

      ctx.save();
      ctx.translate(200, 200);
      ctx.rotate(i * angle + angle / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(segments[i], 120, 5);
      ctx.restore();
    }
  }

  drawWheel();

  window.spinWheel = function () {
    const rotation = Math.floor(Math.random() * 360 + 1800);
    const duration = 3000;
    const start = performance.now();
    function animate(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const angle = rotation * progress;
      ctx.save();
      ctx.clearRect(0, 0, 400, 400);
      ctx.translate(200, 200);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.translate(-200, -200);
      drawWheel();
      ctx.restore();
      if (progress < 1) requestAnimationFrame(animate);
      else showResult(rotation);
    }
    requestAnimationFrame(animate);
  };

  function showResult(rotation) {
    const angle = rotation % 360;
    const index = Math.floor(((360 - angle + 90) % 360) / (360 / segments.length));
    const choice = segments[index];
    const driver = Math.random() > 0.5 ? "Kate" : "Ernie";
    const minutes = Math.floor(Math.random() * 30);
    const seconds = Math.floor(Math.random() * 60);
    const time = `${minutes}m ${seconds}s`;
    document.getElementById("result").innerHTML = 
      `🎯 <strong>${choice}</strong><br>🚗 Driver: <strong>${driver}</strong><br>⏱️ Depart in: <strong>${time}</strong>`;
  }
});
