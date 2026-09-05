let currentFunction = "sin";


const functionCanvas = document.getElementById("functionCanvas");


const combinedCanvas =
    document.getElementById(
        "combinedCanvas"
    );




const angleSlider =
    document.getElementById(
        "angleSlider"
    );


const angleInput =
    document.getElementById(
        "angleInput"
    );


const angleDisplay =
    document.getElementById(
        "angleDisplay"
    );


const sinValue =
    document.getElementById(
        "sinValue"
    );


const cosValue =
    document.getElementById(
        "cosValue"
    );


const tanValue =
    document.getElementById(
        "tanValue"
    );


const cotValue =
    document.getElementById(
        "cotValue"
    );


const secValue =
    document.getElementById(
        "secValue"
    );


const cosecValue =
    document.getElementById(
        "cosecValue"
    );


const functionAngle =
    document.getElementById(
        "functionAngle"
    );


const functionAngleInput =
    document.getElementById(
        "functionAngleInput"
    );


const functionTitle =
    document.getElementById(
        "functionTitle"
    );


const functionValue =
    document.getElementById(
        "functionValue"
    );


const functionInfo =
    document.getElementById(
        "functionInfo"
    );


const principalBox =
    document.getElementById(
        "principalBox"
    );


/* =====================================================
   SECTION
   ===================================================== */

function showSection(
    section,
    button
) {

    document
        .querySelectorAll(
            ".page-section"
        )
        .forEach(
            item =>
                item.classList.remove(
                    "active-section"
                )
        );


    document
        .getElementById(section)
        .classList.add(
            "active-section"
        );


    document
        .querySelectorAll(
            ".toolbar button"
        )
        .forEach(
            item =>
                item.classList.remove(
                    "active"
                )
        );


    button.classList.add(
        "active"
    );


    /* Render after the browser has applied display:block. This prevents
       canvases from being measured at 0×0 when a section was previously hidden. */
    const renderSection = () => {
        if (section === "combined") drawCombined();
        if (section === "freecircle") drawFreeCircle();
        if (section === "values") buildValueTables();
        if (section === "formulas") buildFormulaLibrary();
        if (section === "pythagoras") renderPythagoras();

        if (section === "radDerivation") {
        const rad = window.TRIGO_RAD_UI;
        if (rad && typeof rad.render === "function") {
            rad.render();
        } else {
            const nav = document.getElementById("radLessonNav");
            const content = document.getElementById("radLessonContent");
            if (nav) nav.innerHTML = "<div class=\"formula-card\"><strong>Radians module is loading…</strong></div>";
            if (content) content.innerHTML = "<p>Please reload the page once if the module is still loading.</p>";
        }
        }
    };

    requestAnimationFrame(() => {
        renderSection();
        requestAnimationFrame(renderSection);
    });
}


/* =====================================================
   THEME
   ===================================================== */

function setTheme(theme) {

    document.body.classList.remove(
        "theme-black",
        "theme-white"
    );


    if (theme === "black") {

        document.body.classList.add(
            "theme-black"
        );

    }


    if (theme === "white") {

        document.body.classList.add(
            "theme-white"
        );

    }


    drawCombined();


}


/* =====================================================
   MATH
   ===================================================== */

function degToRad(
    degrees
) {

    return degrees *
        Math.PI /
        180;

}


function cleanNumber(
    value
) {

    if (
        !Number.isFinite(value)
    )
        return "undefined";


    if (
        Math.abs(value) <
        0.00001
    )
        return "0";


    return value.toFixed(4);

}


function getFunctionValue(
    func,
    theta
) {

    switch (func) {

        case "sin":
            return Math.sin(theta);

        case "cos":
            return Math.cos(theta);

        case "tan":
            return Math.tan(theta);

        case "cot":
            return 1 / Math.tan(theta);

        case "sec":
            return 1 / Math.cos(theta);

        case "cosec":
            return 1 / Math.sin(theta);

        default:
            return NaN;

    }

}


/* =====================================================
   CANVAS
   ===================================================== */

function setupCanvas(
    canvas
) {

    const rect = canvas.getBoundingClientRect();

    /* Hidden sections can report 0×0 before the first paint. Use a safe
       intrinsic fallback, then the visibility-aware render pass below
       immediately redraws at the real dimensions. */
    const width = Math.max(1, rect.width || canvas.parentElement?.clientWidth || 1000);
    const height = Math.max(1, rect.height || parseFloat(getComputedStyle(canvas).height) || 570);

    const rawDpr = Number(window.devicePixelRatio) || 1;
    const area = width * height;
    const dpr = area > 2000000 ? Math.min(rawDpr, 1.5) : Math.min(rawDpr, 2);

    const pixelWidth = Math.max(1, Math.round(width * dpr));
    const pixelHeight = Math.max(1, Math.round(height * dpr));

    /* Keep the drawing coordinate system in CSS pixels. This is critical
       on large/high-DPI smartboards: math coordinates must not depend on
       the backing-store pixel ratio. */
    if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
    if (canvas.height !== pixelHeight) canvas.height = pixelHeight;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return { ctx: null, width, height, dpr };

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);


    return {

        ctx,

        width,
        height

    };

}


/* =====================================================
   GRID
   ===================================================== */

function drawGrid(
    ctx,
    width,
    height,
    originX,
    originY,
    stepX,
    stepY
) {

    ctx.strokeStyle =
        "#dddddd";

    ctx.lineWidth =
        1;


    for (
        let x =
            originX;
        x <
            width;
        x +=
            stepX
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            height
        );

        ctx.stroke();

    }


    for (
        let x =
            originX - stepX;
        x >
            0;
        x -=
            stepX
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            height
        );

        ctx.stroke();

    }


    for (
        let y =
            originY;
        y <
            height;
        y +=
            stepY
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            width,
            y
        );

        ctx.stroke();

    }


    for (
        let y =
            originY - stepY;
        y >
            0;
        y -=
            stepY
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            width,
            y
        );

        ctx.stroke();

    }


    /* AXES */

    ctx.strokeStyle =
        "#222";

    ctx.lineWidth =
        2;


    ctx.beginPath();

    ctx.moveTo(
        0,
        originY
    );

    ctx.lineTo(
        width,
        originY
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        originX,
        0
    );

    ctx.lineTo(
        originX,
        height
    );

    ctx.stroke();


    /* AXIS LABELS */

    ctx.fillStyle =
        "#222";

    ctx.font =
        "bold 14px Arial";


    ctx.fillText(
        "X",
        width - 22,
        originY - 10
    );


    ctx.fillText(
        "Y",
        originX + 10,
        18
    );

}


/* =====================================================
   UNIT CIRCLE
   ===================================================== */

function drawCombined() {

    const {
        ctx,
        width,
        height
    } =
        setupCanvas(
            combinedCanvas
        );


    ctx.clearRect(
        0,
        0,
        width,
        height
    );
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);


    const cx =
        width / 2;


    const cy =
        height / 2;


    const radius =
        Math.min(
            width,
            height
        ) * .34 * combinedCircleZoom;


    drawGrid(
        ctx,
        width,
        height,
        cx,
        cy,
        radius,
        radius
    );


    /* CIRCLE */

    ctx.strokeStyle =
        "#555";

    ctx.lineWidth =
        2;


    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        radius,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    /* =================================================
       DEGREE NUMBERING
       ================================================= */

    const degreeMarks = [
        0,
        30,
        45,
        60,
        90,
        120,
        135,
        150,
        180,
        210,
        225,
        240,
        270,
        300,
        315,
        330,
        360
    ];


    ctx.fillStyle =
        "#222";

    ctx.font =
        "bold 13px Arial";


    degreeMarks.forEach(
        degree => {

            const rad =
                degToRad(
                    degree
                );


            const x =
                cx +
                Math.cos(rad) *
                radius;


            const y =
                cy -
                Math.sin(rad) *
                radius;


            const labelX =
                cx +
                Math.cos(rad) *
                (radius + 22);


            const labelY =
                cy -
                Math.sin(rad) *
                (radius + 22);


            drawDegreeLabel(ctx, cx, cy, radius, degree);


            /* small tick */

            ctx.strokeStyle =
                "#777";

            ctx.lineWidth =
                1.5;


            ctx.beginPath();

            ctx.moveTo(
                cx +
                Math.cos(rad) *
                (radius - 7),

                cy -
                Math.sin(rad) *
                (radius - 7)
            );


            ctx.lineTo(
                cx +
                Math.cos(rad) *
                (radius + 7),

                cy -
                Math.sin(rad) *
                (radius + 7)
            );


            ctx.stroke();

        }
    );


    /* QUADRANTS */

    ctx.fillStyle =
        "#555";

    ctx.font =
        "bold 22px Arial";


    ctx.fillText(
        "I",
        cx + radius * .62,
        cy - radius * .62
    );


    ctx.fillText(
        "II",
        cx - radius * .75,
        cy - radius * .62
    );


    ctx.fillText(
        "III",
        cx - radius * .80,
        cy + radius * .72
    );


    ctx.fillText(
        "IV",
        cx + radius * .62,
        cy + radius * .72
    );


    /* =================================================
       ANGLE
       ================================================= */

    const angle =
        Number(
            angleSlider.value
        );


    const theta =
        degToRad(
            angle
        );


    const x =
        Math.cos(theta);


    const y =
        Math.sin(theta);


    const px =
        cx + x * radius;


    const py =
        cy - y * radius;


    /* ANGLE ARC */

    ctx.strokeStyle =
        "red";

    ctx.lineWidth =
        3;


    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        radius * .20,
        0,
        -theta,
        true
    );

    ctx.stroke();


    ctx.fillStyle =
        "red";

    ctx.font =
        "bold 17px Arial";


    ctx.fillText(
        "θ",
        cx + 25,
        cy - 12
    );


    /* HYPOTENUSE */

    ctx.strokeStyle =
        "red";

    ctx.lineWidth =
        4;


    ctx.beginPath();

    ctx.moveTo(
        cx,
        cy
    );

    ctx.lineTo(
        px,
        py
    );

    ctx.stroke();


    /* BASE */

    ctx.strokeStyle =
        "blue";

    ctx.setLineDash([
        8,
        6
    ]);


    ctx.beginPath();

    ctx.moveTo(
        cx,
        cy
    );

    ctx.lineTo(
        px,
        cy
    );

    ctx.stroke();


    /* PERPENDICULAR */

    ctx.strokeStyle =
        "green";


    ctx.beginPath();

    ctx.moveTo(
        px,
        cy
    );

    ctx.lineTo(
        px,
        py
    );

    ctx.stroke();


    ctx.setLineDash([]);


    /* POINT */

    ctx.fillStyle =
        "#111";


    ctx.beginPath();

    ctx.arc(
        px,
        py,
        7,
        0,
        Math.PI * 2
    );

    ctx.fill();

    drawCircleAngleReadout(ctx, px, py, radius, angle, cx, cy);


    /* VALUES */

    const values = {

        sin:
            y,

        cos:
            x,

        tan:
            Math.abs(x) < .00001
                ? Infinity
                : y / x,

        cot:
            Math.abs(y) < .00001
                ? Infinity
                : x / y,

        sec:
            Math.abs(x) < .00001
                ? Infinity
                : 1 / x,

        cosec:
            Math.abs(y) < .00001
                ? Infinity
                : 1 / y

    };


    angleDisplay.innerText =
        angle.toFixed(1) +
        "°";


    sinValue.innerText =
        cleanNumber(
            values.sin
        );


    cosValue.innerText =
        cleanNumber(
            values.cos
        );


    tanValue.innerText =
        cleanNumber(
            values.tan
        );


    cotValue.innerText =
        cleanNumber(
            values.cot
        );


    secValue.innerText =
        cleanNumber(
            values.sec
        );


    cosecValue.innerText =
        cleanNumber(
            values.cosec
        );

}


/* =====================================================
   FUNCTION GRAPH
   ===================================================== */

function drawFunction(
    func,
    options = {}
) {

    currentFunction = func;

    if (!functionCanvas)
        return;

    const scroll =
        document.getElementById("waveScroll");

    if (!window.waveZoom)
        window.waveZoom = 1;

    /* Main graph: preserve the principal 0°→360° cycle, but give the
       student a large navigable coordinate plane around it. */
    const normalPPR = 55 * window.waveZoom;
    const normalHeight = Math.max(1100, window.innerWidth <= 800 ? 1100 : 1300);
    const normalWidth = Math.max(
        7200,
        Math.ceil(120 * window.waveZoom + (24 * Math.PI) * normalPPR)
    );
    window.waveCanvasWidth = Math.min(normalWidth, 18000);

    functionCanvas.style.width = window.waveCanvasWidth + "px";
    functionCanvas.style.height = normalHeight + "px";

    const {
        ctx,
        width,
        height
    } = setupCanvas(functionCanvas);

    ctx.clearRect(0, 0, width, height);

    /* Main function graph always works on the principal position.
       Infinite-angle analysis is a separate sub-view so very large angles
       never stretch or destroy the normal graph. */
    const enteredAngle = Number(functionAngleInput?.value);
    const principalAngle = Number.isFinite(enteredAngle)
        ? getPrincipalAngleDegrees(enteredAngle)
        : 0;
    /* Keep 360° visually at the end of the cycle (2π), not at 0. */
    const graphAngle = (Math.abs(principalAngle) < 1e-9 && Math.abs(enteredAngle - 360) < 1e-9)
        ? 360
        : principalAngle;
    const targetTheta = degToRad(graphAngle);
    const pixelsPerRad = 55 * window.waveZoom;
    /* Put the mathematical origin in the middle so both negative and
       positive x-directions can be explored. */
    const originX = width / 2;
    const originY = height / 2;

    /*
       Horizontal zoom controls how many radians fit into the viewport.
       Vertical zoom gives the student more resolution between 0 and 1.
    */
    const yScale = 45 * window.waveZoom;

    /* The principal cycle is still the teaching reference, but the
       coordinate plane itself is navigable in both x directions. */
    const min = -(width / 2 - 90) / pixelsPerRad;
    const max = (width / 2 - 90) / pixelsPerRad;

    /* =================================================
       WAVE GRID + AXES
       ================================================= */

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    /* Horizontal fine grid: 0.1 units at normal zoom,
       finer as the graph is zoomed. */
    let minorYStep =
        window.waveZoom >= 3
            ? 0.02
            : window.waveZoom >= 1.75
                ? 0.05
                : 0.1;

    const yMin =
        Math.floor((-originY) / yScale / minorYStep) * minorYStep;

    const yMax =
        Math.ceil((height - originY) / yScale / minorYStep) * minorYStep;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#edf1f5";

    for (
        let value = yMin;
        value <= yMax + minorYStep / 2;
        value += minorYStep
    ) {
        const py = originY - value * yScale;
        if (py < 0 || py > height)
            continue;

        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
    }

    /* Major horizontal lines every 1 unit. */
    ctx.strokeStyle = "#d7dde5";
    ctx.lineWidth = 1.2;

    for (let value = Math.ceil(yMin); value <= Math.floor(yMax); value++) {
        const py = originY - value * yScale;
        if (py < 0 || py > height)
            continue;

        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
    }

    /* Vertical π-grid. */
    ctx.strokeStyle = "#e3e8ee";
    ctx.lineWidth = 1;

    const firstK = Math.ceil(min / Math.PI);
    const lastK = Math.floor(max / Math.PI);

    for (let k = firstK; k <= lastK; k++) {
        const px = originX + k * Math.PI * pixelsPerRad;

        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
        ctx.stroke();
    }

    /* AXES */
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    ctx.fillStyle = "#222";
    ctx.font = "bold 14px Arial";

    ctx.fillText("X", width - 22, originY - 10);
    ctx.fillText("Y", originX + 10, 18);

    /* =================================================
       X AXIS: RADIANS
       ================================================= */

    /*
       Show ordinary radian coordinates (…, -3, -2, -1, 0, 1, 2, 3, …)
       without flooding the graph with labels. π landmarks are added
       separately only when they have enough room.
    */

    /* X axis: exact π-fraction coordinates.
       At normal zoom show familiar landmarks; as the student zooms in,
       smaller rational multiples such as π/6, 2π/3, 13π/3 appear. */
    const piTicks = buildPiTicks(min, max, window.waveZoom);
    ctx.font = window.waveZoom >= 5 ? "12px Arial" : "13px Arial";
    ctx.textAlign = "center";
    for (const tick of piTicks) {
        const px = originX + tick.value * pixelsPerRad;
        if (px < 12 || px > width - 12) continue;
        ctx.fillStyle = "#222";
        ctx.strokeStyle = "#777";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, originY - 6);
        ctx.lineTo(px, originY + 6);
        ctx.stroke();
        ctx.fillText(tick.label, px, originY + 23);
    }
    ctx.textAlign = "left";


    /* =================================================
       Y AXIS: DENSE DECIMAL + COMMON EXACT VALUES
       ================================================= */

    const labelStep =
        window.waveZoom >= 10
            ? 0.02
            : window.waveZoom >= 7.5
                ? 0.05
                : window.waveZoom >= 5
                    ? 0.1
                    : window.waveZoom >= 3
                        ? 0.25
                        : window.waveZoom >= 1.5
                            ? 0.5
                            : 1;

    const labelStart =
        Math.ceil(yMin / labelStep) * labelStep;

    ctx.font = "12px Arial";

    for (
        let value = labelStart;
        value <= yMax + labelStep / 2;
        value += labelStep
    ) {
        const rounded = Number(value.toFixed(4));
        const py = originY - rounded * yScale;

        if (py < 10 || py > height - 5)
            continue;

        let label =
            Math.abs(rounded) < 0.00001
                ? "0"
                : rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");

        ctx.fillStyle = "#333";
        ctx.fillText(label, originX + 9, py + 4);

        ctx.strokeStyle = "#777";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(originX - 4, py);
        ctx.lineTo(originX + 4, py);
        ctx.stroke();
    }

    /* Common exact unit-circle values. These are shown only when
       they have enough visual room, so the graph remains readable. */
    if (window.waveZoom >= 1.15) {
        const exactMarks = [
            [1, "1"],
            [Math.sqrt(3) / 2, "√3/2"],
            [Math.sqrt(2) / 2, "1/√2"],
            [0.5, "1/2"],
            [-0.5, "−1/2"],
            [-Math.sqrt(2) / 2, "−1/√2"],
            [-Math.sqrt(3) / 2, "−√3/2"],
            [-1, "−1"]
        ];

        ctx.font = "11px Times New Roman";
        ctx.fillStyle = "#466b8a";

        exactMarks.forEach(([value, exact]) => {
            const py = originY - value * yScale;
            if (py < 12 || py > height - 8)
                return;

            ctx.fillText(
                exact,
                originX - 52,
                py + 4
            );
        });
    }

    /* =================================================
       CURVE
       ================================================= */

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    let previousX = null;
    let previousY = null;

    const samples = Math.ceil(width * 1.5);

    for (let i = 0; i <= samples; i++) {
        const px = i / samples * width;
        const t = (px - originX) / pixelsPerRad;
        const value = getFunctionValue(func, t);

        if (!Number.isFinite(value) || Math.abs(value) > 8) {
            previousX = null;
            previousY = null;
            continue;
        }

        const py = originY - value * yScale;

        if (
            previousX === null ||
            Math.abs(py - previousY) > height * .45
        ) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }

        previousX = px;
        previousY = py;
    }

    ctx.stroke();

    /* =================================================
       CURRENT ANGLE + POINT
       ================================================= */

    const angle = Number(functionAngleInput?.value ?? functionAngle.value);
    const principalAngleForGraph = getPrincipalAngleDegrees(angle);
    const graphAngleForPoint = (Math.abs(principalAngleForGraph) < 1e-9 && Math.abs(angle - 360) < 1e-9)
        ? 360
        : principalAngleForGraph;
    const theta = degToRad(graphAngleForPoint);
    const value = getFunctionValue(func, theta);
    const pointX = originX + theta * pixelsPerRad;

    if (
        Number.isFinite(value) &&
        Math.abs(value) <= 8 &&
        pointX >= 0 &&
        pointX <= width
    ) {
        const pointY = originY - value * yScale;

        ctx.strokeStyle = "rgba(255,0,0,.45)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        /* Red dot -> X-axis and red dot -> Y-axis perpendicular guides. */
        ctx.moveTo(pointX, originY);
        ctx.lineTo(pointX, pointY);
        ctx.moveTo(originX, pointY);
        ctx.lineTo(pointX, pointY);
        ctx.stroke();

        ctx.setLineDash([]);

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(pointX, pointY, 7, 0, Math.PI * 2);
        ctx.fill();

        /* Explicit coordinate presentation: perpendicular guide + X label
           on the axis + Y label next to the red point. */
        ctx.fillStyle = "#111";
        ctx.font = "bold 12px Arial";
        const xLabel = formatPiMultiple(theta);
        const yLabel = Number.isFinite(value) ? cleanNumber(value) : "undefined";
        ctx.fillText("x = " + xLabel, Math.max(6, pointX - 24), originY + 38);
        ctx.fillText("y = " + yLabel, Math.min(width - 90, pointX + 10), Math.max(18, pointY - 10));
    }

    functionTitle.innerText = func + "(θ)";
    functionValue.innerText = Number.isFinite(value)
        ? cleanNumber(value)
        : "undefined";

    const allValues = {
        ...SCHOOL_VALUES,
        ...OTHER_VALUES
    };

    const roundedPrincipal = Math.round(principalAngleForGraph);
    let exact = "Not stored";

    if (
        allValues[roundedPrincipal] &&
        Math.abs(principalAngleForGraph - roundedPrincipal) < .01
    ) {
        exact = allValues[roundedPrincipal][func];
    }

    functionInfo.innerHTML =
        "<b>Angle:</b> " + angle.toFixed(2) + "°<br><br>" +
        "<b>Principal angle:</b> " + principalAngleForGraph.toFixed(2).replace(/\.00$/, "") + "°<br><br>" +
        "<b>Numerical value:</b> " +
        (Number.isFinite(value) ? cleanNumber(value) : "undefined") +
        "<br><br><b>Exact value:</b> " + exact +
        "<br><br><b>Relation:</b> " + getRelation(func);

    principalBox.innerHTML = getPrincipalValue(func);

    drawPrincipalRangeUnderline(
        ctx,
        originX,
        originY,
        pixelsPerRad,
        func
    );

    updateInfiniteDetailGraph(func, angle, degToRad(angle), value);

    if (options.centerPoint && scroll) {
        requestAnimationFrame(() => centerWaveOnAngle());
    }

    const zoomLabel = document.getElementById("waveZoomValue");
    if (zoomLabel)
        zoomLabel.innerText = Math.round(window.waveZoom * 100) + "%";
}

