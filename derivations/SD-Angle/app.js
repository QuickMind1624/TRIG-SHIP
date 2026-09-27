const angles=[0,3,6,12,15,18,24,27,30,42,45,48,54,60,72,75,90];
const sinValues={
0:'0',3:'[(√5−1)(√6+√2) − √(10+2√5)(√6−√2)] / 16',6:'[√(30−6√5) − (1+√5)] / 8',12:'[√(10+2√5) − √3(√5−1)] / 8',15:'(√6−√2) / 4',18:'(√5−1) / 4',24:'[√3(1+√5) − √(10−2√5)] / 8',27:'[2√(5+√5) − √10 + √2] / 8',30:'1 / 2',42:'[√(30+6√5) − √5 + 1] / 8',45:'√2 / 2',48:'[√(10+2√5) + √3(√5−1)] / 8',54:'(√5+1) / 4',60:'√3 / 2',72:'√(10+2√5) / 4',75:'(√6+√2) / 4',90:'1'};
const cosValues={
0:'1',3:'[√(10+2√5)(√6+√2) + (√5−1)(√6−√2)] / 16',6:'[√(30+6√5) + (1+√5)] / 8',12:'[√(10−2√5) + √3(√5−1)] / 8',15:'(√6+√2) / 4',18:'√(10+2√5) / 4',24:'[√3(1+√5) + √(10−2√5)] / 8',27:'[2√(5+√5) + √10 − √2] / 8',30:'√3 / 2',42:'[√(30−6√5) + √5 − 1] / 8',45:'√2 / 2',48:'[√(10−2√5) + √3(√5−1)] / 8',54:'(√5−1) / 4',60:'1 / 2',72:'(√5−1) / 4',75:'(√6−√2) / 4',90:'0'};

