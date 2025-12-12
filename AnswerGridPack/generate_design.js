document.getElementById("generateBtn").addEventListener("click", () => {
    const count = Number(document.getElementById("questionCount").value);
    const showNumbers = document.getElementById("showNumbers").checked;
    const showOuterBorder = document.getElementById("showOuterBorder").checked;

    const output = document.getElementById("output");
    output.innerHTML = "";

    // 외곽 wrapper
    const outerBox = document.createElement("div");
    outerBox.className = "outer-box";

    if (showOuterBorder) outerBox.classList.add("border"   );
    if (!showNumbers) outerBox.classList.add("no-number");

    const grid = document.createElement("div");
    grid.className = "grid";

    // 셀 생성: 문항 * 2칸(번호,답)
    for (let i = 1; i <= count; i++) {
        const num = document.createElement("div");
        num.className = "cell num";

        const ans = document.createElement("div");
        ans.className = "cell ans";

        grid.appendChild(num);
        grid.appendChild(ans);
    }

    outerBox.appendChild(grid);
    output.appendChild(outerBox);
    });

    //  PDF 다운로드 기능
    document.getElementById("downloadBtn").addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;

    const output = document.getElementById("output");
    if (!output.firstChild) {
        alert("먼저 정오표를 생성하세요.");
        return;
    }

    // DOM → 이미지 캡처
    const canvas = await html2canvas(output.firstChild, {
        scale: 3,      // 고해상도 PDF
        backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

     // 캔버스 px → mm 변환
    const pxToMm = px => px * 0.264583;
    const pdfWidth = pxToMm(canvas.width);
    const pdfHeight = pxToMm(canvas.height);

    // 캔버스 크기 그대로 페이지 사이즈 지정
    const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight]
    });

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("정오표.pdf");
});