/* =====================================================
   PRINCIPAL-RANGE UNDERLINE ON WAVE
   ===================================================== */

function drawPrincipalRangeUnderline(
    ctx,
    originX,
    originY,
    pixelsPerRad,
    func
) {
    const ranges = {
        sin: [[-Math.PI / 2, Math.PI / 2]],
        cos: [[0, Math.PI]],
        tan: [[-Math.PI / 2, Math.PI / 2]],
        cot: [[0, Math.PI]],
        sec: [[0, Math.PI]],
        cosec: [[-Math.PI / 2, Math.PI / 2]]
    };

    const visibleRanges = ranges[func] || [];
    const underlineY = originY + 30;

    ctx.save();
    ctx.strokeStyle = "rgba(120, 200, 255, 0.58)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    visibleRanges.forEach(([a, b]) => {
        const x1 = originX + a * pixelsPerRad;
        const x2 = originX + b * pixelsPerRad;

        ctx.beginPath();
        ctx.moveTo(x1, underlineY);
        ctx.lineTo(x2, underlineY);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, underlineY - 4);
        ctx.lineTo(x1, underlineY + 4);
        ctx.moveTo(x2, underlineY - 4);
        ctx.lineTo(x2, underlineY + 4);
        ctx.stroke();
    });

    ctx.restore();
}

/* =====================================================
   WAVE VIEW / ZOOM CONTROLS
   ===================================================== */

function centerWaveOnAngle() {
    const scroll = document.getElementById("waveScroll");
    if (!scroll || !functionCanvas) return;
    const angle = Number(functionAngleInput?.value ?? functionAngle.value);
    if (!Number.isFinite(angle)) return;
    const principal = getPrincipalAngleDegrees(angle);
    const graphAngle = (Math.abs(principal) < 1e-9 && Math.abs(angle - 360) < 1e-9) ? 360 : principal;
    const theta = degToRad(graphAngle);
    const pixelsPerRad = 55 * (window.waveZoom || 1);
    const originX = functionCanvas.clientWidth / 2;
    const originY = functionCanvas.clientHeight / 2;
    const pointX = originX + theta * pixelsPerRad;
    const value = getFunctionValue(currentFunction, theta);
    const yScale = 45 * (window.waveZoom || 1);
    const pointY = Number.isFinite(value) ? originY - value * yScale : originY;
    const maxLeft = Math.max(0, scroll.scrollWidth - scroll.clientWidth);
    const maxTop = Math.max(0, scroll.scrollHeight - scroll.clientHeight);
    scroll.scrollLeft = Math.max(0, Math.min(maxLeft, pointX - scroll.clientWidth / 2));
    scroll.scrollTop  = Math.max(0, Math.min(maxTop, pointY - scroll.clientHeight / 2));
}

function changeWaveZoom(direction) {
    const oldZoom = window.waveZoom || 1;
    const levels = [0.75, 1, 1.5, 2, 3, 5, 7.5, 10];
    let index = levels.findIndex(v => Math.abs(v - oldZoom) < 0.001);

    if (index < 0)
        index = 1;

    index = Math.max(0, Math.min(levels.length - 1, index + direction));
    window.waveZoom = levels[index];

    drawFunction(currentFunction, { centerPoint: true });
}

function resetWaveZoom() {
    window.waveZoom = 1;
    drawFunction(currentFunction, { centerPoint: true });
}

function getPrincipalAngleDegrees(angle) {
    let p = ((angle % 360) + 360) % 360;
    if (Math.abs(p - 360) < 1e-9) p = 0;
    return p;
}

function updateInfiniteDetailGraph(func, angle, theta, value) {
    const panel = document.getElementById("waveInfiniteDetail");
    const detail = document.getElementById("waveInfiniteDetailCanvas");
    const info = document.getElementById("waveInfiniteInfo");
    const toggle = document.getElementById("waveInfiniteToggle");
    const input = document.getElementById("waveInfiniteAngleInput");
    if (!panel || !detail || !info || !toggle) return;

    if (!toggle.classList.contains("active")) {
        panel.hidden = true;
        return;
    }

    panel.hidden = false;
    const detailAngle = input && Number.isFinite(Number(input.value))
        ? Number(input.value)
        : angle;
    const detailTheta = degToRad(detailAngle);
    const principal = getPrincipalAngleDegrees(detailAngle);
    const principalRad = degToRad(principal);
    const detailValue = getFunctionValue(func, detailTheta);

    if (input && document.activeElement !== input) input.value = detailAngle;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = detail.getBoundingClientRect();
    const w = Math.max(320, Math.round((rect.width || 720) * dpr));
    const h = Math.max(240, Math.round((rect.height || 300) * dpr));
    detail.width = w; detail.height = h;
    const ctx = detail.getContext("2d");
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "#fff"; ctx.fillRect(0,0,w,h);

    const zoom = Math.max(.5, window.infiniteWindowZoom || 1);
    const ppr = 65 * zoom;
    const ys = 50 * zoom;
    const cy = h / 2;
    const cx = w / 2;
    const centerTheta = detailTheta;
    const minT = centerTheta - w / (2 * ppr);
    const maxT = centerTheta + w / (2 * ppr);

    ctx.strokeStyle="#e7ebf0"; ctx.lineWidth=1;
    for (const tick of buildPiTicks(minT,maxT,zoom)) {
        const x = cx + (tick.value-centerTheta)*ppr;
        ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();
        ctx.fillStyle="#344054";ctx.font="12px Arial";ctx.textAlign="center";
        ctx.fillText(tick.label,x,cy+22);
    }
    ctx.textAlign="left";

    for(let y=-2;y<=2;y++){
        const py=cy-y*ys;
        ctx.strokeStyle="#eef1f4";ctx.beginPath();ctx.moveTo(0,py);ctx.lineTo(w,py);ctx.stroke();
        ctx.fillStyle="#475467";ctx.fillText(String(y),6,py-3);
    }
    ctx.strokeStyle="#222";ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(w,cy);ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx,0);ctx.lineTo(cx,h);ctx.stroke();

    ctx.strokeStyle="#111";ctx.lineWidth=2.5;ctx.beginPath();
    let prev=null;
    const samples=Math.ceil(w*1.4);
    for(let i=0;i<=samples;i++){
        const px=i/samples*w;
        const t=centerTheta+(px-cx)/ppr;
        const v=getFunctionValue(func,t);
        if(!Number.isFinite(v)||Math.abs(v)>8){prev=null;continue;}
        const py=cy-v*ys;
        if(prev===null||Math.abs(py-prev.y)>h*.45)ctx.moveTo(px,py);else ctx.lineTo(px,py);
        prev={x:px,y:py};
    }
    ctx.stroke();

    if(Number.isFinite(detailValue)){
        const px=cx, py=cy-detailValue*ys;
        ctx.strokeStyle="rgba(255,0,0,.5)";ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(px,cy);ctx.lineTo(px,py);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle="red";ctx.beginPath();ctx.arc(px,py,7,0,Math.PI*2);ctx.fill();
    }

    const cycles = Math.floor(detailAngle / 360);
    const piEntered = formatPiMultiple(detailTheta);
    const piPrincipal = formatPiMultiple(principalRad);
    const delta = detailAngle - principal;

    info.innerHTML =
      `<b>Entered angle:</b> ${Number(detailAngle).toFixed(2).replace(/\.00$/,'')}°` +
      `<br><b>Entered radian:</b> ${piEntered}` +
      `<br><b>Principal angle:</b> ${principal.toFixed(2).replace(/\.00$/,'')}° (${piPrincipal})` +
      `<br><b>Principal position:</b> ${piPrincipal}` +
      `<br><b>Extra full turns:</b> ${cycles}` +
      `<br><b>Difference from principal:</b> ${delta.toFixed(2).replace(/\.00$/,'')}°` +
      `<br><b>${func}(θ):</b> ${Number.isFinite(detailValue) ? cleanNumber(detailValue) : "undefined"}` +
      `<br><b>Coordinate:</b> (${piEntered}, ${Number.isFinite(detailValue) ? cleanNumber(detailValue) : "undefined"})`;
}

function resetGraphViews() {
    /* This is deliberately limited to graph/view state only. */
    currentFunction = "sin";

    if (angleSlider) angleSlider.value = 0;
    if (angleInput) angleInput.value = 0;

    if (functionAngle) functionAngle.value = 0;
    if (functionAngleInput) functionAngleInput.value = 0;

    if (freeAngleInput) freeAngleInput.value = 0;
    if (freeAngleSlider) freeAngleSlider.value = 0;

    window.waveZoom = 1;
    window.waveCanvasWidth = 2600;
    combinedCircleZoom = 1;
    freeCircleZoom = 1;
    const infiniteToggle = document.getElementById("waveInfiniteToggle");
    if (infiniteToggle) {
        infiniteToggle.classList.remove("active");
        infiniteToggle.setAttribute("aria-expanded", "false");
    }
    const infiniteWindow = document.getElementById("infiniteAngleWindow");
    if (infiniteWindow) {
        infiniteWindow.hidden = true;
        infiniteWindow.classList.remove("infinite-window-fullscreen");
    }
    window.infiniteWindowPanX = 0;
    window.infiniteWindowPanY = 0;
    window.infiniteWindowZoom = 1;
    const infiniteInput = document.getElementById("waveInfiniteAngleInput");
    if (infiniteInput) infiniteInput.value = 0;

    if (functionAngleInput) {
        functionAngleInput.setAttribute("min", "0");
        functionAngleInput.setAttribute("max", "360");
        functionAngleInput.value = 0;
    }
    const infinitePanel = document.getElementById("waveInfiniteDetail");
    if (infinitePanel) infinitePanel.hidden = true;

    drawCombined();
    drawFreeCircle();
    drawFunction("sin", { centerPoint: true });
}

/* =====================================================
   MOUSE / TOUCH FRIENDLY HORIZONTAL DRAG
   ===================================================== */

(function enableWaveDragging() {

    const scroll =
        document.getElementById(
            "waveScroll"
        );

    if (!scroll)
        return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let startScrollTop = 0;

    scroll.addEventListener("pointerdown", function (event) {
        dragging = true;
        startX = event.clientX;
        startY = event.clientY;
        startScroll = scroll.scrollLeft;
        startScrollTop = scroll.scrollTop;
        scroll.setPointerCapture(event.pointerId);
    });

    scroll.addEventListener("pointermove", function (event) {
        if (!dragging)
            return;

        scroll.scrollLeft =
            startScroll -
            (event.clientX - startX);

        scroll.scrollTop =
            startScrollTop -
            (event.clientY - startY);
    });

    function stopDragging() {
        dragging = false;
    }

    scroll.addEventListener("pointerup", stopDragging);
    scroll.addEventListener("wheel", function (event) {
        const canScrollVertically =
            scroll.scrollHeight > scroll.clientHeight;

        const canScrollHorizontally =
            scroll.scrollWidth > scroll.clientWidth;

        if (event.shiftKey && canScrollHorizontally) {
            scroll.scrollLeft += event.deltaY;
            event.preventDefault();
            return;
        }

        if (canScrollVertically) {
            scroll.scrollTop += event.deltaY;
            event.preventDefault();
        }
    }, { passive: false });

    scroll.addEventListener("pointercancel", stopDragging);
    scroll.addEventListener("pointerleave", stopDragging);

    /* Shift + mouse wheel gives horizontal movement */
    scroll.addEventListener("wheel", function (event) {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            scroll.scrollLeft += event.deltaY;
        }
    }, { passive: true });

})();

/* =====================================================
   RELATIONS
   ===================================================== */

function getRelation(
    func
) {

    if (func === "sin")
        return renderMathFractions("sin θ = 1 / cosec θ &nbsp;&nbsp; ⇄ &nbsp;&nbsp; cosec θ = 1 / sin θ");

    if (func === "cos")
        return renderMathFractions("cos θ = 1 / sec θ &nbsp;&nbsp; ⇄ &nbsp;&nbsp; sec θ = 1 / cos θ");

    if (func === "tan")
        return renderMathFractions("tan θ = 1 / cot θ &nbsp;&nbsp; ⇄ &nbsp;&nbsp; cot θ = 1 / tan θ");

    if (func === "cot")
        return renderMathFractions("cot θ = 1 / tan θ &nbsp;&nbsp; ⇄ &nbsp;&nbsp; tan θ = 1 / cot θ");

    if (func === "sec")
        return renderMathFractions("sec θ = 1 / cos θ &nbsp;&nbsp; ⇄ &nbsp;&nbsp; cos θ = 1 / sec θ");

    if (func === "cosec")
        return renderMathFractions("cosec θ = 1 / sin θ &nbsp;&nbsp; ⇄ &nbsp;&nbsp; sin θ = 1 / cosec θ");

}


/* =====================================================
   PRINCIPAL VALUES
   ===================================================== */

function getPrincipalValue(
    func
) {

    const values = {

        sin:
            "sin⁻¹x : −<span class=\"pv-frac\"><span>π</span><span>2</span></span> ≤ y ≤ <span class=\"pv-frac\"><span>π</span><span>2</span></span>",

        cos:
            "cos⁻¹x : 0 ≤ y ≤ π",

        tan:
            "tan⁻¹x : −<span class=\"pv-frac\"><span>π</span><span>2</span></span> &lt; y &lt; <span class=\"pv-frac\"><span>π</span><span>2</span></span>",

        cot:
            "cot⁻¹x : 0 &lt; y &lt; π",

        sec:
            "sec⁻¹x : 0 ≤ y ≤ π, y ≠ <span class=\"pv-frac\"><span>π</span><span>2</span></span>",

        cosec:
            "cosec⁻¹x : −<span class=\"pv-frac\"><span>π</span><span>2</span></span> ≤ y ≤ <span class=\"pv-frac\"><span>π</span><span>2</span></span>, y ≠ 0"

    };


    return (
        "<b>Principal Value Range:</b><br>" +
        renderMathFractions(values[func])
    );

}


/* =====================================================
   FUNCTION SELECT
   ===================================================== */

function selectFunction(
    func
) {

    currentFunction =
        func;

    drawFunction(
        func,
        { centerPoint: true }
    );

}


/* =====================================================
   SLIDERS
   ===================================================== */

if (angleSlider && angleInput) angleSlider.addEventListener(
    "input",
    function () {
        angleInput.value = angleSlider.value;
        drawCombined();
    }
);


if (angleInput && angleSlider) angleInput.addEventListener(
    "input",
    function () {

        let value =
            Number(
                angleInput.value
            );


        if (
            !Number.isFinite(value)
        )
            return;


        value =
            Math.max(
                0,
                Math.min(
                    360,
                    value
                )
            );


        angleSlider.value =
            value;

        drawCombined();

    }
);


if (functionAngle && functionAngleInput) {
    functionAngle.addEventListener(
        "input",
        function () {
            functionAngleInput.value = functionAngle.value;
            drawFunction(currentFunction, { centerPoint: true });
            drawFreeCircle();
        }
    );

    functionAngleInput.addEventListener(
        "input",
        function () {
            let value = Number(functionAngleInput.value);
            if (!Number.isFinite(value)) return;
            value = Math.max(0, Math.min(360, value));
            functionAngleInput.value = value;
            functionAngle.value = value;
            drawFreeCircle();
        }
    );
}


/* =====================================================
   INFINITE ANGLE — SEPARATE MOVABLE FOLDER WINDOW
   ===================================================== */