// Formula folders are intentionally separate from the main value folders.
// A "DERIVE" button beside a formula opens the the formula own derivation.
const formulaDerivations={
'sin-sum':{
 title:'sin(A + B)', intro:'We do not ask the learner to accept the addition formula as a black box. This folder derives it from coordinates on the unit circle.',
 steps:[
  ['Start with two rotations','Take a unit vector making angle A with the positive x-axis. Rotate it by B. The final angle is A+B.','The addition formula must describe the coordinates after two successive rotations.'],
  ['Coordinates before the second rotation','v=(cosA, sinA).','On the unit circle, cosine is the x-coordinate and sine is the y-coordinate.'],
  ['Rotation by B','A rotation through B changes (x,y) to (x cosB − y sinB, x sinB + y cosB).','This is the coordinate form of a 2D rotation. It preserves length and rotates direction by B.'],
  ['Substitute the original coordinates','v′=(cosA cosB − sinA sinB, cosA sinB + sinA cosB).','Replace x by cosA and y by sinA from the previous step.'],
  ['Read the final y-coordinate','sin(A+B)=cosA sinB + sinA cosB.','The final vector has angle A+B, and on the unit circle its y-coordinate is sin(A+B).'],
  ['Reorder the two products','sin(A+B)=sinA cosB + cosA sinB.','Addition is commutative, so the two terms may be written in the familiar order.'],
  ['Final','sin(A+B)=sinA cosB + cosA sinB','The identity has been derived rather than assumed.']
 ]},
'sin-difference':{
 title:'sin(A − B)', intro:'The difference formula is derived from the addition formula by replacing B with −B, then using the signs of sine and cosine for a negative angle.',
 steps:[
  ['Start from the derived addition formula','sin(A+B)=sinA cosB + cosA sinB','We already derived this formula in the parent formula folder.'],
  ['Replace B by −B','sin(A−B)=sinA cos(−B)+cosA sin(−B)','Because A+(−B)=A−B.'],
  ['Use parity','cos(−B)=cosB and sin(−B)=−sinB.','Cosine is even; sine is odd.'],
  ['Substitute those signs','sin(A−B)=sinA cosB − cosA sinB','The plus sign before cosA×sin(−B) becomes a minus because sin(−B)=−sinB.'],
  ['Final','sin(A−B)=sinA cosB − cosA sinB','The difference formula is now obtained from the addition formula.']
 ]},
'cos-double':{
 title:'cos(2x)', intro:'This folder derives the cosine double-angle identity from the cosine addition formula, without treating it as a given.',
 steps:[
  ['Write 2x as x+x','cos(2x)=cos(x+x)','We rewrite 2x as a sum because the cosine addition identity applies to an angle of the form A+B.'],
  ['Apply cosine addition','cos(x+x)=cosx cosx−sinx sinx','Use cos(A+B)=cosA cosB−sinA sinB with A=x and B=x.'],
  ['Write repeated products as squares','cos(2x)=cos²x−sin²x','By definition, cosx×cosx=cos²x and sinx×sinx=sin²x.'],
  ['Final','cos(2x)=cos²x−sin²x','The double-angle cosine identity has been derived directly from the addition identity.']
 ]},
'cos-triple':{
 title:'cos(3x)', intro:'This folder shows where the triple-angle identity used in the sin18° derivation comes from.',
 steps:[
  ['Write 3x as x+2x','cos3x=cos(x+2x)','This lets us use the cosine addition formula.'],
  ['Use cosine addition','cos(x+2x)=cosx cos2x − sinx sin2x','This is cos(A+B)=cosA cosB−sinA sinB.'],
  ['Expand cos2x','cos(2x)=cos²x−sin²x','This is not accepted as a given here. The DERIVE control opens the independent derivation of cos(2x).'],
  ['Expand sin2x','sin2x=2sinx cosx','This is the double-angle sine identity.'],
  ['Substitute','cos3x=cosx(cos²x−sin²x)−sinx(2sinx cosx)','Insert both double-angle results.'],
  ['Distribute','cos3x=cos³x−cosx sin²x−2sin²x cosx','Distribute cosx and −sinx across their parentheses.'],
  ['Collect cosine terms','cos3x=cos³x−3cosx sin²x','The two terms containing cosx×sin²x combine: −1−2=−3.'],
  ['Choose a cosine-only form','cos3x=cos³x−3cosx(1−cos²x)','The identity sin²x+cos²x=1 gives sin²x=1−cos²x. We deliberately choose this form because this derivation is being kept entirely in terms of cosx. We could leave sin²x here, but then the final triple-angle expression would still mix sine and cosine. Using 1−cos²x removes sinx from the expression and produces a cosine-only identity.'],
  ['Expand','cos3x=cos³x−3cosx+3cos³x','Distribute −3cosx.'],
  ['Collect like terms','cos3x=4cos³x−3cosx','cos³x+3cos³x=4cos³x.'],
  ['Final','cos3x=4cos³x−3cosx','This is the exact identity used later.']
 ]},
'sin-double':{
 title:'sin(2x)', intro:'The double-angle sine formula is not treated as a given; it comes directly from the addition formula.',
 steps:[
  ['Write 2x as x+x','sin2x=sin(x+x)','This puts the target into the form required by the addition formula.'],
  ['Apply sine addition','sin(x+x)=sinx cosx + cosx sinx','Use sin(A+B)=sinA cosB+cosA sinB.'],
  ['Identify equal terms','sin2x=sinx cosx + sinx cosx','Multiplication is commutative, so cosx sinx=sinx cosx.'],
  ['Combine','sin2x=2sinx cosx','Two identical terms add to twice one term.'],
  ['Final','sin2x=2sinx cosx','The formula used in the sin18° route has now been derived.']
 ]},
'cofunction':{
 title:'sin(90° − θ) = cosθ', intro:'The cofunction relation follows directly from the complementary-angle definitions in a right triangle.',
 steps:[
  ['Take an acute angle θ','Consider a right triangle containing θ.','The other acute angle must be 90°−θ because the two acute angles sum to 90°.'],
  ['Write sine of the complement','sin(90°−θ)=opposite to (90°−θ) / hypotenuse.','This is the definition of sine.'],
  ['Identify the opposite side','The side opposite (90°−θ) is the side adjacent to θ.','In a right triangle, the side opposite one acute angle is adjacent to the other.'],
  ['Rewrite the ratio','sin(90°−θ)=adjacent to θ / hypotenuse.','Only the name of the side has changed; the physical side is the same.'],
  ['Recognise cosine','cosθ=adjacent to θ / hypotenuse.','This is the definition of cosine.'],
  ['Final','sin(90°−θ)=cosθ','Therefore cosine can be evaluated through the sine of its complementary angle.']
 ]}
};

