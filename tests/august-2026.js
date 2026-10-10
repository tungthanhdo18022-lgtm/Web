/*
 * Practice test: August 2026 (31 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'august-2026',
  source: String.raw`
---
title: August 2026
author: tungtks18022
date: 2026-08
description: A 31-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 50
---

1.

![A right circular cylinder with a sphere inside it that touches both bases and the curved side of the cylinder. A radius of the top base, drawn from its center to its edge, is labeled r, and a dashed segment joins the centers of the two bases.](tests/images/august-2026/q1.svg)

*Note: Figure not drawn to scale.*

A sphere is inscribed in a right circular cylinder, as shown. The sphere touches the center of each base of the cylinder. The sphere and the cylinder have the same radius, $r$, where $r$ is $37$ centimeters. What is the surface area, in square centimeters, of the cylinder?
A. $5{,}476\pi$
B. $8{,}214\pi$
C. $16{,}428\pi$
D. $101{,}306\pi$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The sphere touches both bases, so the height of the cylinder is $2r = 74$ centimeters. The surface area of the cylinder is $2\pi r^2 + 2\pi rh = 2\pi(37)^2 + 2\pi(37)(74) = 2{,}738\pi + 5{,}476\pi = 8{,}214\pi$ square centimeters.

2. Sphere A and Sphere B are tangent to each other at point $P$. Segment $MP$ is a diameter of Sphere A, segment $NP$ is a diameter of Sphere B, and point $P$ lies on line segment $MN$. The radius of Sphere A is $5$ times the radius of Sphere B. If the volume of Sphere B is $288\pi \text{ in.}^3$, what is the length of segment $MN$ in inches?
Answer: 72
Domain: Geometry and Trigonometry
Explanation: For Sphere B, $\frac{4}{3}\pi r^3 = 288\pi$ gives $r^3 = 216$, so its radius is $6$ inches and the radius of Sphere A is $5(6) = 30$ inches. Since $P$ lies on $\overline{MN}$, $MN = MP + PN = 2(30) + 2(6) = 72$ inches.

3. In the figure shown, lines $a$, $b$, and $c$ are parallel. If $201 < x + y + z < 212$, which of the following could be true?

![Three vertical parallel lines a, b, and c, from left to right; line b starts at a point and extends upward only. One segment joins a point on line a to a lower point on line c, and another segment joins the endpoint of line b to the same point on line c. Angle w is at line a, between the downward part of line a and the segment. Angle z is at the endpoint of line b, between line b and the segment going down to line c. At line c, angle x is between the two segments, and angle y is between the segment from line b and the upward part of line c.|300](tests/images/august-2026/q3.png)

*Note: Figure not drawn to scale.*

I. $w - y = 22$

II. $w - y = 32$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since lines $a$ and $c$ are parallel, alternate interior angles give $w = x + y$, so $w - y = x$. Since lines $b$ and $c$ are parallel, angles $z$ and $y$ are same-side interior angles, so $z = 180 - y$. Then $x + y + z = x + 180$, so $201 < x + 180 < 212$ gives $21 < x < 32$. Therefore $w - y = 22$ is possible, but $w - y = 32$ is not.

4.

$$g(x) = \dfrac{x^2 - 49}{2x^2 - 13x - 7}$$

For what value of $x$ is the rational function $g$ undefined, but does NOT have a vertical asymptote?
A. $-7$
B. $\dfrac{1}{2}$
C. $0$
D. $7$
Answer: D
Domain: Advanced Math
Explanation: Factoring gives $g(x) = \frac{(x - 7)(x + 7)}{(2x + 1)(x - 7)}$, so $g$ is undefined at $x = 7$ and $x = -\frac{1}{2}$. The factor $x - 7$ cancels, so at $x = 7$ the graph has a hole instead of a vertical asymptote, while $x = -\frac{1}{2}$ is a vertical asymptote.

5.

$$f(x) = a(x - h)^3 + k$$

In the given function, $a$, $h$, and $k$ are real constants such that $a < 0$, $h > 0$, and $k < 0$. Which of the following could be the graph of $y = f(x)$ in the $xy$-plane?
A. A cubic curve that passes from quadrant II through $(h, k)$ in quadrant IV and decreases for all real values of $x$.
B. A cubic curve that passes from quadrant III through $(h, k)$ in quadrant I and increases for all real values of $x$.
C. A parabola opening downward with its vertex at $(h, k)$ in quadrant IV.
D. A cubic curve that passes from quadrant II through $(-h, k)$ in quadrant III and decreases for all real values of $x$.
Answer: A
Domain: Advanced Math
Explanation: The graph of $f$ is a cubic curve through $(h, k)$, which lies in quadrant IV because $h > 0$ and $k < 0$. Since $a < 0$, $f$ decreases for all real values of $x$, and $f(x)$ is large and positive for large negative $x$, so the curve comes from quadrant II.

6. A linear function $L$ satisfies $L(4) = 19$ and $L(-2) = -5$. An exponential function $E$ is defined by $E(x) = 3 \cdot 2^{cx}$, where $c$ is a positive constant. If the graphs of $y = L(x)$ and $y = E(x)$ intersect at the point $(2, k)$, what is the value of $k$?
A. $2$
B. $6$
C. $11$
D. $12$
Answer: C
Domain: Advanced Math
Explanation: The slope of $L$ is $\frac{19 - (-5)}{4 - (-2)} = 4$, so $L(x) = 4x + 3$. The point $(2, k)$ lies on the graph of $L$, so $k = L(2) = 11$. (This is consistent with $E$: $3 \cdot 2^{2c} = 11$ gives $2^{2c} = \frac{11}{3}$, so $c$ is positive.)

7. A researcher investigated two species of mites: a predator and its prey. At the start of a week, there was an equal number of the two species. At the end of the week, the number of prey had increased by $1900\%$ of the number of prey at the start of the week, and the number of predators had increased by $220\%$ of the number of predators at the start of the week. The number of predators at the end of the week was $p\%$ less than the number of prey at the end of the week. What is the value of $p$?
Answer: 84
Domain: Problem-Solving and Data Analysis
Explanation: Let each species start with $n$ mites. At the end of the week there were $n + 19n = 20n$ prey and $n + 2.2n = 3.2n$ predators. Since $\frac{20n - 3.2n}{20n} = \frac{16.8}{20} = 0.84$, the value of $p$ is $84$.

8.

$$f(x) = 18(2.80)^{x/4}$$

The function $f$ is defined by the given equation. The value of $f(x)$ increases by $p\%$ for every increase of $x$ by $4$. For which of the following functions, where $n$ is a positive constant, does the value of $g(x)$ increase by $p\%$ for every increase of $x$ by $1$?
A. $g(x) = n(1.40)^x$
B. $g(x) = n(2.80)^x$
C. $g(x) = n(6.84)^x$
D. $g(x) = n(7.84)^x$
Answer: B
Domain: Advanced Math
Explanation: Increasing $x$ by $4$ increases the exponent $\frac{x}{4}$ by $1$, so $f(x)$ is multiplied by $2.80$, an increase of $p = 180\%$. For $g(x)$ to increase by $180\%$ for every increase of $x$ by $1$, it must be multiplied by $2.80$ each time: $g(x) = n(2.80)^x$.

9.

![Two identical histograms, titled Data Set A and Data Set B, with Integer on the horizontal axis (intervals from 10 to 50 in steps of 10) and Frequency on the vertical axis (from 0 to 12). In each histogram, the frequencies are 3 for 10 to 20, 4 for 20 to 30, 7 for 30 to 40, and 9 for 40 to 50.|440](tests/images/august-2026/q9.png)

Two data sets of $23$ integers each are summarized in the histograms shown. For each of the histograms, the first interval represents the frequency of integers greater than or equal to $10$, but less than $20$. The second interval represents the frequency of integers greater than or equal to $20$, but less than $30$, and so on. What is the smallest possible difference between the mean of data set A and the mean of data set B?
A. $0$
B. $1$
C. $10$
D. $23$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The two histograms are identical, so data set A and data set B could consist of exactly the same $23$ integers. In that case the two means are equal, so the smallest possible difference between them is $0$.

10.

![Circle A on a grid in the xy-plane, with the x-axis labeled from -6 to 3 and the y-axis labeled from -4 to 4. The center (-2, 0) is marked with a point labeled A, and the circle passes through (-5, 0), (1, 0), (-2, 3), and (-2, -3).|380](tests/images/august-2026/q10.png)

Circle $A$ (shown) is defined by the equation $(x + 2)^2 + y^2 = 9$. Circle $B$ (not shown) is the result of shifting circle $A$ $6$ units down and increasing the radius so that the radius of circle $B$ is $7$ times the radius of circle $A$. Which equation defines circle $B$?
A. $7(x + 2)^2 + 7(y - 6)^2 = 9$
B. $(x + 2)^2 + (y - 6)^2 = (49)(9)$
C. $7(x + 2)^2 + 7(y + 6)^2 = 9$
D. $(x + 2)^2 + (y + 6)^2 = (49)(9)$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Circle $A$ has center $(-2, 0)$ and radius $3$. Shifting it $6$ units down moves the center to $(-2, -6)$, and the radius of circle $B$ is $7(3) = 21$. So circle $B$ is defined by $(x + 2)^2 + (y + 6)^2 = 21^2 = (49)(9)$.

11. In a study of high-precision manufacturing, a sample of $1{,}200$ microprocessors produced by Machine A had a mean lifespan of $18{,}400$ hours with a standard deviation of $350$ hours. A sample of $1{,}200$ microprocessors produced by Machine B had a mean lifespan of $18{,}400$ hours with a standard deviation of $720$ hours. Which of the following statements must be true?
A. Machine A produced more microprocessors that lasted longer than $19{,}500$ hours than Machine B did.
B. The median lifespan of microprocessors from Machine A is strictly greater than the median lifespan of microprocessors from Machine B.
C. The lifespans of the microprocessors produced by Machine B showed greater variability around the mean than the lifespans of the microprocessors produced by Machine A.
D. The total lifespan of all microprocessors tested from Machine B was greater than the total lifespan of all microprocessors tested from Machine A.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Standard deviation measures the spread of the data around the mean, and Machine B's standard deviation ($720$ hours) is greater than Machine A's ($350$ hours), so choice C must be true. The means and standard deviations do not determine the medians or how many lifespans exceed $19{,}500$ hours, and the total lifespans are equal, $1{,}200(18{,}400)$ hours for each machine.

12.

![Histogram with Number of points on the horizontal axis, in intervals of 10 from 0 to 70, and Frequency on the vertical axis, from 0 to 25. The frequencies are 0 for 0 to 10, 0 for 10 to 20, 2 for 20 to 30, 3 for 30 to 40, 8 for 40 to 50, 22 for 50 to 60, and 15 for 60 to 70.](tests/images/august-2026/q12.svg)

The histogram summarizes the distribution of an original data set that represents the number of points per game a basketball team has scored in the last $50$ games played. If the team scores $18$ points in the next game and this game is added to the original data set to create a new data set of $51$ values, which of the following must be true?

I. The median number of points per game for the new data set is less than the median number of points per game for the original data set.

II. The mean number of points per game for the new data set is less than the mean number of points per game for the original data set.
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Every value in the original data set is at least $20$, so adding $18$ lowers the mean; statement II must be true. The original median is the average of the $25$th and $26$th values, and the new median is the original $25$th value. Both of these values are in the interval from $50$ to $60$ and could be equal, so the median need not decrease; statement I need not be true.

13. In 2004, Aster earned $11\%$ more than in 2003, and in 2005 Aster earned $6\%$ more than in 2004. If Aster earned $y$ times as much in 2003 as in 2005, which of the following is closest to the value of $y$?
A. $0.5455$
B. $0.6600$
C. $0.8499$
D. $1.1766$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: If Aster earned $E$ in 2003, then Aster earned $1.11E$ in 2004 and $1.06(1.11E) = 1.1766E$ in 2005. So $y = \frac{E}{1.1766E} = \frac{1}{1.1766} \approx 0.8499$.

14. The function $f$ is defined by $f(x) = (x - 3)(x + 5)$. The function $g$ is defined by $g(x) = f(x - 2) + 4$. Which of the following equations is an equivalent form of $g(x)$ that displays the minimum value of $g$ as a constant or coefficient?
A. $g(x) = (x - 5)(x + 3) + 4$
B. $g(x) = (x - 1)^2 - 12$
C. $g(x) = (x + 1)^2 - 12$
D. $g(x) = x^2 - 2x - 11$
Answer: B
Domain: Advanced Math
Explanation: $g(x) = f(x - 2) + 4 = (x - 5)(x + 3) + 4 = x^2 - 2x - 11 = (x - 1)^2 - 12$. In this vertex form, the minimum value of $g$, $-12$, appears as a constant.

15. In the $xy$-plane, an angle with measure $\theta$ radians is in standard position, where $0 \le \theta \le \dfrac{\pi}{2}$. If $\cos\left(\dfrac{\pi}{2} - \theta\right) = \dfrac{5}{13}$, what is the value of $\tan\theta$?
A. $\dfrac{5}{12}$
B. $\dfrac{12}{13}$
C. $\dfrac{12}{5}$
D. $\dfrac{13}{5}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since $\cos\left(\frac{\pi}{2} - \theta\right) = \sin\theta$, $\sin\theta = \frac{5}{13}$. Because $0 \le \theta \le \frac{\pi}{2}$, $\cos\theta = \frac{12}{13}$, so $\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{5}{12}$.

16. In the polynomial $p(x) = x^4 - 5x^3 + ax^2 + bx - 48$, $a$ and $b$ are integer constants. If $(x - 3)$ and $(x + 2)$ are both factors of $p(x)$, what is the remainder when $p(x)$ is divided by $(x + 1)$?
Answer: -52
Domain: Advanced Math
Explanation: Since $p(3) = 81 - 135 + 9a + 3b - 48 = 0$, $3a + b = 34$. Since $p(-2) = 16 + 40 + 4a - 2b - 48 = 0$, $2a - b = -4$. So $a = 6$ and $b = 16$. By the remainder theorem, the remainder is $p(-1) = 1 + 5 + 6 - 16 - 48 = -52$.

17. In right triangle $RST$, angle $S$ is the right angle. Point $M$ lies on segment $RS$ such that $TM$ bisects angle $RTS$. If the length of $ST$ is $24$ and the length of $SM$ is $7$, what is the length of hypotenuse $RT$?
Answer: 15000/527 | 28.46
Domain: Geometry and Trigonometry
Explanation: Triangle $MST$ is a right triangle with legs $7$ and $24$, so $TM = \sqrt{7^2 + 24^2} = 25$. If angle $MTS$ has measure $\alpha$, then $\cos\alpha = \frac{24}{25}$. Angle $RTS$ has measure $2\alpha$, and $\cos(2\alpha) = 2\cos^2\alpha - 1 = \frac{527}{625}$. Since $\cos(2\alpha) = \frac{ST}{RT}$, $RT = \frac{24(625)}{527} = \frac{15{,}000}{527} \approx 28.46$.

18. Two right circular cylinders, Cylinder P and Cylinder Q, are geometrically similar. The surface area of Cylinder Q is $4.41$ times the surface area of Cylinder P. If the volume of Cylinder P is $150 \text{ cm}^3$, what is the volume, in cubic centimeters, of Cylinder Q?
A. $315.0$
B. $661.5$
C. $1{,}389.15$
D. $2{,}917.215$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Surface areas of similar solids scale by the square of the scale factor, so the scale factor is $\sqrt{4.41} = 2.1$. Volumes scale by its cube, so the volume of Cylinder Q is $150(2.1)^3 = 150(9.261) = 1{,}389.15$ cubic centimeters.

19.

![Right triangle RST with the right angle at T, vertex R at the top and vertex S at the bottom right. Points X and Z lie on side RS, with X closer to R. Outside triangle RST, segment XY runs horizontally to the right from X to point Y, and segment YZ runs straight down from Y to Z, forming right triangle XYZ with the right angle at Y.](tests/images/august-2026/q19.svg)

In triangles $RST$ and $XYZ$ shown, $\overline{XY}$ is parallel to $\overline{TS}$ and $\tan R = \dfrac{160}{231}$. What is the value of $\sin X$ in triangle $XYZ$?
A. $\dfrac{160}{391}$
B. $\dfrac{160}{281}$
C. $\dfrac{231}{281}$
D. $\dfrac{231}{160}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: In right triangle $RST$, $\tan R = \frac{TS}{RT} = \frac{160}{231}$, so $TS = 160k$ and $RT = 231k$ for some $k > 0$, and $RS = \sqrt{(231k)^2 + (160k)^2} = 281k$. Since $\overline{XY}$ is parallel to $\overline{TS}$, angles $X$ and $S$ are congruent alternate interior angles, so $\sin X = \sin S = \frac{RT}{RS} = \frac{231}{281}$.

20. In the $xy$-plane, circle $P$ is defined by the equation $(x + 10k)^2 + (y + 20k)^2 = 64k^2$, where $k$ is a positive constant. Circle $Q$ is obtained by shifting circle $P$ down $8k$ units and right $5k$ units. Which equation represents circle $Q$?
A. $(x + 15k)^2 + (y + 12k)^2 = 64k^2$
B. $(x + 5k)^2 + (y + 28k)^2 = 64k^2$
C. $(x + 15k)^2 + (y + 28k)^2 = 64k^2$
D. $(x + 5k)^2 + (y + 12k)^2 = 64k^2$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Circle $P$ has center $(-10k, -20k)$ and radius $8k$. Shifting it down $8k$ units and right $5k$ units moves the center to $(-10k + 5k, -20k - 8k) = (-5k, -28k)$ and keeps the radius, so circle $Q$ is $(x + 5k)^2 + (y + 28k)^2 = 64k^2$.

21. In triangle $ABC$ and triangle $XYZ$, the measures of angles $A$ and $X$ are each $20$ degrees, and the lengths of $AB$ and $XY$ are each $16$ centimeters. Which of the following additional pieces of information is (are) sufficient to prove that triangle $ABC$ is congruent to triangle $XYZ$?

I. The measures of angles $C$ and $Z$ are each $25^\circ$.

II. $\dfrac{AB}{AC} = \dfrac{XY}{XZ}$
A. I is sufficient, and II is sufficient.
B. II is sufficient, but I is not.
C. Neither I nor II is sufficient.
D. I is sufficient, but II is not.
Answer: A
Domain: Geometry and Trigonometry
Explanation: With I, two angles ($A$ and $X$, $C$ and $Z$) and a non-included side ($AB = XY$) are congruent, so the triangles are congruent by AAS. With II, $AB = XY$ gives $AC = XZ$, so two sides and the included angle ($A$ and $X$) are congruent, and the triangles are congruent by SAS. Each piece of information is sufficient.

22. Compound A is $0.9\%$ potassium chloride. Compound B is $0.025\%$ potassium chloride. Compounds A and B are mixed together to form a new compound that weighs $140$ grams and contains $0.28$ grams of potassium chloride. What is the mass of compound B, in grams?
Answer: 112
Domain: Algebra
Explanation: Let $b$ be the mass, in grams, of compound B, so the mass of compound A is $140 - b$. Then $0.009(140 - b) + 0.00025b = 0.28$, so $1.26 - 0.00875b = 0.28$ and $b = \frac{0.98}{0.00875} = 112$.

23. A beekeeper's initial observation of the population of a certain bee colony was $1{,}900$ bees. The beekeeper set a goal to increase the population of this bee colony to $3{,}025$ bees. The beekeeper uses a model that predicts the population of this bee colony begins at $1{,}900$ and increases by $90$ bees per week in the first two weeks after the initial observation, and then increases by $135$ bees per week until the beekeeper's goal is reached. According to this model, at the end of week $w$ after the initial observation, where $w > 2$, which of the following functions gives the predicted number of bees still needed to reach the beekeeper's goal?
A. $p(w) = 2{,}935 + 135w$
B. $p(w) = 3{,}025 - 135w$
C. $p(w) = -90 + 135w$
D. $p(w) = 1{,}215 - 135w$
Answer: D
Domain: Algebra
Explanation: After the first two weeks, the population is $1{,}900 + 2(90) = 2{,}080$ bees, so at the end of week $w$ it is $2{,}080 + 135(w - 2) = 1{,}810 + 135w$ bees. The number of bees still needed is $3{,}025 - (1{,}810 + 135w) = 1{,}215 - 135w$.

24. A chemist prepares a buffer solution containing a weak acid and its conjugate base. The initial ratio of the concentration of conjugate base to acid is $3 : 5$. The chemist adds a reagent that increases the conjugate base concentration by $40\%$ and reduces the acid concentration by $25\%$. What is the new ratio of the concentration of conjugate base to acid?
A. $14 : 15$
B. $28 : 25$
C. $7 : 5$
D. $21 : 20$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The new ratio is $3(1.40) : 5(0.75) = 4.2 : 3.75$. Multiplying both terms by $\frac{20}{3}$ gives $28 : 25$.

25. At a depth of $h$ meters below the surface, the estimated total pressure $P_1$, in kPa, a diver experiences is given by $P_1 = 9.8h + 100$. After maintaining a certain depth, the diver descends $d$ additional meters. The estimated total pressure $P_2$, in kPa, after descending is given by $P_2 = 9.8d + 300$. Which of the following best interprets $300$ in this context?
A. The estimated total pressure at depth $d$ meters.
B. The estimated increase in pressure per $1$-meter depth increase.
C. The estimated total pressure when beginning the additional descent.
D. The estimated increase in pressure for descending $d$ meters.
Answer: C
Domain: Algebra
Explanation: When $d = 0$, that is, when the diver begins the additional descent, $P_2 = 9.8(0) + 300 = 300$. So $300$ is the estimated total pressure, in kPa, at the depth where the additional descent begins.

26. The function $g$ is defined by $g(x) = k|x - 5|^2 - 23|x - 5| + m$, where $k$ and $m$ are constants and $k > m > 23$. If $g(105) = a$ and $g(-95) = b$, what is the value of $5(-105)^{a - b} + 95(5)^{b - a}$?
Answer: 100
Domain: Advanced Math
Explanation: Since $\lvert 105 - 5 \rvert = \lvert -95 - 5 \rvert = 100$, $g(105) = g(-95)$, so $a = b$. Then $a - b = b - a = 0$, and the value is $5(-105)^0 + 95(5)^0 = 5 + 95 = 100$.

27.

![Two horizontal parallel lines, line m above line n, crossed by line t, which runs from the upper left to the lower right. Angle x degrees is above line m, to the right of line t; angle y degrees is below line m, to the left of line t; and angle z degrees is below line n, to the right of line t.](tests/images/august-2026/q27.svg)

*Note: Figure not drawn to scale.*

In the figure, line $m$ is parallel to line $n$, line $t$ intersects both lines, and $180 < x + y + z < 242$. Which of the following could NOT be a value of $x$?

I. $60$

II. $61$

III. $62$
A. II only
B. III only
C. I and II only
D. II and III only
Answer: B
Domain: Geometry and Trigonometry
Explanation: Angles $x$ and $y$ are vertical angles, so $y = x$. The angle above line $n$ to the right of line $t$ corresponds to angle $x$, and angle $z$ forms a linear pair with it, so $z = 180 - x$. Then $x + y + z = 180 + x$, and $180 < 180 + x < 242$ gives $0 < x < 62$. So $x$ could be $60$ or $61$ but not $62$.

28.

| $x$ | $y$ |
|:---:|:---:|
| $-34$ | $t$ |
| $-17$ | $t + 23$ |
| $0$ | $t + 46$ |

For a linear relationship between $x$ and $y$, the table gives three values of $x$ and their corresponding values of $y$, where $t$ is a constant. Which equation represents this relationship?
A. $y = -2x + t + 23$
B. $y = 2x + t + 23$
C. $y = -\dfrac{23}{17}x + t + 46$
D. $y = \dfrac{23}{17}x + t + 46$
Answer: D
Domain: Algebra
Explanation: The slope is $\frac{(t + 23) - t}{-17 - (-34)} = \frac{23}{17}$, and the $y$-intercept is $t + 46$ because $y = t + 46$ when $x = 0$. So $y = \frac{23}{17}x + t + 46$.

29. In the $xy$-plane, a parabola has vertex $(-6, -15)$ and no $x$-intercepts. If the equation of the parabola is written in the form $y = ax^2 + bx + c$, which of the following could be the value of $a + b + c$?
A. $-24$
B. $-15$
C. $-8$
D. $-3$
Answer: A
Domain: Advanced Math
Explanation: The vertex is below the $x$-axis and the parabola has no $x$-intercepts, so it opens downward: $y = a(x + 6)^2 - 15$ with $a < 0$. The value of $a + b + c$ is $y$ at $x = 1$, which is $49a - 15 < -15$. Of the choices, only $-24$ is less than $-15$ (with $a = -\frac{9}{49}$).

30. The function $P(x) = 685(1.128)^{x/14}$ models the number of gray seal pups each year from 1767 through 1997 on Sable Island, Nova Scotia, where $x$ is the number of years after 1767. Which of the following is the best interpretation of “$P(5 \cdot 14)$ is approximately equal to $1{,}251$” in this context?
A. The number of gray seal pups is estimated to be $1{,}251$ greater in 1837 than in 1767.
B. The number of gray seal pups is estimated to be $70$ times greater in 1837 than in 1767.
C. The number of gray seal pups is estimated to be approximately $1{,}251$ five $14$-year periods after 1767.
D. The number of gray seal pups is estimated to increase by approximately $1{,}251$ every five $14$-year periods between 1767 and 1997.
Answer: C
Domain: Advanced Math
Explanation: The input $5 \cdot 14 = 70$ is the number of years after 1767, that is, five $14$-year periods after 1767 (the year 1837), and the output $P(70) \approx 1{,}251$ is the estimated number of gray seal pups at that time.

31. The exponential function $h$ is defined by $h(x) = a(b)^x$, where $a$ and $b$ are positive constants. If $h(k) = p$ and $h(k + 2) = 0.36p$, what is the value of $b$?
Answer: 0.6
Domain: Advanced Math
Explanation: Dividing, $\frac{h(k + 2)}{h(k)} = \frac{ab^{k + 2}}{ab^k} = b^2 = \frac{0.36p}{p} = 0.36$. Since $b > 0$, $b = 0.6$.
`
});