function ensureInfiniteAngleWindow() {
    let win = document.getElementById("infiniteAngleWindow");
    if (win) return win;

    win = document.createElement("div");
    win.id = "infiniteAngleWindow";
    win.className = "infinite-angle-window";
    win.hidden = true;
    win.innerHTML = `
        <div class="infinite-window-bar" data-drag-handle>
            <strong>∞ Infinite angle</strong>
            <div class="infinite-window-actions">
                <button type="button" id="maximizeInfiniteAngle" aria-label="Full screen">⛶</button>
                <button type="button" id="closeInfiniteAngle" aria-label="Close">×</button>
            </div>
        </div>
        <div class="infinite-window-body">
            <div class="infinite-window-input">
                <label for="infiniteWindowAngleInput">Angle</label>
                <input id="infiniteWindowAngleInput" type="number" step="any" value="0">
                <span>degrees</span>
            </div>

            <div class="infinite-window-tools">
                <button type="button" id="infiniteZoomOut">−</button>
                <button type="button" id="infiniteZoomIn">+</button>
                <button type="button" id="infiniteZoomReset">Reset zoom</button>
                <span id="infiniteZoomValue">100%</span>
            </div>
            <div class="infinite-window-graph">
                <canvas id="infiniteWindowCanvas"></canvas>
            </div>

            <div class="wave-mobile-controller"
                 data-wave-controller="infinite-window"
                 aria-label="Infinite angle graph movement controls">
                <div class="wave-pad">
                    <button type="button" data-wave-dir="up">↑</button>
                    <button type="button" data-wave-dir="left">←</button>
                    <button type="button" data-wave-dir="right">→</button>
                    <button type="button" data-wave-dir="down">↓</button>
                </div>
                <label class="wave-speed">
                    <span>Speed <b data-wave-speed-value>5</b></span>
                    <input data-wave-speed type="range" min="1" max="20" value="5" step="1">
                </label>
            </div>

            <div id="infiniteWindowInfo" class="wave-infinite-info"></div>
        </div>
    `;

    document.body.appendChild(win);

    document.getElementById("closeInfiniteAngle").addEventListener("click", () => {
        win.hidden = true;
    });
    document.getElementById("maximizeInfiniteAngle").addEventListener("click", () => {
        win.classList.toggle("infinite-window-fullscreen");
    });
    document.getElementById("infiniteZoomIn").addEventListener("click", () => {
        window.infiniteWindowZoom = Math.min(8, (window.infiniteWindowZoom || 1) * 1.35);
        const z = document.getElementById("infiniteZoomValue");
        if (z) z.textContent = Math.round(window.infiniteWindowZoom * 100) + "%";
        updateInfiniteWindowGraph(currentFunction, Number(input.value || 0));
    });
    document.getElementById("infiniteZoomOut").addEventListener("click", () => {
        window.infiniteWindowZoom = Math.max(.5, (window.infiniteWindowZoom || 1) / 1.35);
        const z = document.getElementById("infiniteZoomValue");
        if (z) z.textContent = Math.round(window.infiniteWindowZoom * 100) + "%";
        updateInfiniteWindowGraph(currentFunction, Number(input.value || 0));
    });
    document.getElementById("infiniteZoomReset").addEventListener("click", () => {
        window.infiniteWindowZoom = 1;
        const z = document.getElementById("infiniteZoomValue");
        if (z) z.textContent = "100%";
        window.infiniteWindowPanX = 0;
        window.infiniteWindowPanY = 0;
        updateInfiniteWindowGraph(currentFunction, Number(input.value || 0));
    });

    const input = document.getElementById("infiniteWindowAngleInput");
    input.addEventListener("input", () => {
        const n = Number(input.value);
        if (!Number.isFinite(n)) return;
        window.infiniteWindowPanX = 0;
        window.infiniteWindowPanY = 0;
        updateInfiniteWindowGraph(currentFunction, n);
    });

    /* Drag the folder/window on desktop. */
    const handle = win.querySelector("[data-drag-handle]");
    let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
    handle.addEventListener("pointerdown", e => {
        dragging = true;
        sx = e.clientX; sy = e.clientY;
        sl = win.offsetLeft; st = win.offsetTop;
        if (handle.setPointerCapture) handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener("pointermove", e => {
        if (!dragging) return;
        win.style.left = Math.max(0, sl + e.clientX - sx) + "px";
        win.style.top = Math.max(0, st + e.clientY - sy) + "px";
        win.style.right = "auto";
        win.style.bottom = "auto";
    });
    ["pointerup","pointercancel","lostpointercapture"].forEach(ev =>
        handle.addEventListener(ev, () => dragging = false)
    );

    /* Bind controller locally because this window is created dynamically. */
    const controller = win.querySelector('[data-wave-controller="infinite-window"]');
    const speedInput = controller.querySelector("[data-wave-speed]");
    const speedValue = controller.querySelector("[data-wave-speed-value]");
    const active = new Set();
    let raf = null, last = 0;

    function speed() { return Number(speedInput.value || 5); }
    speedInput.addEventListener("input", () => {
        speedValue.textContent = String(speed());
    });

    function step(now) {
        if (!active.size) { raf = null; last = 0; return; }
        const dt = last ? Math.min(40, now - last) : 16;
        last = now;
        const amount = speed() * dt / 16;
        let dx = 0, dy = 0;
        if (active.has("left")) dx -= amount;
        if (active.has("right")) dx += amount;
        if (active.has("up")) dy -= amount;
        if (active.has("down")) dy += amount;

        window.infiniteWindowPanX = (window.infiniteWindowPanX || 0) + dx;
        window.infiniteWindowPanY = (window.infiniteWindowPanY || 0) + dy;

        const n = Number(input.value || 0);
        updateInfiniteWindowGraph(currentFunction, n);
        raf = requestAnimationFrame(step);
    }

    controller.querySelectorAll("[data-wave-dir]").forEach(btn => {
        const dir = btn.dataset.waveDir;
        const startMove = e => {
            e.preventDefault();
            btn.setPointerCapture?.(e.pointerId);
            active.add(dir);
            if (!raf) raf = requestAnimationFrame(step);
        };
        const stopMove = () => {
            active.delete(dir);
            if (!active.size && raf) {
                cancelAnimationFrame(raf);
                raf = null; last = 0;
            }
        };
        btn.addEventListener("pointerdown", startMove);
        btn.addEventListener("pointerup", stopMove);
        btn.addEventListener("pointercancel", stopMove);
        btn.addEventListener("lostpointercapture", stopMove);
    });

    return win;
}

function openInfiniteAngleWindow() {
    const win = ensureInfiniteAngleWindow();
    win.hidden = false;
    win.style.left = "";
    win.style.top = "";
    win.style.right = "24px";
    win.style.bottom = "24px";

    const input = document.getElementById("infiniteWindowAngleInput");
    const main = Number(functionAngleInput?.value);
    input.value = Number.isFinite(main) ? main : 0;

    window.infiniteWindowPanX = 0;
    window.infiniteWindowPanY = 0;
    window.infiniteWindowZoom = 1;
    const z = document.getElementById("infiniteZoomValue");
    if (z) z.textContent = "100%";
    updateInfiniteWindowGraph(currentFunction, Number(input.value));
}

function updateInfiniteWindowGraph(func, angle) {
    const canvas = document.getElementById("infiniteWindowCanvas");
    const info = document.getElementById("infiniteWindowInfo");
    if (!canvas || !info) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    /* Independent infinite-world canvas. It is deliberately larger than
       its viewport so X/Y panning is real and never tied to the main graph. */
    const worldW = 3600;
    const worldH = 1600;
    const w = worldW;
    const h = worldH;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = worldW + "px";
    canvas.style.height = worldH + "px";

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,w,h);

    const theta = degToRad(angle);
    const principal = getPrincipalAngleDegrees(angle);
    const principalTheta = degToRad(principal);
    const value = getFunctionValue(func, theta);

    const zoom = Math.max(0.5, window.infiniteWindowZoom || 1);
    const ppr = 65 * zoom;
    const ys = 50 * zoom;
    const cx = w / 2 + Number(window.infiniteWindowPanX || 0);
    const cy = h / 2 + Number(window.infiniteWindowPanY || 0);

    const minT = theta - w/(2*ppr);
    const maxT = theta + w/(2*ppr);

    for (const tick of buildPiTicks(minT,maxT,zoom)) {
        const x = cx + (tick.value-theta)*ppr;
        if(x < -20 || x > w+20) continue;
        ctx.strokeStyle="#e7ebf0";
        ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();
        ctx.fillStyle="#344054";
        ctx.font="12px Arial";
        ctx.textAlign="center";
        ctx.fillText(tick.label,x,cy+22);
    }

    for(let y=-2;y<=2;y++){
        const py=cy-y*ys;
        if(py<0||py>h) continue;
        ctx.strokeStyle="#eef1f4";
        ctx.beginPath();ctx.moveTo(0,py);ctx.lineTo(w,py);ctx.stroke();
        ctx.fillStyle="#475467";
        ctx.textAlign="left";
        ctx.fillText(String(y),6,py-3);
    }

    ctx.strokeStyle="#222";ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(w,cy);ctx.stroke();

    ctx.strokeStyle="#111";ctx.lineWidth=2.5;ctx.beginPath();
    let prev=null;
    const samples=Math.ceil(w*1.4);
    for(let i=0;i<=samples;i++){
        const px=i/samples*w;
        const t=theta+(px-cx)/ppr;
        const v=getFunctionValue(func,t);
        if(!Number.isFinite(v)||Math.abs(v)>8){prev=null;continue;}
        const py=cy-v*ys;
        if(prev===null||Math.abs(py-prev.y)>h*.45)ctx.moveTo(px,py);
        else ctx.lineTo(px,py);
        prev={x:px,y:py};
    }
    ctx.stroke();

    if(Number.isFinite(value)){
        const px=cx, py=cy-value*ys;
        ctx.strokeStyle="rgba(255,0,0,.45)";
        ctx.lineWidth=1.5;
        ctx.setLineDash([5,5]);
        // Red dot -> X-axis and red dot -> Y-axis, both perpendicular.
        ctx.beginPath();
        ctx.moveTo(px,cy); ctx.lineTo(px,py);
        ctx.moveTo(0,py);  ctx.lineTo(px,py);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle="red";
        ctx.beginPath();ctx.arc(px,py,7,0,Math.PI*2);ctx.fill();
        ctx.fillStyle="#111";
        ctx.font="bold 12px Arial";
        ctx.textAlign="left";
        ctx.fillText("x = " + piEntered, Math.max(8,px-28), Math.min(h-8,cy+30));
        ctx.fillText("y = " + (Number.isFinite(value) ? cleanNumber(value) : "undefined"), Math.min(w-100,px+10), Math.max(18,py-10));
    }

    const piEntered = formatPiMultiple(theta);
    const piPrincipal = formatPiMultiple(principalTheta);
    const turns = Math.floor(angle / 360);

    const sinV = Math.sin(principalTheta);
    const cosV = Math.cos(principalTheta);
    const tanV = Math.abs(cosV) < 1e-10 ? Infinity : sinV / cosV;
    const cotV = Math.abs(sinV) < 1e-10 ? Infinity : cosV / sinV;
    const secV = Math.abs(cosV) < 1e-10 ? Infinity : 1 / cosV;
    const cscV = Math.abs(sinV) < 1e-10 ? Infinity : 1 / sinV;
    const fmt = v => Number.isFinite(v) ? cleanNumber(v) : "undefined";

    info.innerHTML =
        `<div class="coord-block"><b>Entered angle</b><div>${cleanAngleText(angle)}° = ${piEntered}</div></div>` +
        `<div class="coord-block"><b>Principal value</b><div>${cleanAngleText(principal)}° = ${piPrincipal}</div></div>` +
        `<div class="coord-block"><b>Principal position</b><div>${piPrincipal}</div></div>` +
        `<div class="coord-block"><b>Full turns</b><div>${turns}</div></div>` +
        `<div class="coord-block xy-block"><b>X coordinate</b><div>${fmt(cosV)}</div></div>` +
        `<div class="coord-block xy-block"><b>Y coordinate</b><div>${fmt(sinV)}</div></div>` +
        `<div class="coord-block"><b>Trigonometric values at principal position</b>` +
        `<div class="trig-values-grid">` +
        `<span>sin = ${fmt(sinV)}</span><span>cos = ${fmt(cosV)}</span>` +
        `<span>tan = ${fmt(tanV)}</span><span>cot = ${fmt(cotV)}</span>` +
        `<span>sec = ${fmt(secV)}</span><span>cosec = ${fmt(cscV)}</span>` +
        `</div></div>` +
        `<div class="coord-block"><b>${func}(θ) at entered angle</b><div>${Number.isFinite(value) ? cleanNumber(value) : "undefined"}</div></div>`;

    // Keep the actual red dot at the viewport centre when the infinite graph
    // is first rendered or its angle is changed. This is independent from the
    // main graph's scroll/zoom state.
    requestAnimationFrame(function(){
        const box=document.querySelector(".infinite-window-graph");
        if(box){
            box.scrollLeft=Math.max(0,cx-box.clientWidth/2);
            box.scrollTop=Math.max(0,cy-box.clientHeight/2);
        }
    });
}

function cleanAngleText(n) {
    return Number(n).toFixed(4).replace(/\.?0+$/,"");
}

/* Infinite angle is a separate folder/window; it never changes the normal graph. */
const waveInfiniteToggle = document.getElementById("waveInfiniteToggle");
if (waveInfiniteToggle) {
    waveInfiniteToggle.addEventListener("click", openInfiniteAngleWindow);
}

/* =====================================================
   TABLES
   ===================================================== */

function renderValueFraction(value) {
    const text = String(value ?? "").trim();

    if (
        !text ||
        text === "undefined" ||
        !text.includes("/")
    ) {
        return text;
    }

    const slashIndex = text.indexOf("/");

    if (slashIndex <= 0 || slashIndex >= text.length - 1) {
        return text;
    }

    const numerator = text.slice(0, slashIndex).trim();
    const denominator = text.slice(slashIndex + 1).trim();

    return `
        <span class="math-fraction value-fraction">
            <span class="math-fraction-top">${numerator}</span>
            <span class="math-fraction-bar"></span>
            <span class="math-fraction-bottom">${denominator}</span>
        </span>`;
}


function buildValueTables() {

    const schoolTable =
        document.getElementById(
            "schoolTable"
        );


    const otherTable =
        document.getElementById(
            "otherTable"
        );


    schoolTable.innerHTML =
        "";


    otherTable.innerHTML =
        "";


    Object.keys(
        SCHOOL_VALUES
    )
    .forEach(
        angle => {

            const v =
                SCHOOL_VALUES[
                    angle
                ];


            schoolTable.innerHTML += `

                <tr>

                    <td>${angle}°</td>

                    <td>${renderValueFraction(v.sin)}</td>

                    <td>${renderValueFraction(v.cos)}</td>

                    <td>${renderValueFraction(v.tan)}</td>

                    <td>${renderValueFraction(v.cot)}</td>

                    <td>${renderValueFraction(v.sec)}</td>

                    <td>${renderValueFraction(v.cosec)}</td>

                </tr>

            `;

        }
    );


    Object.keys(
        OTHER_VALUES
    )
    .forEach(
        angle => {

            const v =
                OTHER_VALUES[
                    angle
                ];


            otherTable.innerHTML += `

                <tr>

                    <td>${angle}°</td>

                    <td>${renderValueFraction(v.sin)}</td>

                    <td>${renderValueFraction(v.cos)}</td>

                    <td>${renderValueFraction(v.tan)}</td>

                    <td>${renderValueFraction(v.cot)}</td>

                    <td>${renderValueFraction(v.sec)}</td>

                    <td>${renderValueFraction(v.cosec)}</td>

                </tr>

            `;

        }
    );

}


/* =====================================================
   FORMULAS
   ===================================================== */

function buildFormulaLibrary() {

    fillFormula(
        "basicFormulas",
        FORMULAS.basic
    );


    fillFormula(
        "identityFormulas",
        FORMULAS.identities
    );


    fillFormula(
        "additionFormulas",
        FORMULAS.addition
    );


    fillFormula(
        "reciprocalFormulas",
        FORMULAS.reciprocal
    );


    fillFormula(
        "inverseFormulas",
        FORMULAS.inverse
    );


    fillFormula(
        "principalFormulas",
        FORMULAS.principal
    );

}


function renderMathFractions(text) {

    let html = String(text ?? "");
    const saved = [];

    function save(markup) {
        const token = `__MATH_FRACTION_${saved.length}__`;
        saved.push(markup);
        return token;
    }

    function fraction(numerator, denominator, extraClass = "") {
        return `
            <span class="math-fraction ${extraClass}">
                <span class="math-fraction-top">${numerator}</span>
                <span class="math-fraction-bar"></span>
                <span class="math-fraction-bottom">${denominator}</span>
            </span>`;
    }

    /* Long fractions first so their inner / characters are not processed again. */
    html = html.replace(
        /\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g,
        (_, n, d) => save(fraction(n, d, "math-fraction-wide"))
    );

    html = html.replace(
        /(tan A\s*[+−-]\s*tan B)\s*\/\s*(1\s*[+−-]\s*tan A\s*tan B)/g,
        (_, n, d) => save(fraction(n, d, "math-fraction-wide"))
    );

    /* Basic trig ratios: P/H, B/H, P/B, B/P, H/B, H/P.
       Keep the original text/data untouched; only render the slash
       as a school-style vertical fraction in the Formula Library. */
    html = html.replace(
        /\b(P|B|H)\s*\/\s*(P|B|H)\b/g,
        (_, n, d) => save(fraction(n, d))
    );

    /* Function-ratio forms: sin θ / cos θ, 1 / cos θ, etc. */
    html = html.replace(
        /\b(sin|cos|tan|cot|sec|cosec)\s*θ\s*\/\s*(sin|cos|tan|cot|sec|cosec)\s*θ/g,
        (_, a, b) => save(fraction(`${a} θ`, `${b} θ`))
    );

    html = html.replace(
        /\b(1)\s*\/\s*(sin|cos|tan|cot|sec|cosec)\s*θ/g,
        (_, a, b) => save(fraction(a, `${b} θ`))
    );

    /* Coefficient-of-π fractions such as 37π/180. */
    html = html.replace(
        /([−-]?\d+(?:\.\d+)?π|−π|π)\s*\/\s*(\d+(?:\.\d+)?)/g,
        (_, n, d) => save(fraction(n, d, "math-fraction-wide"))
    );

    /* Common trig/Pythagoras/radian fractions. */
    html = html.replace(
        /(sin²θ|cos²θ|tan²θ|cot²θ|sec²θ|cosec²θ|P²|B²|H²|sin θ|cos θ|tan θ|cot θ|sec θ|cosec θ|√3|√2|−π|π|−1|1)\s*\/\s*(sin²θ|cos²θ|tan²θ|cot²θ|sec²θ|cosec²θ|P²|B²|H²|sin θ|cos θ|tan θ|cot θ|sec θ|cosec θ|√3|√2|π|180|1|2|4|8|12|16|24|32)/g,
        (_, n, d) => save(fraction(n, d))
    );

    /* Restore placeholders. */
    saved.forEach((markup, i) => {
        html = html.replace(`__MATH_FRACTION_${i}__`, markup);
    });

    return html;
}


function fillFormula(
    id,
    formulas
) {

    const container =
        document.getElementById(id);

    if (!container)
        return;

    container.innerHTML = "";

    /* Principal Values intentionally stay in their original
       plain p/q text format. They do NOT use the global
       vertical-fraction renderer. */
    if (
        id === "principalFormulas" ||
        id === "principal" ||
        id === "principal-values"
    ) {

        formulas.forEach(
            formula => {

                const div =
                    document.createElement("div");

                div.className =
                    "formula-line";

                div.textContent =
                    formula;

                container.appendChild(div);

            }
        );

        return;
    }

    formulas.forEach(
        formula => {

            const div =
                document.createElement("div");

            div.className =
                "formula-line";

            /* Every educational fraction in the Formula Library uses
               the same vertical, school-style numerator/denominator format. */
            div.innerHTML =
                renderMathFractions(formula);

            container.appendChild(div);

        }
    );

}



/* =====================================================
   ANY-ANGLE UNIT CIRCLE
   ===================================================== */

const freeCircleCanvas =
    document.getElementById(
        "freeCircleCanvas"
    );

const freeAngleInput =
    document.getElementById(
        "freeAngleInput"
    );

const freeAngleSlider =
    document.getElementById(
        "freeAngleSlider"
    );

let combinedCircleZoom = 1;
let freeCircleZoom = 1;

/* Circle zoom is intentionally independent from panel resizing. */
function changeCircleZoom(which, direction) {
    const step = 0.1;
    if (which === "combined") {
        combinedCircleZoom = Math.max(0.55, Math.min(1.35, combinedCircleZoom + direction * step));
        drawCombined();
    } else {
        freeCircleZoom = Math.max(0.55, Math.min(1.35, freeCircleZoom + direction * step));
        drawFreeCircle();
    }
}

function resetCircleZoom(which) {
    if (which === "combined") {
        combinedCircleZoom = 1;
        drawCombined();
    } else {
        freeCircleZoom = 1;
        drawFreeCircle();
    }
}


/* =====================================================
   LONG-PRESS TRIG VALUE -> SCHOOL-STYLE P/Q
   Exact library values are preferred. For other angles, show a
   reduced rational approximation of the displayed decimal value,
   clearly marked as approximate.
   ===================================================== */
(function enableTrigLongPressFractions() {
    const functionNames = ["sin", "cos", "tan", "cot", "sec", "cosec"];
    const holdMs = 2000;
    let popup = null;
    let timer = null;
    let activeEl = null;

    function ensurePopup() {
        if (popup) return popup;
        popup = document.createElement("div");
        popup.className = "trig-fraction-popup";
        popup.setAttribute("role", "dialog");
        popup.setAttribute("aria-live", "polite");
        popup.innerHTML = `
            <button class="trig-fraction-close" type="button" aria-label="Close">×</button>
            <div class="trig-fraction-title"></div>
            <div class="trig-fraction-angle"></div>
            <div class="trig-fraction-value"></div>
            <div class="trig-fraction-note"></div>`;
        document.body.appendChild(popup);
        popup.querySelector(".trig-fraction-close").addEventListener("click", hide);
        return popup;
    }

    function gcd(a,b) {
        a=Math.abs(a); b=Math.abs(b);
        while (b) [a,b]=[b,a%b];
        return a || 1;
    }

    function rationalApprox(value, maxDen=10000) {
        if (!Number.isFinite(value)) return null;
        const sign = value < 0 ? -1 : 1;
        value = Math.abs(value);
        let bestN=Math.round(value), bestD=1, bestErr=Math.abs(value-bestN);
        for (let d=1; d<=maxDen; d++) {
            const n=Math.round(value*d), err=Math.abs(value-n/d);
            if (err < bestErr) { bestN=n; bestD=d; bestErr=err; }
            if (bestErr < 1e-10) break;
        }
        const g=gcd(bestN,bestD);
        return {n: sign*(bestN/g), d: bestD/g, error: bestErr};
    }

    function exactValue(angle, func) {
        const normalized=normalizeAngle(angle);
        const candidates=[];
        const add=(a,v)=>candidates.push([Math.abs(normalizeAngle(a)-normalized),v]);
        const libraries=[window.SCHOOL_VALUES, window.OTHER_VALUES, typeof SCHOOL_VALUES!="undefined"?SCHOOL_VALUES:null, typeof OTHER_VALUES!="undefined"?OTHER_VALUES:null];
        for (const lib of libraries) {
            if (!lib) continue;
            for (const key of Object.keys(lib)) {
                const a=Number(key);
                if (!Number.isFinite(a)) continue;
                let dist=Math.abs(a-normalized);
                dist=Math.min(dist,360-dist);
                if (dist<0.0005 && lib[key]?.[func]) return lib[key][func];
            }
        }
        return null;
    }

    function renderFraction(text, approximate=false) {
        if (text === "undefined") return `<div class="trig-undefined">undefined</div>`;
        if (text && text.includes("/") && !text.includes(" ")) {
            const parts=text.split("/");
            if (parts.length===2) return `<div class="trig-pq-fraction"><span>${parts[0]}</span><i></i><span>${parts[1]}</span></div>`;
        }
        const match=String(text).match(/^(-?\d+(?:\.\d+)?)$/);
        if (match) {
            const r=rationalApprox(Number(text));
            if (r) return `<div class="trig-pq-fraction"><span>${r.n}</span><i></i><span>${r.d}</span></div>`;
        }
        return `<div class="trig-pq-expression">${text}</div>`;
    }

    function show(el, func, angle) {
        const p=ensurePopup();
        const exact=exactValue(angle,func);
        const numeric=getFunctionValue(func,degToRad(angle));
        let display=exact;
        let note="Exact value from the trig value library.";
        let approximate=false;
        if (!display) {
            const r=rationalApprox(numeric);
            if (!r) display="undefined";
            else { display=`${r.n}/${r.d}`; approximate=true; note="Approximate p/q for the displayed numerical value (not an exact trig identity)."; }
        }
        p.querySelector(".trig-fraction-title").textContent=func+"(θ)";
        p.querySelector(".trig-fraction-angle").textContent=`θ = ${Number(angle).toFixed(2).replace(/\.00$/,'')}°`;
        p.querySelector(".trig-fraction-value").innerHTML=renderFraction(display,approximate);
        p.querySelector(".trig-fraction-note").textContent=note;
        const rect=el.getBoundingClientRect();
        p.style.left=Math.min(window.innerWidth-p.offsetWidth-12,Math.max(12,rect.left+rect.width/2-p.offsetWidth/2))+"px";
        p.style.top=Math.min(window.innerHeight-p.offsetHeight-12,Math.max(12,rect.bottom+10))+"px";
        p.classList.add("show");
    }
    function hide(){ if(popup) popup.classList.remove("show"); }
    function start(el,func){
        clearTimeout(timer); activeEl=el;
        const angle=el.closest("#combined") ? Number(angleInput?.value||0) : Number(freeAngleInput?.value||0);
        timer=setTimeout(()=>show(el,func,angle),holdMs);
    }
    function cancel(){ clearTimeout(timer); timer=null; activeEl=null; }

    document.querySelectorAll(".circle-workspace .ratio, .circle-workspace .free-ratio-box > div").forEach(el=>{
        const label=el.querySelector("span");
        const func=label ? label.textContent.trim().replace(/\(θ\)$/i,"") : "";
        if(!functionNames.includes(func)) return;
        el.classList.add("trig-longpress-target");
        el.addEventListener("pointerdown",()=>start(el,func));
        el.addEventListener("pointerup",cancel);
        el.addEventListener("pointercancel",cancel);
        el.addEventListener("pointerleave",cancel);
        el.addEventListener("contextmenu",e=>e.preventDefault());
    });
    document.addEventListener("pointerdown",e=>{ if(popup?.classList.contains("show") && !popup.contains(e.target) && !e.target.closest(".trig-longpress-target")) hide(); });
})();

/* =====================================================
   RESIZABLE CIRCLE PANELS
   Desktop: shrinking the graph gives its control column the freed space.
   Phone: once the graph is small enough, the controls move into that same
   freed horizontal space, so the user gets a genuine two-column layout.
   ===================================================== */
(function enableCirclePanelResizing() {
    const workspaces = document.querySelectorAll('.circle-workspace');
    if (!workspaces.length) return;

    const MIN_DESKTOP = 280;
    const MIN_MOBILE = 150;

    function clampSize(size, workspace) {
        const mobile = window.matchMedia('(max-width: 800px)').matches;
        const min = mobile ? MIN_MOBILE : MIN_DESKTOP;
        const reserve = mobile ? 0 : 300;
        const available = Math.max(min, workspace.clientWidth - reserve);
        return Math.max(min, Math.min(available, size));
    }

    function applySize(workspace, card, size) {
        const finalSize = clampSize(size, workspace);
        const mobile = window.matchMedia('(max-width: 800px)').matches;

        if (mobile) {
            const canFitControls = workspace.clientWidth - finalSize - 10 >= 150;
            const compact = finalSize < workspace.clientWidth * 0.80 && canFitControls;
            workspace.classList.toggle('is-compact', compact);
            if (compact) {
                workspace.style.setProperty('--circle-panel-column', finalSize + 'px');
                workspace.style.gridTemplateColumns = finalSize + 'px minmax(150px,1fr)';
                card.style.width = finalSize + 'px';
                card.style.maxWidth = 'none';
                card.style.marginInline = '0';
            } else {
                workspace.style.removeProperty('--circle-panel-column');
                workspace.style.gridTemplateColumns = '1fr';
                card.style.width = finalSize + 'px';
                card.style.maxWidth = '100%';
                card.style.marginInline = '0 auto';
            }
        } else {
            workspace.classList.remove('is-compact');
            workspace.style.removeProperty('--circle-panel-column');
            card.style.width = '';
            card.style.maxWidth = '';
            card.style.marginInline = '';
            workspace.style.gridTemplateColumns = finalSize + 'px minmax(300px,1fr)';
        }

        card.style.setProperty('--circle-panel-size', finalSize + 'px');
        requestAnimationFrame(() => {
            if (card.dataset.resizableCircle === 'combined') drawCombined();
            else drawFreeCircle();
        });
    }

    workspaces.forEach(workspace => {
        const card = workspace.querySelector('.circle-graph-card');
        const handle = card && card.querySelector('.circle-resize-handle');
        if (!card || !handle) return;

        let resizing = false, startX = 0, startY = 0, startSize = 0;

        function begin(x,y) {
            resizing=true; startX=x; startY=y;
            startSize=card.getBoundingClientRect().width;
            card.classList.add('is-resizing');
        }
        function move(x,y,e) {
            if(!resizing)return;
            if(e && e.cancelable)e.preventDefault();
            const dx=x-startX, dy=y-startY;
            /* A diagonal drag feels natural; use the larger component so any
               direction works instead of requiring a perfect diagonal. */
            const delta=Math.abs(dx)>=Math.abs(dy)?dx:dy;
            applySize(workspace,card,startSize+delta);
        }
        function stop(e) {
            if(!resizing)return;
            if(e && e.cancelable)e.preventDefault();
            resizing=false; card.classList.remove('is-resizing');
        }

        if(window.PointerEvent){
            handle.addEventListener('pointerdown',e=>{
                if(e.button!==undefined && e.button!==0)return;
                e.preventDefault(); begin(e.clientX,e.clientY);
                try{handle.setPointerCapture(e.pointerId);}catch(_){ }
            },{passive:false});
            window.addEventListener('pointermove',e=>move(e.clientX,e.clientY,e),{passive:false});
            window.addEventListener('pointerup',stop,{passive:false});
            window.addEventListener('pointercancel',stop,{passive:false});
        }else{
            handle.addEventListener('mousedown',e=>{e.preventDefault();begin(e.clientX,e.clientY);});
            window.addEventListener('mousemove',e=>move(e.clientX,e.clientY,e));
            window.addEventListener('mouseup',stop);
            handle.addEventListener('touchstart',e=>{const t=e.touches[0];if(!t)return;e.preventDefault();begin(t.clientX,t.clientY);},{passive:false});
            window.addEventListener('touchmove',e=>{if(!resizing||!e.touches[0])return;e.preventDefault();const t=e.touches[0];move(t.clientX,t.clientY,e);},{passive:false});
            window.addEventListener('touchend',stop,{passive:false});
            window.addEventListener('touchcancel',stop,{passive:false});
        }

        requestAnimationFrame(()=>applySize(workspace,card,card.getBoundingClientRect().width));
    });

    window.addEventListener('resize',()=>workspaces.forEach(workspace=>{
        const card=workspace.querySelector('.circle-graph-card');
        if(card)applySize(workspace,card,card.getBoundingClientRect().width);
    }));
})();

/* Circle top-right toggle: hide/show the circle's auxiliary controls. */
(function enableCircleDetailsToggles(){
    document.querySelectorAll('.circle-details-toggle').forEach(toggle=>{
        const card=toggle.closest('.circle-graph-card');
        if(!card)return;
        toggle.addEventListener('click',()=>{
            const collapsed=card.classList.toggle('details-collapsed');
            toggle.setAttribute('aria-expanded',String(!collapsed));
            toggle.textContent=collapsed?'⌄':'⌃';
            toggle.setAttribute('aria-label',collapsed?'Show circle controls':'Hide circle controls');
            const workspace=card.closest('.circle-workspace');
            const legend=workspace && workspace.querySelector('.triangle-legend');
            if(legend) legend.hidden=collapsed;
        });
    });
})();

function drawDegreeLabel(ctx, cx, cy, radius, degree) {
    const rad = degToRad(degree);
    const w = ctx.canvas.clientWidth || ctx.canvas.width;
    const h = ctx.canvas.clientHeight || ctx.canvas.height;
    const margin = 34;
    let x = cx + Math.cos(rad) * (radius + 28);
    let y = cy - Math.sin(rad) * (radius + 28);

    ctx.font = "bold 13px Arial";
    ctx.fillStyle = "#222";

    if (degree === 0) {
        ctx.textAlign = "left";
        x = Math.min(w - margin, x);
        y = cy + 5;
    } else if (degree === 180) {
        ctx.textAlign = "right";
        x = Math.max(margin, x);
        y = cy + 5;
    } else if (degree === 360) {
        /* 360° is the same direction as 0°, so place it below 0°
           rather than drawing it on the canvas edge. */
        ctx.textAlign = "left";
        x = Math.min(w - margin - 10, cx + radius + 10);
        y = cy + 25;
    } else if (degree === 90) {
        ctx.textAlign = "center";
        x = Math.min(w - margin, Math.max(margin, x));
        y = Math.max(18, y);
    } else if (degree === 270) {
        ctx.textAlign = "center";
        x = Math.min(w - margin, Math.max(margin, x));
        y = Math.min(h - 8, y + 8);
    } else if (Math.cos(rad) < 0) {
        ctx.textAlign = "right";
        x = Math.max(margin, x);
    } else {
        ctx.textAlign = "left";
        x = Math.min(w - margin, x);
    }

    y = Math.min(h - 8, Math.max(16, y));
    ctx.fillText(degree + "°", x, y);
    ctx.textAlign = "left";
}

function normalizeAngle(degrees) {
    let value = degrees % 360;

    if (value < 0)
        value += 360;

    return value;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    const r = Math.max(0, Math.min(radius, width / 2, height / 2));

    if (typeof ctx.roundRect === "function") {
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, r);
        return;
    }

    /* Canvas roundRect is missing in some older smartboard browsers.
       Keep a native-path fallback so one unsupported method cannot abort
       the entire render before the numeric values are updated. */
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
}

