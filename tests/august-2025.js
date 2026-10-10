/*
 * Practice test: August 2025 (31 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'august-2025',
  source: String.raw`
---
title: SAT Math August 2025
author: tungtks18022
date: 2025-08
description: A 31-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 50
---

1.

$$c(x - 6) = -7(x + k)$$

In the given equation, $c$ and $k$ are constants. The equation has exactly one solution. Which of the following statements must be true?
A. The value of $c$ cannot be $-7$.
B. The value of $c$ cannot be $-\dfrac{7}{6}$.
C. The value of $k$ cannot be $\dfrac{6}{7}$.
D. The value of $k$ cannot be $-6$.
Answer: A
Domain: Algebra
Explanation: Distributing gives $cx - 6c = -7x - 7k$, so $(c + 7)x = 6c - 7k$. This equation has exactly one solution only when the coefficient $c + 7$ is not $0$, so $c$ cannot be $-7$.

2. In the relationship between variables $x$ and $y$, each increase of $7$ in the value of $x$ decreases the value of $y$ by $3$. When the value of $x$ is $14$, the value of $y$ is $9$. Which equation represents this relationship?
A. $y = \dfrac{-3}{7}x + 9$
B. $y = \dfrac{-3}{7}x + 15$
C. $y = \dfrac{-7}{3}x + 9$
D. $y = \dfrac{-7}{3}x + \dfrac{125}{3}$
Answer: B
Domain: Algebra
Explanation: The slope is $-\frac{3}{7}$, so $y = -\frac{3}{7}x + b$. Substituting $x = 14$ and $y = 9$ gives $9 = -6 + b$, so $b = 15$ and $y = \frac{-3}{7}x + 15$.

3.

| $x$ | $y$ |
|:---:|:---:|
| 0 | $n$ |
| 5 | $n + 24$ |
| 10 | $n + 48$ |

There is a linear relationship between $x$ and $y$. The table shows three values of $x$ and their corresponding values of $y$ in terms of a constant $n$. What is the slope of the line that represents this relationship in the $xy$-plane?
Answer: 24/5 | 4.8
Domain: Algebra
Explanation: Each increase of $5$ in $x$ increases $y$ by $24$, so the slope is $\frac{24}{5}$ (or $4.8$).

4. During the first $8.00$ seconds after a car started moving, its speed increased to $11.0$ meters per second. From $8.00$ seconds to $14.0$ seconds after the car started moving, its speed increased from $11.0$ meters per second to $23.0$ meters per second. To the nearest hundredth, what is the positive difference between the average rate of change of the speed of the car, in meters per second per second, during the first $8.00$ seconds after the car started moving and the average rate of change of the speed of the car, in meters per second per second, from $8.00$ seconds to $14.0$ seconds after the car started moving?
Answer: 0.63
Domain: Problem-Solving and Data Analysis
Explanation: The car's speed was $0$ when it started moving, so the first average rate of change is $\frac{11.0 - 0}{8.00} = 1.375$ meters per second per second. The second is $\frac{23.0 - 11.0}{14.0 - 8.00} = 2$ meters per second per second. The positive difference is $2 - 1.375 = 0.625$, which is $0.63$ to the nearest hundredth.

5. Kai used fabric measuring $4$ yards in length to make each costume for a school play. The relationship between the number of costumes that Kai made, $x$, and the total length of fabric that he purchased, $y$, in yards, is represented by the equation $y - 4x = 5$. What is the best interpretation of $5$ in this context?
A. Kai made $5$ costumes.
B. Kai purchased a total of $5$ yards of fabric.
C. Kai used a total of $5$ yards of fabric to make the costumes.
D. Kai purchased $5$ yards more fabric than he used to make the costumes.
Answer: D
Domain: Algebra
Explanation: The equation can be rewritten as $y = 4x + 5$. Kai used $4x$ yards of fabric to make $x$ costumes, so the total length purchased, $y$, is $5$ yards more than the length he used.

6. On a plot of land, $48.0\%$ of the square footage is farmland and the remaining square footage is pasture. There are buildings on exactly $23.5\%$ of the square footage of the farmland, and there are buildings on exactly $16.0\%$ of the square footage of the pasture. If there are buildings on exactly $p\%$ of the square footage of the plot of land, what is the value of $p$?
Answer: 19.6
Domain: Problem-Solving and Data Analysis
Explanation: The pasture is $100\% - 48.0\% = 52.0\%$ of the plot, so $p = 0.480(23.5) + 0.520(16.0) = 11.28 + 8.32 = 19.6$.

7.

$$(x - k)^2 = (k - 4a)(x - k)$$

In the given equation, $a$ and $k$ are constants, where $k > 4a$. The sum of the solutions to the equation is $3k + 37$. What is the value of $a$?
Answer: -37/4 | -9.25
Domain: Advanced Math
Explanation: Rewriting the equation as $(x - k)\left[(x - k) - (k - 4a)\right] = 0$ shows that the solutions are $x = k$ and $x = 2k - 4a$, which are different because $k > 4a$. Their sum is $3k - 4a = 3k + 37$, so $-4a = 37$ and $a = -\frac{37}{4}$.

8. For a certain type of rope, the equation $y = 900ax^2$, where $a$ is a constant, gives the estimated breaking strength $y$, in pounds, of a rope with a circumference of $x$ inches. Based on this equation, if a rope of this type has a circumference of $2.75$ inches, it has an estimated breaking strength of $9{,}528.75$ pounds. What is the estimated breaking strength, in pounds, of a rope of this type that has a circumference of $8.50$ inches?
Answer: 91035
Domain: Advanced Math
Explanation: Substituting gives $9{,}528.75 = 900a(2.75)^2 = 6{,}806.25a$, so $a = 1.4$ and $y = 1{,}260x^2$. When $x = 8.50$, $y = 1{,}260(72.25) = 91{,}035$ pounds.

9. A company developed a plan to set the selling price of a product. The company determined that for a selling price of \$120.00, zero products would be sold. For each \$2.50 decrease in the selling price, the number of products sold would increase by one. For a revenue of exactly \$1,437.50, which of the following could be the number of products sold? (revenue $=$ price $\times$ number of products sold)
A. $23$
B. $24$
C. $527$
D. $1{,}440$
Answer: A
Domain: Advanced Math
Explanation: If $n$ products are sold, the price is $120 - 2.5n$ dollars, so $n(120 - 2.5n) = 1{,}437.50$. Dividing by $-2.5$ and rearranging gives $n^2 - 48n + 575 = 0$, or $(n - 23)(n - 25) = 0$. So $n = 23$ or $n = 25$, and of the choices only $23$ works.

10. Line $p$ is defined by $kx + 8y = 17$. Line $p$ passes through the points $(r, 0)$ and $(0, t)$ in the $xy$-plane, where $k$, $r$, and $t$ are nonzero constants and $r$ is not equal to $t$. Which expression represents the value of $k$?
A. $\dfrac{17}{t}$
B. $\dfrac{17}{r}$
C. $\dfrac{8}{t}$
D. $\dfrac{8}{r}$
Answer: B
Domain: Algebra
Explanation: Substituting the point $(r, 0)$ into the equation gives $kr + 8(0) = 17$, so $kr = 17$ and $k = \frac{17}{r}$.

11.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th colspan="2">Survey Results</th></tr></thead><tbody><tr><td>Annuals</td><td>159</td></tr><tr><td>Perennials</td><td>295</td></tr></tbody></table></div>

A total of $454$ gardeners selected at random were asked if they preferred perennials or annuals. The results of the survey are shown in the table above. According to these results, if $5{,}448$ gardeners were choosing plants, how many more would prefer perennials than would prefer annuals?
A. $136$
B. $1{,}632$
C. $1{,}908$
D. $3{,}540$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Since $\frac{5{,}448}{454} = 12$, each count in the survey is multiplied by $12$. The difference is $12(295 - 159) = 12(136) = 1{,}632$.

12.

![Two dot plots on number lines from 10 to 16, each labeled Value. Data set A has 1, 4, 2, 3, 2, 4, and 1 dots at the values 10 through 16, respectively; data set B has 2, 4, 2, 1, 2, 4, and 2 dots at those values.](tests/images/august-2025/q12.svg)

The dot plots represent the distributions of values in data sets A and B. Which of the following statements must be true?

I. The median of data set A is equal to the median of data set B.

II. The standard deviation of data set A is equal to the standard deviation of data set B.
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Each data set has $17$ values, so each median is the $9$th value in order, which is $13$ for both data sets; statement I is true. Both distributions are symmetric about $13$, but data set B has more values at the extremes ($10$ and $16$) and fewer at the center, so its standard deviation is greater; statement II is false.

13. A circle in the $xy$-plane has its center at $(-4, -7)$. Line $k$ is tangent to this circle at the point $(-7, -8)$. What is the slope of line $k$?
A. $-3$
B. $-\dfrac{1}{3}$
C. $\dfrac{1}{3}$
D. $3$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The radius to the point of tangency has slope $\frac{-8 - (-7)}{-7 - (-4)} = \frac{-1}{-3} = \frac{1}{3}$. A tangent line is perpendicular to the radius at the point of tangency, so the slope of line $k$ is $-3$.

14. A line intersects two parallel lines, forming four acute angles and four obtuse angles. The measure of one of the acute angles is $(7x - 410)^\circ$. The sum of the measures of one of the acute angles and three of the obtuse angles is $(-14x + w)^\circ$. What is the value of $w$?
Answer: 1360
Domain: Geometry and Trigonometry
Explanation: All four acute angles are congruent, and each obtuse angle is supplementary to them, so each obtuse angle measures $(590 - 7x)^\circ$. The sum is $(7x - 410) + 3(590 - 7x) = -14x + 1{,}360$, so $w = 1{,}360$.

15.

![Quadrilateral KLMN shaped like a kite, with vertex L on the left, M at the top, N on the right, and K at the bottom. Sides LM and LK are short, and sides MN and KN are long.](tests/images/august-2025/q15.svg)

In quadrilateral $KLMN$ shown, $KL = 3$, $LM = 3$, $KN = 27$, and $MN = 27$. Diagonals $\overline{KM}$ and $\overline{LN}$ (not shown) intersect at point $G$ (not shown), where $GK = 1$ and $GM = 1$. If the length of diagonal $LN$ is $\sqrt{p} + \sqrt{w}$, where $p$ and $w$ are integers, what is the value of $p + w$?
Answer: 736
Domain: Geometry and Trigonometry
Explanation: Points $L$ and $N$ are each equidistant from $K$ and $M$, so $\overline{LN}$ is the perpendicular bisector of $\overline{KM}$ and triangles $LGK$ and $NGK$ are right triangles. Then $LG = \sqrt{3^2 - 1^2} = \sqrt{8}$ and $GN = \sqrt{27^2 - 1^2} = \sqrt{728}$, so $LN = \sqrt{8} + \sqrt{728}$ and $p + w = 8 + 728 = 736$.

16. For what value of $a$ is $\sqrt[a]{r^{42}}$ equivalent to $r^{6/7}$, where $r > 1$?
Answer: 49
Domain: Advanced Math
Explanation: Since $\sqrt[a]{r^{42}} = r^{42/a}$, the exponents must be equal: $\frac{42}{a} = \frac{6}{7}$, so $6a = 294$ and $a = 49$.

17.

$$f(x) = \dfrac{a - 17}{x} + 5$$

In the given function $f$, $a$ is a constant. The graph of function $f$ in the $xy$-plane, where $y = f(x)$, is translated $3$ units down and $4$ units to the right to produce the graph of $y = g(x)$. Which equation defines function $g$?
A. $g(x) = \dfrac{a - 17}{x + 4} + 2$
B. $g(x) = \dfrac{a - 17}{x - 4} + 2$
C. $g(x) = \dfrac{a - 20}{x + 4} + 5$
D. $g(x) = \dfrac{a - 20}{x - 4} + 5$
Answer: B
Domain: Advanced Math
Explanation: Translating $4$ units to the right replaces $x$ with $x - 4$, and translating $3$ units down subtracts $3$ from the output: $g(x) = \frac{a - 17}{x - 4} + 5 - 3 = \frac{a - 17}{x - 4} + 2$.

18.

![A right circular cone with apex A at the top and point B on the circumference of its circular base.](tests/images/august-2025/q18.svg)

*Note: Figure not drawn to scale.*

For the right circular cone shown, $B$ is a point on the circumference of the base, and the length of segment $AB$ (not shown) is $22$ centimeters. If the height of the cone is $11$ centimeters and the volume of the cone is $k\pi$ cubic centimeters, what is the value of $k$?
Answer: 1331
Domain: Geometry and Trigonometry
Explanation: Segment $AB$ is a slant height, so the radius $r$ of the base satisfies $r^2 + 11^2 = 22^2$, which gives $r^2 = 363$. The volume is $\frac{1}{3}\pi(363)(11) = 1{,}331\pi$ cubic centimeters, so $k = 1{,}331$.

19. The binomial $x + 26y$ is a factor of which of the following?
A. $x^2 + 27xy + 26y^2$
B. $x^2 + 27xy + 27y^2$
C. $x^2 + 78xy + 78y^2$
D. $x^2 + 54xy + 81y^2$
Answer: A
Domain: Advanced Math
Explanation: Since $26y \cdot y = 26y^2$ and $26y + y = 27y$, the expression $x^2 + 27xy + 26y^2$ factors as $(x + y)(x + 26y)$.

20.

$$y = 7x^2 - bx - 6$$

Which of the following equations is equivalent to the given equation, where $b$ is a positive constant?
A. $y = 7\left(x - \dfrac{b}{14}\right)^2 - 6 - \dfrac{b^2}{28}$
B. $y = 7\left(x - \dfrac{b}{14}\right)^2 - 6$
C. $y = 7\left(x + \dfrac{b}{14}\right)^2 - 6 - \dfrac{b^2}{28}$
D. $y = 7\left(x + \dfrac{b}{14}\right)^2 - 6$
Answer: A
Domain: Advanced Math
Explanation: Completing the square gives $7x^2 - bx - 6 = 7\left(x^2 - \frac{b}{7}x\right) - 6 = 7\left(x - \frac{b}{14}\right)^2 - 7 \cdot \frac{b^2}{196} - 6 = 7\left(x - \frac{b}{14}\right)^2 - 6 - \frac{b^2}{28}$.

21.

![Graphs of the lines y = -3x + 7 and y = x - 5 in the xy-plane, intersecting at the point (3, -2). The region below both lines, beneath their intersection point, is shaded.|480](tests/images/august-2025/q21.svg)

The graphs of $y = -3x + 7$ and $y = x - 5$ are shown. Point $P$ (not shown) has coordinates $(3, -5)$ and lies in the shaded region. The coordinates of $P$ satisfy which of the following inequalities?

I. $y < -3x + 7$

II. $y > x - 5$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Algebra
Explanation: For $x = 3$, $-3x + 7 = -2$ and $x - 5 = -2$. Since $-5 < -2$, inequality I is satisfied, but $-5 > -2$ is false, so inequality II is not satisfied.

22.

<div class="q-tables">
<table class="q-table"><thead><tr><th colspan="2">Data Set A</th></tr><tr><th>Value</th><th>Frequency</th></tr></thead><tbody><tr><td>$c$</td><td>12</td></tr><tr><td>$2c$</td><td>21</td></tr><tr><td>$3c$</td><td>30</td></tr></tbody></table>
<table class="q-table"><thead><tr><th colspan="2">Data Set B</th></tr><tr><th>Value</th><th>Frequency</th></tr></thead><tbody><tr><td>$c$</td><td>30</td></tr><tr><td>$2c$</td><td>21</td></tr><tr><td>$3c$</td><td>12</td></tr></tbody></table>
</div>

The frequency tables represent data sets A and B, where $c$ is a negative integer constant. The mean of data set A is $r$ and the mean of data set B is $q$. What is the value of $\dfrac{r}{q}$?
A. $-\dfrac{4}{3}$
B. $1$
C. $\dfrac{4}{3}$
D. There is not enough information to determine the value of $\dfrac{r}{q}$.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Each data set has $12 + 21 + 30 = 63$ values, so $r = \frac{12c + 42c + 90c}{63} = \frac{144c}{63}$ and $q = \frac{30c + 42c + 36c}{63} = \frac{108c}{63}$. Since $c \ne 0$, $\frac{r}{q} = \frac{144}{108} = \frac{4}{3}$.

23. In the relationship between variables $x$ and $y$, each increase of $8$ in the value of $x$ decreases the value of $y$ by $3$. When the value of $x$ is $16$, the value of $y$ is $10$. Which equation represents this relationship?
A. $y = -\dfrac{3}{8}x + 10$
B. $y = -\dfrac{3}{8}x + 16$
C. $y = -\dfrac{8}{3}x + 10$
D. $y = -\dfrac{8}{3}x + \dfrac{158}{3}$
Answer: B
Domain: Algebra
Explanation: The slope is $-\frac{3}{8}$, so $y = -\frac{3}{8}x + b$. Substituting $x = 16$ and $y = 10$ gives $10 = -6 + b$, so $b = 16$ and $y = -\frac{3}{8}x + 16$.

24. The points $(0, 15)$, $(10, 8)$, and $(10, 3)$ are shown in the $xy$-plane, where the $x$-axis and $y$-axis are measured in units.

![The points (0, 15), (10, 8), and (10, 3) plotted on a grid in the xy-plane, with the x-axis labeled from 1 to 10 and the y-axis labeled from 2 to 16.|400](tests/images/august-2025/q24.svg)

These points define one of the bases of a triangular prism. The distance between the two bases of the prism is $20$ units. What is the volume, in cubic units, of the prism?
Answer: 500
Domain: Geometry and Trigonometry
Explanation: The side from $(10, 3)$ to $(10, 8)$ has length $5$, and the vertex $(0, 15)$ is $10$ units from the line $x = 10$, so the area of the base is $\frac{1}{2}(5)(10) = 25$ square units. The volume of the prism is $25(20) = 500$ cubic units.

25.

![Points A, G, F, and E lie in that order on a horizontal segment. Segment AB is vertical with a right angle at A, and segment ED is vertical with a right angle at E. Segments BF and DG cross at point C.](tests/images/august-2025/q25.svg)

*Note: Figure not drawn to scale.*

In the figure, triangle $ABF$ is congruent to triangle $EDG$, where $B$ corresponds to $D$. The measure of angle $BCG$ is $56^\circ$. What is the measure, in degrees, of angle $EDG$?
A. $28$
B. $34$
C. $56$
D. $62$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $F$ corresponds to $G$, angles $AFB$ and $EGD$ have the same measure; call it $\theta$. In triangle $GCF$, angle $GCF$ measures $180^\circ - 2\theta$, and angle $BCG$ is its supplement, so $2\theta = 56^\circ$ and $\theta = 28^\circ$. In right triangle $EDG$, angles $EDG$ and $EGD$ are complementary, so angle $EDG$ measures $90^\circ - 28^\circ = 62^\circ$.

26.

![Triangle ABC, with vertex A at the top left, B at the top right, and C at the bottom; the angle at A is labeled 60 degrees and side AC is labeled d. A larger triangle XYZ has the same orientation, with X at the top left, Y at the top right, and Z at the bottom.](tests/images/august-2025/q26.svg)

*Note: Figures not drawn to scale.*

For the triangles shown, triangle $ABC$ is dilated by a scale factor of $4$ to obtain triangle $XYZ$, where $d = 18$. What is the measure, in degrees, of angle $X$?
A. $15$
B. $56$
C. $60$
D. $64$
Answer: C
Domain: Geometry and Trigonometry
Explanation: A dilation preserves angle measures. Angle $X$ corresponds to angle $A$, so angle $X$ measures $60^\circ$; the scale factor and the value of $d$ affect only the side lengths.

27. Which expression is a factor of $x^3 + x^2y + xy^8 + y^9$?
A. $x^3 + y^9$
B. $x^3 + y^8$
C. $x^2 + y^9$
D. $x^2 + y^8$
Answer: D
Domain: Advanced Math
Explanation: Factoring by grouping gives $x^2(x + y) + y^8(x + y) = (x + y)(x^2 + y^8)$.

28.

$$nx + 3t = -3x + 4n$$

In the given equation, $n$ and $t$ are constants. The equation has no solution. What **CANNOT** be the value of $n + t$?
Answer: -7
Domain: Algebra
Explanation: Rearranging gives $(n + 3)x = 4n - 3t$. The equation has no solution when $n + 3 = 0$ and $4n - 3t \ne 0$, so $n = -3$ and $-12 - 3t \ne 0$, which means $t \ne -4$. Therefore $n + t = -3 + t$ cannot equal $-3 + (-4) = -7$.

29.

| | Volume (cubic units) |
|:---|:---:|
| **Right circular cylinder A** | $32\pi$ |
| **Right circular cylinder B** | $864\pi$ |

The table shows the volume of two similar solids, right circular cylinder A and right circular cylinder B. The radius of right circular cylinder A is $2$ units. The surface area of right circular cylinder A is $k\pi$ square units, and the surface area of right circular cylinder B is $n\pi$ square units, where $k$ and $n$ are constants. What is the value of $n - k$? (The surface area of a right circular cylinder with radius $r$ and height $h$ is $2\pi r^2 + 2\pi rh$.)
Answer: 320
Domain: Geometry and Trigonometry
Explanation: For cylinder A, $\pi(2)^2h = 32\pi$, so $h = 8$ and its surface area is $2\pi(2)^2 + 2\pi(2)(8) = 40\pi$, so $k = 40$. The volume ratio is $\frac{864\pi}{32\pi} = 27 = 3^3$, so the scale factor is $3$ and the ratio of the surface areas is $3^2 = 9$. Then $n = 9(40) = 360$, and $n - k = 360 - 40 = 320$.

30.

![Points P, R, and T lie on a horizontal segment. Right triangle QPR has its right angle at P, with Q above P, and right triangle STR has its right angle at T, with S above T. Angles QRP and SRT are each labeled x degrees.](tests/images/august-2025/q30.svg)

*Note: Figure not drawn to scale.*

$\triangle QPR$ is similar to $\triangle STR$. The lengths represented by $\overline{ST}$, $\overline{QP}$, $\overline{PR}$, and $\overline{QR}$ in the figure are $10$, $16$, $30$, and $34$, respectively. What is the length of $\overline{SR}$?
A. $\dfrac{340}{16}$
B. $\dfrac{340}{30}$
C. $\dfrac{160}{30}$
D. $\dfrac{160}{34}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: In the similarity, $Q$, $P$, and $R$ correspond to $S$, $T$, and $R$, so $\frac{SR}{QR} = \frac{ST}{QP}$. Then $\frac{SR}{34} = \frac{10}{16}$, which gives $SR = \frac{340}{16}$.

31.

![A hollow steel pipe in the shape of a right circular cylinder, standing upright. Labels mark its outside diameter across the top, its wall thickness at the rim, and its height along the side.](tests/images/august-2025/q31.svg)

*Note: Figure not drawn to scale.*

In the figure, a hollow steel pipe is in the shape of a right circular cylinder. The steel pipe has an outside diameter of $48$ inches, a wall thickness of $\dfrac{3}{8}$ inches, and a height of $138$ inches. Which of the following is closest to the volume, in cubic inches, of the wall of this steel pipe?
A. $61$
B. $325$
C. $1{,}242$
D. $7{,}743$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The outside radius is $24$ inches, and the inside radius is $24 - \frac{3}{8} = 23.625$ inches. The volume of the wall is the difference of two cylinder volumes: $\pi(24^2 - 23.625^2)(138) \approx 7{,}742.7$ cubic inches, which is closest to $7{,}743$.
`
});
