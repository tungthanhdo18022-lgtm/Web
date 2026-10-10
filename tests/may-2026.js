/*
 * Practice test: May 2026 (19 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'may-2026',
  source: String.raw`
---
title: May 2026
author: tungtks18022
date: 2026-05
description: A 19-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 30
---

1.

![Isosceles triangle ABC with vertex B at the top and base AC at the bottom. Sides AB and BC are each labeled 41, angle B is labeled 36 degrees, and segment AD bisects angle BAC, with point D on side BC.](tests/images/may-2026/q1.svg)

*Note: Figure not drawn to scale.*

For isosceles triangle $ABC$, $AB = BC = 41$, the measure of angle $ABC$ is $36^\circ$, point $D$ lies on $\overline{BC}$ and $\angle BAC$ is bisected by $\overline{AD}$. Which of the following statements must be true?
A. $AB = AC = BC$
B. $AD = BD = AC$
C. $BD = CD = AC$
D. $AB = BD = AD$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $AB = BC$, angles $BAC$ and $BCA$ each measure $\frac{180 - 36}{2} = 72^\circ$, so $\overline{AD}$ splits angle $BAC$ into two $36^\circ$ angles. In triangle $ABD$, angles $B$ and $BAD$ both measure $36^\circ$, so $AD = BD$. In triangle $ADC$, angle $ADC$ measures $180 - 36 - 72 = 72^\circ$, the same as angle $C$, so $AD = AC$. Therefore $AD = BD = AC$.

2.

$$12x + 8 = k(6x + 8) + 6x$$

In the given equation, $k$ is a constant. The equation has exactly one solution. Which value CANNOT be the value of $k$?
A. $-1$
B. $0$
C. $1$
D. $2$
Answer: C
Domain: Algebra
Explanation: Collecting the $x$-terms gives $(6 - 6k)x = 8k - 8$, or $6(1 - k)x = 8(k - 1)$. If $k = 1$, both sides equal $0$ for every value of $x$, so the equation has infinitely many solutions; for any other value of $k$, the only solution is $x = -\frac{4}{3}$. So $k$ cannot be $1$.

3. Line $j$ is defined by $4x + 5y = 25$. Line $k$ is parallel to line $j$ in the $xy$-plane. An equation of line $k$ is $16x + ry = 15$, where $r$ is a constant. If line $k$ passes through the point $(0, b)$, what is the value of $b$?
Answer: 3/4 | 0.75
Domain: Algebra
Explanation: Parallel lines have equal slopes, so $-\frac{4}{5} = -\frac{16}{r}$, which gives $r = 20$. Substituting $(0, b)$ into $16x + 20y = 15$ gives $20b = 15$, so $b = \frac{3}{4}$.

4. An exponential function $f$ gives the estimated amount of an X-ray beam's initial intensity remaining after passing through a $w$-centimeter-thick window made of beryllium. The function estimates that after passing through a $1.7$-centimeter-thick window, the amount of the X-ray beam's initial intensity remaining is $0.67$. Which equation could define $f$?
A. $f(w) = 0.67(0.79)^{w - 1.7}$
B. $f(w) = 0.67(0.79)^{w/1.7}$
C. $f(w) = 0.67(1.7)^{w}$
D. $f(w) = 1.7(0.67)^{w}$
Answer: A
Domain: Advanced Math
Explanation: The function must satisfy $f(1.7) = 0.67$. For choice A, $f(1.7) = 0.67(0.79)^{0} = 0.67$. The other choices give $f(1.7) = 0.67(0.79) \approx 0.53$, $0.67(1.7)^{1.7} \approx 1.65$, and $1.7(0.67)^{1.7} \approx 0.86$.

5. A study established that in a certain park, there are at least $132$ squirrels, consisting of red squirrels and gray squirrels. The study also established that there are at least $4$ times as many gray squirrels as red squirrels in this park. Which of the following systems of inequalities best represents this situation, where $g$ is the number of gray squirrels in this park and $r$ is the number of red squirrels in this park?
A. $\begin{aligned} &g + r \le 132 \\ &g \le 4r \end{aligned}$
B. $\begin{aligned} &g + r \le 132 \\ &g \ge 4r \end{aligned}$
C. $\begin{aligned} &g + r \ge 132 \\ &g \le 4r \end{aligned}$
D. $\begin{aligned} &g + r \ge 132 \\ &g \ge 4r \end{aligned}$
Answer: D
Domain: Algebra
Explanation: There are at least $132$ squirrels in total, so $g + r \ge 132$. There are at least $4$ times as many gray squirrels as red squirrels, so $g \ge 4r$.

6. A company developed a plan to set the selling price of a product. The company determined that for a selling price of \$90.00, zero products would be sold. For each \$1.50 decrease in the selling price, the number of products sold would increase by one. For a revenue of exactly \$1,336.50, which of the following could be the number of products sold?

(revenue $=$ price $\times$ number of products sold)
A. $27$
B. $30$
C. $31$
D. $1{,}350$
Answer: A
Domain: Advanced Math
Explanation: If $n$ products are sold, the price is $90 - 1.5n$ dollars, so $n(90 - 1.5n) = 1{,}336.5$. This gives $1.5n^2 - 90n + 1{,}336.5 = 0$, or $n^2 - 60n + 891 = 0$, so $(n - 27)(n - 33) = 0$. The number of products sold could be $27$ or $33$, and only $27$ is a choice.

7. A model estimates that the initial number of photons in an X-ray beam is $500$ when the beam reaches the surface of a certain material. The model also estimates that when the beam passes through this material, the number of photons in the beam decreases by $50\%$ for each $11$ millimeters of the material the beam passes through. Which equation represents this model, where $I$ is the estimated number of photons in the beam when the beam reaches a point $x$ millimeters from the surface?
A. $I = 500(0.5)^{x/11}$
B. $I = 500(0.5)^{x}$
C. $I = 500(2)^{x/11}$
D. $I = 500(11)^{x/2}$
Answer: A
Domain: Advanced Math
Explanation: A $50\%$ decrease multiplies the number of photons by $0.5$, and this happens once for every $11$ millimeters, that is, $\frac{x}{11}$ times over $x$ millimeters. Starting from $500$ photons, $I = 500(0.5)^{x/11}$.

8.

![Graph in the xy-plane of an increasing exponential curve that passes through the labeled points (0, 3) and (1, 6). To the left, the curve approaches the dashed horizontal line y = 2.](tests/images/may-2026/q8.svg)

The graph of an exponential function is shown. The curve passes through the points $(0, 3)$ and $(1, 6)$. As $x$ decreases, the curve approaches the line $y = 2$. What is an equation of the graph shown?
A. $y = 4^{-x} + 3$
B. $y = 4^{x} + 3$
C. $y = 4^{-x} + 2$
D. $y = 4^{x} + 2$
Answer: D
Domain: Advanced Math
Explanation: Since the curve approaches $y = 2$, its equation has the form $y = a \cdot b^{x} + 2$. The point $(0, 3)$ gives $a + 2 = 3$, so $a = 1$, and the point $(1, 6)$ gives $b + 2 = 6$, so $b = 4$. Therefore $y = 4^{x} + 2$.

9. The function $g$ is defined by

$$g(x) = -2x(x + 4)(x - k)^2 + r,$$

where $k$ and $r$ are integer constants. In the $xy$-plane, the graph of $y = g(x)$ passes through the point $(8, 17)$ and $g(0) = 17$. What is the value of $r + k$?
A. $-8$
B. $8$
C. $17$
D. $25$
Answer: D
Domain: Advanced Math
Explanation: Because $g(0) = r$, it follows that $r = 17$. Then $g(8) = -2(8)(12)(8 - k)^2 + 17 = 17$, so $(8 - k)^2 = 0$ and $k = 8$. Therefore $r + k = 17 + 8 = 25$.

10. The expression

$$\dfrac{kx - 17}{2x^2 - 11x + 15}$$

is equivalent to

$$\dfrac{p}{x - 3} - \dfrac{1}{2x - 5},$$

where $k$ and $p$ are constants. What is the value of $p$?
A. $-16$
B. $\dfrac{14}{5}$
C. $4$
D. $7$
Answer: C
Domain: Advanced Math
Explanation: Since $2x^2 - 11x + 15 = (x - 3)(2x - 5)$, the second expression equals $\dfrac{p(2x - 5) - (x - 3)}{(x - 3)(2x - 5)} = \dfrac{(2p - 1)x - 5p + 3}{2x^2 - 11x + 15}$. Matching the constant terms gives $-5p + 3 = -17$, so $p = 4$ (and $k = 2p - 1 = 7$).

11. If $n$ and $k$ are numbers greater than $1$ and $\sqrt[4]{n^5}$ is equivalent to $\sqrt[3]{k^2}$, for what value of $a$ is $n^{2a+1}$ equal to $k$?
Answer: 7/16 | .4375
Domain: Advanced Math
Explanation: Since $\sqrt[4]{n^5} = n^{5/4}$ and $\sqrt[3]{k^2} = k^{2/3}$, it follows that $k^{2/3} = n^{5/4}$, so $k = n^{15/8}$. Then $2a + 1 = \frac{15}{8}$, which gives $a = \frac{7}{16}$.

12. A computer program models the population of a certain insect in an environment where the insect has no natural predators. According to the model, the estimated total mass of the population of insects at the end of every $5$-week period is $158\%$ greater than the estimated total mass of the population of insects at the end of the previous $5$-week period. The estimated total mass of the population of insects at the end of $15$ weeks is $627.7$ grams. Which equation best represents this model, where $M$ is the estimated total mass, in grams, of the population of insects at the end of $t$ weeks?
A. $M = 538.92(1.58)^{t}$
B. $M = 457.66(2.58)^{t/5}$
C. $M = 159.14(1.58)^{t/5}$
D. $M = 36.55(2.58)^{t/5}$
Answer: D
Domain: Advanced Math
Explanation: A mass that is $158\%$ greater is multiplied by $1 + 1.58 = 2.58$ every $5$ weeks, so $M = a(2.58)^{t/5}$. At $t = 15$, $a(2.58)^{3} = 627.7$, so $a = \frac{627.7}{2.58^{3}} \approx 36.55$.

13.

$$\begin{gathered} 5x + 8y = 9 \\[4pt] 15x + 24y = 27 \end{gathered}$$

For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system?
A. $\left(r, -\dfrac{5r}{8} + \dfrac{9}{8}\right)$
B. $\left(-\dfrac{5r}{8} + \dfrac{9}{8}, r\right)$
C. $\left(-\dfrac{5r}{8} + 9, \dfrac{5r}{8} + 27\right)$
D. $\left(\dfrac{r}{3} + 9, -\dfrac{r}{3} + 27\right)$
Answer: A
Domain: Algebra
Explanation: The second equation is $3$ times the first, so both equations have the same graph, the line $5x + 8y = 9$. If $x = r$, then $8y = 9 - 5r$, so $y = -\frac{5r}{8} + \frac{9}{8}$. Therefore the point $\left(r, -\frac{5r}{8} + \frac{9}{8}\right)$ lies on the graph of each equation.

14.

![A right rectangular pyramid. Two adjacent edges of the rectangular base are labeled l and w, and a dashed segment from the apex down to the base, perpendicular to it, is labeled h.](tests/images/may-2026/q14.svg)

*Note: Figure not drawn to scale.*

The figure shown is a right rectangular pyramid, where $l = 12$ units, $w = 6$ units, and $h = 14$ units. What is the surface area, in square units, of the pyramid?
Answer: 335.2
Domain: Geometry and Trigonometry
Explanation: The base has area $12 \cdot 6 = 72$. The two triangular faces with base $12$ have slant height $\sqrt{14^2 + 3^2} = \sqrt{205}$, and the two faces with base $6$ have slant height $\sqrt{14^2 + 6^2} = \sqrt{232}$. The surface area is $72 + 2 \cdot \frac{1}{2}(12)\sqrt{205} + 2 \cdot \frac{1}{2}(6)\sqrt{232} = 72 + 12\sqrt{205} + 6\sqrt{232} \approx 335.2$.

15. Triangle $ABC$ is similar to triangle $XYZ$ such that $A$, $B$, and $C$ correspond to $X$, $Y$, and $Z$, respectively. The length of each side of triangle $ABC$ is $n$ times the length of its corresponding side in triangle $XYZ$, where $n$ is an integer greater than $1$. The measure of angle $C$ is $58$ degrees, and $YZ = 72$. Which of the following must be true?
A. $BC = \dfrac{72}{n}$
B. $BC = 72n$
C. The measure of angle $Z$ is $\dfrac{58}{n}$ degrees.
D. The measure of angle $Z$ is $58n$ degrees.
Answer: B
Domain: Geometry and Trigonometry
Explanation: Side $\overline{BC}$ corresponds to side $\overline{YZ}$, so $BC = n(YZ) = 72n$. Corresponding angles of similar triangles are congruent, so angle $Z$ measures $58$ degrees, which rules out choices C and D.

16.

![Two horizontal parallel lines, line AB on top and line CD on the bottom. Line AD and line BC cross at point E between them. Angle y degrees is marked at B above line AB, on the side toward A; angle x degrees is marked at E on the right, between segments EB and ED; and angle z degrees is marked at D below line CD, on the side toward C.](tests/images/may-2026/q16.svg)

*Note: Figure not drawn to scale.*

In the figure, line $AB$ is parallel to line $CD$, and line $AD$ intersects line $BC$ at point $E$. If $y = 111$ and $z = 118$, what is the value of $x$?
A. $49$
B. $62$
C. $131$
D. $139$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Angle $ABE$ and the angle marked $y^\circ$ form a linear pair, so angle $ABE$ measures $180 - 111 = 69^\circ$; likewise, angle $CDE$ measures $180 - 118 = 62^\circ$. Since $AB \parallel CD$, alternate interior angles $BAE$ and $CDE$ are congruent, so angle $BAE$ measures $62^\circ$. The angle marked $x^\circ$ is an exterior angle of triangle $ABE$, so $x = 62 + 69 = 131$.

17.

$$\begin{gathered} f(x) = 11x^{10} + 2x^8 \\[4pt] g(x) = -13x^7 + 7x^5 \end{gathered}$$

The polynomial $p(x)$ is defined as the product of the given polynomials, $f(x)$ and $g(x)$. What is the coefficient of $x^{15}$ in $p(x)$?
A. $15$
B. $51$
C. $77$
D. $103$
Answer: B
Domain: Advanced Math
Explanation: The $x^{15}$ terms of $p(x)$ come from $11x^{10} \cdot 7x^5 = 77x^{15}$ and $2x^8 \cdot (-13x^7) = -26x^{15}$. The coefficient of $x^{15}$ is $77 - 26 = 51$.

18.

$$\dfrac{1}{34} = \dfrac{1}{R_1} + \dfrac{1}{R_2}$$

The given equation relates the resistances, $R_1$ and $R_2$, in ohms, of two resistors arranged in parallel in a circuit with a total resistance of $34$ ohms, where $R_1$ and $R_2$ are positive. Which equation correctly expresses $R_1$ in terms of $R_2$?
A. $R_1 = 34 + R_2$
B. $R_1 = 34 - R_2$
C. $R_1 = \dfrac{34R_2}{R_2 + 34}$
D. $R_1 = \dfrac{34R_2}{R_2 - 34}$
Answer: D
Domain: Advanced Math
Explanation: Subtracting $\frac{1}{R_2}$ from both sides gives $\frac{1}{R_1} = \frac{1}{34} - \frac{1}{R_2} = \frac{R_2 - 34}{34R_2}$. Taking reciprocals, $R_1 = \frac{34R_2}{R_2 - 34}$.

19.

![Right triangle ADE with the right angle at D, vertex A at the top and vertex E at the bottom right. Point B lies on side AD and point C lies on side AE, with segment BC parallel to DE. The angle at C between segments CB and CA is labeled x degrees.](tests/images/may-2026/q19.svg)

*Note: Figure not drawn to scale.*

In the figure, $\overline{BC}$ is parallel to $\overline{DE}$. If the length of $\overline{DE}$ is $162$ and the length of $\overline{AE}$ is $270$, what is the value of $\tan x^\circ$?
A. $\dfrac{270}{162}$
B. $\dfrac{216}{162}$
C. $\dfrac{162}{270}$
D. $\dfrac{162}{216}$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $\overline{BC} \parallel \overline{DE}$, angle $ACB$ is congruent to angle $AED$, so $\tan x^\circ = \frac{AD}{DE}$. By the Pythagorean theorem, $AD = \sqrt{270^2 - 162^2} = \sqrt{46{,}656} = 216$. Therefore $\tan x^\circ = \frac{216}{162}$.
`
});