function drawCircleAngleReadout(ctx, px, py, radius, angle, cx, cy) {
    const label = Number(angle).toFixed(2).replace(/\.00$/, "") + "°";
    const dx = px - cx;
    const dy = py - cy;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;

    let x = px + ux * 18;
    let y = py + uy * 18;
    const pad = 10;
    const tw = ctx.measureText(label).width + 16;

    ctx.save();
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "rgba(255,255,255,.92)";
    ctx.strokeStyle = "#2b6cb0";
    ctx.lineWidth = 1;

    if (ux < -0.2) x -= tw;
    if (x < pad) x = pad;
    const canvasWidth = ctx.canvas.clientWidth || ctx.canvas.width;
    const canvasHeight = ctx.canvas.clientHeight || ctx.canvas.height;
    if (x + tw > canvasWidth - pad) x = canvasWidth - pad - tw;
    if (y < 24) y = 24;
    if (y > canvasHeight - 10) y = canvasHeight - 10;

    const bx = x - 8;
    const by = y - 18;
    const bh = 24;
    drawRoundedRect(ctx, bx, by, tw, bh, 7);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#123";
    ctx.fillText(label, x, y - 1);
    ctx.restore();
}

function drawFreeCircle() {

    if (!freeCircleCanvas)
        return;

    const {
        ctx,
        width,
        height
    } = setupCanvas(
        freeCircleCanvas
    );

    ctx.clearRect(
        0,
        0,
        width,
        height
    );
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * .34 * freeCircleZoom;

    drawGrid(
        ctx,
        width,
        height,
        cx,
        cy,
        radius,
        radius
    );

    /* Main circle */
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(
        cx,
        cy,
        radius,
        0,
        Math.PI * 2
    );
    ctx.stroke();

    /* Quadrants */
    ctx.fillStyle = "#555";
    ctx.font = "bold 22px Arial";

    ctx.fillText("I", cx + radius * .62, cy - radius * .62);
    ctx.fillText("II", cx - radius * .75, cy - radius * .62);
    ctx.fillText("III", cx - radius * .80, cy + radius * .72);
    ctx.fillText("IV", cx + radius * .62, cy + radius * .72);

    /* Standard degree marks */
    const degreeMarks = [
        0, 30, 45, 60, 90,
        120, 135, 150, 180,
        210, 225, 240, 270,
        300, 315, 330
    ];

    ctx.fillStyle = "#222";
    ctx.font = "bold 13px Arial";

    degreeMarks.forEach(degree => {

        const rad = degToRad(degree);

        const labelX =
            cx +
            Math.cos(rad) *
            (radius + 22);

        const labelY =
            cy -
            Math.sin(rad) *
            (radius + 22);

        ctx.fillText(
            degree + "°",
            labelX - 12,
            labelY + 5
        );

        ctx.strokeStyle = "#777";
        ctx.lineWidth = 1.5;

        ctx.beginPath();

        ctx.moveTo(
            cx +
            Math.cos(rad) *
            (radius - 7),

            cy -
            Math.sin(rad) *
            (radius - 7)
        );

        ctx.lineTo(
            cx +
            Math.cos(rad) *
            (radius + 7),

            cy -
            Math.sin(rad) *
            (radius + 7)
        );

        ctx.stroke();
    });

    const rawAngle =
        Number(
            freeAngleInput.value
        );

    if (!Number.isFinite(rawAngle))
        return;

    const angle =
        normalizeAngle(
            rawAngle
        );

    const theta =
        degToRad(angle);

    const x =
        Math.cos(theta);

    const y =
        Math.sin(theta);

    const px =
        cx + x * radius;

    const py =
        cy - y * radius;

    /* θ arc */
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        radius * .20,
        0,
        -theta,
        true
    );

    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.font = "bold 17px Arial";

    ctx.fillText(
        "θ",
        cx + 25,
        cy - 12
    );

    /*
       Triangle colours requested:
       Hypotenuse = BLUE
       Perpendicular = GREEN
       Base = MAGENTA
    */

    /* Hypotenuse */
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(
        cx,
        cy
    );

    ctx.lineTo(
        px,
        py
    );

    ctx.stroke();

    /* Base */
    ctx.strokeStyle = "magenta";
    ctx.setLineDash([8, 6]);

    ctx.beginPath();

    ctx.moveTo(
        cx,
        cy
    );

    ctx.lineTo(
        px,
        cy
    );

    ctx.stroke();

    /* Perpendicular */
    ctx.strokeStyle = "green";

    ctx.beginPath();

    ctx.moveTo(
        px,
        cy
    );

    ctx.lineTo(
        px,
        py
    );

    ctx.stroke();

    ctx.setLineDash([]);

    /* Point — deliberately prominent so the terminal point is always visible */
    ctx.fillStyle = "#ffd43b";
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(
        px,
        py,
        9,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();

    /* tiny radial marker through the point */
    ctx.strokeStyle = "rgba(255, 212, 59, .65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(
        cx + x * (radius * .78),
        cy - y * (radius * .78)
    );
    ctx.lineTo(px, py);
    ctx.stroke();

    drawCircleAngleReadout(ctx, px, py, radius, rawAngle, cx, cy);

    /* Right-angle marker */
    const marker = 12;

    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;

    ctx.beginPath();

    const directionX =
        x >= 0 ? -1 : 1;

    const directionY =
        y >= 0 ? 1 : -1;

    ctx.moveTo(
        px,
        cy + directionY * marker
    );

    ctx.lineTo(
        px + directionX * marker,
        cy + directionY * marker
    );

    ctx.lineTo(
        px + directionX * marker,
        cy
    );

    ctx.stroke();

    const sinV = y;
    const cosV = x;

    const tanV =
        Math.abs(x) < 0.0000001
            ? Infinity
            : y / x;

    const cotV =
        Math.abs(y) < 0.0000001
            ? Infinity
            : x / y;

    const secV =
        Math.abs(x) < 0.0000001
            ? Infinity
            : 1 / x;

    const cosecV =
        Math.abs(y) < 0.0000001
            ? Infinity
            : 1 / y;

    if (freeAngleSlider)
        freeAngleSlider.value = normalizeAngle(rawAngle);

    document.getElementById(
        "freeAngleDisplay"
    ).innerText =
        rawAngle + "°";

    document.getElementById(
        "freeSin"
    ).innerText =
        cleanNumber(sinV);

    document.getElementById(
        "freeCos"
    ).innerText =
        cleanNumber(cosV);

    document.getElementById(
        "freeTan"
    ).innerText =
        cleanNumber(tanV);

    document.getElementById(
        "freeCot"
    ).innerText =
        cleanNumber(cotV);

    document.getElementById(
        "freeSec"
    ).innerText =
        cleanNumber(secV);

    document.getElementById(
        "freeCosec"
    ).innerText =
        cleanNumber(cosecV);

    document.getElementById(
        "freeAngleInfo"
    ).innerHTML =
        "<b>Entered angle:</b> " +
        rawAngle +
        "°<br>" +

        "<b>Equivalent position:</b> " +
        angle.toFixed(4) +
        "°<br>" +

        "<b>Quadrant:</b> " +
        getQuadrant(angle) +
        "<br><br>" +

        "<b>Triangle:</b> " +
        "<span style='color:blue'>Hypotenuse</span> / " +
        "<span style='color:green'>Perpendicular</span> / " +
        "<span style='color:magenta'>Base</span>";

}

