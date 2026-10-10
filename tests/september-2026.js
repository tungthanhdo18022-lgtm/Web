/*
 * Practice test: September 2026 (25 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'september-2026',
  source: String.raw`
---
title: SAT Math September 2026
author: tungtks18022
date: 2026-09
description: A 25-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 40
---

1. The functions $f$ and $g$ are defined by

$$f(x) = x^2 + px + 42 \quad \text{and} \quad g(x) = x^2 + 10x + 18,$$

where $p$ is a constant. The solutions to $f(x) = 0$ are $r$ and $s$, and the solutions to $g(x) = 0$ are $r + 2$ and $s + 2$. What is the value of $p$?
Answer: 14
Domain: Advanced Math
Explanation: By Vieta's formulas, $r + s = -p$ and $(r + 2) + (s + 2) = -10$. So $r + s = -14$, which gives $p = 14$. (Check: $rs = 42$ and $(r+2)(s+2) = rs + 2(r+s) + 4 = 42 - 28 + 4 = 18$.)

2. When resistors are connected in series in a circuit, the total resistance of the circuit is the sum of the resistances of the resistors. A certain circuit consists of $6$ resistors connected in series, each with a positive resistance. The total resistance of the circuit is $90$ ohms, and the sum of the resistances of $2$ of these resistors is $70$ ohms. Which inequality represents all possible values of the resistance $x$, in ohms, of one of the remaining $4$ resistors?
A. $0 < x < 5$
B. $0 < x < 20$
C. $20 < x < 70$
D. $20 < x < 90$
Answer: B
Domain: Algebra
Explanation: The remaining $4$ resistors have a total resistance of $90 - 70 = 20$ ohms. Each resistance is positive, so any one of them is greater than $0$ and less than $20$: $0 < x < 20$.

3. Several resistors are connected in series. A circuit has $9$ resistors with positive resistance. The total resistance of $4$ resistors is $60$ ohms, and each of the other $5$ resistors has resistance at most $25$ ohms. If the total resistance is $x$ ohms, which inequality best represents the situation?
A. $0 < x \le 185$
B. $60 < x \le 125$
C. $60 < x \le 185$
D. $x \ge 125$
Answer: C
Domain: Algebra
Explanation: The other $5$ resistors have a total resistance greater than $0$ and at most $5(25) = 125$ ohms. Adding the $60$ ohms gives $60 < x \le 185$.

4. Right circular cylinders $A$ and $B$ are similar. The height of cylinder $A$ is $10$ units, and the diameter of its base is equal to its height. The ratio of the diameter of the base of cylinder $A$ to the diameter of the base of cylinder $B$ is $3 : 7$. What is the volume, in cubic units, of cylinder $B$?
A. $250\pi$
B. $\dfrac{1{,}750\pi}{3}$
C. $\dfrac{12{,}250\pi}{9}$
D. $\dfrac{85{,}750\pi}{27}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Cylinder $A$ has diameter $10$ and height $10$. The scale factor from $A$ to $B$ is $\frac{7}{3}$, so cylinder $B$ has radius $\frac{35}{3}$ and height $\frac{70}{3}$. Its volume is $\pi\left(\frac{35}{3}\right)^2\left(\frac{70}{3}\right) = \frac{85{,}750\pi}{27}$.

5. A space probe uses a square-shaped solar sail to move through space. The side length of the solar sail is $8.89w$ meters, where $w$ is the width, in meters, of the space probe. Which equation gives the area $A$, in square meters, of the solar sail?
A. $A = (w + 8.89)(w + 8.89)$
B. $A = (4)(8.89w)$
C. $A = (8.89w)(8.89w)$
D. $A = \left(\dfrac{8.89}{w}\right)\left(\dfrac{8.89}{w}\right)$
Answer: C
Domain: Advanced Math
Explanation: The area of a square is the side length times itself: $A = (8.89w)(8.89w)$.

6. A moving truck rental company charges its customers \$165 for the first hour of renting a truck and \$95 for each additional hour, plus the cost of gas used. Which equation represents this situation, where $y$ is the total cost, in dollars, of renting a truck from this company for $x$ hours, $w$ is the cost, in dollars, of gas used, and $x \ge 1$?
A. $y = 95(x - 1) + w$
B. $y = 165 + 95 + w$
C. $y = 165 + 95x + w$
D. $y = 165 + 95(x - 1) + w$
Answer: D
Domain: Algebra
Explanation: The first hour costs \$165, each of the remaining $x - 1$ hours costs \$95, and gas costs $w$ dollars: $y = 165 + 95(x - 1) + w$.

7. The population density of Town $A$ is $120$ people per square mile, and the population density of Town $B$ is $90$ people per square mile. Town $A$ has a population of $20{,}640$ people, and Town $B$ has a population of $3{,}870$ people. The area, in square miles, of Town $A$ is $k$ times the area, in square miles, of Town $B$. What is the value of $k$?
Answer: 4
Domain: Problem-Solving and Data Analysis
Explanation: Area of Town $A$: $\frac{20{,}640}{120} = 172$ square miles. Area of Town $B$: $\frac{3{,}870}{90} = 43$ square miles. So $k = \frac{172}{43} = 4$.

8. The table summarizes the daily high temperatures, in degrees Fahrenheit, recorded in a town for the $31$ days of December 2024.

| Daily high temperature, $t$ (°F) | Frequency (days) |
|:---:|:---:|
| $10 < t \le 15$ | 1 |
| $15 < t \le 20$ | 2 |
| $20 < t \le 25$ | 4 |
| $25 < t \le 30$ | 5 |
| $30 < t \le 35$ | 7 |
| $35 < t \le 40$ | 5 |
| $40 < t \le 45$ | 3 |
| $45 < t \le 50$ | 2 |
| $50 < t \le 55$ | 2 |

In January 2025, the daily high temperature in the same town was greater than $35$°F on $18$ days. This number of days is $p\%$ greater than the number of days in December 2024 on which the daily high temperature was greater than $35$°F. What is the value of $p$?
Answer: 50
Domain: Problem-Solving and Data Analysis
Explanation: In December 2024, the number of days above $35$°F is $5 + 3 + 2 + 2 = 12$. Since $\frac{18 - 12}{12} = 0.5$, the value of $p$ is $50$.

9. A sample of a certain isotope takes $29$ years to decay to half its original mass. The function

$$s(t) = 128(0.5)^{t/29}$$

gives the approximate mass of this isotope, in grams, that remains $t$ years after a $128$-gram sample starts to decay. Which statement is the best interpretation of $s(58) = 32$ in this context?
A. Approximately $32$ grams of the sample remains $58$ years after the sample starts to decay.
B. The mass of the sample has decreased by approximately $32$ grams $58$ years after the sample starts to decay.
C. The mass of the sample has decreased by approximately $58$ grams $32$ years after the sample starts to decay.
D. Approximately $58$ grams of the sample remains $32$ years after the sample starts to decay.
Answer: A
Domain: Advanced Math
Explanation: The input $t = 58$ is the number of years, and the output $s(58) = 32$ is the mass, in grams, that remains.

10. Alloy $A$ consists of $10\%$ chromium by mass, and alloy $B$ consists of $15\%$ chromium by mass. A mixture is made by combining some of alloy $A$ with some of alloy $B$. The mixture has a total mass of $1{,}000$ grams and contains $130$ grams of chromium. How many grams of chromium in the mixture came from alloy $A$?
Answer: 40
Domain: Algebra
Explanation: Let $a$ be the mass of alloy $A$. Then $0.10a + 0.15(1{,}000 - a) = 130$, so $150 - 0.05a = 130$ and $a = 400$. The chromium from alloy $A$ is $0.10(400) = 40$ grams.

11.

$$\begin{gathered} y < 24 - 8x \\[4pt] \dfrac{y}{8} > 9 \end{gathered}$$

Which inequality represents the $x$ values for all solutions $(x, y)$ that satisfy the given system of inequalities in the $xy$-plane?
A. $x > 3$
B. $x < 3$
C. $x > -6$
D. $x < -6$
Answer: D
Domain: Algebra
Explanation: From $\frac{y}{8} > 9$, $y > 72$. So $72 < y < 24 - 8x$, which requires $24 - 8x > 72$, or $-8x > 48$, so $x < -6$.

12. In triangle $ABC$ shown, $DE$ is parallel to $AC$, $BD = AD$, $BE = 5$, and $AC = 9$. What is the length of $BC$?

![Triangle ABC. Point D lies on side AB and point E lies on side BC; dashed segment DE is parallel to AC.](tests/images/september-2026/q12.svg)

*Note: Figure not drawn to scale.*
A. $45$
B. $18$
C. $14$
D. $10$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $BD = AD$, point $D$ is the midpoint of $\overline{AB}$. Because $DE \parallel AC$, point $E$ is the midpoint of $\overline{BC}$. So $BC = 2(BE) = 10$.

13. In triangle $QRS$ shown, which expression represents the length of $QR$?

![Right triangle QRS with the right angle at S. Side QS is labeled 18.](tests/images/september-2026/q13.svg)

*Note: Figure not drawn to scale.*
A. $18\cos Q$
B. $18\sin Q$
C. $\dfrac{18}{\cos Q}$
D. $\dfrac{18}{\sin Q}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Angle $S$ is a right angle, so $\overline{QR}$ is the hypotenuse and $QS = 18$ is the leg adjacent to angle $Q$. Then $\cos Q = \dfrac{QS}{QR} = \dfrac{18}{QR}$, so $QR = \dfrac{18}{\cos Q}$.

14. In isosceles triangle $PQR$, $PQ = PR$. The length of base $QR$ is $48$, and $\tan R = \dfrac{7}{24}$. What is the area of triangle $PQR$?
Answer: 168
Domain: Geometry and Trigonometry
Explanation: The altitude from $P$ bisects $QR$, so it meets $QR$ $24$ units from $R$. Then $\tan R = \frac{h}{24} = \frac{7}{24}$ gives $h = 7$. The area is $\frac{1}{2}(48)(7) = 168$.

15. Which expression is a factor of $y^2(x - 3) - 25(x - 3)^3$?
A. $y(x - 3)$
B. $(x - 5)(x - 3)$
C. $y + x - 3$
D. $y + 5x - 15$
Answer: D
Domain: Advanced Math
Explanation: $y^2(x-3) - 25(x-3)^3 = (x-3)\left[y^2 - 25(x-3)^2\right] = (x-3)(y - 5x + 15)(y + 5x - 15)$.

16. Which expression is a factor of $25p^{15} - 121p^{13}$?
A. $-96p^{32}$
B. $11p - 5$
C. $25p^2 + 121$
D. $5p + 11$
Answer: D
Domain: Advanced Math
Explanation: $25p^{15} - 121p^{13} = p^{13}(25p^2 - 121) = p^{13}(5p - 11)(5p + 11)$.

17.

$$f(x) = 3x^2 + 48x + 193$$

The function $g$ is defined by $g(x) = f(x + 7)$. What is the minimum value of $g(x)$?
A. $-15$
B. $-8$
C. $1$
D. $8$
Answer: C
Domain: Advanced Math
Explanation: The graph of $g$ is a horizontal shift of the graph of $f$, so both have the same minimum value. Since $f(x) = 3(x + 8)^2 + 1$, the minimum value is $1$.

18. The function $f$ is defined by $f(x) = \dfrac{|x|}{a} - 14$, where $a < 0$. What is the product of $f(15a)$ and $f(8a)$?
Answer: 638
Domain: Advanced Math
Explanation: Since $a < 0$, $|15a| = -15a$ and $|8a| = -8a$. So $f(15a) = -15 - 14 = -29$ and $f(8a) = -8 - 14 = -22$. The product is $(-29)(-22) = 638$.

19. On a plot of land, $52.0\%$ of the square footage is farmland and the remaining square footage is pasture. There are buildings on exactly $21.5\%$ of the square footage of the farmland, and there are buildings on exactly $14.0\%$ of the square footage of the pasture. If there are buildings on exactly $p\%$ of the square footage of the plot of land, what is the value of $p$?
Answer: 17.9
Domain: Problem-Solving and Data Analysis
Explanation: $p = 0.520(21.5) + 0.480(14.0) = 11.18 + 6.72 = 17.9$.

20. The function $r$ is defined by $r(x) = \dfrac{9}{x^2} - 8$. In the $xy$-plane, the graph of $y = t(x)$ is the result of shifting the graph of $y = r(x)$ to the right $a$ units and down $b$ units, where $a$ and $b$ are positive constants. Which equation defines function $t$?
A. $t(x) = \dfrac{9}{x^2 - a} - (8 - b)$
B. $t(x) = \dfrac{9}{x^2 - a} - (8 + b)$
C. $t(x) = \dfrac{9}{(x - a)^2} - (8 - b)$
D. $t(x) = \dfrac{9}{(x - a)^2} - (8 + b)$
Answer: D
Domain: Advanced Math
Explanation: Shifting right $a$ units replaces $x$ with $x - a$; shifting down $b$ units subtracts $b$: $t(x) = \frac{9}{(x-a)^2} - 8 - b = \frac{9}{(x-a)^2} - (8 + b)$.

21. For students at a school, the table summarizes the distribution of grade level and location during their lunch break on a certain day.

| | *Grade 9* | *Grade 10* | *Grade 11* | *Grade 12* | *Total* |
|:---|:---:|:---:|:---:|:---:|:---:|
| *On campus* | 302 | 285 | 156 | 62 | 805 |
| *Off campus* | 63 | 67 | 169 | 249 | 548 |
| *Total* | 365 | 352 | 325 | 311 | 1,353 |

A student from this school is selected at random. Based on the table, what is the probability of selecting a student that stayed on campus during their lunch break, given that the student is in grade $10$ or $11$? (Express your answer as a decimal or fraction, not as a percent.)
Answer: 441/677
Domain: Problem-Solving and Data Analysis
Explanation: There are $352 + 325 = 677$ students in grade $10$ or $11$, and $285 + 156 = 441$ of them stayed on campus. The probability is $\frac{441}{677}$ (or $.6514$).

22. The solutions to $x^2 - 3x - 7 = 0$ are $\dfrac{3 - \sqrt{p}}{2}$ and $\dfrac{3 + \sqrt{p}}{2}$. If the solutions to $x^2 - 17x + c = 0$, where $c$ is a constant, are $\dfrac{17 - \sqrt{p}}{2}$ and $\dfrac{17 + \sqrt{p}}{2}$, what is the value of $c$?
A. $2$
B. $49$
C. $63$
D. There is not enough information to determine the value of $c$.
Answer: C
Domain: Advanced Math
Explanation: By the quadratic formula, the solutions to $x^2 - 3x - 7 = 0$ are $\frac{3 \pm \sqrt{37}}{2}$, so $p = 37$. The solutions to $x^2 - 17x + c = 0$ are $\frac{17 \pm \sqrt{289 - 4c}}{2}$, so $289 - 4c = 37$ and $c = 63$.

23. Object Z has a mass of $180$ grams. The mass of object X is $3{,}800\%$ of the mass of object Z. The mass of object Z is $25\%$ of the mass of object Y. The sum, in grams, of the mass of object X and the mass of object Y is equal to the product, in grams, of $w$ and the mass of object Z, where $w$ is a constant. What is the value of $w$?
Answer: 42
Domain: Problem-Solving and Data Analysis
Explanation: X has mass $38(180) = 6{,}840$ grams and Y has mass $\frac{180}{0.25} = 720$ grams. Then $6{,}840 + 720 = 7{,}560 = 180w$, so $w = 42$.

24. ![Triangle ABC. Point D lies on side AB and point E lies on side BC, with segment DE parallel to AC. Segment BD is labeled x and segment DA is labeled y.](tests/images/september-2026/q24.svg)

*Note: Figure not drawn to scale.*

In triangle $ABC$, point $D$ lies on $\overline{AB}$ and point $E$ lies on $\overline{BC}$ such that $\overline{DE}$ is parallel to $\overline{AC}$. If $\dfrac{x}{y} = \dfrac{3}{2}$ and $DE = 57$, what is the length of $\overline{AC}$?
A. $114$
B. $95$
C. $90$
D. $38$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $\frac{x}{y} = \frac{3}{2}$, $\frac{BD}{BA} = \frac{x}{x + y} = \frac{3}{5}$. Triangles $DBE$ and $ABC$ are similar, so $\frac{DE}{AC} = \frac{3}{5}$ and $AC = \frac{5}{3}(57) = 95$.

25. An environmental scientist studies the decomposition of paper bags when the bags are placed in an environment with a certain type of bacteria. The exponential function $f(x) = 510(0.92)^x$ gives the estimated remaining mass, in grams, of the paper bags $x$ days after they are placed in an environment with this bacteria, where $0 \le x \le 30$. If this function is graphed in the $xy$-plane, where $y = f(x)$, which statement is the best interpretation of the point $(1, 469.20)$ on the graph?
A. The estimated remaining mass of the paper bags $1$ day after they are placed in an environment with this bacteria is $469.20$ grams less than it was the day before.
B. The estimated remaining mass of the paper bags after they are placed in an environment with this bacteria is decreasing by $469.20$ grams per day.
C. The estimated remaining mass of the paper bags $1$ day after they are placed in an environment with this bacteria is $469.20$ grams.
D. The estimated remaining mass of the paper bags $469.20$ days after they are placed in an environment with this bacteria is $1$ gram.
Answer: C
Domain: Advanced Math
Explanation: The point $(1, 469.20)$ means $f(1) = 469.20$: $1$ day after the bags are placed in the environment, the estimated remaining mass is $469.20$ grams.
`
});
