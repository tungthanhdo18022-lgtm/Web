/*
 * Practice test: October 2026 (22 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'october-2026',
  source: String.raw`
---
title: October 2026
author: tungtks18022
date: 2026-10
description: A 22-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 35
---

1. The frequency table summarizes the age, in years, of each of the $50$ coins in Vivek's original collection.

| Age (years) | Frequency |
|:---:|:---:|
| 60 | 10 |
| 65 | 5 |
| 70 | 4 |
| 75 | 12 |
| 80 | 4 |
| 85 | 5 |
| 90 | 10 |
| Total | 50 |

Vivek will add a $130$-year-old coin to his original collection, creating a new collection of $51$ coins. Which statement correctly compares the mean ages and median ages of Vivek's original and new collections?
A. The mean age for the new collection is greater than the mean age for the original collection, and the median age for the new collection is greater than the median age for the original collection.
B. The mean age for the new collection is greater than the mean age for the original collection, but the median age is the same for the original and new collections.
C. The mean age for the new collection is less than the mean age for the original collection, and the median age for the new collection is less than the median age for the original collection.
D. The median age for the new collection is greater than the median age for the original collection, but the mean age is the same for the original and new collections.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The original mean age is $\frac{3{,}750}{50} = 75$ years, and adding a coin older than $75$ years increases the mean. In the original collection, the $25$th and $26$th ages are both $75$, so the median is $75$; in the new collection, the median is the $26$th age, which is still $75$. So the mean increases, but the median stays the same.

2.

$$\begin{gathered} x^2 + y^2 = 64 \\[4pt] y = mx + \dfrac{b}{2} \end{gathered}$$

In the given system of equations, $m$ and $b$ are negative constants. In the $xy$-plane, the graphs of the equations in the given system intersect at the point $(-7, y)$, where $y < 0$. Which expression represents the value of $b$?
A. $14m - 2\sqrt{15}$
B. $-14m + 2\sqrt{15}$
C. $\dfrac{7m}{2} - \dfrac{\sqrt{15}}{2}$
D. $-\dfrac{7m}{2} + \dfrac{\sqrt{15}}{2}$
Answer: A
Domain: Advanced Math
Explanation: Substituting $x = -7$ into $x^2 + y^2 = 64$ gives $y^2 = 15$, and since $y < 0$, $y = -\sqrt{15}$. Substituting $(-7, -\sqrt{15})$ into $y = mx + \frac{b}{2}$ gives $-\sqrt{15} = -7m + \frac{b}{2}$, so $\frac{b}{2} = 7m - \sqrt{15}$ and $b = 14m - 2\sqrt{15}$.

3. In right triangle $ABC$, angle $C$ measures $90^\circ$. If $\cos(A) = \dfrac{5}{13}$, what is the value of $\tan(A)$?
A. $\dfrac{12}{5}$
B. $\dfrac{5}{12}$
C. $\dfrac{12}{13}$
D. $\dfrac{13}{5}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since $\cos(A) = \frac{5}{13}$, the leg adjacent to angle $A$ and the hypotenuse can be taken as $5$ and $13$. The leg opposite angle $A$ is then $\sqrt{13^2 - 5^2} = 12$, so $\tan(A) = \frac{12}{5}$.

4. The sum of three consecutive even integers is less than $123$. The least of the three integers is $x$. What is the greatest possible value of $x$?
A. $41$
B. $40$
C. $39$
D. $38$
Answer: D
Domain: Algebra
Explanation: The three integers are $x$, $x + 2$, and $x + 4$, so $3x + 6 < 123$, which gives $x < 39$. Since $x$ must be even, the greatest possible value of $x$ is $38$.

5.

$$18(w - a)(w + 5) = 6(w + 5)$$

In the given equation, $a$ is a constant. The sum of the solutions to the equation is $\dfrac{37}{3}$. What is the value of $a$?
Answer: 17
Domain: Advanced Math
Explanation: Moving all terms to one side gives $(w + 5)\left[18(w - a) - 6\right] = 0$, so the solutions are $w = -5$ and $w = a + \frac{1}{3}$. Their sum is $a + \frac{1}{3} - 5 = \frac{37}{3}$, so $a = \frac{37}{3} - \frac{1}{3} + 5 = 17$.

6. For a project, Kayla recorded the heights of $25$ people in her neighborhood. The histogram summarizes the heights, in inches (in), of these $25$ people in Kayla's neighborhood. The first bar represents people with a height of at least $51$ in but less than $53$ in. The second bar represents people with a height of at least $53$ in but less than $55$ in, and so on.

![Histogram with Height (in) on the horizontal axis, marked 51, 53, 55, 57, 59, and 61, and Frequency on the vertical axis, from 0 to 8. The frequencies are 4 for 51 to 53, 6 for 53 to 55, 5 for 55 to 57, 8 for 57 to 59, and 2 for 59 to 61.](tests/images/october-2026/q6.svg)

How many of these $25$ people in Kayla's neighborhood had a height of at least $51$ in but less than $55$ in?
Answer: 10
Domain: Problem-Solving and Data Analysis
Explanation: The first bar (at least $51$ in but less than $53$ in) has a frequency of $4$, and the second bar (at least $53$ in but less than $55$ in) has a frequency of $6$. So $4 + 6 = 10$ people had a height of at least $51$ in but less than $55$ in.

7. A car dealership has only sedans, SUVs, and minivans for sale. On Monday, $20\%$ of the vehicles for sale were sedans and $50\%$ were SUVs. If there were $22$ sedans for sale at the dealership on Monday, how many minivans were for sale?
Answer: 33
Domain: Problem-Solving and Data Analysis
Explanation: Since $20\%$ of the vehicles were sedans, there were $\frac{22}{0.20} = 110$ vehicles in all. The minivans made up $100\% - 20\% - 50\% = 30\%$ of the vehicles, so there were $0.30(110) = 33$ minivans.

8.

$$f(x) = \dfrac{a - 15}{x} + 5$$

In the given function $f$, $a$ is a constant. The graph of function $f$ in the $xy$-plane, where $y = f(x)$, is translated $3$ units down and $2$ units to the right to produce the graph of $y = g(x)$. Which equation defines function $g$?
A. $g(x) = \dfrac{a - 15}{x + 2} + 2$
B. $g(x) = \dfrac{a - 15}{x - 2} + 2$
C. $g(x) = \dfrac{a - 18}{x + 2} + 5$
D. $g(x) = \dfrac{a - 18}{x - 2} + 5$
Answer: B
Domain: Advanced Math
Explanation: Translating the graph $2$ units to the right replaces $x$ with $x - 2$, and translating it $3$ units down subtracts $3$ from the output. So $g(x) = \frac{a - 15}{x - 2} + 5 - 3 = \frac{a - 15}{x - 2} + 2$.

9.

![Right triangle with the right angle at the bottom left vertex. The angle at the top vertex is labeled r degrees, and the angle at the bottom right vertex is labeled s degrees.](tests/images/october-2026/q9.svg)

*Note: Figure not drawn to scale.*

In the figure, $3r > 11s$. Which of the following values must be the greatest?
A. $\sin r^\circ$
B. $\cos r^\circ$
C. $\dfrac{\sin r^\circ}{\sin s^\circ}$
D. $\dfrac{\sin r^\circ}{\cos s^\circ}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The acute angles of a right triangle are complementary ($r + s = 90$), so $\sin s^\circ = \cos r^\circ$ and $\cos s^\circ = \sin r^\circ$. Then $\sin r^\circ < 1$, $\cos r^\circ < 1$, and $\frac{\sin r^\circ}{\cos s^\circ} = 1$, while $\frac{\sin r^\circ}{\sin s^\circ} = \tan r^\circ$. Since $3r > 11s$ gives $r > s$, it follows that $r > 45$, so $\tan r^\circ > 1$ and choice C is the greatest.

10. A researcher conducted a study to examine the melatonin levels of gamers and the amount of time the gamers spent playing video games. A total of $127$ gamers were selected at random from three countries. The melatonin levels of the gamers and the amount of time they spent playing video games were recorded over a $4$-week period. The table gives the number of selected gamers from each country.

<div class="q-table-wrap"><table class="q-table"><tbody><tr><th>Country</th><td>Sweden</td><td>South Korea</td><td>United States</td></tr><tr><th>Number of gamers</th><td>25</td><td>49</td><td>53</td></tr></tbody></table></div>

If the results of this study suggest a relationship between melatonin levels and the amount of time spent playing video games, which of the following aspects of the study will prevent the results from being generalized to all gamers?
A. The melatonin levels of the selected gamers were not measured over a long enough period of time.
B. The number of selected gamers from each country is different.
C. The number of selected gamers is too small.
D. The gamers were not selected at random from all gamers.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Results from a random sample can be generalized only to the population the sample was selected from. The gamers were selected at random from only three countries, not from all gamers, so the results can't be generalized to all gamers.

11.

![Line segment on a grid in the xy-plane, with the x-axis labeled from -8 to 8 and the y-axis labeled from 2 to 12. The endpoints of the segment are (-7, 5) and (2, 11).](tests/images/october-2026/q11.svg)

The line segment shown in the $xy$-plane represents one of the legs of a right triangle. The area of this triangle is $42\sqrt{13}$ square units. What is the length, in units, of the other leg of this triangle?
Answer: 28
Domain: Geometry and Trigonometry
Explanation: The endpoints of the segment are $(-7, 5)$ and $(2, 11)$, so its length is $\sqrt{9^2 + 6^2} = \sqrt{117} = 3\sqrt{13}$. If the other leg has length $L$, then $\frac{1}{2}(3\sqrt{13})L = 42\sqrt{13}$, so $L = 28$.

12.

![Line on a grid in the xy-plane, with the x-axis labeled from -4 to 4 and the y-axis labeled from -10 to -2. The line slants steeply upward from left to right, crossing the y-axis at (0, -7) and passing through (2, -1).](tests/images/october-2026/q12.svg)

The graph of the linear function $y = g(x) - 17$ is shown. If $a$ and $b$ are positive constants, which equation could define $g$?
A. $g(x) = -ax + b$
B. $g(x) = ax - b$
C. $g(x) = ax + b$
D. $g(x) = -ax - b$
Answer: C
Domain: Algebra
Explanation: The graph of $y = g(x) - 17$ is a line with a positive slope and a $y$-intercept of $-7$. The graph of $y = g(x)$ is this line shifted up $17$ units, so it has the same positive slope and a $y$-intercept of $-7 + 17 = 10$, which is positive. Therefore, $g(x) = ax + b$ with $a > 0$ and $b > 0$.

13. A circle has center $G$, and points $M$ and $N$ lie on the circle. Line segments $MH$ and $NH$ are tangent to the circle at points $M$ and $N$, respectively. If the radius of the circle is $238$ millimeters and the perimeter of quadrilateral $GMHN$ is $4{,}508$ millimeters, what is the distance, in millimeters, between points $G$ and $H$?
A. $238$
B. $2{,}002$
C. $2{,}016$
D. $2{,}030$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Tangent segments from the same point are equal, so $MH = NH$, and $GM = GN = 238$. Then $2(238) + 2(MH) = 4{,}508$, so $MH = 2{,}016$. A radius is perpendicular to a tangent at the point of tangency, so in right triangle $GMH$, $GH = \sqrt{238^2 + 2{,}016^2} = \sqrt{4{,}120{,}900} = 2{,}030$.

14.

$$h(x) = a(x + 43)(x + r)(x + s)$$

The polynomial function $h$ is defined by the given equation, where $a$, $r$, and $s$ are positive constants. In the $xy$-plane, the graph of $y = h(x)$ intersects the $x$-axis at exactly three points. If $h(0) = p$, which of the following must be true?
A. $p < 43rs$
B. $p = 43rs$
C. $p > 43rs$
D. There is not enough information to compare the values of $p$ and $43rs$.
Answer: D
Domain: Advanced Math
Explanation: $p = h(0) = a(43)(r)(s) = a(43rs)$. The given conditions only require $-43$, $-r$, and $-s$ to be distinct, so the positive constant $a$ could be less than, equal to, or greater than $1$. Therefore, $p$ could be less than, equal to, or greater than $43rs$.

15. Which expression is a factor of $49x^2(y - 3) - 4(y - 3)^3$?
A. $(7x - 2)(y - 3)$
B. $7x + 2y - 3$
C. $7x + 2y - 6$
D. $49x - 4y + 12$
Answer: C
Domain: Advanced Math
Explanation: $49x^2(y - 3) - 4(y - 3)^3 = (y - 3)\left[(7x)^2 - \left(2(y - 3)\right)^2\right] = (y - 3)(7x - 2y + 6)(7x + 2y - 6)$. So $7x + 2y - 6$ is a factor.

16.

$$f(x) = 5(1.20)^{3 - 4x}$$

The given function can be written as $f(x) = a\left(1 - \frac{p}{100}\right)^x$, where $a$ and $p$ are positive constants. Which value is closest to $p$?
A. $20$
B. $52$
C. $39$
D. $80$
Answer: B
Domain: Advanced Math
Explanation: $f(x) = 5(1.20)^3(1.20)^{-4x} = 8.64\left(1.20^{-4}\right)^x$, and $1.20^{-4} \approx 0.482$. So $1 - \frac{p}{100} \approx 0.482$, which gives $p \approx 51.8$; the closest value is $52$.

17.

$$12(w - a)(w + 5) = 4(w + 5)$$

In the given equation, $a$ is a constant. The sum of the solutions to the equation is $\dfrac{22}{3}$. What is the value of $a$?
Answer: 12
Domain: Advanced Math
Explanation: Moving all terms to one side gives $(w + 5)\left[12(w - a) - 4\right] = 0$, so the solutions are $w = -5$ and $w = a + \frac{1}{3}$. Their sum is $a + \frac{1}{3} - 5 = \frac{22}{3}$, so $a = \frac{22}{3} - \frac{1}{3} + 5 = 12$.

18.

$$V(t) = 7{,}400(R)^{t/10}$$

The function $V$ gives the value, in dollars, of a certain piece of equipment after $t$ months of use, where $R$ is a positive constant less than $1$.

After $4$ months of use, the value of the equipment decreases by $p\%$ from its initial value. Which expression must represent the value of $p$?
A. $100\left(R^{2/5}\right)$
B. $100\left(1 - R^{2/5}\right)$
C. $100\left(R^4\right)$
D. $100\left(1 - R^4\right)$
Answer: B
Domain: Advanced Math
Explanation: The initial value is $V(0) = 7{,}400$, and the value after $4$ months is $V(4) = 7{,}400R^{4/10} = 7{,}400R^{2/5}$. So the value after $4$ months is $R^{2/5}$ times the initial value, which is a decrease of $100\left(1 - R^{2/5}\right)$ percent.

19. Data set B is obtained by adding $25$ to every value in data set A. Which statement must be true?
A. The median of B is $25$ greater than the median of A, and the standard deviation of B is $25$ times that of A.
B. The mean of B is the same as the mean of A, and the standard deviation of B is $25$ greater.
C. Both the mean and the standard deviation of B are $25$ greater than those of A.
D. The mean of B is $25$ greater than the mean of A, and the standard deviation of B is the same as that of A.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Adding the same constant to every value shifts the data, so the mean (and the median) increases by $25$. The distances between the values and the mean do not change, so the standard deviation of B is the same as that of A.

20.

![Graph in the xy-plane with Number of small items, x, on the horizontal axis and Number of large items, y, on the vertical axis. A line segment goes from (0, 20) on the y-axis to (30, 0) on the x-axis.](tests/images/october-2026/q20.svg)

The line shown models all combinations of $x$ small items and $y$ large items that a technician can inspect in exactly $900$ minutes.

The technician takes a fixed amount of time to inspect each small item and a different fixed amount of time to inspect each large item. How many more minutes does it take to inspect one large item than one small item?
A. $30$
B. $45$
C. $75$
D. $15$
Answer: D
Domain: Algebra
Explanation: The intercepts show that the technician can inspect $30$ small items or $20$ large items in $900$ minutes. So one small item takes $\frac{900}{30} = 30$ minutes and one large item takes $\frac{900}{20} = 45$ minutes, and the difference is $45 - 30 = 15$ minutes.

21.

$$f(x) = (2.5)^{x/4}$$

The function $f$ is defined by the given equation. The equation can be rewritten as $f(x) = \left(1 + \frac{p}{100}\right)^x$, where $p$ is a constant. Which of the following is closest to the value of $p$?
A. $26$
B. $33$
C. $62$
D. $150$
Answer: A
Domain: Advanced Math
Explanation: $f(x) = \left(2.5^{1/4}\right)^x \approx 1.257^x$, so $1 + \frac{p}{100} \approx 1.257$, which gives $p \approx 25.7$. The closest value is $26$.

22.

![Dot plot on a number line from 30 to 36. There are 2 dots at 31, 5 dots at 32, 4 dots at 33, 3 dots at 34, and 1 dot at 35.](tests/images/october-2026/q22.svg)

The dot plot represents the $15$ values in data set A. Data set B is created by adding $47$ to each of the values in data set A.

Which of the following correctly compares the medians and the ranges of data sets A and B?
A. The median of data set B is equal to the median of data set A, but the range of data set B is greater than the range of data set A.
B. The median of data set B is equal to the median of data set A, and the range of data set B is equal to the range of data set A.
C. The median of data set B is greater than the median of data set A, and the range of data set B is greater than the range of data set A.
D. The median of data set B is greater than the median of data set A, while the range of data set B is equal to the range of data set A.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The median of data set A is its $8$th value, $33$, and its range is $35 - 31 = 4$. Adding $47$ to each value makes the median of data set B $33 + 47 = 80$, which is greater, while the range stays $(35 + 47) - (31 + 47) = 4$, which is equal.
`
});