function getQuadrant(angle) {

    if (
        angle === 0 ||
        angle === 180 ||
        angle === 360
    )
        return "On X-axis";

    if (angle === 90 || angle === 270)
        return "On Y-axis";

    if (angle > 0 && angle < 90)
        return "I";

    if (angle > 90 && angle < 180)
        return "II";

    if (angle > 180 && angle < 270)
        return "III";

    return "IV";
}

if (freeAngleSlider) {
    freeAngleSlider.addEventListener(
        "input",
        function () {
            freeAngleInput.value = freeAngleSlider.value;
            drawFreeCircle();
        }
    );
}

if (freeAngleInput) freeAngleInput.addEventListener(
    "input",
    drawFreeCircle
);

/* =====================================================
   CIRCLE DIRECT TOUCH / MOUSE CONTROL
   ===================================================== */
(function enableCircleDirectControl() {
    function getCanvasMetrics(canvas, zoom) {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(width, height) * .34 * zoom;
        return { rect, cx, cy, radius };
    }

    function angleFromEvent(canvas, zoom, event) {
        const m = getCanvasMetrics(canvas, zoom);
        const x = event.clientX - m.rect.left;
        const y = event.clientY - m.rect.top;
        let angle = Math.atan2(m.cy - y, x - m.cx) * 180 / Math.PI;
        if (angle < 0) angle += 360;
        return angle;
    }

    function attach(canvas, kind) {
        if (!canvas) return;
        let active = false;

        function update(event) {
            const zoom = kind === "combined" ? combinedCircleZoom : freeCircleZoom;
            const angle = angleFromEvent(canvas, zoom, event);
            if (kind === "combined") {
                if (angleSlider) angleSlider.value = angle.toFixed(1);
                if (angleInput) angleInput.value = angle.toFixed(1);
                drawCombined();
            } else {
                if (freeAngleInput) freeAngleInput.value = angle.toFixed(2);
                if (freeAngleSlider) freeAngleSlider.value = normalizeAngle(angle);
                drawFreeCircle();
            }
        }

        canvas.addEventListener("pointerdown", e => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            e.preventDefault();
            active = true;
            if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
            update(e);
        });
        canvas.addEventListener("pointermove", e => {
            if (active) {
                e.preventDefault();
                update(e);
            }
        });
        canvas.addEventListener("pointerup", () => active = false);
        canvas.addEventListener("pointercancel", () => active = false);

        /* Older interactive-board browsers may have touch events but no
           PointerEvent API. Keep a small compatibility path for them. */
        if (!window.PointerEvent) {
            const touchEvent = e => {
                if (!e.touches || !e.touches[0]) return;
                e.preventDefault();
                update({
                    clientX: e.touches[0].clientX,
                    clientY: e.touches[0].clientY
                });
            };
            canvas.addEventListener("touchstart", touchEvent, { passive: false });
            canvas.addEventListener("touchmove", touchEvent, { passive: false });
        }
    }

    attach(combinedCanvas, "combined");
    attach(freeCircleCanvas, "free");
})();

/* =====================================================
   PYTHAGORAS LESSON
   ===================================================== */

function renderPythagoras() {
    const section = document.getElementById("pythagoras");
    if (!section) return;

    const data = window.PYTHAGORAS_LESSON;
    if (!data) return;

    /* The main lesson is intentionally HTML/SVG, so it remains crisp on
       high-DPI phones and does not depend on canvas timing. */
    section.dataset.ready = "true";
}

/* =====================================================
   START
   ===================================================== */

function renderInitialView() {
    buildValueTables();
    buildFormulaLibrary();
    renderPythagoras();

    /*
       Render after the browser has committed layout. The previous version
       could start several large canvas draws before dimensions stabilized.
    */
    requestAnimationFrame(() => {
        drawCombined();
        drawFreeCircle();

        requestAnimationFrame(() => {
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderInitialView, { once: true });
} else {
    renderInitialView();
}

window.addEventListener("load", () => {
    /* Fonts/layout/images can change canvas measurements after DOM ready.
       A final load-time repaint removes the first-open blank-canvas issue. */
    requestAnimationFrame(() => {
        drawCombined();
        if (document.getElementById("freecircle")?.classList.contains("active-section"))
            drawFreeCircle();
    });
}, { once: true });


/* =====================================================
   RESIZE
   ===================================================== */

let resizeTimer = null;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        drawCombined();
        drawFreeCircle();
    }, 120);
});

/* v10: readable adaptive x-axis/radian ticks */
function getRadianTickStep(scale, visibleSpan) {
    const candidates = [
        Math.PI * 2,
        Math.PI,
        Math.PI / 2,
        Math.PI / 4,
        Math.PI / 8,
        Math.PI / 12,
        Math.PI / 16,
        Math.PI / 24,
        Math.PI / 32
    ];

    // Keep the axis readable: target roughly <= 12 major labels in the viewport.
    const target = Math.max(8, Math.min(12, Math.floor(visibleSpan / 1.5)));
    for (const step of candidates) {
        if (visibleSpan / step <= target) return step;
    }
    return candidates[candidates.length - 1];
}

function formatRadianTickReadable(value) {
    const k = value / Math.PI;
    const eps = 1e-8;

    if (Math.abs(k) < eps) return "0";

    const denomCandidates = [1, 2, 4, 8, 12, 16, 24, 32];
    let best = null;

    for (const d of denomCandidates) {
        const n = Math.round(k * d);
        if (Math.abs(k - n / d) < eps) {
            best = {n, d};
            break;
        }
    }

    if (!best) return `${value.toFixed(2)} rad`;

    let n = best.n;
    let d = best.d;
    const sign = n < 0 ? "−" : "";
    n = Math.abs(n);

    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const g = gcd(n, d);
    n /= g;
    d /= g;

    if (d === 1) {
        if (n === 1) return `${sign}π`;
        return `${sign}${n}π`;
    }
    if (n === 1) return `${sign}π/${d}`;
    return `${sign}${n}π/${d}`;
}
function formatRadianTick(value) {
    const k = value / Math.PI;
    if (Math.abs(k) < 1e-10) return "0";
    const n = Math.round(k);
    if (Math.abs(k - n) < 1e-10) {
        if (n === 1) return "π";
        if (n === -1) return "−π";
        return `${n}π`;
    }

    const eighth = Math.round(k * 8);
    if (Math.abs(k - eighth / 8) < 1e-10) {
        const a = Math.abs(eighth), sign = eighth < 0 ? "−" : "";
        const num = a;
        const den = 8;
        const g = (a % den === 0) ? den : (a % 4 === 0 ? 4 : (a % 2 === 0 ? 2 : 1));
        const nn = a / g, dd = den / g;
        if (dd === 1) return `${sign}${nn}π`;
        if (nn === 1) return `${sign}π/${dd}`;
        return `${sign}${nn}π/${dd}`;
    }
    return `${value.toFixed(2)} rad`;
}


window.TRIGO_AXIS_V10 = {
    getRadianTickStep,
    formatRadianTickReadable
};


/* v11: adaptive X-axis renderer helper.
   Returns readable radian ticks for the current visible interval. */
function buildReadableRadianTicks(minRad, maxRad, pixelWidth, scale) {
    const span = Math.max(1e-9, maxRad - minRad);
    const targetCount = Math.max(7, Math.min(12, Math.floor(pixelWidth / 90)));
    const candidates = [
        Math.PI * 2, Math.PI, Math.PI / 2, Math.PI / 4,
        Math.PI / 6, Math.PI / 8, Math.PI / 12, Math.PI / 16,
        Math.PI / 24, Math.PI / 32
    ];
    let step = candidates[candidates.length - 1];
    for (const c of candidates) {
        if (span / c <= targetCount) { step = c; break; }
    }

    const start = Math.ceil(minRad / step) * step;
    const ticks = [];
    for (let x = start, guard = 0; x <= maxRad + step * 0.25 && guard < 100; x += step, guard++) {
        ticks.push({ value: x, label: formatRadianTickReadable(x) });
    }
    return ticks;
}
window.TRIGO_X_AXIS_V11 = { buildReadableRadianTicks };


/* v14: Rad-Derivation learning modes.
   Definitions, Deep Derivations and hidden History are separate views.
   Content remains sourced from data/radians.js. */
(function () {
    let radIndex = 0;
    let radMode = "definitions";

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    function getData() {
        return window.RAD_DERIVATION || null;
    }

    function getModes(d) {
        if (!d) return { definitions: [], derivations: [], history: [] };

        /* Prefer the dedicated learningModes added to radians.js.
           The older chapter list remains untouched as a fallback. */
        if (d.learningModes) {
            return {
                definitions: d.learningModes.definitions || [],
                derivations: d.learningModes.deepDerivations || [],
                history: d.learningModes.history || []
            };
        }

        if (!Array.isArray(d.chapters))
            return { definitions: [], derivations: [], history: [] };

        return {
            definitions: d.chapters.filter(ch =>
                ["idea", "definition", "arc", "special", "unitcircle"].includes(ch.id)
            ),
            derivations: d.chapters.filter(ch =>
                ["arc", "derive", "fullturn", "conversion", "unitcircle",
                 "arcformula", "sector", "calculus", "negative"].includes(ch.id)
            ),
            history: d.chapters.filter(ch =>
                ch.id === "history" || ch.optional === true
            )
        };
    }


    function activeChapters() {
        const d = getData();
        const modes = getModes(d);
        return modes[radMode] || [];
    }

    function renderLesson() {
        const chapters = activeChapters();
        const title = document.getElementById("radLessonTitle");
        const content = document.getElementById("radLessonContent");
        const formula = document.getElementById("radLessonFormula");

        if (!title || !content || !formula) return;

        const ch = chapters[radIndex];

        if (!ch) {
            title.textContent = "Choose a lesson";
            content.innerHTML = "<p>Select a topic above.</p>";
            formula.style.display = "none";
            return;
        }

        title.textContent = ch.title;
        let html = "";

        /* Dedicated definition mode */
        if (ch.definition) {
            html += `
                <div class="formula-card rad-content-card">
                    <h3>Definition</h3>
                    <p>${escapeHTML(ch.definition)}</p>
                </div>`;
        }

        /* Dedicated deep-derivation mode */
        if (Array.isArray(ch.steps)) {
            html += `
                <div class="formula-card rad-content-card">
                    <h3>Deep Derivation — Step by Step</h3>
                    <ol>${ch.steps.map(x => `<li>${renderMathFractions(escapeHTML(x))}</li>`).join("")}</ol>
                </div>`;
        }

        if (ch.result) {
            html += `
                <div class="formula-card rad-content-card">
                    <h3>Final Result</h3>
                    <div class="formula">${renderMathFractions(escapeHTML(ch.result))}</div>
                </div>`;
        }

        /* Hidden-history mode */
        if (ch.text) {
            html += `
                <div class="formula-card rad-content-card">
                    <h3>Historical Context</h3>
                    <p>${escapeHTML(ch.text)}</p>
                </div>`;
        }

        /* Existing chapter content remains supported */
        if (Array.isArray(ch.cards)) {
            html += ch.cards.map(card => `
                <div class="formula-card rad-content-card">
                    <h3>${escapeHTML(card[0])}</h3>
                    <p>${escapeHTML(card[1])}</p>
                </div>
            `).join("");
        }

        if (Array.isArray(ch.formulas)) {
            html += `
                <div class="formula-card rad-content-card">
                    <h3>Formulas</h3>
                    ${ch.formulas.map(x => `<div class="formula">${renderMathFractions(escapeHTML(x))}</div>`).join("")}
                </div>`;
        }

        if (Array.isArray(ch.values)) {
            html += `
                <div class="formula-card rad-content-card">
                    <h3>Important Radian Values</h3>
                    ${ch.values.map(x => `<div class="formula">${renderMathFractions(escapeHTML(x))}</div>`).join("")}
                </div>`;
        }

        if (ch.explanation) {
            html += `
                <div class="formula-card rad-content-card">
                    <h3>Explanation</h3>
                    <p>${escapeHTML(ch.explanation)}</p>
                </div>`;
        }

        content.innerHTML = html || "<p>This lesson is ready for more content.</p>";

        if (ch.formula) {
            formula.style.display = "block";
            formula.innerHTML = renderMathFractions(escapeHTML(ch.formula));
        } else {
            formula.style.display = "none";
            formula.textContent = "";
        }
    }


    function render() {
        const d = getData();
        const nav = document.getElementById("radLessonNav");
        const description = document.getElementById("radModeDescription");
        if (!d || !nav) return;

        const chapters = activeChapters();

        const descriptions = {
            definitions:
                "English definitions only — the section focuses on what each idea means.",
            derivations:
                "Deep derivations — every important result is broken into logical steps.",
            history:
                "Optional hidden history — open it only when you want the historical side."
        };

        if (description)
            description.textContent = descriptions[radMode];

        nav.innerHTML = chapters.map((ch, i) => `
            <button class="formula-card rad-topic-button"
                    data-rad-index="${i}" type="button">
                <strong>${escapeHTML(ch.title)}</strong>
            </button>
        `).join("");

        nav.querySelectorAll("[data-rad-index]").forEach(btn => {
            btn.addEventListener("click", () => {
                radIndex = Number(btn.dataset.radIndex);
                renderLesson();
                nav.querySelectorAll("[data-rad-index]").forEach(b =>
                    b.classList.remove("active-rad-topic")
                );
                btn.classList.add("active-rad-topic");
            });
        });

        radIndex = Math.min(radIndex, Math.max(0, chapters.length - 1));
        renderLesson();

        const first = nav.querySelector("[data-rad-index]");
        if (first) first.classList.add("active-rad-topic");
    }

    function setMode(mode) {
        radMode = mode;
        radIndex = 0;

        document.querySelectorAll(".rad-mode-bar button")
            .forEach(btn => btn.classList.remove("active"));

        const buttonMap = {
            definitions: "radModeDefinitions",
            derivations: "radModeDerivations",
            history: "radModeHistory"
        };

        const active = document.getElementById(buttonMap[mode]);
        if (active) active.classList.add("active");

        render();
    }

    window.TRIGO_RAD_UI = { render, renderLesson, setMode };

    function wireModes() {
        const defs = document.getElementById("radModeDefinitions");
        const deriv = document.getElementById("radModeDerivations");
        const hist = document.getElementById("radModeHistory");

        if (defs) defs.onclick = () => setMode("definitions");
        if (deriv) deriv.onclick = () => setMode("derivations");
        if (hist) hist.onclick = () => setMode("history");

        render();
    }

    if (document.readyState === "loading")
        document.addEventListener("DOMContentLoaded", wireModes);
    else
        wireModes();
})();

/* Exact π-axis helpers: the graph speaks in π-fractions, not raw decimals. */
function gcdInt(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const q = a % b; a = b; b = q; }
    return a || 1;
}

function rationalizeNumber(value, maxDen = 96) {
    if (!Number.isFinite(value)) return null;
    const sign = value < 0 ? -1 : 1;
    const v = Math.abs(value);
    let best = { n: Math.round(v), d: 1, err: Math.abs(v - Math.round(v)) };
    for (let d = 1; d <= maxDen; d++) {
        const n = Math.round(v * d);
        const err = Math.abs(v - n / d);
        if (err < best.err) best = { n, d, err };
    }
    if (best.err > 1e-6) return null;
    const g = gcdInt(best.n, best.d);
    return { n: sign * (best.n / g), d: best.d / g };
}

function formatPiMultiple(value) {
    const ratio = value / Math.PI;
    if (Math.abs(ratio) < 1e-9) return "0";
    const r = rationalizeNumber(ratio, 96);
    if (!r) return (value / Math.PI).toFixed(2) + "π";
    const n = r.n, d = r.d;
    const sign = n < 0 ? "−" : "";
    const a = Math.abs(n);
    if (d === 1) return sign + (a === 1 ? "π" : a + "π");
    if (a === 1) return sign + "π/" + d;
    return sign + a + "π/" + d;
}

function buildPiTicks(minRad, maxRad, zoom) {
    const span = Math.max(1e-9, maxRad - minRad);
    const candidates = [
        2, 1, 0.5, 1/3, 0.25, 1/6, 1/8, 1/12, 1/16, 1/24, 1/32
    ];
    const target = zoom <= 2 ? 9 : zoom <= 4 ? 11 : zoom <= 7 ? 13 : 15;
    let step = 1;
    for (const c of candidates) {
        if (span / (Math.PI * c) <= target) { step = c; break; }
    }
    const start = Math.ceil((minRad / Math.PI) / step - 1e-9) * step;
    const ticks = [];
    for (let q = start, guard = 0; q <= maxRad / Math.PI + step * .5 && guard < 500; q += step, guard++) {
        const value = q * Math.PI;
        ticks.push({ value, label: formatPiMultiple(value) });
    }
    return ticks;
}

function formatRadianCoordinate(value) {
    return formatPiMultiple(value);
}

window.TRIGO_X_RAD_V14 = { getReadableRadianAxisStep, formatRadianCoordinate, formatPiMultiple, buildPiTicks };


/* =====================================================
   FINAL WAVE CONTROLLERS
   - normal graph: press-and-hold arrows scroll the real viewport
   - infinite graph: same controls pan a compact local viewport
   - speed is shared per controller
   ===================================================== */
