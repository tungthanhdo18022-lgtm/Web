/*
 * Practice test: March 2026 (28 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'march-2026',
  source: String.raw`
---
title: March 2026
author: tungtks18022
date: 2026-03
description: A 28-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 45
---

1. For the positive quantities $m$, $q$, and $r$, $m$ is $20\%$ of $m + q + r$, $q$ is $30\%$ of $q + r$, and the value of $r$ is $1{,}358$. What is the value of $m$?
Answer: 485
Domain: Problem-Solving and Data Analysis
Explanation: From $q = 0.3(q + r)$, $0.7q = 0.3(1{,}358) = 407.4$, so $q = 582$ and $q + r = 1{,}940$. From $m = 0.2(m + q + r)$, $0.8m = 0.2(1{,}940) = 388$, so $m = 485$.

2.

![Graph in the xy-plane of a decreasing exponential curve on a grid from -6 to 6 horizontally and from -10 to 4 vertically. Moving to the left, the curve levels off toward the horizontal line y = 2; moving to the right, it crosses the x-axis between x = -1 and x = 0, crosses the y-axis at (0, -3), and drops steeply to y = -10 just before x = 1.|360](tests/images/march-2026/q2.png)

The graph of $y = f(x) + 2$ is shown, where $f$ is defined by an equation of the form $f(x) = a(b)^x + c$. If $a$, $b$, and $c$ are integer constants and $c \le 0$, which equation could define $f$?
A. $f(x) = -5(3)^x$
B. $f(x) = -5(3)^x - 1$
C. $f(x) = -5(3)^x - 3$
D. $f(x) = -5(3)^x - 5$
Answer: A
Domain: Advanced Math
Explanation: Since $f(x) + 2 = a(b)^x + c + 2$, the graph has the horizontal asymptote $y = c + 2$ and the $y$-intercept $(0, a + c + 2)$. The graph approaches $y = 2$ and crosses the $y$-axis at $(0, -3)$, so $c + 2 = 2$ and $a + c + 2 = -3$, which give $c = 0$ and $a = -5$. All four choices have $a = -5$, but only choice A has $c = 0$, so $f(x) = -5(3)^x$.

3. The scatterplot shows the relationship between two variables, $x$ and $y$, for data set A. A line of best fit for the data is also shown. Data set B is created by subtracting $8$ units from the value of $y$ for each data point from data set A. Which of the following is closest to the $y$-coordinate of the $y$-intercept of the line of best fit for data set B?

![Scatterplot in the xy-plane with the x-axis from 0 to 50 (labeled at 15, 30, and 45) and the y-axis from 0 to 60 (labeled at 15, 30, 45, and 60). Twelve data points with x-values from about 11 to 38 trend downward, and a line of best fit passes through approximately (10, 41) and (40, 21).|400](tests/images/march-2026/q3.png)
A. $39.17$
B. $48$
C. $52.22$
D. $72.33$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Extending the line of best fit for data set A to the $y$-axis shows a $y$-intercept of about $47$: the line passes through about $(40, 21)$ and falls about $0.65$ unit for each $1$-unit increase in $x$, and $21 + 40(0.65) = 47$. Subtracting $8$ from every $y$-value shifts the data, and its line of best fit, down $8$ units, so the $y$-intercept for data set B is about $47 - 8 = 39$. The closest choice is $39.17$.

4.

| Number of cars | Maximum number of passengers and crew |
|:---:|:---:|
| 3 | 139 |
| 6 | 271 |
| 10 | 447 |

The table shows the linear relationship between the number of cars, $c$, on a commuter train and the maximum number of passengers and crew, $p$, that the train can carry. Which equation represents the linear relationship between $c$ and $p$?
A. $44c - p = -7$
B. $44c - p = 7$
C. $44p - c = -7$
D. $44p - c = 7$
Answer: A
Domain: Algebra
Explanation: The slope is $\frac{271 - 139}{6 - 3} = 44$, so $p = 44c + b$. Using $(3, 139)$, $139 = 132 + b$ and $b = 7$. Then $p = 44c + 7$, which is equivalent to $44c - p = -7$.

5.

$$35x + 3 = k(7x + 3) + 7x$$

In the given equation, $k$ is a constant. The equation has exactly one solution. Which value **CANNOT** be the value of $k$?
A. $5$
B. $4$
C. $0$
D. $-4$
Answer: B
Domain: Algebra
Explanation: The right side is $(7k + 7)x + 3k$. The equation has exactly one solution unless the coefficients of $x$ are equal, that is, unless $7k + 7 = 35$, or $k = 4$. When $k = 4$, the equation becomes $35x + 3 = 35x + 12$, which has no solution, so $k$ cannot be $4$.

6.

| $x$ | $y$ |
|:---:|:---:|
| $-12$ | $46$ |
| $a$ | $16$ |
| $2$ | $b$ |

The table shows three values of $x$ and their corresponding values of $y$, where $a$ and $b$ are constants. There is a linear relationship between $x$ and $y$. In the $xy$-plane, the $y$-intercept of the line representing this relationship is $(0, -14)$. What is the value of $a + b$?
A. $-30$
B. $-29$
C. $-20$
D. $-19$
Answer: A
Domain: Algebra
Explanation: The line has the form $y = mx - 14$. Using $(-12, 46)$, $46 = -12m - 14$, so $m = -5$ and $y = -5x - 14$. Then $16 = -5a - 14$ gives $a = -6$, and $b = -5(2) - 14 = -24$. So $a + b = -30$.

7.

![Two horizontal parallel lines, line m above line n, crossed by two transversals that intersect at point B between them. One transversal rises from point A on line n through B to point E on line m; the other falls from point D on line m through B to point C on line n. D is to the left of E on line m, and A is to the left of C on line n.|400](tests/images/march-2026/q7.png)

In the figure, line $m$ is parallel to line $n$, and lines $AE$ and $CD$ intersect at point $B$. Which additional piece of information is sufficient to prove that triangle $ABC$ is congruent to triangle $EBD$?
A. $AB = 12$ and $DB = 12$
B. $AB = 12$ and $EB = 12$
C. Triangles $ABC$ and $EBD$ are isosceles.
D. No additional information is necessary to determine that the two triangles are congruent.
Answer: B
Domain: Geometry and Trigonometry
Explanation: Angles $ABC$ and $EBD$ are vertical angles, and since $m \parallel n$, angles $BAC$ and $BED$ are congruent alternate interior angles. So the triangles are similar, with $\overline{AB}$ corresponding to $\overline{EB}$. If $AB = EB = 12$, the triangles are congruent by angle-side-angle. In choice A, $AB$ and $DB$ are not corresponding sides, and without a pair of congruent corresponding sides the triangles are only known to be similar.

8. The value of a painting increased by $179\%$ from the end of 2017 to the end of 2018 and then decreased by $23\%$ from the end of 2018 to the end of 2019. What was the net percentage increase in the value of the painting from the end of 2017 to the end of 2019?
A. $114.83\%$
B. $137.83\%$
C. $156.00\%$
D. $243.17\%$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The value was multiplied by $1.79 + 1 = 2.79$ and then by $1 - 0.23 = 0.77$. Since $2.79(0.77) = 2.1483$, the net increase is $114.83\%$.

9.

$$4x^2 - px + w = -87$$

In the given equation, $p$ and $w$ are integer constants. The equation has exactly one real solution. Which is **NOT** a possible value of $w$?
A. $-23$
B. $13$
C. $81$
D. $313$
Answer: C
Domain: Advanced Math
Explanation: The equation $4x^2 - px + (w + 87) = 0$ has exactly one real solution when its discriminant is $0$, that is, when $p^2 = 16(w + 87)$. Since $p$ is an integer, $p^2$ is a multiple of $16$ only when $p$ is a multiple of $4$, so $w + 87 = \left(\frac{p}{4}\right)^2$ must be a perfect square. For choices A, B, and D, $w + 87$ is $64$, $100$, and $400$, which are perfect squares, but for choice C, $81 + 87 = 168$ is not.

10. Trapezoid $ABCD$ is similar to trapezoid $EFGH$, where $A$, $B$, $C$, and $D$ correspond to $E$, $F$, $G$, and $H$, respectively. The area of trapezoid $ABCD$ is $440$, and the area of trapezoid $EFGH$ is $11{,}000$. The length of side $AB$ is $55$ inches. What is the length, in inches, of side $EF$?
Answer: 275
Domain: Geometry and Trigonometry
Explanation: The ratio of the areas is $\frac{11{,}000}{440} = 25$, so the ratio of corresponding lengths is $\sqrt{25} = 5$. Then $EF = 5(55) = 275$ inches.

11. To investigate the effect of magnesium supplementation on the sleep quality of adults, a researcher selected $190$ adults at random from a community center to participate in a study. The researcher first measured the sleep efficiency of each participant. Each participant was then randomly assigned to take a magnesium supplement or a placebo each day for $6$ weeks. At the end of the $6$ weeks, the researcher measured the sleep efficiency of all participants again and found that the magnesium supplement caused statistically significant improved sleep quality for the adults at the community center.

What feature of this study allowed the researcher to conclude that the magnesium supplement caused the improved sleep quality?
A. There were more than $100$ participants in the study.
B. The participants were selected at random from the community center.
C. The sleep efficiency of each participant was measured again at the end of $6$ weeks.
D. Each participant was randomly assigned to take a magnesium supplement or a placebo.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: A cause-and-effect conclusion requires random assignment of participants to treatment groups. Random selection from the community center only allows the results to be generalized to the adults at that center.

12. In triangle $JKL$, the measure of angle $J$ is $(90b)^\circ$, the measure of angle $K$ is $(69a)^\circ$, and the measure of angle $L$ is $(21a)^\circ$, where $a$ and $b$ are constants. Which of the following must be true?
A. $\cos L > \sin K$
B. $\cos L = \sin K$
C. $\cos L < \sin K$
D. There is not enough information to compare the values of $\cos L$ and $\sin K$.
Answer: D
Domain: Geometry and Trigonometry
Explanation: The angle sum gives $90b + 90a = 180$, so $a + b = 2$, but $a$ itself is not determined. If $a = 1$, then $K = 69^\circ$ and $L = 21^\circ$ are complementary, so $\cos L = \sin K$. If $a = 0.5$, then $\cos 10.5^\circ \approx 0.98$ is greater than $\sin 34.5^\circ \approx 0.57$. Since the comparison depends on $a$, there is not enough information.

13.

$$\dfrac{2}{7}x^2 + 6x + \sqrt{7k + 4}\,x + \sqrt{7k + 4} = 0$$

In the given equation, $k$ is a positive constant. The product of the solutions to the equation is $31.5$. What is the value of $k$?
Answer: 11
Domain: Advanced Math
Explanation: For a quadratic equation $ax^2 + bx + c = 0$, the product of the solutions is $\frac{c}{a}$. Here $\frac{\sqrt{7k + 4}}{2/7} = \frac{7}{2}\sqrt{7k + 4} = 31.5$, so $\sqrt{7k + 4} = 9$. Then $7k + 4 = 81$ and $k = 11$. (With $k = 11$, the equation is $\frac{2}{7}x^2 + 15x + 9 = 0$, which has two real solutions.)

14. $6x^4 + 17x^2 + 5$ can be rewritten as $(3x^2 + a)(2x^2 + b)$, where $a$ and $b$ are positive integers, or as $(3x^2 + c)(2x^2 + d)$, where $c$ and $d$ are positive non-integers. What is the value of $a + c$?
Answer: 17/2 | 8.5
Domain: Advanced Math
Explanation: Expanding, $(3x^2 + a)(2x^2 + b) = 6x^4 + (2a + 3b)x^2 + ab$, so $ab = 5$ and $2a + 3b = 17$. Substituting $b = \frac{5}{a}$ gives $2a^2 - 17a + 15 = 0$, or $(a - 1)(2a - 15) = 0$. The integer solution is $a = 1$ (with $b = 5$), and the non-integer solution is $c = \frac{15}{2}$ (with $d = \frac{2}{3}$). So $a + c = 1 + \frac{15}{2} = \frac{17}{2}$.

15.

![Graph in the xy-plane of an upward-opening parabola on a grid with lines every 1 unit; the axes are labeled at -5, 0, and 5 horizontally and at -5 and -10 vertically. The vertex is at (-1, -9), the parabola crosses the y-axis at (0, -3), and it crosses the x-axis at about x = -2.2 and x = 0.2.|480](tests/images/march-2026/q15.png)

The graph of $y = 6x^2 + bx + c$ is shown in the $xy$-plane. What is the value of $bc$?
Answer: -36
Domain: Advanced Math
Explanation: The vertex of the parabola is $(-1, -9)$, so $y = 6(x + 1)^2 - 9 = 6x^2 + 12x - 3$. Thus $b = 12$ and $c = -3$ (consistent with the $y$-intercept $(0, -3)$), and $bc = -36$.

16. A model estimates that in a particular forest, the number of trees with any given diameter measured at shoulder height is $21\%$ less for each $1$-inch increase in tree diameter measured at shoulder height. The model can be written in the form $f(x) = ab^x$, where $a$ and $b$ are constants and $x$ is the tree's diameter, in inches, measured at shoulder height, and $x \ge 5$. The model estimates that $3{,}100$ trees in this forest have a diameter of $13$ inches measured at shoulder height. Which function best represents this model?
A. $f(x) = 3{,}100(0.21)^x$
B. $f(x) = 3{,}100(0.79)^x$
C. $f(x) = 66{,}000(0.21)^x$
D. $f(x) = 66{,}000(0.79)^x$
Answer: D
Domain: Advanced Math
Explanation: A $21\%$ decrease for each $1$-inch increase gives $b = 1 - 0.21 = 0.79$. Since $f(13) = 3{,}100$, $a = \frac{3{,}100}{0.79^{13}} \approx 66{,}400$, so $f(x) = 66{,}000(0.79)^x$ best represents the model.

17. A circle in the $xy$-plane has its center at $(-5, 5)$. Line $t$ is tangent to this circle at the point $(6, -1)$. Which of the following points also lies on line $t$?
A. $(0, 11)$
B. $(1, 16)$
C. $(12, 10)$
D. $(17, 5)$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The radius to $(6, -1)$ has slope $\frac{-1 - 5}{6 - (-5)} = -\frac{6}{11}$, so the tangent line has slope $\frac{11}{6}$ and equation $y + 1 = \frac{11}{6}(x - 6)$. For $x = 12$, $y = \frac{11}{6}(6) - 1 = 10$, so $(12, 10)$ lies on line $t$.

18. A circle has center $G$, and points $M$ and $N$ lie on the circle. Line segments $MH$ and $NH$ are tangent to the circle at points $M$ and $N$, respectively. If the radius of the circle is $247$ millimeters and the perimeter of quadrilateral $GMHN$ is $5{,}174$ millimeters, what is the distance, in millimeters, between points $G$ and $H$?
Answer: 2353
Domain: Geometry and Trigonometry
Explanation: Tangent segments from $H$ are equal, so $MH = NH$, and $GM = GN = 247$. Then $2(247) + 2(MH) = 5{,}174$ gives $MH = 2{,}340$. Since a tangent is perpendicular to the radius, triangle $GMH$ has a right angle at $M$, so $GH = \sqrt{247^2 + 2{,}340^2} = \sqrt{5{,}536{,}609} = 2{,}353$.

19. In triangle $RST$, the length of $RS$ is $21$, and the length of $ST$ is $9$. Triangle $RST$ is dilated by a scale factor of $\frac{1}{3}$ to obtain triangle $R'S'T'$. What is the length of $S'T'$?
A. $3$
B. $7$
C. $27$
D. $63$
Answer: A
Domain: Geometry and Trigonometry
Explanation: A dilation multiplies every length by the scale factor, so $S'T' = \frac{1}{3}(9) = 3$.

20. A certain investment account offers a special interest rate for the first $4$ months the account is open followed by a lower interest rate for the remainder of the time the account is open. Bennett opened one of these accounts with an original account balance of \$700 and did not make any other deposits or withdrawals. $4$ months after Bennett opened the account, the balance had increased by $0.6\%$ of the original balance. $6$ months after Bennett opened the account, the balance had increased by an additional $0.2\%$ of the balance at the end of the first $4$ months. Every $2$ months after the first $6$ months, the balance had increased by an additional $0.2\%$ of the balance $2$ months before. Which of the following equations could represent the account balance $B(x)$, in dollars, $x$ months after the account was opened, where $x \ge 4$?
A. $B(x) = 704.2(1.002)^{x/2 - 4/2}$
B. $B(x) = 704.2(1.002)^{x/2 - 4}$
C. $B(x) = 704.2(1.002)^{2x - 8}$
D. $B(x) = 704.2(1.002)^{2x - 4}$
Answer: A
Domain: Advanced Math
Explanation: After $4$ months the balance is $700(1.006) = 704.2$ dollars. After that, the balance is multiplied by $1.002$ once every $2$ months, so $x$ months after opening there have been $\frac{x - 4}{2} = \frac{x}{2} - \frac{4}{2}$ such periods. Thus $B(x) = 704.2(1.002)^{x/2 - 4/2}$.

21. A reindeer population was introduced into an area and researched for $19$ years. Function $P$ models this reindeer population $t$ years after the population was introduced into the area.

$$P(t) = 67\left(\dfrac{5}{4}\right)^t$$

Which statement is the best interpretation of $\frac{5}{4}$ in this context?
A. For every $4$ reindeer there were in this population in a certain year, it is predicted that there will be $5$ reindeer the next year.
B. For every $5$ reindeer there were in this population in a certain year, it is predicted that there will be $4$ reindeer the next year.
C. It is predicted that this reindeer population grows by $4$ reindeer every $5$ years.
D. It is predicted that this reindeer population grows by $5$ reindeer every $4$ years.
Answer: A
Domain: Advanced Math
Explanation: The base $\frac{5}{4}$ is the growth factor per year: each year the population is multiplied by $\frac{5}{4}$. So for every $4$ reindeer in a certain year, the model predicts $5$ reindeer the next year.

22. In each of the following data sets of $5$ values, $p$ is a constant. Which of these data sets has the largest standard deviation?
A. $p - 4,\ p,\ p,\ p,\ p + 4$
B. $p - 1,\ p - 1,\ p,\ p + 1,\ p + 1$
C. $p,\ p,\ p,\ p,\ p$
D. $p - 5,\ p - 4,\ p,\ p + 4,\ p + 5$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Each data set has mean $p$. The sums of the squared deviations from the mean are $32$, $4$, $0$, and $25 + 16 + 0 + 16 + 25 = 82$, respectively. Data set D has its values spread farthest from the mean, so it has the largest standard deviation.

23. To determine the median number of a store's visitors per day, the store owner calculated the median number of visitors for $11$ consecutive Wednesdays. For these $11$ Wednesdays, the median number of the store's visitors per day was $44$. Which of the following statements must be true?
A. The median number of the store's visitors per day is $44$.
B. A determination about the median number of the store's visitors per day should not be made because no other stores are considered in the sample.
C. The sampling method is flawed and may produce a biased estimate of the median number of the store's visitors per day.
D. The sampling method is not flawed and is likely to produce an unbiased estimate of the median number of the store's visitors per day.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The sample includes only Wednesdays, which may not be representative of all days of the week (for example, weekends may be busier). So the sampling method is flawed and may produce a biased estimate.

24.

$$4x^2 - px + w = -85$$

In the given equation, $p$ and $w$ are integer constants. The equation has exactly one real solution. Which is **NOT** a possible value of $w$?
A. $-21$
B. $15$
C. $64$
D. $315$
Answer: C
Domain: Advanced Math
Explanation: The equation $4x^2 - px + (w + 85) = 0$ has exactly one real solution when its discriminant is $0$, that is, when $p^2 = 16(w + 85)$. Since $p$ is an integer, $p^2$ is a multiple of $16$ only when $p$ is a multiple of $4$, so $w + 85 = \left(\frac{p}{4}\right)^2$ must be a perfect square. For choices A, B, and D, $w + 85$ is $64$, $100$, and $400$, which are perfect squares, but for choice C, $64 + 85 = 149$ is not.

25. A research manager selected $2$ random samples of ovens of a certain type to estimate the average amount of time this type of oven takes to preheat to $350$ degrees Fahrenheit (°F). The research manager recorded the amount of time, in minutes, each oven takes to preheat to $350^\circ$F. Based on the first sample, the research manager estimated that this type of oven takes an average of $14.2$ minutes to preheat to $350^\circ$F, with an associated margin of error of $1$ minute. Based on the second sample, the research manager estimated that this type of oven takes an average of $14.4$ minutes to preheat to $350^\circ$F, with an associated margin of error of $2.2$ minutes. Assuming the margins of error were calculated the same way, which of the following best explains why the first sample obtained a smaller margin of error than the second sample?
A. The first sample contained fewer ovens than the second sample.
B. The first sample contained more ovens than the second sample.
C. The first sample took less time on average to preheat to $350^\circ$F than the second sample.
D. The first sample took more time on average to preheat to $350^\circ$F than the second sample.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: When margins of error are calculated the same way, a larger sample size generally produces a smaller margin of error. The sample means do not explain the difference in the margins of error.

26.

$$\text{Data set X: } 13, 16, 19, 21, 24, 25, 25, 26, 38$$

$$\text{Data set Y: } 13, 16, 19, 21, 24, 25, 25, 26, 33$$

Data set Y is created by replacing the number $38$ in data set X with the number $33$. Which of the following statements is true about the means and medians of data set X and data set Y?
A. The mean of data set X is greater than the mean of data set Y, and the median of data set X equals the median of data set Y.
B. The mean of data set X is greater than the mean of data set Y, and the median of data set X is greater than the median of data set Y.
C. The mean of data set X equals the mean of data set Y, and the median of data set X equals the median of data set Y.
D. The mean of data set X is less than the mean of data set Y, and the median of data set X is greater than the median of data set Y.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Replacing $38$ with the smaller value $33$ lowers the sum, so the mean of data set X ($23$) is greater than the mean of data set Y (about $22.4$). Both data sets have $9$ values in order, and the $5$th value in each is $24$, so the medians are equal.

27. On January 1, 2000, the population of a town was $26{,}255$, and on January 1, 2010, the population was $27{,}056$. The equation $10x + 26{,}255 = 27{,}056$ describes this situation. Which of the following is the best interpretation of $x$ in this context?
A. The total increase in population between 2000 and 2010
B. The projected population of the town $10$ years after 2010
C. The average increase per year of the population between 2000 and 2010
D. The percentage by which the population of the town increased between 2000 and 2010
Answer: C
Domain: Algebra
Explanation: The $10$ is the number of years from 2000 to 2010, and $10x$ is the total increase, $27{,}056 - 26{,}255 = 801$. So $x = 80.1$ is the average increase per year in the population between 2000 and 2010.

28.

![Two triangles. In the smaller triangle DEF, side DE is labeled f, side EF is labeled d, and side DF is labeled e. In the larger triangle QRS, side QR is labeled kf, side RS is labeled kd, and side QS is labeled ke.](tests/images/march-2026/q28.svg)

*Note: Figure not drawn to scale.*

In the figure shown, $d$, $e$, and $f$ are constants and the value of $k$ is $3$. If the measures of angles $D$, $E$, and $F$ are $30^\circ$, $x^\circ$, and $(2x + 6)^\circ$, respectively, what is the measure, in degrees, of angle $S$?
Answer: 102
Domain: Geometry and Trigonometry
Explanation: The sides of triangle $QRS$ are $3$ times the corresponding sides of triangle $DEF$, so the triangles are similar with $D$, $E$, and $F$ corresponding to $Q$, $R$, and $S$. In triangle $DEF$, $30 + x + (2x + 6) = 180$, so $x = 48$ and angle $F$ measures $2(48) + 6 = 102^\circ$. Angle $S$ corresponds to angle $F$, so it measures $102^\circ$.
`
});