const sinDeep={
0:[['Choose the geometry','On the unit circle, the point corresponding to 0° is (1, 0).','Sine is the y-coordinate of the unit-circle point.'],['Read the coordinate','sin(0°)=0','The y-coordinate is exactly zero.'],['Final','sin(0°)=0','No approximation is involved.']],
3:[['Decompose the angle','3°=18°−15°','We choose 18° and 15° because both are already connected to exact derivations.'],['Open the difference identity','sin(18°−15°)=sin18° cos15°−cos18° sin15°','This is not treated as a magic formula. The adjacent DERIVE control opens its derivation.'],['Insert exact values','sin3°=[(√5−1)/4]×[(√6+√2)/4]−[√(10+2√5)/4]×[(√6−√2)/4]','Each component is substituted in exact symbolic form.'],['Put both products over one denominator','sin3°=[(√5−1)(√6+√2)−√(10+2√5)(√6−√2)]/16','Every factor contributes a denominator 4, so each product has denominator 16.'],['Final','sin3°=[(√5−1)(√6+√2)−√(10+2√5)(√6−√2)]/16','Exact radical form. No decimal approximation is used.']],
6:[['Choose a decomposition','6°=30°−24°','30° is standard and 24° is already an exact folder in this program.'],['Open the difference identity','sin6°=sin30° cos24°−cos30° sin24°','The identity itself can be opened through DERIVE; it is not a black box.'],['Substitute exact values','sin6°=(1/2)×[√3(1+√5)+√(10−2√5)]/8−(√3/2)×[√3(1+√5)−√(10−2√5)]/8','Keep every radical exact.'],['Multiply carefully','sin6°=[√3(1+√5)+√(10−2√5)−3(1+√5)+√3√(10−2√5)]/16','Distribute each numerator factor and multiply √3×√3=3.'],['Independent half-angle route','6°=12°/2. Therefore sin²6°=[1−cos12°]/2.','The half-angle relation gives an independent route for checking the result.'],['Choose the positive root','sin6°>0 because 6° lies in the first quadrant.','So after taking the square root, the positive branch is required.'],['Final','sin6°=[√(30−6√5)−(1+√5)]/8','The exact value is the same through the independent route.']],
12:[['Decompose','12°=30°−18°','Both angles have exact values derived elsewhere.'],['Open the difference identity','sin12°=sin30° cos18°−cos30° sin18°','The DERIVE control beside this identity explains where it comes from.'],['Substitute','=(1/2)×[√(10+2√5)/4]−(√3/2)×[(√5−1)/4]','No decimal approximation is introduced.'],['Multiply numerator factors','=[√(10+2√5)−√3(√5−1)]/8','Each term has denominator 8 after multiplication.'],['Final','sin12°=[√(10+2√5)−√3(√5−1)]/8','Exact radical expression.']],
15:[['Choose two known angles','15°=45°−30°','45° and 30° have direct geometric constructions.'],['Open the difference identity','sin15°=sin45° cos30°−cos45° sin30°','The formula is linked to its own derivation.'],['Substitute','=(√2/2)(√3/2)−(√2/2)(1/2)','Insert exact values only.'],['Multiply','=√6/4−√2/4','Multiply numerators and denominators separately.'],['Combine','=(√6−√2)/4','The denominator is common.'],['Final','sin15°=(√6−√2)/4','Exact value.']],
18:[['Set the target variable','Let x=18°.','We name the target angle x so that multiple-angle expressions can be manipulated algebraically.'],['Establish the key numerical relation','5x=90°','Because x=18°, multiplying both sides by 5 gives 5×18°=90°.','18°×5=90°'],['Split 5x into 2x+3x','5x=2x+3x','The reason for this split is strategic: 2x has a double-angle identity and 3x has a triple-angle identity.'],['Convert that into a complement','2x+3x=90° ⇒ 2x=90°−3x','Subtract 3x from both sides. This creates the complementary angle needed to connect sine and cosine.'],['Take sine of both sides','sin2x=sin(90°−3x)','Equal angles have equal sine values.'],['Use the complementary relation','sin2x=cos3x','The cofunction identity converts sine of a complementary angle into cosine. A reason is enough here; there is no DERIVE button on this line.'],['Rewrite the left side','sin2x=2sinx cosx','We now use the double-angle sine identity, whose derivation is already part of the sine-addition chain. This line is not given a separate DERIVE button so the learner is not sent to a derivation that merely repeats the same context.'],['Derive the right side','cos3x=4cos³x−3cosx','This identity has its own DERIVE folder. Open it to see 3x=x+2x, cosine addition, the independently derived cos(2x), the sine double-angle step, factor collection, and the deliberate conversion to a cosine-only expression.'],['Equate the two derived forms','2sinx cosx=4cos³x−3cosx','Both expressions equal the same quantity cos3x, so they are equal to each other.'],['Factor the common cosine','cosx(2sinx)=cosx(4cos²x−3)','We have only rearranged each side to display the common factor cosx explicitly.'],['Check division is legal','cos18°≠0','18° is not 90°+k×180°, so its cosine is non-zero. Therefore dividing by cosx does not discard a valid solution.'],['Divide by cosx','2sinx=4cos²x−3','Cancel the common non-zero factor cosx from both sides.'],['Replace cos²x','2sinx=4(1−sin²x)−3','From sin²x+cos²x=1, rearrange to cos²x=1−sin²x.'],['Distribute 4','2sinx=4−4sin²x−3','Multiply every term inside the parentheses by 4.'],['Simplify constants','2sinx=1−4sin²x','4−3=1.'],['Move all terms to one side','4sin²x+2sinx−1=0','Add 4sin²x to both sides and subtract 2sinx from both sides. This puts the equation in standard quadratic form.'],['Introduce an algebraic variable','Let y=sinx.','Replacing the repeated expression sinx by y makes the quadratic structure visible.'],['Rewrite the quadratic','Then 4y²+2y−1=0','Every sinx in the previous equation is replaced by y, and nothing else changes.'],['Identify a,b,c','a=4, b=2, c=−1','These are exactly the coefficients required by the quadratic formula ay²+by+c=0.'],['Write the quadratic formula','y=[−b±√(b²−4ac)]/(2a)','The equation is now in the standard form ay²+by+c=0, so the corresponding quadratic formula can be used.'],['Substitute the coefficients','y=[−2±√(2²−4×4×(−1))]/(2×4)','Replace a with 4, b with 2, and c with −1 in every matching position of the formula.'],['Evaluate the discriminant','2²−4×4×(−1)=4−(−16)=4+16=20','First calculate 2²=4 and 4×4×(−1)=−16. Therefore 4−(−16)=4+16=20.'],['Insert the discriminant','y=[−2±√20]/8','The discriminant has been replaced by 20, and the denominator 2×4 has been evaluated as 8.'],['Simplify √20','√20=√(4×5)=2√5','Take the perfect-square factor 4 outside the radical.'],['Separate the ± branches','y=[−2+2√5]/8  or  y=[−2−2√5]/8','The ± symbol represents two possible roots, so we write both branches separately before simplifying them.'],
['Simplify the positive branch','y=[2(−1+√5)]/(2×4)=[−1+√5]/4','Factor 2 from the numerator and denominator, then cancel the common non-zero factor 2.'],
['Simplify the negative branch','y=[2(−1−√5)]/(2×4)=[−1−√5]/4','Again factor 2 and cancel the common factor.'],
['List both exact roots','y=[−1+√5]/4  or  y=[−1−√5]/4','These are the two exact algebraic solutions before the trigonometric sign condition selects one.'],['Choose the correct root','y=(−1+√5)/4','Since 18° is in the first quadrant, sin18°>0. The root (−1−√5)/4 is negative, so it cannot be sin18°.'],['Return to the original variable','sin18°=(√5−1)/4','Replace y by sinx and x by 18°.'],['Exact substitution check','Let s=(√5−1)/4. Then s²=[(√5−1)²]/16=(6−2√5)/16=(3−√5)/8.','Square the proposed value explicitly instead of saying merely “it works.”'],['Multiply by 4','4s²=4(3−√5)/8=(3−√5)/2','Reduce the fraction by cancelling the common factor 4 with the denominator 8.'],['Compute 2s','2s=2(√5−1)/4=(√5−1)/2','Again simplify the numerical factor.'],['Add the first two terms','4s²+2s=(3−√5)/2 + (√5−1)/2=(3−√5+√5−1)/2=(3−1)/2=2/2=1','Put the two fractions over the same denominator, then combine their numerators. The −√5 and +√5 cancel, leaving 3−1=2.'],['Finish the check','4s²+2s−1=1−1=0','The proposed exact value satisfies the exact quadratic equation obtained earlier. This closes the verification rather than merely asserting that the answer is correct.']],
24:[['Decompose','24°=60°−36°','36° is tied to the exact pentagon value.'],['Use sine difference','sin24°=sin60° cos36°−cos60° sin36°','Open DERIVE to inspect the identity rather than accepting it.'],['Substitute','=(√3/2)×[(1+√5)/4]−(1/2)×[√(10−2√5)/4]','Keep all quantities symbolic.'],['Common denominator','=[√3(1+√5)−√(10−2√5)]/8','Both products have denominator 8.'],['Final','sin24°=[√3(1+√5)−√(10−2√5)]/8','Exact value.']],
27:[['Decompose','27°=45°−18°','Both component angles have exact values.'],['Use sine difference','sin27°=sin45° cos18°−cos45° sin18°','Open DERIVE to see the the formula origin.'],['Substitute','=(√2/2)×[√(10+2√5)/4]−(√2/2)×[(√5−1)/4]','Keep the radicals exact.'],['Multiply','= [√2√(10+2√5)−√2(√5−1)]/8','Put both products over denominator 8.'],['Simplify','=[2√(5+√5)−√10+√2]/8','Use √2√(10+2√5)=2√(5+√5), then distribute the minus sign.'],['Final','sin27°=[2√(5+√5)−√10+√2]/8','Exact value.']],
30:[['Construct an equilateral triangle','Take an equilateral triangle of side 2 and draw an altitude.','Each angle is 60°, and the altitude bisects the opposite side and the 60° vertex angle.'],['Split the triangle','Each half has angles 30°,60°,90°; the hypotenuse remains 2 and half the base is 1.','The altitude creates two right triangles.'],['Apply Pythagoras','h²+1²=2²','The two perpendicular legs and hypotenuse satisfy Pythagoras.'],['Solve for the altitude','h²=4−1=3, so h=√3','The positive root is chosen because h is a length.'],['Choose the 30° ratio','sin30°=opposite/hypotenuse=1/2','For the 30° angle, the opposite side is the half-base of length 1 and the hypotenuse is 2.'],['Final','sin30°=1/2','Exact.']],
42:[['Decompose','42°=60°−18°','Both angles have exact values.'],['Use sine difference','sin42°=sin60° cos18°−cos60° sin18°','Open DERIVE for the formula.'],['Substitute','=(√3/2)×[√(10+2√5)/4]−(1/2)×[(√5−1)/4]','Exact substitution only.'],['Multiply radicals','=[√(30+6√5)−√5+1]/8','Use √3×√(10+2√5)=√(30+6√5).'],['Final','sin42°=[√(30+6√5)−√5+1]/8','Exact value.']],
45:[['Construct a right triangle','Take a 45°−45°−90° triangle with both legs equal to 1.','Equal angles have equal opposite sides.'],['Use Pythagoras','1²+1²=h² ⇒ h²=2 ⇒ h=√2','The hypotenuse is positive, so choose √2.'],['Apply sine definition','sin45°=1/√2','Opposite side is 1 and hypotenuse is √2.'],['Rationalise deliberately','1/√2=(1/√2)×(√2/√2)=√2/2','√2/√2=1, so the value is unchanged; the multiplication removes the radical from the denominator.'],['Final','sin45°=√2/2','Exact value.']],
48:[['Use the complement','48°=90°−42°','The complementary angle turns sine into cosine.'],['Convert','sin48°=cos42°','Open DERIVE beside the cofunction identity if needed.'],['Use the exact cosine','cos42°=[√(10+2√5)+√3(√5−1)]/8','This is the complementary exact expression.'],['Final','sin48°=[√(10+2√5)+√3(√5−1)]/8','Exact value.']],
54:[['Use the complement','54°=90°−36°','Complementary angles connect sine and cosine.'],['Convert','sin54°=cos36°','Open DERIVE for the cofunction proof.'],['Use the exact 36° cosine','cos36°=(1+√5)/4','This exact value comes from the regular-pentagon route.'],['Final','sin54°=(1+√5)/4','Exact.']],
60:[['Use the same geometric construction','In the 30°−60°−90° triangle, the side opposite 60° is √3 and the hypotenuse is 2.','The triangle came from halving an equilateral triangle.'],['Apply sine definition','sin60°=√3/2','Opposite/hypotenuse.'],['Final','sin60°=√3/2','Exact.']],
72:[['Use the complement','72°=90°−18°','Complementary angles convert sine into cosine.'],['Convert','sin72°=cos18°','Open DERIVE for the cofunction identity.'],['Use the exact cosine','cos18°=√(10+2√5)/4','From sin18°=(√5−1)/4, use cos²18°=1−sin²18° and select the positive root.'],['Final','sin72°=√(10+2√5)/4','Exact.']],
75:[['Decompose','75°=45°+30°','Both component angles have direct exact values.'],['Use sine addition','sin75°=sin45° cos30°+cos45° sin30°','Open DERIVE for the addition formula.'],['Substitute','=(√2/2)(√3/2)+(√2/2)(1/2)','Exact values only.'],['Multiply','=√6/4+√2/4','Multiply each term.'],['Combine','=(√6+√2)/4','Common denominator 4.'],['Final','sin75°=(√6+√2)/4','Exact value.']],
90:[['Use the unit circle','At 90°, the point on the unit circle is (0,1).','Sine is the y-coordinate.'],['Read the coordinate','sin90°=1','The y-coordinate is exactly 1.'],['Final','sin90°=1','Exact.']]
};