(function installFinalWaveControllers(){
    function bindController(controller){
        if (!controller || controller.dataset.bound === "1") return;
        controller.dataset.bound = "1";
        let raf = null;
        let active = new Set();
        let last = 0;
        const speedInput = controller.querySelector("[data-wave-speed]");
        const speedValue = controller.querySelector("[data-wave-speed-value]");
        const target = controller.dataset.waveController;

        function speed(){
            return Number(speedInput?.value || 5);
        }
        function updateSpeed(){
            if(speedValue) speedValue.textContent = String(speed());
        }
        speedInput?.addEventListener("input", updateSpeed);
        updateSpeed();

        function step(now){
            if(!active.size){ raf=null; last=0; return; }
            const dt = last ? Math.min(40, now-last) : 16;
            last = now;
            const amount = speed() * dt / 16;
            let dx=0, dy=0;
            if(active.has("left")) dx -= amount;
            if(active.has("right")) dx += amount;
            if(active.has("up")) dy -= amount;
            if(active.has("down")) dy += amount;

            if(target === "main"){
                const s=document.getElementById("waveScroll");
                if(s){ s.scrollLeft += dx; s.scrollTop += dy; }
            }else{
                window.waveInfinitePanX = (window.waveInfinitePanX || 0) + dx;
                window.waveInfinitePanY = (window.waveInfinitePanY || 0) + dy;
                const input=document.getElementById("waveInfiniteAngleInput");
                const n=Number(input?.value || 0);
                if(Number.isFinite(n)){
                    updateInfiniteDetailGraph(currentFunction,n,degToRad(n),getFunctionValue(currentFunction,degToRad(n)));
                }
            }
            raf=requestAnimationFrame(step);
        }
        function start(dir){
            active.add(dir);
            if(!raf) raf=requestAnimationFrame(step);
        }
        function stop(dir){
            active.delete(dir);
            if(!active.size && raf){cancelAnimationFrame(raf);raf=null;last=0;}
        }
        controller.querySelectorAll("[data-wave-dir]").forEach(btn=>{
            const dir=btn.dataset.waveDir;
            btn.addEventListener("pointerdown",e=>{e.preventDefault();btn.setPointerCapture?.(e.pointerId);start(dir);});
            btn.addEventListener("pointerup",()=>stop(dir));
            btn.addEventListener("pointercancel",()=>stop(dir));
            btn.addEventListener("lostpointercapture",()=>stop(dir));
            btn.addEventListener("pointerleave",function(e){
                // Do not cancel while the pointer is captured; captured pointer events
                // continue to drive the held button.
                if (!btn.hasPointerCapture || !btn.hasPointerCapture(e.pointerId)) stop(dir);
            });
            btn.addEventListener("contextmenu", e => e.preventDefault());
        });
    }
    document.querySelectorAll("[data-wave-controller]").forEach(bindController);
})();

/* =====================================================
   PI AXIS: progressively finer exact π fractions while zooming
   ===================================================== */
function buildPiTicks(minRad, maxRad, zoom) {
    const span = Math.max(1e-9, maxRad - minRad);
    const candidates = [1, 1/2, 1/4, 1/6, 1/8, 1/12, 1/16, 1/24, 1/32];
    let step = 1;
    const pixelsPerRad = 55 * Math.max(.75, zoom || 1);
    const desiredPx = 78;
    for(const c of candidates){
        const px = Math.PI * c * pixelsPerRad;
        const count = span / (Math.PI*c);
        if(px >= desiredPx && count <= 24){ step=c; break; }
    }
    if(zoom >= 1.35 && step > .5) step=.5;
    if(zoom >= 2.5 && step > .25) step=.25;
    if(zoom >= 4.5 && step > 1/6) step=1/6;
    if(zoom >= 7 && step > 1/8) step=1/8;
    if(zoom >= 9 && step > 1/12) step=1/12;
    const start=Math.ceil((minRad/Math.PI)/step-1e-9)*step;
    const ticks=[];
    for(let q=start,guard=0;q<=maxRad/Math.PI+step*.5&&guard<800;q+=step,guard++){
        const value=q*Math.PI;
        ticks.push({value,label:formatPiMultiple(value)});
    }
    return ticks;
}

/* =====================================================
   INFINITE DETAIL GRAPH: compact local view, not a giant Y-axis
   ===================================================== */
function updateInfiniteDetailGraph(func, angle, theta, value) {
    const panel=document.getElementById("waveInfiniteDetail");
    const detail=document.getElementById("waveInfiniteDetailCanvas");
    const info=document.getElementById("waveInfiniteInfo");
    const toggle=document.getElementById("waveInfiniteToggle");
    const input=document.getElementById("waveInfiniteAngleInput");
    if(!panel||!detail||!info||!toggle||!toggle.classList.contains("active")){ if(panel) panel.hidden=true; return; }
    panel.hidden=false;
    const detailAngle=input&&Number.isFinite(Number(input.value))?Number(input.value):angle;
    const detailTheta=degToRad(detailAngle);
    const principal=getPrincipalAngleDegrees(detailAngle);
    const principalRad=degToRad(principal);
    const detailValue=getFunctionValue(func,detailTheta);
    if(input&&document.activeElement!==input) input.value=detailAngle;

    const dpr=Math.max(1,window.devicePixelRatio||1);
    const rect=detail.getBoundingClientRect();
    const w=Math.max(320,Math.round((rect.width||720)*dpr));
    const h=Math.max(240,Math.round((rect.height||300)*dpr));
    detail.width=w;detail.height=h;
    const ctx=detail.getContext("2d");
    ctx.clearRect(0,0,w,h);ctx.fillStyle="#fff";ctx.fillRect(0,0,w,h);

    const zoom=Math.max(.75,window.waveInfiniteZoom||window.waveZoom||1);
    const ppr=65*zoom;
    const baseCx=w/2;
    const baseCy=h/2;
    const panTheta=(window.waveInfinitePanX||0)/ppr;
    const panY=(window.waveInfinitePanY||0);
    const centerTheta=detailTheta+panTheta;
    const cy=baseCy+panY;
    const minT=centerTheta-w/(2*ppr);
    const maxT=centerTheta+w/(2*ppr);

    ctx.strokeStyle="#e7ebf0";ctx.lineWidth=1;
    for(const tick of buildPiTicks(minT,maxT,zoom)){
        const x=baseCx+(tick.value-centerTheta)*ppr;
        if(x<0||x>w)continue;
        ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();
        ctx.fillStyle="#344054";ctx.font="12px Arial";ctx.textAlign="center";
        ctx.fillText(tick.label,x,Math.max(18,Math.min(h-8,cy+22)));
    }
    ctx.textAlign="left";

    const yScale=50*zoom;
    for(let y=-1;y<=1;y+=.5){
        const py=cy-y*yScale;
        if(py<0||py>h)continue;
        ctx.strokeStyle="#eef1f4";ctx.beginPath();ctx.moveTo(0,py);ctx.lineTo(w,py);ctx.stroke();
        ctx.fillStyle="#475467";ctx.fillText(String(y),6,py-3);
    }
    ctx.strokeStyle="#222";ctx.lineWidth=2;
    if(cy>=0&&cy<=h){ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(w,cy);ctx.stroke();}

    const pointX=baseCx-(panTheta*ppr);
    const pointY=cy-(Number.isFinite(detailValue)?detailValue:0)*yScale;
    ctx.strokeStyle="#111";ctx.lineWidth=2.5;ctx.beginPath();
    let prev=null;const samples=Math.ceil(w*1.4);
    for(let i=0;i<=samples;i++){
        const px=i/samples*w;
        const t=centerTheta+(px-baseCx)/ppr;
        const v=getFunctionValue(func,t);
        if(!Number.isFinite(v)||Math.abs(v)>1.15){prev=null;continue;}
        const py=cy-v*yScale;
        if(prev===null||Math.abs(py-prev.y)>h*.45)ctx.moveTo(px,py);else ctx.lineTo(px,py);
        prev={x:px,y:py};
    }
    ctx.stroke();

    if(Number.isFinite(detailValue)&&pointX>=0&&pointX<=w){
        ctx.strokeStyle="rgba(255,0,0,.45)";ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(pointX,cy);ctx.lineTo(pointX,pointY);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle="red";ctx.beginPath();ctx.arc(pointX,pointY,7,0,Math.PI*2);ctx.fill();
        ctx.fillStyle="#b42318";ctx.font="bold 12px Arial";ctx.fillText(`${cleanNumber(detailValue)}`,Math.min(w-70,pointX+10),pointY-10);
    }

    const cycles=Math.floor(detailAngle/360);
    const piEntered=formatPiMultiple(detailTheta);
    const piPrincipal=formatPiMultiple(principalRad);
    const delta=detailAngle-principal;
    info.innerHTML=
      `<b>Entered angle:</b> ${Number(detailAngle).toFixed(2).replace(/\.00$/,'')}°`+
      `<br><b>Entered radians:</b> ${piEntered}`+
      `<br><b>Principal angle:</b> ${principal.toFixed(2).replace(/\.00$/,'')}° (${piPrincipal})`+
      `<br><b>Principal position:</b> ${piPrincipal}`+
      `<br><b>Extra full turns:</b> ${cycles}`+
      `<br><b>Difference from principal:</b> ${delta.toFixed(2).replace(/\.00$/,'')}°`+
      `<br><b>${func}(θ):</b> ${Number.isFinite(detailValue)?cleanNumber(detailValue):"undefined"}`+
      `<br><b>Coordinate:</b> (${piEntered}, ${Number.isFinite(detailValue)?cleanNumber(detailValue):"undefined"})`;
}

/* Infinite input starts centered on the red point; moving arrows then pans it. */
if(waveInfiniteAngleInput){
    waveInfiniteAngleInput.addEventListener("input",function(){
        if(!waveInfiniteToggle?.classList.contains("active"))return;
        const n=Number(this.value);if(!Number.isFinite(n))return;
        window.waveInfinitePanX=0;window.waveInfinitePanY=0;
        if(functionAngleInput)functionAngleInput.value=n;
        functionAngle.value=Math.max(0,Math.min(360,getPrincipalAngleDegrees(n)));
        updateInfiniteDetailGraph(currentFunction,n,degToRad(n),getFunctionValue(currentFunction,degToRad(n)));
    });
}


/* Escape closes the floating Infinite-angle window without touching the normal graph. */
document.addEventListener("keydown", function(e){
    if(e.key !== "Escape") return;
    const win = document.getElementById("infiniteAngleWindow");
    if(win && !win.hidden){
        win.hidden = true;
        win.classList.remove("infinite-window-fullscreen");
    }
});


/* =========================================================
   FINAL GRAPH STABILITY OVERRIDES
   ========================================================= */
(function(){
  function byId(id){ return document.getElementById(id); }

  /* Escape always closes the floating Infinite Angle window and exits its
     fullscreen state. */
  document.addEventListener("keydown", function(e){
    if(e.key !== "Escape") return;
    const win = byId("infiniteAngleWindow");
    if(!win) return;
    win.classList.remove("infinite-window-fullscreen");
    win.hidden = true;
  }, true);

  /* Make the infinite graph zoom truly independent from the main graph. */
  const originalInfiniteUpdate = window.updateInfiniteWindowGraph;
  if(typeof originalInfiniteUpdate === "function"){
    window.updateInfiniteWindowGraph = function(func, angle){
      return originalInfiniteUpdate(func, angle);
    };
  }

  /* The floating graph has its own world viewport. */
  function enlargeInfiniteWorld(){
    const box = document.querySelector(".infinite-window-graph");
    const canvas = byId("infiniteWindowCanvas");
    if(!box || !canvas) return;
    canvas.style.width = "3600px";
    canvas.style.height = "1600px";
    box.style.overflow = "auto";
  }

  const open = window.openInfiniteAngleWindow;
  if(typeof open === "function"){
    window.openInfiniteAngleWindow = function(){
      open();
      requestAnimationFrame(enlargeInfiniteWorld);
    };
  }

  /* Preserve the six-function value strip if an older build hid it. */
  document.querySelectorAll(".function-buttons button").forEach(function(b){
    b.style.display = "";
  });

  /* Main graph: allow true two-axis navigation. */
  const main = byId("waveScroll");
  if(main){
    main.style.overflowX = "auto";
    main.style.overflowY = "auto";
    main.style.touchAction = "pan-x pan-y";
  }
})();

/* FINAL_ESCAPE_INFINITE */
document.addEventListener("keydown", function(e){
  if(e.key !== "Escape") return;
  const win=document.getElementById("infiniteAngleWindow");
  if(win){
    win.classList.remove("infinite-window-fullscreen");
    win.hidden=true;
  }
}, true);

/* =========================================================
   V11 — CENTER MAIN + INFINITE GRAPH / ROBUST CLOSE
   ========================================================= */
(function(){
  "use strict";

  function centerMainGraph(){
    const s = document.getElementById("waveScroll");
    const c = document.getElementById("functionCanvas");
    if(!s || !c) return;

    requestAnimationFrame(function(){
      const maxX = Math.max(0, s.scrollWidth - s.clientWidth);
      const maxY = Math.max(0, s.scrollHeight - s.clientHeight);
      /* Center the coordinate world, not a function-specific angle. */
      s.scrollLeft = Math.round(maxX / 2);
      s.scrollTop  = Math.round(maxY / 2);
    });
  }

  function centerInfiniteWindow(){
    const w = document.getElementById("infiniteAngleWindow");
    if(!w || w.classList.contains("infinite-window-fullscreen")) return;
    w.style.left = "50%";
    w.style.top = "50%";
    w.style.right = "auto";
    w.style.bottom = "auto";
    w.style.transform = "translate(-50%, -50%)";
  }

  function closeInfiniteWindow(){
    const w = document.getElementById("infiniteAngleWindow");
    if(!w) return;
    w.hidden = true;
    w.classList.remove("infinite-window-fullscreen");
    w.style.transform = "translate(-50%, -50%)";
  }

  /* Patch the existing opener without replacing the existing graph logic. */
  const oldOpen = window.openInfiniteAngleWindow;
  if(typeof oldOpen === "function" && !oldOpen.__v11){
    const wrapped = function(){
      oldOpen.apply(this, arguments);
      centerInfiniteWindow();
    };
    wrapped.__v11 = true;
    window.openInfiniteAngleWindow = wrapped;
  }

  /* Event delegation makes × work even if the floating window is rebuilt. */
  document.addEventListener("click", function(e){
    if(e.target && e.target.closest && e.target.closest("#closeInfiniteAngle")){
      e.preventDefault();
      e.stopPropagation();
      closeInfiniteWindow();
    }
  }, true);

  /* Escape is an explicit second exit route. */
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      const w = document.getElementById("infiniteAngleWindow");
      if(w && !w.hidden){
        e.preventDefault();
        e.stopPropagation();
        closeInfiniteWindow();
      }
    }
  }, true);

  /* Center after all existing graph-hardening redraws have run. */
  function bootCenter(){
    setTimeout(centerMainGraph, 80);
    setTimeout(centerMainGraph, 450);
    setTimeout(centerMainGraph, 1000);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bootCenter, {once:true});
  }else{
    bootCenter();
  }

  window.addEventListener("load", bootCenter);

  /* Re-center after the project's graph reset, without changing its
     mathematical state. */
  const oldReset = window.resetGraphViews;
  if(typeof oldReset === "function" && !oldReset.__v11){
    const wrappedReset = function(){
      const result = oldReset.apply(this, arguments);
      setTimeout(centerMainGraph, 80);
      return result;
    };
    wrappedReset.__v11 = true;
    window.resetGraphViews = wrappedReset;
  }

  /* If the project opens the window by directly toggling hidden, center it
     whenever it becomes visible. */
  const observer = new MutationObserver(function(){
    const w = document.getElementById("infiniteAngleWindow");
    if(w && !w.hidden) centerInfiniteWindow();
  });
  observer.observe(document.body, {subtree:true, attributes:true, attributeFilter:["hidden","class","style"]});
})();


/* =========================================================
   FINAL V12 — CENTER / SCROLL / FULLSCREEN STABILITY
   ========================================================= */
(function(){
  "use strict";

  function byId(id){ return document.getElementById(id); }

  /* IMPORTANT: the mathematical origin is the CENTER of the canvas.
     The previous center helper used x=80, which made the viewport appear
     to jump away from the actual axes. */
  window.centerWaveOnAngle = function(){
    /* Delegate to the real dot-aware function declared earlier. */
    centerWaveOnAngle();
  };

  function centerInfiniteViewport(){
    const box = document.querySelector(".infinite-window-graph");
    const canvas = byId("infiniteWindowCanvas");
    if(!box || !canvas) return;
    requestAnimationFrame(function(){
      const angle = Number(byId("infiniteWindowAngleInput")?.value || 0);
      const zoom = Math.max(0.5, window.infiniteWindowZoom || 1);
      const ys = 50 * zoom;
      const w = 3600, h = 1600;
      const cx = w/2 + Number(window.infiniteWindowPanX || 0);
      const cy = h/2 + Number(window.infiniteWindowPanY || 0);
      const value = getFunctionValue(currentFunction, degToRad(angle));
      const px = cx;
      const py = Number.isFinite(value) ? cy - value*ys : cy;
      const sx = (canvas.clientWidth || w) / w;
      const sy = (canvas.clientHeight || h) / h;
      box.scrollLeft = Math.max(0, px*sx - box.clientWidth/2);
      box.scrollTop  = Math.max(0, py*sy - box.clientHeight/2);
    });
  }

  /* Preserve the original draw function and only correct its post-render
     viewport positioning. */
  const oldDraw = window.drawFunction;
  if(typeof oldDraw === "function" && !oldDraw.__v12){
    const wrappedDraw = function(func, options){
      const result = oldDraw.apply(this, arguments);
      if(options && options.centerPoint){
        centerMain();
      }
      return result;
    };
    wrappedDraw.__v12 = true;
    window.drawFunction = wrappedDraw;
  }

  function centerMain(){
    const s=byId("waveScroll");
    const c=byId("functionCanvas");
    if(!s || !c) return;
    requestAnimationFrame(function(){
      const maxX=Math.max(0,s.scrollWidth-s.clientWidth);
      const maxY=Math.max(0,s.scrollHeight-s.clientHeight);
      s.scrollLeft=Math.round(maxX/2);
      s.scrollTop=Math.round(maxY/2);
    });
  }

  /* Fix the initial page state after every layout pass that can change the
     canvas dimensions. */
  function bootCenter(){
    centerMain();
    setTimeout(centerMain,120);
    setTimeout(centerMain,450);
    setTimeout(centerMain,1000);
  }

  /* Infinite graph: never share zoom with the main graph. */
  const oldOpen=window.openInfiniteAngleWindow;
  if(typeof oldOpen==="function" && !oldOpen.__v12){
    const wrappedOpen=function(){
      const r=oldOpen.apply(this,arguments);
      const w=byId("infiniteAngleWindow");
      if(w) w.classList.remove("infinite-window-fullscreen");
      centerInfiniteViewport();
      return r;
    };
    wrappedOpen.__v12=true;
    window.openInfiniteAngleWindow=wrappedOpen;
  }

  /* Re-center the infinite WORLD only when it opens or its own zoom changes.
     Panning with arrows is therefore independent of the main graph. */
  ["infiniteZoomIn","infiniteZoomOut","infiniteZoomReset"].forEach(function(id){
    const el=byId(id);
    if(el) el.addEventListener("click",function(){
      setTimeout(centerInfiniteViewport,40);
    },true);
  });

  /* Fullscreen button: force the CSS fullscreen state. */
  document.addEventListener("click",function(e){
    const btn=e.target && e.target.closest ? e.target.closest("#maximizeInfiniteAngle") : null;
    if(!btn) return;
    const w=byId("infiniteAngleWindow");
    if(!w) return;
    e.preventDefault();
    e.stopPropagation();
    w.classList.toggle("infinite-window-fullscreen");
    if(!w.classList.contains("infinite-window-fullscreen")){
      centerInfiniteViewport();
    }
  },true);

  /* Close button + Escape are independent of any other handler. */
  function closeInfinite(){
    const w=byId("infiniteAngleWindow");
    if(!w) return;
    w.classList.remove("infinite-window-fullscreen");
    w.hidden=true;
  }
  document.addEventListener("click",function(e){
    const btn=e.target && e.target.closest ? e.target.closest("#closeInfiniteAngle") : null;
    if(btn){
      e.preventDefault();
      e.stopImmediatePropagation();
      closeInfinite();
    }
  },true);
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){
      const w=byId("infiniteAngleWindow");
      if(w && !w.hidden){
        e.preventDefault();
        e.stopImmediatePropagation();
        closeInfinite();
      }
    }
  },true);

  /* Do not allow the main graph to borrow the infinite zoom. */
  if(!Number.isFinite(window.waveZoom)) window.waveZoom=1;
  if(!Number.isFinite(window.infiniteWindowZoom)) window.infiniteWindowZoom=1;

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",bootCenter,{once:true});
  }else{
    bootCenter();
  }
  window.addEventListener("resize",function(){
    setTimeout(centerMain,50);
  });
})();


