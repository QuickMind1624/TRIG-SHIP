
/* TRIG-SHIP Pythagoras teaching module v2
   Future external program hook:
   window.TRIG_SHIP_PYTHAGORAS_URL = "https://example.com/your-pythagoras-program";
*/
(function(){
  "use strict";

  function frac(num, den){
    return '<span class="ts-vertical-fraction"><span class="ts-num">'+num+
           '</span><span class="ts-den">'+den+'</span></span>';
  }

  function renderPythagoras(host){
    if(!host) return;

    host.innerHTML = `
      <div class="ts-pythagoras-card" style="padding:16px;border:1px solid rgba(255,255,255,.25);border-radius:16px;">
        <h3>Pythagoras → Trigonometry</h3>

        <div class="ts-mobile-scroll-card" aria-label="Pythagoras triangle">
          <svg viewBox="0 0 720 430" role="img" aria-label="Right triangle showing base, perpendicular and hypotenuse"
               style="background:rgba(255,255,255,.035);border-radius:12px">
            <path d="M105 350 L600 350 L600 105 Z" fill="none" stroke="#3b82f6" stroke-width="6" stroke-linejoin="round"/>
            <path d="M600 105 L600 350" fill="none" stroke="#22c55e" stroke-width="10" stroke-linecap="round"/>
            <path d="M105 350 L600 350" fill="none" stroke="#f59e0b" stroke-width="10" stroke-linecap="round"/>
            <path d="M105 350 L600 105" fill="none" stroke="#60a5fa" stroke-width="10" stroke-linecap="round"/>
            <path d="M570 350 L570 320 L600 320" fill="none" stroke="#22c55e" stroke-width="4"/>
            <text x="350" y="398" text-anchor="middle" font-size="25" fill="#f59e0b">Base (B)</text>
            <text x="660" y="228" text-anchor="middle" font-size="25" fill="#22c55e" transform="rotate(90 660 228)">Perpendicular (P)</text>
            <text x="330" y="190" text-anchor="middle" font-size="25" fill="#60a5fa" transform="rotate(-26 330 190)">Hypotenuse (H)</text>
            <path d="M145 350 A40 40 0 0 0 140.90 332.20" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
            <text x="151" y="327" font-size="22" fill="#f59e0b">θ</text>
          </svg>
        </div>

        <div class="ts-equation-step">
          <span><b>P² + B² = H²</b></span>
        </div>

        <div class="ts-equation-step">
          <span>Divide the <b>whole equation</b> by H²:</span>
        </div>

        <div class="ts-equation-step" style="font-size:1.25em">
          <span>${frac("P²","H²")}</span>
          <span>+</span>
          <span>${frac("B²","H²")}</span>
          <span>=</span>
          <span>${frac("H²","H²")}</span>
        </div>

        <div class="ts-equation-step">
          <span>Now identify the two ratios:</span>
        </div>

        <div class="ts-equation-step" style="font-size:1.18em">
          <span>${frac("P","H")} = sin θ</span>
          <span>&nbsp;&nbsp;</span>
          <span>${frac("B","H")} = cos θ</span>
        </div>

        <div class="ts-equation-step" style="font-size:1.25em">
          <span>${frac("P²","H²")} = sin² θ</span>
          <span>+</span>
          <span>${frac("B²","H²")} = cos² θ</span>
        </div>

        <div class="ts-equation-step">
          <b>Therefore:</b>
          <span style="font-size:1.35em"><b>sin² θ + cos² θ = 1</b></span>
        </div>

        <hr>

        <h4>Derive the other identities</h4>

        <div class="ts-equation-step">
          <span>Divide sin²θ + cos²θ = 1 by cos²θ:</span>
        </div>
        <div class="ts-equation-step" style="font-size:1.15em">
          <span>${frac("sin² θ","cos² θ")}</span>
          <span>+</span>
          <span>${frac("cos² θ","cos² θ")}</span>
          <span>=</span>
          <span>${frac("1","cos² θ")}</span>
        </div>
        <div class="ts-equation-step">
          <b>tan²θ + 1 = sec²θ</b>
        </div>

        <div class="ts-equation-step">
          <span>Divide sin²θ + cos²θ = 1 by sin²θ:</span>
        </div>
        <div class="ts-equation-step" style="font-size:1.15em">
          <span>${frac("sin² θ","sin² θ")}</span>
          <span>+</span>
          <span>${frac("cos² θ","sin² θ")}</span>
          <span>=</span>
          <span>${frac("1","sin² θ")}</span>
        </div>
        <div class="ts-equation-step">
          <b>1 + cot²θ = cosec²θ</b>
        </div>

        <hr>

        <h4>Why sin θ = cos(90° − θ)</h4>
        <div class="ts-mobile-scroll-card" aria-label="Right triangle showing complementary angles">
          <svg viewBox="0 0 720 430" role="img" aria-label="Right triangle with angles theta and 90 minus theta"
               style="background:rgba(255,255,255,.035);border-radius:12px">
            <path d="M105 350 L600 350 L600 105 Z" fill="none" stroke="#3b82f6" stroke-width="6" stroke-linejoin="round"/>
            <path d="M600 105 L600 350" fill="none" stroke="#22c55e" stroke-width="10" stroke-linecap="round"/>
            <path d="M105 350 L600 350" fill="none" stroke="#f59e0b" stroke-width="10" stroke-linecap="round"/>
            <path d="M105 350 L600 105" fill="none" stroke="#60a5fa" stroke-width="10" stroke-linecap="round"/>
            <path d="M570 350 L570 320 L600 320" fill="none" stroke="#22c55e" stroke-width="4"/>
            <path d="M145 350 A40 40 0 0 0 140.90 332.20" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
            <text x="151" y="327" font-size="22" fill="#f59e0b">θ</text>
            <path d="M600 145 A40 40 0 0 1 564.10 122.80" fill="none" stroke="#a855f7" stroke-width="4" stroke-linecap="round"/>
            <text x="520" y="105" font-size="20" fill="#a855f7">90° − θ</text>
            <text x="350" y="398" text-anchor="middle" font-size="24" fill="#f59e0b">Adjacent to θ → opposite to (90° − θ)</text>
            <text x="662" y="230" text-anchor="middle" font-size="24" fill="#22c55e" transform="rotate(90 662 230)">Opposite to θ → adjacent to (90° − θ)</text>
          </svg>
        </div>

        <div class="ts-equation-step">
          <span>For angle θ:</span>
          <span>${frac("opposite","hypotenuse")} = sin θ</span>
        </div>
        <div class="ts-equation-step">
          <span>For angle (90° − θ):</span>
          <span>${frac("adjacent","hypotenuse")} = cos(90° − θ)</span>
        </div>
        <div class="ts-equation-step">
          <span>The same side is opposite to θ and adjacent to (90° − θ).</span>
        </div>
        <div class="ts-equation-step" style="font-size:1.3em">
          <b>Therefore: sin θ = cos(90° − θ)</b>
        </div>
        <div class="ts-equation-step">
          <small>Here this is the complementary-angle relation; later the graph/angle-sum system can show the broader angle relationships visually.</small>
        </div>

        <hr>

        <h4>Same identity from the unit circle</h4>
        <div class="ts-equation-step">
          <span><b>x² + y² = 1</b></span>
          <span>→</span>
          <span><b>x = cosθ</b></span>
          <span>,</span>
          <span><b>y = sinθ</b></span>
        </div>
        <div class="ts-equation-step" style="font-size:1.25em">
          <b>cos²θ + sin²θ = 1</b>
        </div>

        <div id="ts-pythagoras-future-link" style="text-align:center;margin-top:18px"></div>
      </div>
    `;

    var url = window.TRIG_SHIP_PYTHAGORAS_URL;
    if(url){
      var a=document.createElement("a");
      a.href=url; a.target="_blank"; a.rel="noopener";
      a.textContent="Open the Pythagoras program →";
      a.style.display="inline-block";
      a.style.marginTop="10px";
      document.getElementById("ts-pythagoras-future-link").appendChild(a);
    }
  }

  window.TRIGShipPythagorasV2 = { render: renderPythagoras };
})();
