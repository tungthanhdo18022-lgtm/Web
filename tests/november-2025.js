/*
 * Practice test: November 2025 (12 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'november-2025',
  source: String.raw`
---
title: November 2025
author: tungtks18022
date: 2025-11
description: A 12-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 19
---

1.

![Triangle ABC, with vertex B at the top, A at the bottom left, and C at the bottom right. To its right, a larger triangle A′B′C′ has the same orientation, with B′ at the top, A′ at the bottom left, and C′ at the bottom right.](tests/images/november-2025/q1.svg)

*Note: Figures not drawn to scale.*

Triangles $ABC$ and $A'B'C'$ are shown. Triangle $ABC$ is dilated by a scale factor of $6$ to form triangle $A'B'C'$. If the length of $\overline{AB}$ is $18$, what is the length of $\overline{A'B'}$?
A. $3$
B. $6$
C. $24$
D. $108$
Answer: D
Domain: Geometry and Trigonometry
Explanation: A dilation by a scale factor of $6$ multiplies every length by $6$. Since $\overline{A'B'}$ corresponds to $\overline{AB}$, its length is $6(18) = 108$.

2.

$$a, 26, 29, b, 31, 47, c$$

For the given data set, the data values are listed in ascending order, where $a$, $b$, and $c$ are constants. For this data set, the mean is $36$, the median is $29$, and the range is $72$. What is the value of $c$?
A. $54$
B. $72$
C. $81$
D. $98$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The $7$ values are in ascending order, so the median is the fourth value: $b = 29$. The mean is $36$, so $a + 26 + 29 + 29 + 31 + 47 + c = 7(36) = 252$, which gives $a + c = 90$. The range gives $c - a = 72$. Adding these equations gives $2c = 162$, so $c = 81$.

3.

$$y = 9\left(\dfrac{a}{7}\right)^{x + c} - b$$

How many times does the graph of the given equation in the $xy$-plane cross the $x$-axis, where $a$, $b$, and $c$ are positive constants such that $a > 7$ and $b > c$?
A. Zero
B. One
C. Two
D. Three
Answer: B
Domain: Advanced Math
Explanation: Since $a > 7$, the base $\frac{a}{7}$ is greater than $1$, so $9\left(\frac{a}{7}\right)^{x + c}$ is increasing and takes every positive value exactly once. The graph crosses the $x$-axis where $9\left(\frac{a}{7}\right)^{x + c} = b$, and because $b > 0$, this equation has exactly one solution. So the graph crosses the $x$-axis once.

4. A biologist mixed a solution that is $0.3\%$ sodium chloride by mass with a solution that is $0.15\%$ sodium chloride by mass to obtain a new solution, which has a mass of $80$ grams and contains $0.21$ grams of sodium chloride. How many grams of $0.3\%$ sodium chloride solution did the biologist use?
A. $0.14$
B. $20$
C. $60$
D. $79.86$
Answer: C
Domain: Algebra
Explanation: Let $x$ be the mass, in grams, of the $0.3\%$ solution, so the mass of the $0.15\%$ solution is $80 - x$ grams. Then $0.003x + 0.0015(80 - x) = 0.21$, so $0.0015x + 0.12 = 0.21$ and $x = 60$.

5. For data set A, the table summarizes the distribution of the number of pieces of mail received by a business each day during a period of $11$ days.

| Pieces of mail | Days |
|:---:|:---:|
| 0 | 2 |
| 3 | 2 |
| 4 | 2 |
| 5 | 2 |
| 6 | 1 |
| 7 | 1 |
| 13 | 1 |

The data value $13$ is removed from data set A to create data set B, which consists of the remaining $10$ data values. Which statement best compares the median of data set A and the median of data set B?
A. The median of data set B is less than the median of data set A.
B. The median of data set B is greater than the median of data set A.
C. The median of data set B is equal to the median of data set A.
D. There is not enough information to compare the medians of the two data sets.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Data set A has $11$ values, so its median is the $6$th value in order, which is $4$. Data set B consists of $0, 0, 3, 3, 4, 4, 5, 5, 6, 7$, so its median is the mean of the $5$th and $6$th values, $\frac{4 + 4}{2} = 4$. The two medians are equal.

6. In each of the following data sets of $5$ values, $p$ is a constant. Which of these data sets has the largest standard deviation?
A. $p - 4, p, p, p, p + 4$
B. $p - 1, p - 1, p, p + 1, p + 1$
C. $p, p, p, p, p$
D. $p - 5, p - 4, p, p + 4, p + 5$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Each data set is symmetric about $p$, so each has mean $p$. The squared deviations from the mean are $25, 16, 0, 16, 25$ for choice D, compared with $16, 0, 0, 0, 16$ for choice A, $1, 1, 0, 1, 1$ for choice B, and all $0$ for choice C. The values in choice D are spread farthest from the mean, so it has the largest standard deviation.

7.

$$\begin{aligned} r(x) &= 13(x - 2) \\[4pt] s(x) &= x^3 + nx^2 + 2nx + 8 \end{aligned}$$

For the given functions $r$ and $s$, $n$ is a constant. If $r(x) \cdot s(x) = 13(x^4 - 16)$, what is the value of $n$?
Answer: 2
Domain: Advanced Math
Explanation: Since $x^4 - 16 = (x - 2)(x^3 + 2x^2 + 4x + 8)$, the equation $13(x - 2) \cdot s(x) = 13(x^4 - 16)$ gives $s(x) = x^3 + 2x^2 + 4x + 8$. Matching this with $x^3 + nx^2 + 2nx + 8$ gives $n = 2$, which also makes $2n = 4$.

8. In 2005, Aster earned $12\%$ more than in 2004, and in 2006 Aster earned $6\%$ more than in 2005. If Aster earned $y$ times as much in 2004 as in 2006, which of the following is closest to the value of $y$?
A. $0.5000$
B. $0.7200$
C. $0.8423$
D. $1.1872$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: If Aster earned $E$ dollars in 2004, then Aster earned $1.12E$ dollars in 2005 and $1.06(1.12E) = 1.1872E$ dollars in 2006. So $y = \frac{E}{1.1872E} = \frac{1}{1.1872} \approx 0.8423$.

9. The function $h$ is defined by $h(x) = \dfrac{10x^2}{x^2 - 9k^2} - \dfrac{5x}{x + 3k}$, where $k$ is a positive constant. What is the value of $h\!\left(\dfrac{21k}{8}\right)$?
A. $-\dfrac{5}{3}$
B. $-\dfrac{35}{12}$
C. $-14$
D. $-35$
Answer: D
Domain: Advanced Math
Explanation: Since $x^2 - 9k^2 = (x - 3k)(x + 3k)$, combining the fractions gives $h(x) = \dfrac{10x^2 - 5x(x - 3k)}{(x - 3k)(x + 3k)} = \dfrac{5x(x + 3k)}{(x - 3k)(x + 3k)} = \dfrac{5x}{x - 3k}$. Multiplying the numerator and denominator by $8$ gives $h\left(\dfrac{21k}{8}\right) = \dfrac{5(21k)}{21k - 24k} = \dfrac{105k}{-3k} = -35$.

10. The functions $f$ and $g$ are defined by the given equations, where $x \ge 0$, $a$ and $b$ are integer constants, $a < b$, and $a > 1$. If $y = f(x)$ and $y = g(x)$ are graphed in the $xy$-plane, which of the following equations displays, as a constant or coefficient, the minimum value of the function it defines, where $x \ge 0$?

I. $f(x) = a(0.48)^{-bx}$

II. $g(x) = a(1.52)^{x + 2} + b$
A. I and II
B. II only
C. Neither I nor II
D. I only
Answer: D
Domain: Advanced Math
Explanation: Since $1 < a < b$, $b$ is positive. In I, $f(x) = a\left(\frac{1}{0.48}\right)^{bx}$ is increasing for $x \ge 0$, so its minimum value is $f(0) = a$, which is displayed as the coefficient. In II, $g$ is also increasing, so its minimum value is $g(0) = a(1.52)^2 + b = 2.3104a + b$, which is not displayed. So only I displays its minimum value.

11.

$$\begin{gathered} \text{Circle } A\colon (x - 7)^2 + (y - p)^2 = 21 \\[4pt] \text{Circle } B\colon (x + 7)^2 + (y - p)^2 = 21 \end{gathered}$$

In the given equations, $p$ is a positive constant. Which statement correctly compares the graphs of circles $A$ and $B$ in the $xy$-plane?
A. Circle $B$ is the reflection of circle $A$ across the $x$-axis.
B. Circle $B$ is the reflection of circle $A$ across the $y$-axis.
C. Circle $B$ is the translation of circle $A$ $14$ units up.
D. Circle $B$ is the translation of circle $A$ $14$ units to the right.
Answer: B
Domain: Geometry and Trigonometry
Explanation: Circle $A$ has center $(7, p)$ and circle $B$ has center $(-7, p)$, and both have radius $\sqrt{21}$. Replacing $x$ with $-x$ in the equation of circle $A$ gives the equation of circle $B$, so circle $B$ is the reflection of circle $A$ across the $y$-axis. (Circle $B$ is also the translation of circle $A$ $14$ units to the left, not to the right.)

12. In triangle $XYZ$, the measure of angle $X$ is $x^\circ$, the measure of angle $Y$ is $y^\circ$, and the measure of angle $Z$ is $31^\circ$. If $x > y > 31$, which of the following additional pieces of information is **NOT** sufficient to determine the values of $x$ and $y$?
A. The value of $31 - x - 3y$
B. The value of $31 + 3x + y$
C. The value of $31 - 3x + 3y$
D. The value of $31 - 3x - 3y$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The angle measures of a triangle sum to $180^\circ$, so $x + y + 31 = 180$, or $x + y = 149$. Then $31 - 3x - 3y = 31 - 3(x + y) = -416$ for every such triangle, so knowing this value gives no new information. Each of the other expressions gives a second linear equation that is independent of $x + y = 149$, so it determines $x$ and $y$.
`
});