/* ===== DEFINITIVE DEFAULT RED-DOT CENTERING ===== */
(function(){
  "use strict";

  function centerViewportOnPoint(scroller, canvas, x, y){
    if(!scroller || !canvas) return;
    const scaleX = canvas.clientWidth ? canvas.clientWidth / canvas.width : 1;
    const scaleY = canvas.clientHeight ? canvas.clientHeight / canvas.height : 1;
    const px = x * scaleX;
    const py = y * scaleY;
    scroller.scrollLeft = Math.max(0, px - scroller.clientWidth / 2);
    scroller.scrollTop  = Math.max(0, py - scroller.clientHeight / 2);
  }

  function findCanvas(scroller){
    return scroller && scroller.querySelector("canvas");
  }

  /*
   * The graph canvas is normally drawn with its red-dot/selected-point
   * position in its own coordinate system. These functions are intentionally
   * generic so the existing graph renderer can call them without changing
   * its formulas or values.
   */
  window.TRIG_CENTER_GRAPH_ON_DOT = function(scroller, canvas, dotX, dotY){
    centerViewportOnPoint(scroller, canvas, dotX, dotY);
  };

  function centerMain(){
    const s = document.getElementById("waveScroll");
    const c = findCanvas(s);
    if(!s || !c) return;

    // First prefer an existing graph-provided dot position.
    let x = Number(c.dataset.redDotX);
    let y = Number(c.dataset.redDotY);

    // Otherwise center on the canvas' geometric center. Existing drawing code
    // can subsequently move the dot without changing the initial viewport.
    if(!Number.isFinite(x)) x = c.width / 2;
    if(!Number.isFinite(y)) y = c.height / 2;

    centerViewportOnPoint(s,c,x,y);
  }

  function centerInfinite(){
    const selectors = [
      ".trig-infinite-scroll",
      "#infiniteGraphScroll",
      "[data-infinite-scroll]"
    ];

    selectors.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(s){
        const c=findCanvas(s);
        if(!c) return;

        let x=Number(c.dataset.redDotX);
        let y=Number(c.dataset.redDotY);
        if(!Number.isFinite(x)) x=c.width/2;
        if(!Number.isFinite(y)) y=c.height/2;

        centerViewportOnPoint(s,c,x,y);
      });
    });
  }

  function boot(){
    // Run after the graph renderer has had a chance to size/draw its canvas.
    centerMain();
    centerInfinite();
    setTimeout(centerMain,100);
    setTimeout(centerMain,350);
    setTimeout(centerInfinite,100);
    setTimeout(centerInfinite,350);

    window.addEventListener("resize",function(){
      centerMain();
      centerInfinite();
    },{passive:true});

    // Re-center only when the infinite window opens; it remains independent
    // afterward.
    document.addEventListener("click",function(e){
      if(e.target.closest(
        "[data-open-infinite],#openInfinite,.infinite-btn,[data-infinite-open]"
      )){
        setTimeout(centerInfinite,80);
        setTimeout(centerInfinite,300);
      }
    },true);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }
})();


/* ===== V14: INFINITE RED-DOT CENTER + XY GUIDES + LIVE MAIN CONTROLLER ===== */
(function(){
  "use strict";

  function centerInfiniteViewport(){
    const box=document.querySelector(".infinite-window-graph");
    const canvas=document.getElementById("infiniteWindowCanvas");
    if(!box||!canvas||canvas.hidden) return;
    // The infinite renderer puts the selected red point at cx/cy in world pixels.
    // Keep that exact point at the viewport centre, independent of main graph state.
    const z=Math.max(.5,Number(window.infiniteWindowZoom||1));
    const cx=canvas.width/(2*(window.devicePixelRatio||1)) + Number(window.infiniteWindowPanX||0);
    const cy=canvas.height/(2*(window.devicePixelRatio||1)) + Number(window.infiniteWindowPanY||0);
    const cssW=canvas.clientWidth||canvas.width/(window.devicePixelRatio||1);
    const cssH=canvas.clientHeight||canvas.height/(window.devicePixelRatio||1);
    // Canvas CSS pixels correspond to its inline world dimensions.
    box.scrollLeft=Math.max(0,cx-box.clientWidth/2);
    box.scrollTop=Math.max(0,cy-box.clientHeight/2);
  }

  function addInfiniteXYGuide(){
    const canvas=document.getElementById("infiniteWindowCanvas");
    if(!canvas||!canvas.parentElement) return;
    const host=canvas.parentElement;
    let svg=host.querySelector(".infinite-xy-guide-overlay");
    if(!svg){
      svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
      svg.className="infinite-xy-guide-overlay";
      Object.assign(svg.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"20"});
      if(getComputedStyle(host).position==="static") host.style.position="relative";
      host.appendChild(svg);
    }
    // Guide is drawn by the canvas itself below; overlay only carries labels.
    const w=host.clientWidth,h=host.clientHeight;
    const cx=w/2, cy=h/2;
    svg.setAttribute("viewBox",`0 0 ${w} ${h}`);
    svg.innerHTML=`
      <circle cx="${cx}" cy="${cy}" r="6" fill="red" stroke="white" stroke-width="2"/>
      <text x="${Math.min(w-120,cx+10)}" y="${Math.max(18,cy-10)}" font-family="Arial" font-size="12" font-weight="700" fill="#111">y = red-dot value</text>
      <text x="${Math.max(6,cx-30)}" y="${h-8}" font-family="Arial" font-size="12" font-weight="700" fill="#111">x = angle</text>`;
  }

  // Wrap the floating graph renderer once, preserving its existing formulas/data.
  const original = window.updateInfiniteWindowGraph;
  if(typeof original === "function" && !original.__v14){
    const wrapped=function(func,angle){
      const r=original.apply(this,arguments);
      requestAnimationFrame(function(){ centerInfiniteViewport(); addInfiniteXYGuide(); });
      return r;
    };
    wrapped.__v14=true;
    window.updateInfiniteWindowGraph=wrapped;
  }

  // Main controller: explicit keyboard/mouse/touch implementation, in addition
  // to the existing binding, so the arrows are real controls rather than visual UI.
  function bindMainControllerLive(){
    const c=document.querySelector('[data-wave-controller="main"]');
    const sc=document.getElementById("waveScroll");
    if(!c||!sc||c.dataset.v14bound==="1") return;
    c.dataset.v14bound="1";
    const speed=c.querySelector("[data-wave-speed]");
    const dirs=[...c.querySelectorAll("[data-wave-dir]")];
    const active=new Set();
    let raf=0,last=0;
    const getSpeed=()=>Number(speed?.value||5);
    const loop=(now)=>{
      if(!active.size){raf=0;last=0;return;}
      const dt=last?Math.min(40,now-last):16; last=now;
      const d=getSpeed()*dt/16;
      if(active.has("left")) sc.scrollLeft-=d;
      if(active.has("right")) sc.scrollLeft+=d;
      if(active.has("up")) sc.scrollTop-=d;
      if(active.has("down")) sc.scrollTop+=d;
      raf=requestAnimationFrame(loop);
    };
    const start=(dir,e)=>{e?.preventDefault();active.add(dir);if(!raf)raf=requestAnimationFrame(loop);};
    const stop=(dir,e)=>{e?.preventDefault();active.delete(dir);};
    dirs.forEach(btn=>{
      const dir=btn.dataset.waveDir;
      btn.addEventListener("pointerdown",e=>{btn.setPointerCapture?.(e.pointerId);start(dir,e);});
      btn.addEventListener("pointerup",e=>stop(dir,e));
      btn.addEventListener("pointercancel",e=>stop(dir,e));
      btn.addEventListener("lostpointercapture",e=>stop(dir,e));
      btn.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")start(dir,e);});
      btn.addEventListener("keyup",e=>{if(e.key==="Enter"||e.key===" ")stop(dir,e);});
    });
  }

  function boot(){
    bindMainControllerLive();
    setTimeout(bindMainControllerLive,250);
    setTimeout(centerInfiniteViewport,250);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();

  document.addEventListener("click",e=>{
    if(e.target.closest("#openInfiniteAngle,#waveInfiniteToggle")){
      setTimeout(centerInfiniteViewport,120);
      setTimeout(addInfiniteXYGuide,180);
    }
  },true);
})();