function cosRoute(a){
 if(a===0)return [['Start from the unit circle','At 0°, the point is (1,0).','Cosine is the x-coordinate on the unit circle.'],['Read the coordinate','cos0°=1','The x-coordinate is exactly 1.'],['Final','cos0°=1','Exact.']];
 if(a===90)return [['Start from the unit circle','At 90°, the point is (0,1).','Cosine is the x-coordinate.'],['Read the coordinate','cos90°=0','The x-coordinate is exactly zero.'],['Final','cos90°=0','Exact.']];
 return [['Identify the complement',`90°−${a}°=${90-a}°`,`We choose the complement because cosine can be rewritten as sine of the complementary angle.`],['Open the cofunction derivation',`cos${a}°=sin(90°−${a}°)=sin${90-a}°`,'The DERIVE control beside the cofunction identity explains why this conversion is valid.'],['Open the corresponding sine folder',`sin${90-a}°=${sinValues[90-a]||'exact value from the sine route'}`,'We reuse an exact sine derivation rather than creating an unexplained new value.'],['Substitute',`cos${a}°=${cosValues[a]}`,'Replace the complementary sine by its exact expression.'],['Final',`cos${a}°=${cosValues[a]}`,'Exact value; no decimal approximation.']];
}

function frac(num,den){return `<span class="frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;}
function formatMath(raw){
 if(raw==null)return '';
 let s=String(raw);
 // Mathematical multiplication is always shown with ×; decimal points remain literal dots.
 s=s.replace(/\\cdot/g,'×').replace(/×/g,'×');
 // Convert LaTeX-style fractions first.
 s=s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,(m,n,d)=>frac(n,d));
 // Convert bracket/parenthesis fractions to school-style vertical fractions.
 for(let i=0;i<12;i++){
  const before=s;
  s=s.replace(/(\[[^\[\]]+\]|\([^()]+\))\s*\/\s*(\([^()]+\)|\[[^\[\]]+\]|[A-Za-z0-9√²³⁴⁵⁶⁷⁸⁹°×−+\-]+)/g,(m,n,d)=>frac(n,d));
  s=s.replace(/(√[A-Za-z0-9]+|[A-Za-z0-9]+)\s*\/\s*(√[A-Za-z0-9]+|[A-Za-z0-9]+)/g,(m,n,d)=>frac(n,d));
  if(s===before)break;
 }
 // Render square roots with the radical bar spanning the COMPLETE radicand,
 // including nested parentheses such as √(2²−4×4×(−1)).
 let rooted = '';
 for(let i=0;i<s.length;){
  if(s[i]==='√' && s[i+1]==='('){
   let depth=0, j=i+1;
   for(;j<s.length;j++){
    if(s[j]==='(') depth++;
    else if(s[j]===')'){
     depth--;
     if(depth===0) break;
    }
   }
   if(depth===0){
    const inside=s.slice(i+2,j);
    rooted += `<span class="radical">√<span class="radicand">${inside}</span></span>`;
    i=j+1;
    continue;
   }
  }
  rooted += s[i++];
 }
 s=rooted;
 return s;
}
function setTheme(theme){document.body.dataset.theme=theme;document.querySelectorAll('.theme-slab').forEach(b=>b.classList.toggle('active',b.classList.contains(theme)));localStorage.setItem('sd-theme',theme);}
function show(id){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0);}
function openFamily(kind){
 currentFamily=kind;
 const vals=kind==='sin'?sinValues:cosValues;
 document.getElementById('familyKicker').textContent=`${kind==='sin'?'BLUE':'GREEN'} ROUTE`;
 document.getElementById('familyTitle').innerHTML=`<span class="family-function ${kind}">${kind}()</span> exact values`;
 document.getElementById('angleList').innerHTML=angles.map(a=>`<button class="angle-row" onclick="openDerivation(${a})"><span class="label">${kind}(${a}°)</span><span class="value">${formatMath(vals[a])}</span><span class="open">OPEN FOLDER →</span></button>`).join('');
 show('family');
}
let returnScrollY=0;
let returnStepId='';
function formulaButton(key){return `<button class="derive-btn" onclick="openFormula('${key}',this);event.stopPropagation()">DERIVE</button>`;}
function decorateFormula(text){
 let out=formatMath(text);
 const map={'sin(A+B)':formulaButton('sin-sum'),'sin(A−B)':formulaButton('sin-difference'),'cos(2x)':formulaButton('cos-double'),'cos2x':formulaButton('cos-double'),'cos3x':formulaButton('cos-triple'),'cos(3x)':formulaButton('cos-triple'),'sin(90°−θ)':formulaButton('cofunction'),'cosθ':formulaButton('cofunction'),'cos18°':formulaButton('cofunction')};
 Object.keys(map).forEach(k=>{if(out.includes(k))out=out.replace(k,`${k} ${map[k]}`);});
 return out;
}
function openDerivation(a){
 const kind=currentFamily, vals=kind==='sin'?sinValues:cosValues, steps=kind==='sin'?sinDeep[a]:cosRoute(a);
 document.getElementById('deriveKicker').textContent=`${kind.toUpperCase()}() × DEEP DERIVATION`;
 document.getElementById('deriveTitle').innerHTML=`<span class="family-function ${kind}">${kind}(${a}°)</span>`;
 document.getElementById('derivation').innerHTML=`<div class="hero"><div class="exact-label">EXACT VALUE</div><div class="exact-value">${formatMath(vals[a])}${kind==='sin'&&a===15?'<a class="more-ways-btn" href="./more-ways/sin15/index.html">MORE WAYS TO DERIVE</a>':''}</div></div><div class="panel work-panel"><div class="work-heading"><h2>READ THE WORK</h2><p>No compression. If a mathematical move matters, it gets its own step.</p></div>${steps.map((s,i)=>`<div class="step" id="derive-step-${i}"><div class="step-head"><span class="step-number">${String(i+1).padStart(2,'0')}</span><span class="step-title">${s[0]}</span></div><div class="math">${decorateFormula(s[1])}</div>${s[3]?`<div class="side-note"><span>SIDE CALCULATION</span><div>${formatMath(s[3])}</div></div>`:''}<p class="why"><b>What changed:</b> ${s[2]}</p></div>`).join('')}</div>`;
 show('derive');
}
function openFormula(key,sourceButton){
 const f=formulaDerivations[key]; if(!f)return;
 returnScrollY=window.scrollY;
 const sourceStep=sourceButton?.closest('.step');
 returnStepId=sourceStep?.id || '';
 document.getElementById('formulaKicker').textContent='DERIVE × FORMULA FOLDER';
 document.getElementById('formulaTitle').textContent=f.title;
 document.getElementById('formulaContent').innerHTML=`<div class="formula-intro">${f.intro}</div><div class="panel work-panel">${f.steps.map((s,i)=>`<div class="step"><div class="step-head"><span class="step-number">${String(i+1).padStart(2,'0')}</span><span class="step-title">${s[0]}</span></div><div class="math">${formatMath(s[1])}</div><p class="why"><b>Why:</b> ${s[2]}</p></div>`).join('')}</div><div class="first-web-box"><b>KNOW TO DERIVE</b><p>This is an independent derivation folder. When the earlier web is connected later, its real formula folder can be opened from here.</p><button class="back" onclick="returnToDerivation()">← Back to the exact place</button></div>`;
 show('formula');
}
function returnToDerivation(){
 show('derive');
 requestAnimationFrame(()=>{
   window.scrollTo({top:returnScrollY,behavior:'smooth'});
   if(returnStepId){
     const el=document.getElementById(returnStepId);
     if(el){el.classList.remove('return-focus'); void el.offsetWidth; el.classList.add('return-focus'); setTimeout(()=>el.classList.remove('return-focus'),1200);}
   }
 });
}
let currentFamily='sin';
const saved=localStorage.getItem('sd-theme'); if(saved&&['blue','green','purple','brown'].includes(saved))setTheme(saved);