/* ===== SCHOOL RATIONALIZED TRIG-RATIO DISPLAY ===== */
(function(){
  const map = new Map([
    ["1/√2","1/√2"],
    ["1/√3","1/√3"],
    ["21/√3","2/√3"]
  ]);

  function normalize(root){
    const walker=document.createTreeWalker(
      root,NodeFilter.SHOW_TEXT,
      {acceptNode:n=>{
        if(!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p=n.parentElement;
        if(p && /^(SCRIPT|STYLE|TEXTAREA)$/i.test(p.tagName))
          return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }}
    );
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      let s=n.nodeValue;
      map.forEach((v,k)=>{s=s.split(k).join(v);});
      if(s!==n.nodeValue)n.nodeValue=s;
    });
  }

  function boot(){
    normalize(document.body);
    new MutationObserver(muts=>{
      muts.forEach(m=>{
        m.addedNodes.forEach(n=>{
          if(n.nodeType===Node.TEXT_NODE){
            let s=n.nodeValue;
            map.forEach((v,k)=>{s=s.split(k).join(v);});
            n.nodeValue=s;
          }else if(n.nodeType===Node.ELEMENT_NODE){
            normalize(n);
          }
        });
      });
    }).observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();


/* ===== CLEAN BUILD: INFINITE GRAPH + CONTROLLER DISABLED ===== */
(function(){
  "use strict";
  const selectors = [
    "#openInfinite","#infiniteBtn",".infinite-btn",
    "[data-open-infinite]","[data-infinite-open]",
    "#infiniteGraphWindow",".infinite-graph-window",
    "#infiniteGraph",".trig-infinite-window",
    ".wave-mobile-controller",".wave-pad"
  ];
  function clean(){
    selectors.forEach(sel=>{
      document.querySelectorAll(sel).forEach(el=>el.remove());
    });
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",clean,{once:true});
  else clean();
  new MutationObserver(clean).observe(document.documentElement,{
    childList:true,subtree:true
  });
})();


/* ===== MAIN GRAPH CONTROLLER ONLY ===== */
(function(){
  "use strict";
  const held = new Set();
  let raf = 0, last = 0;

  function graph(){
    return document.querySelector("#waveScroll") ||
           document.querySelector(".wave-scroll") ||
           document.querySelector(".graph-scroll");
  }

  function speed(){
    const el = document.querySelector(
      '#waveSpeed, #speedControl, #scrollSpeed, [data-wave-speed]'
    );
    const v = Number(el && el.value);
    return Math.max(1, Math.min(80, Number.isFinite(v) ? v : 5));
  }

  function move(dir, factor=1){
    const g=graph();
    if(!g) return;
    const d=speed()*factor;
    if(dir==="left")  g.scrollLeft-=d;
    if(dir==="right") g.scrollLeft+=d;
    if(dir==="up")    g.scrollTop-=d;
    if(dir==="down")  g.scrollTop+=d;
    g.dispatchEvent(new Event("scroll",{bubbles:false}));
  }

  function loop(t){
    if(!held.size){ raf=0; last=0; return; }
    const dt=last ? Math.min(50,t-last) : 16;
    last=t;
    held.forEach(d=>move(d,dt/16));
    raf=requestAnimationFrame(loop);
  }

  function start(d){
    held.add(d);
    move(d,1.5);
    if(!raf) raf=requestAnimationFrame(loop);
  }

  function stop(d){
    held.delete(d);
    if(!held.size && raf){
      cancelAnimationFrame(raf);
      raf=0; last=0;
    }
  }

  function dir(el){
    const d=el && (el.dataset.waveDir || el.getAttribute("data-direction"));
    return ["up","down","left","right"].includes(d) ? d : null;
  }

  document.addEventListener("pointerdown",e=>{
    const b=e.target.closest("[data-wave-dir],[data-direction]");
    const d=dir(b);
    if(!b||!d) return;
    e.preventDefault();
    try{b.setPointerCapture(e.pointerId)}catch(_){}
    start(d);
  },{passive:false});

  ["pointerup","pointercancel","lostpointercapture"].forEach(type=>{
    document.addEventListener(type,e=>{
      const b=e.target.closest("[data-wave-dir],[data-direction]");
      const d=dir(b);
      if(d) stop(d);
    },{passive:false});
  });

  document.addEventListener("touchstart",e=>{
    const b=e.target.closest("[data-wave-dir],[data-direction]");
    const d=dir(b);
    if(!b||!d) return;
    e.preventDefault();
    start(d);
  },{passive:false});

  document.addEventListener("touchend",e=>{
    const b=e.target.closest("[data-wave-dir],[data-direction]");
    const d=dir(b);
    if(d) stop(d);
  },{passive:false});

  const keys={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};
  document.addEventListener("keydown",e=>{
    const d=keys[e.key];
    if(!d || /input|textarea|select/i.test(e.target.tagName)) return;
    e.preventDefault();
    start(d);
  },{passive:false});

  document.addEventListener("keyup",e=>{
    const d=keys[e.key];
    if(d) stop(d);
  },{passive:false});

  window.addEventListener("blur",()=>{
    held.clear();
    if(raf){cancelAnimationFrame(raf);raf=0;last=0;}
  });
})();



/* =========================================================
   WAVE GRAPH — FINAL REPLACEMENT LAYER
   This overrides ONLY the main wave renderer/zoom behavior.
   Everything else in Trig-Ship remains untouched.
   ========================================================= */
(function(){
"use strict";

const TG_WAVE = {
  pprBase: 55,
  yScaleBase: 45,
  minZoom: 0.5,
  maxZoom: 20
};

function wavePrecision(v){
  if(!Number.isFinite(v)) return "undefined";
  const z=Number(window.waveZoom||1);
  const digits=z>=12?12:z>=8?11:z>=5?10:z>=3?9:z>=1.5?8:7;
  const n=Number(v.toPrecision(digits));
  return Object.is(n,-0) ? "0" : String(n);
}

function wavePiLabel(rad){
  if(!Number.isFinite(rad)) return "";
  const q=rad/Math.PI;
  const nearest=Math.round(q*96)/96;
  if(Math.abs(q-nearest)<1e-9){
    const n=Math.round(nearest*96), d=96;
    if(n===0) return "0";
    if(n===d) return "π";
    if(n===-d) return "−π";
    const g=(a,b)=>{while(b){const t=a%b;a=b;b=t}return Math.abs(a)};
    const gg=g(n,d), nn=n/gg, dd=d/gg;
    if(dd===1) return (nn<0?"−":"")+Math.abs(nn)+"π";
    return (nn<0?"−":"")+(Math.abs(nn)===1?"":Math.abs(nn))+"π/"+dd;
  }
  return wavePrecision(rad);
}

function waveTickStep(zoom){
  if(zoom>=12) return Math.PI/96;
  if(zoom>=8) return Math.PI/64;
  if(zoom>=5) return Math.PI/48;
  if(zoom>=3) return Math.PI/32;
  if(zoom>=2) return Math.PI/16;
  if(zoom>=1.2) return Math.PI/8;
  return Math.PI/4;
}

function drawWaveReplacement(func, options={}){
  currentFunction=func;
  if(!functionCanvas) return;

  const scroll=document.getElementById("waveScroll");
  const zoom=Math.max(TG_WAVE.minZoom,Math.min(TG_WAVE.maxZoom,Number(window.waveZoom)||1));
  window.waveZoom=zoom;

  /* Large coordinate plane: enough room for true two-way pan, while
     remaining compact enough for phones through the scroll viewport. */
  const width=Math.max(7200, Math.min(30000, Math.round(9000*zoom)));
  const height=Math.max(
    window.innerWidth<=600 ? 720 : 1000,
    Math.min(7000, Math.round(1000*zoom))
  );
  window.waveCanvasWidth=width;

  functionCanvas.style.width=width+"px";
  functionCanvas.style.height=height+"px";

  const pack=setupCanvas(functionCanvas);
  const ctx=pack.ctx, W=pack.width, H=pack.height;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle="#fff";
  ctx.fillRect(0,0,W,H);

  const ppr=TG_WAVE.pprBase*zoom;
  const ys=TG_WAVE.yScaleBase*zoom;
  const ox=W/2, oy=H/2;

  const minT=-(W/2-80)/ppr;
  const maxT=(W/2-80)/ppr;

  /* Fine grid */
  const yMinor=zoom>=10?.02:zoom>=5?.05:zoom>=2?.1:.25;
  const yStart=Math.floor((-oy/ys)/yMinor)*yMinor;
  const yEnd=Math.ceil((H-oy)/ys/yMinor)*yMinor;

  ctx.lineWidth=1;
  ctx.strokeStyle="#edf1f5";
  for(let y=yStart;y<=yEnd+yMinor/2;y+=yMinor){
    const py=oy-y*ys;
    if(py<0||py>H) continue;
    ctx.beginPath();ctx.moveTo(0,py);ctx.lineTo(W,py);ctx.stroke();
  }

  /* Major horizontal lines and readable y-axis values */
  const yMajor=zoom>=8?.1:zoom>=4?.25:zoom>=2?.5:1;
  ctx.strokeStyle="#d6dde6";
  for(let y=Math.ceil(yStart/yMajor)*yMajor;y<=yEnd+yMajor/2;y+=yMajor){
    const py=oy-y*ys;
    if(py<0||py>H) continue;
    ctx.beginPath();ctx.moveTo(0,py);ctx.lineTo(W,py);ctx.stroke();
  }

  /* Vertical radian grid */
  const step=waveTickStep(zoom);
  const k0=Math.ceil(minT/step-1e-10);
  const k1=Math.floor(maxT/step+1e-10);

  ctx.strokeStyle="#e3e8ee";
  for(let k=k0;k<=k1;k++){
    const t=k*step, px=ox+t*ppr;
    ctx.beginPath();ctx.moveTo(px,0);ctx.lineTo(px,H);ctx.stroke();
  }

  /* Axes */
  ctx.strokeStyle="#222";
  ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(0,oy);ctx.lineTo(W,oy);ctx.stroke();
  ctx.beginPath();ctx.moveTo(ox,0);ctx.lineTo(ox,H);ctx.stroke();

  ctx.fillStyle="#111";
  ctx.font="bold 15px Arial";
  ctx.fillText("X",W-28,oy-10);
  ctx.fillText("Y",ox+10,18);

  /* X-axis labels */
  ctx.textAlign="center";
  const labelStep=step;
  ctx.font=zoom>=7?"12px Arial":"13px Arial";
  for(let k=k0;k<=k1;k++){
    const t=k*labelStep, px=ox+t*ppr;
    if(px<20||px>W-20) continue;
    ctx.strokeStyle="#777";ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(px,oy-7);ctx.lineTo(px,oy+7);ctx.stroke();
    ctx.fillStyle="#222";
    ctx.fillText(wavePiLabel(t),px,oy+24);
  }
  ctx.textAlign="left";

  /* Y-axis labels. More precision as zoom increases. */
  const yLabelStep=zoom>=12?.02:zoom>=8?.05:zoom>=5?.1:zoom>=3?.25:zoom>=1.5?.5:1;
  const firstY=Math.ceil(yStart/yLabelStep-1e-10)*yLabelStep;
  ctx.font="12px Arial";
  for(let y=firstY;y<=yEnd+yLabelStep/2;y+=yLabelStep){
    const py=oy-y*ys;
    if(py<10||py>H-8) continue;
    const yy=Number(y.toFixed(12));
    ctx.strokeStyle="#777";ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(ox-5,py);ctx.lineTo(ox+5,py);ctx.stroke();
    ctx.fillStyle="#30343b";
    ctx.fillText(wavePrecision(yy),ox+10,py+4);
  }

  /* Common exact y landmarks */
  if(zoom>=1.15){
    const marks=[[1,"1"],[Math.sqrt(3)/2,"√3/2"],[Math.sqrt(2)/2,"1/√2"],
      [.5,"1/2"],[-.5,"−1/2"],[-Math.sqrt(2)/2,"−1/√2"],
      [-Math.sqrt(3)/2,"−√3/2"],[-1,"−1"]];
    ctx.font="11px Times New Roman";
    ctx.fillStyle="#466b8a";
    for(const [v,label] of marks){
      const py=oy-v*ys;
      if(py>10&&py<H-8) ctx.fillText(label,ox-62,py+4);
    }
  }

  /* Function curve */
  ctx.strokeStyle="#111";
  ctx.lineWidth=2.5;
  ctx.beginPath();
  let prev=null;
  const samples=Math.min(120000,Math.ceil(W*1.5));
  for(let i=0;i<=samples;i++){
    const px=i/samples*W;
    const t=(px-ox)/ppr;
    const v=getFunctionValue(func,t);
    if(!Number.isFinite(v)||Math.abs(v)>8){prev=null;continue;}
    const py=oy-v*ys;
    if(prev===null||Math.abs(py-prev.y)>H*.35) ctx.moveTo(px,py);
    else ctx.lineTo(px,py);
    prev={x:px,y:py};
  }
  ctx.stroke();

  /* Moving red point. 360° remains at 2π, not 0. */
  let angle=Number(functionAngleInput?.value ?? functionAngle?.value ?? 0);
  if(!Number.isFinite(angle)) angle=0;
  let principal=getPrincipalAngleDegrees(angle);
  const graphAngle=(Math.abs(principal)<1e-9&&Math.abs(angle-360)<1e-9)?360:principal;
  const theta=degToRad(graphAngle);
  const value=getFunctionValue(func,theta);
  const px=ox+theta*ppr;

  if(Number.isFinite(value)&&Math.abs(value)<=8&&px>=0&&px<=W){
    const py=oy-value*ys;

    /* perpendiculars from the moving point */
    ctx.strokeStyle="rgba(235,35,35,.58)";
    ctx.lineWidth=1.6;
    ctx.setLineDash([6,5]);
    ctx.beginPath();
    ctx.moveTo(px,oy);ctx.lineTo(px,py);
    ctx.moveTo(ox,py);ctx.lineTo(px,py);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle="#e21d2f";
    ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);ctx.fill();

    ctx.font="bold 12px Arial";
    ctx.fillStyle="#111";
    const xTxt="x = "+wavePiLabel(theta);
    const yTxt="y = "+wavePrecision(value);
    ctx.fillText(xTxt,Math.max(8,px-25),Math.min(H-10,oy+40));
    ctx.fillText(yTxt,Math.min(W-110,px+12),Math.max(18,py-12));
  }

  /* Principal-range underline */
  const ranges={
    sin:[[-Math.PI/2,Math.PI/2]], cos:[[0,Math.PI]],
    tan:[[-Math.PI/2,Math.PI/2]], cot:[[0,Math.PI]],
    sec:[[0,Math.PI]], cosec:[[-Math.PI/2,Math.PI/2]]
  };
  ctx.save();
  ctx.strokeStyle="rgba(70,160,235,.58)";
  ctx.lineWidth=3;ctx.lineCap="round";
  for(const [a,b] of (ranges[func]||[])){
    ctx.beginPath();
    ctx.moveTo(ox+a*ppr,oy+30);ctx.lineTo(ox+b*ppr,oy+30);ctx.stroke();
  }
  ctx.restore();

  /* Existing right-side value card remains authoritative. */
  if(functionTitle) functionTitle.innerText=func+"(θ)";
  if(functionValue) functionValue.innerText=Number.isFinite(value)?wavePrecision(value):"undefined";

  const zoomLabel=document.getElementById("waveZoomValue");
  if(zoomLabel) zoomLabel.innerText=Math.round(zoom*100)+"%";

  if(options.centerPoint&&scroll){
    requestAnimationFrame(()=>centerWaveOnAngle());
  }
}

window.drawFunction=drawWaveReplacement;

window.changeWaveZoom=function(delta){
  const current=Number(window.waveZoom)||1;
  window.waveZoom=Math.max(TG_WAVE.minZoom,Math.min(TG_WAVE.maxZoom,current+(delta>0?0.25:-0.25)*Math.max(1,current*.15)));
  drawWaveReplacement(currentFunction,{centerPoint:false});
};

window.resetWaveZoom=function(){
  window.waveZoom=1;
  drawWaveReplacement(currentFunction,{centerPoint:true});
};

/* Trig-Ship bridge for the replaced wave only. */
window.TrigWave=Object.assign(window.TrigWave||{},{
  setFunction(name){
    name=String(name||"").toLowerCase();
    if(["sin","cos","tan","cot","sec","cosec"].includes(name)){
      selectFunction(name);
      return true;
    }
    return false;
  },
  setAngle(degrees){
    const el=document.getElementById("functionAngleInput");
    if(!el) return false;
    el.value=Number(degrees);
    el.dispatchEvent(new Event("input",{bubbles:true}));
    return true;
  },
  setCoordinates(x,y){
    x=Number(x);
    if(!Number.isFinite(x)) return false;
    return this.setAngle(x*180/Math.PI);
  },
  getState(){
    const a=Number(document.getElementById("functionAngleInput")?.value||0);
    const t=degToRad(a);
    const y=getFunctionValue(currentFunction,t);
    return {function:currentFunction,angleDegrees:a,angleRadians:t,x:t,y:Number.isFinite(y)?y:null,zoom:Number(window.waveZoom)||1};
  }
});

})();

/* =====================================================
   WHOLE PROGRAM FIT / RESIZE
   Bottom-right handle scales the complete application.
   Drag in ANY direction: left/up = smaller, right/down = larger.
   Double click / double tap = 100%.
   ===================================================== */
(function enableProgramFit() {
  'use strict';
  var shell = document.getElementById('program-shell');
  var handle = document.getElementById('program-fit-handle');
  if (!shell || !handle) return;

  var MIN = 0.40, MAX = 1.30;
  var scale = 1, startX = 0, startY = 0, startScale = 1;
  var resizing = false, lastTap = 0, pointerId = null;

  function apply(value) {
    scale = Math.max(MIN, Math.min(MAX, Number(value) || 1));
    shell.style.setProperty('--program-scale', String(scale));
    /* zoom is supported by Chromium (including Chrome on Android) and
       changes both visual size and layout footprint. The transform fallback
       below also preserves the document footprint on browsers without zoom. */
    if (window.CSS && CSS.supports && CSS.supports('zoom: 1')) {
      shell.style.zoom = String(scale);
      shell.style.width = '100%';
      shell.style.transform = 'none';
      shell.style.marginBottom = '0';
    } else {
      shell.style.zoom = '';
      shell.style.width = (100 / scale) + '%';
      shell.style.transformOrigin = 'top left';
      shell.style.transform = 'scale(' + scale + ')';
      shell.style.marginBottom = Math.max(0, shell.offsetHeight * scale - shell.offsetHeight) + 'px';
    }
    handle.setAttribute('aria-valuenow', String(Math.round(scale * 100)));
    handle.setAttribute('aria-valuetext', Math.round(scale * 100) + '%');
  }

  function begin(x, y, id) {
    startX=x; startY=y; startScale=scale; resizing=true; pointerId=id;
    document.body.classList.add('program-is-resizing');
  }
  function move(x, y, e) {
    if (!resizing) return;
    if (e && e.cancelable) e.preventDefault();
    var dx=x-startX, dy=y-startY;
    /* Horizontal OR vertical movement controls scale; diagonal movement uses
       the dominant axis, so every direction behaves predictably. */
    var delta = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
    apply(startScale + delta / 180);
  }
  function stop(e) {
    if (!resizing) return;
    if (e && e.cancelable) e.preventDefault();
    resizing=false; pointerId=null;
    document.body.classList.remove('program-is-resizing');
  }
  function reset(e) { if(e && e.preventDefault)e.preventDefault(); apply(1); }

  if (window.PointerEvent) {
    handle.addEventListener('pointerdown', function(e){
      if(e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      begin(e.clientX,e.clientY,e.pointerId);
      try{handle.setPointerCapture(e.pointerId);}catch(_){ }
    }, {passive:false});
    window.addEventListener('pointermove', function(e){
      if(pointerId !== null && e.pointerId !== pointerId) return;
      move(e.clientX,e.clientY,e);
    }, {passive:false});
    window.addEventListener('pointerup', stop, {passive:false});
    window.addEventListener('pointercancel', stop, {passive:false});
  } else {
    handle.addEventListener('mousedown',function(e){e.preventDefault();begin(e.clientX,e.clientY,'mouse');});
    window.addEventListener('mousemove',function(e){move(e.clientX,e.clientY,e);});
    window.addEventListener('mouseup',stop);
    handle.addEventListener('touchstart',function(e){
      var t=e.touches[0]; if(!t)return; e.preventDefault(); begin(t.clientX,t.clientY,'touch');
    },{passive:false});
    window.addEventListener('touchmove',function(e){
      if(!resizing || !e.touches[0])return; e.preventDefault();
      var t=e.touches[0]; move(t.clientX,t.clientY,e);
    },{passive:false});
    window.addEventListener('touchend',stop,{passive:false});
    window.addEventListener('touchcancel',stop,{passive:false});
  }

  handle.addEventListener('dblclick',reset);
  handle.addEventListener('wheel',function(e){
    e.preventDefault(); apply(scale + (e.deltaY < 0 ? .05 : -.05));
  },{passive:false});
  handle.addEventListener('pointerup',function(){
    var now=Date.now();
    if(now-lastTap < 380) apply(1);
    lastTap=now;
  });
  handle.addEventListener('keydown',function(e){
    var step=.05;
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();apply(scale-step);}
    else if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();apply(scale+step);}
    else if(e.key==='Home'||e.key==='0'){e.preventDefault();apply(1);}
  });

  handle.setAttribute('role','slider');
  handle.setAttribute('aria-valuemin','40');
  handle.setAttribute('aria-valuemax','130');
  handle.tabIndex=0;
  apply(1);
})();

/* Learning Hub renderer.
   Supports PDFs, normal web links, YouTube links and future post links.
   PDF resources open inside the site in a viewer and also offer download.
*/
(function(){
  'use strict';
  function escapeHtml(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  var CLASS_OPTIONS=['Class 9','Class 10','Class 11','Class 12','Other'];
  var SUBJECT_OPTIONS=['Mathematics (Maths)','Chemistry','Physics','English','Other'];

  function pdfUrl(file){
    if(!file)return '';
    try{
      var clean=String(file).replace(/^\.\//,'');
      return new URL(clean, document.baseURI).href;
    }catch(e){return file;}
  }

  function githubPagesPdfCandidates(file){
    var list=[];
    if(!file)return list;
    var clean=String(file).replace(/^\.\//,'').replace(/^\//,'');
    try{
      list.push(new URL(clean, document.baseURI).href);
      /* Project Pages fallback: keep the repository sub-path if the page is
         served from /REPO/. */
      var path=location.pathname;
      var repoBase=path.split('/').filter(Boolean)[0];
      if(repoBase && repoBase.indexOf('.')===-1) list.push(location.origin+'/'+repoBase+'/'+clean);
      list.push(location.origin+'/'+clean);
    }catch(e){}
    return list.filter(function(v,i,a){return v && a.indexOf(v)===i;});
  }

  function initLearningHub(){
    var grid=document.getElementById('notesGrid');
    var classFilter=document.getElementById('notesClassFilter');
    var subjectFilter=document.getElementById('notesSubjectFilter');
    var accessFilter=document.getElementById('notesAccessFilter');
    var support=document.getElementById('supportProjectButton');
    if(!grid||!classFilter||!subjectFilter||!accessFilter)return;

    var notes=Array.isArray(window.TRIGO_NOTES)?window.TRIGO_NOTES.slice():[];
    if(!notes.length){
      notes=[{id:'system-of-quadrants-trigonometry-notes',title:'The System of Quadrants — Trigonometry Notes',classLevel:'All Classes',classLevels:['Class 9','Class 10','Class 11','Class 12','Other'],subject:'Mathematics (Maths)',status:'free',type:'pdf',description:'Handwritten concept notes covering the system of quadrants and coordinate-plane sign ideas used in trigonometry.',tags:['quadrants','trigonometry','free notes'],file:'pdfs/system-of-quadrants-trigonometry-notes.pdf',actionLabel:'Open PDF'}];
    }

    function ensureOptions(select,values,allLabel){
      var current=select.value;
      select.innerHTML='<option value="all">'+escapeHtml(allLabel)+'</option>'+values.map(function(v){return '<option value="'+escapeHtml(v)+'">'+escapeHtml(v)+'</option>';}).join('');
      if(values.indexOf(current)>=0)select.value=current;
    }
    ensureOptions(classFilter,CLASS_OPTIONS,'All Classes');
    ensureOptions(subjectFilter,SUBJECT_OPTIONS,'All Subjects');

    function actionFor(n){
      var target=n.type==='pdf'?pdfUrl(n.file):n.url;
      if(!target)return '';
      var label=n.actionLabel||(n.type==='pdf'?'Open PDF':'Open Link');
      if(n.type==='pdf'){
        return '<div class="note-actions">'+
          '<button class="note-open-button" type="button" data-pdf-file="'+escapeHtml(n.file||'')+'" data-pdf-url="'+escapeHtml(target)+'" data-pdf-title="'+escapeHtml(n.title)+'">'+escapeHtml(label)+'</button>'+ 
          '<a class="note-download-button" href="'+escapeHtml(target)+'" download>Download PDF</a>'+ 
          '<a class="note-direct-button" href="'+escapeHtml(target)+'" target="_blank" rel="noopener noreferrer">Open in new tab</a>'+ 
          '</div>';
      }
      return '<div class="note-actions"><a class="note-open-button" href="'+escapeHtml(target)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(label)+'</a></div>';
    }

    function typeLabel(n){
      if(n.type==='pdf')return 'PDF';
      if(n.type==='youtube')return 'YouTube';
      if(n.type==='post')return 'Post';
      return 'Web Link';
    }

    function render(){
      var c=classFilter.value,s=subjectFilter.value,a=accessFilter.value;
      var filtered=notes.filter(function(n){
        var levels=Array.isArray(n.classLevels)?n.classLevels:(n.classLevel==='All Classes'?CLASS_OPTIONS:[n.classLevel]);
        return (c==='all'||levels.indexOf(c)>=0)&&(s==='all'||n.subject===s)&&(a==='all'||n.status===a);
      });
      grid.innerHTML=filtered.length?filtered.map(function(n){
        var tags=(Array.isArray(n.tags)?n.tags:[]).map(function(t){return '<span class="note-tag">'+escapeHtml(t)+'</span>';}).join('');
        return '<article class="note-card"><div class="note-card-top"><span class="note-status '+escapeHtml(n.status)+'">'+escapeHtml(n.status)+'</span><span class="note-type">'+escapeHtml(typeLabel(n))+'</span></div><h3>'+escapeHtml(n.title)+'</h3><div class="note-meta">'+escapeHtml(n.classLevel)+' · '+escapeHtml(n.subject)+'</div><p>'+escapeHtml(n.description)+'</p><div class="note-tags">'+tags+'</div>'+actionFor(n)+'</article>';
      }).join(''):'<div class="card notes-empty"><h3>No resource here yet</h3><p>More PDFs and links will be added gradually.</p></div>';
    }

    [classFilter,subjectFilter,accessFilter].forEach(function(el){el.addEventListener('change',render);});
    if(support)support.href=window.TRIGO_SUPPORT_URL||'#';
    render();

    grid.addEventListener('click',function(e){
      var btn=e.target.closest('.note-open-button[data-pdf-url]');
      if(!btn)return;
      var url=btn.getAttribute('data-pdf-url');
      var file=btn.getAttribute('data-pdf-file')||'';
      var title=btn.getAttribute('data-pdf-title')||'PDF';
      var viewer=document.getElementById('pdfViewerModal');
      var frame=document.getElementById('pdfViewerFrame');
      var heading=document.getElementById('pdfViewerTitle');
      var download=document.getElementById('pdfViewerDownload');
      if(!viewer||!frame||!download)return;
      if(heading)heading.textContent=title;
      /* Try the normal project-relative URL first. If GitHub Pages is using a
         different repository base, fall back to the other valid candidates. */
      var candidates=githubPagesPdfCandidates(file);
      if(!candidates.length)candidates=[url];
      var index=0;
      function loadCandidate(){
        frame.src=candidates[index]||url;
        download.href=candidates[index]||url;
      }
      frame.onerror=function(){
        if(index<candidates.length-1){index++;loadCandidate();}
      };
      loadCandidate();
      viewer.hidden=false;
      document.body.classList.add('pdf-viewer-open');
    });

    fetch(new URL('pdfs/manifest.json',document.baseURI).href,{cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('manifest unavailable');return r.json();})
      .then(function(extra){
        if(!Array.isArray(extra))return;
        var byId={}; notes.forEach(function(n){byId[n.id]=n;});
        extra.forEach(function(n){if(n&&n.id)byId[n.id]=Object.assign({},byId[n.id]||{},n);});
        notes=Object.keys(byId).map(function(k){return byId[k];}); render();
      }).catch(function(){/* notes.js remains usable */});
  }

  function closeViewer(){
    var viewer=document.getElementById('pdfViewerModal');
    var frame=document.getElementById('pdfViewerFrame');
    if(frame)frame.src='about:blank';
    if(viewer)viewer.hidden=true;
    document.body.classList.remove('pdf-viewer-open');
  }

  document.addEventListener('click',function(e){
    if(e.target.closest('[data-close-pdf-viewer]'))closeViewer();
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeViewer();});

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initLearningHub);else initLearningHub();
})();

