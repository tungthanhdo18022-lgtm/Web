/*
 * Advanced test: Algebra A1 (74 questions, from "SAT Math Practice Set · Mixed Review").
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'algebra-a1',
  source: String.raw`
---
title: Algebra A1
author: tungtks18022
description: 74 mixed SAT Math questions on linear equations, systems and inequalities, equivalent expressions, rearranging formulas and nonlinear functions, with an explanation for every question.
section: advanced
time: 118
---

1. If $x$ is an even integer and $3^{2x} + 3^{2x} + 9^x = z$, which of the following expresses $z$ in terms of $x$?
A. $3^{2x + 1}$
B. $3^{3x}$
C. $9^{2x}$
D. $9^x + 27$
Answer: A
Domain: Advanced Math
Explanation: Since $9^x = (3^2)^x = 3^{2x}$, the sum is $3^{2x} + 3^{2x} + 3^{2x} = 3 \cdot 3^{2x} = 3^{2x + 1}$.

2. The variables $a$ and $b$ are related such that each time $a$ increases by $5$, $b$ decreases by $7$. Which of the following equations expresses the relationship between $a$ and $b$?
A. $5a - 7b = 9$
B. $5a - 7b = -56$
C. $5a + 7b = 56$
D. $7a + 5b = 45$
Answer: D
Domain: Algebra
Explanation: The relationship is linear with rate of change $\frac{\Delta b}{\Delta a} = -\frac{7}{5}$, so $b = -\frac{7}{5}a + k$ for some constant $k$, which can be written as $7a + 5b = 5k$. Only choice D has the form $7a + 5b = \text{constant}$. (Choices A and B have slope $\frac{5}{7}$, and choice C has slope $-\frac{5}{7}$.)

3. The equation below relates the positive real numbers $a$, $b$, $c$, and $d$. Which equation correctly expresses $b$ in terms of $a$, $c$, and $d$?

$$a = b + bcd$$
A. $b = \dfrac{a}{1 + cd}$
B. $b = \dfrac{1 + cd}{a}$
C. $b = a - 2cd$
D. $b = \dfrac{a}{2cd}$
Answer: A
Domain: Advanced Math
Explanation: Factoring $b$ out of the right side gives $a = b(1 + cd)$. Dividing both sides by $1 + cd$ gives $b = \frac{a}{1 + cd}$.

4. The formula below is used to show $E$, the expected time to complete a marathon, where $f$ is the fastest time to finish the race, $A$ is the average time to finish, and $s$ is the slowest time to finish. Which of the following correctly gives $s$ in terms of $E$, $f$, and $A$?

$$E = \sqrt{\dfrac{s^2 + 2f}{A}}$$
A. $s = \sqrt{E^2A - 2f}$
B. $s = E\sqrt{A - 2f}$
C. $s = \sqrt{\dfrac{E^2A}{2f}}$
D. $s = EA - 2$
Answer: A
Domain: Advanced Math
Explanation: Squaring both sides gives $E^2 = \frac{s^2 + 2f}{A}$, so $E^2A = s^2 + 2f$ and $s^2 = E^2A - 2f$. Since $s$ is a time, it is positive, so $s = \sqrt{E^2A - 2f}$.

5. For each real number $r$, which of the following points lies on the graph of the equation $5x + 7y = 12$?
A. $\left(-\dfrac{7r}{5} + \dfrac{12}{5}, r\right)$
B. $\left(-\dfrac{5r}{7} - \dfrac{12}{5}, r\right)$
C. $\left(r, \dfrac{7r}{5} + \dfrac{12}{5}\right)$
D. $\left(r, -\dfrac{5r}{7} - \dfrac{12}{7}\right)$
Answer: A
Domain: Algebra
Explanation: If $y = r$, then $5x = 12 - 7r$, so $x = -\frac{7r}{5} + \frac{12}{5}$. So the point $\left(-\frac{7r}{5} + \frac{12}{5}, r\right)$ lies on the graph for every real number $r$. (If $x = r$, then $y = -\frac{5r}{7} + \frac{12}{7}$, which does not match choice C or D.)

6. For the equation below, what is the value of $x + 3$?

$$\dfrac{8x + 24}{x + 3} = 5x + 15$$
Answer: 8/5 | 1.6
Domain: Advanced Math
Explanation: The left side is $\frac{8(x + 3)}{x + 3} = 8$ for $x \ne -3$. So $8 = 5x + 15 = 5(x + 3)$, which gives $x + 3 = \frac{8}{5}$, or $1.6$.

7. A sheet of origami paper is cut $4$ times in a specific manner to create $5$ identical smaller pieces of paper. Then, the five smaller pieces of paper are stacked and cut together $4$ more times to form $25$ identical smaller pieces. This process continues until the pieces of paper are too small to cut. Which of the following functions gives the number of pieces of paper, $p(c)$, that result after $c$ cuts, where $c$ is a multiple of $4$?
A. $p(c) = 5^{\frac{c}{4}}$
B. $p(c) = 5^{\frac{c}{4} + 2}$
C. $p(c) = 5^{4c}$
D. $p(c) = 5^{4c + 2}$
Answer: A
Domain: Advanced Math
Explanation: Every $4$ cuts multiply the number of pieces by $5$ (all the pieces are cut together): after $4$ cuts there are $5$ pieces, and after $8$ cuts there are $25 = 5^2$ pieces. After $c$ cuts there have been $\frac{c}{4}$ rounds, so $p(c) = 5^{\frac{c}{4}}$.

8. Which expression is equivalent to

$$\dfrac{7x(x - 9) - 6(x - 9)}{3x - 27},$$

where $x > 9$?
A. $\dfrac{x - 9}{3}$
B. $\dfrac{7x^2 - 69x - 54}{3x - 27}$
C. $\dfrac{7x^2 - 69x + 54}{x - 9}$
D. $\dfrac{7x - 6}{3}$
Answer: D
Domain: Advanced Math
Explanation: The numerator factors as $(x - 9)(7x - 6)$ and the denominator is $3(x - 9)$. Since $x > 9$, $x - 9 \ne 0$, so the expression equals $\frac{7x - 6}{3}$.

9. The population of Carmel Valley, California can be modeled by the function $p(t) = 247{,}000(1.072)^t$, where $t$ represents the number of years after 2021 and $0 \le t \le 20$. Which of the following functions $q$ best models the population of Carmel Valley, California, where $y$ represents the number of years after 2025, and $0 \le y \le 16$?
A. $q(y) = 247{,}000(1.072)^{4y}$
B. $q(y) = 247{,}000(1.072)^{y - 4}$
C. $q(y) = 247{,}000(1.072)^4(1.072)^y$
D. $q(y) = (247{,}000)^4(1.072)^4(1.072)^y$
Answer: C
Domain: Advanced Math
Explanation: The year 2025 is $4$ years after 2021, so $t = y + 4$. Then $p(t) = 247{,}000(1.072)^{y + 4} = 247{,}000(1.072)^4(1.072)^y$.

10. In the $xy$-plane, lines $l$ and $k$ are parallel. Line $l$ passes through the points $(-1, -7)$ and $(1, 3)$. If the point $(a, b)$ lies on line $k$, which of the following is another point on line $k$?
A. $(a - 1, b - 5)$
B. $(a - 1, b + 5)$
C. $(a + 5, b + 1)$
D. $(a + 5, b - 1)$
Answer: A
Domain: Algebra
Explanation: The slope of line $l$ is $\frac{3 - (-7)}{1 - (-1)} = 5$, and line $k$ has the same slope. Moving $1$ unit left from $(a, b)$ on line $k$ changes $y$ by $-5$, so $(a - 1, b - 5)$ is on line $k$.

11. Given that the equation

$$\dfrac{8k}{4b} = \dfrac{1}{3}$$

is true, what is the value of $\dfrac{b}{k}$?
Answer: 6
Domain: Algebra
Explanation: The left side simplifies to $\frac{2k}{b}$, so $\frac{2k}{b} = \frac{1}{3}$ and $\frac{k}{b} = \frac{1}{6}$. Therefore $\frac{b}{k} = 6$.

12. For each real number $r$, which of the following points lies on the graph of the equation $2x + 5y = 9$ in the $xy$-plane?
A. $\left(\dfrac{r}{2} + 9, \dfrac{r}{5}\right)$
B. $\left(\dfrac{5r}{2} + \dfrac{9}{2}, r\right)$
C. $\left(r, -\dfrac{2r}{5} + \dfrac{9}{5}\right)$
D. $\left(r, -\dfrac{5r}{2} + \dfrac{9}{2}\right)$
Answer: C
Domain: Algebra
Explanation: If $x = r$, then $5y = 9 - 2r$, so $y = -\frac{2r}{5} + \frac{9}{5}$. So $\left(r, -\frac{2r}{5} + \frac{9}{5}\right)$ lies on the graph for every real number $r$.

13. In the $xy$-plane, line $m$ is perpendicular to line $l$. Line $l$ has an equation of $y = \dfrac{4}{3}x + 4$. Which of the following is the equation of line $m$?
A. $4x + 3y + 3 = 0$
B. $4x - 3y + 3 = 0$
C. $3x - 4y + 12 = 0$
D. $3x + 4y + 12 = 0$
Answer: D
Domain: Algebra
Explanation: Line $m$ must have slope $-\frac{3}{4}$, the negative reciprocal of $\frac{4}{3}$. Solving choice D for $y$ gives $y = -\frac{3}{4}x - 3$, which has slope $-\frac{3}{4}$. The slopes in choices A, B, and C are $-\frac{4}{3}$, $\frac{4}{3}$, and $\frac{3}{4}$.

14. For $a > 0$, which of the following is equivalent to

$$\dfrac{6a^2 - 3a}{2a + 1}?$$
A. $3a$
B. $3a - 3$
C. $3a - 3 + \dfrac{3}{2a + 1}$
D. $3a - \dfrac{a}{2a + 1}$
Answer: C
Domain: Advanced Math
Explanation: Dividing, $6a^2 - 3a = (2a + 1)(3a - 3) + 3$, because $(2a + 1)(3a - 3) = 6a^2 - 3a - 3$. So $\frac{6a^2 - 3a}{2a + 1} = 3a - 3 + \frac{3}{2a + 1}$.

15. In the $xy$-plane, line $a$ has slope $\dfrac{7}{5}$, and line $b$ has slope $\dfrac{5}{7}$. Both lines contain the point $(0, 0)$. For which of these lines is $y > x$ for all positive values of $x$?

I. Line $a$

II. Line $b$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Algebra
Explanation: Line $a$ is $y = \frac{7}{5}x$, and for $x > 0$, $\frac{7}{5}x > x$, so $y > x$. Line $b$ is $y = \frac{5}{7}x$, and for $x > 0$, $\frac{5}{7}x < x$. So the condition holds for line $a$ only.

16.

$$4x - 3y = 10$$

In the $xy$-plane, the graph of which of the following equations is perpendicular to the graph of the equation above?
A. $-4y + 3x = 3$
B. $6x + 8y = -7$
C. $2x - 3y = 10$
D. $-4x + 3y = 10$
Answer: B
Domain: Algebra
Explanation: The given line has slope $\frac{4}{3}$, so a perpendicular line has slope $-\frac{3}{4}$. Choice B gives $8y = -6x - 7$, or $y = -\frac{3}{4}x - \frac{7}{8}$, which has slope $-\frac{3}{4}$.

17. In the $xy$-plane below, lines $a$ and $b$ are perpendicular. Line $a$ passes through the origin. Lines $a$ and $b$ intersect at $(6, 8)$, and line $b$ crosses the $x$-axis at point $c$. What is the $x$-coordinate of point $c$?

![Two perpendicular lines in the xy-plane. Line a passes through the origin and the point (6, 8). Line b passes through (6, 8) and crosses the positive x-axis at a point labeled c.](tests/images/algebra-a1/q17.svg)
Answer: 50/3
Domain: Algebra
Explanation: Line $a$ passes through $(0, 0)$ and $(6, 8)$, so its slope is $\frac{4}{3}$, and line $b$ has slope $-\frac{3}{4}$. Line $b$ is $y - 8 = -\frac{3}{4}(x - 6)$. Setting $y = 0$ gives $-8 = -\frac{3}{4}(x - 6)$, so $x - 6 = \frac{32}{3}$ and $x = \frac{50}{3}$.

18. The equation below relates the positive real numbers $a$, $b$, $c$, and $d$. Which equation correctly expresses $d$ in terms of $a$, $b$, and $c$?

$$a = \dfrac{bc}{\sqrt{1 + d}}$$
A. $d = \left(\dfrac{bc}{a}\right)^2 + 1$
B. $d = \dfrac{(bc)^2}{a^2 - 1}$
C. $d = \dfrac{bc}{a^2} - 1$
D. $d = \left(\dfrac{bc}{a}\right)^2 - 1$
Answer: D
Domain: Advanced Math
Explanation: Multiplying both sides by $\frac{\sqrt{1 + d}}{a}$ gives $\sqrt{1 + d} = \frac{bc}{a}$. Squaring gives $1 + d = \left(\frac{bc}{a}\right)^2$, so $d = \left(\frac{bc}{a}\right)^2 - 1$.

19. For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given system of inequalities?

$$\begin{gathered} y < -4x + 17 \\[4pt] y > -3x - 6 \end{gathered}$$
A. $\begin{array}{|c|c|} \hline x & y \\ \hline 5 & 5 \\ \hline 7 & 12 \\ \hline 8 & 14 \\ \hline \end{array}$
B. $\begin{array}{|c|c|} \hline x & y \\ \hline -2 & 5 \\ \hline 0 & 3 \\ \hline 1 & 2 \\ \hline \end{array}$
C. $\begin{array}{|c|c|} \hline x & y \\ \hline 1 & 9 \\ \hline 3 & 5 \\ \hline 8 & 2 \\ \hline \end{array}$
D. $\begin{array}{|c|c|} \hline x & y \\ \hline 1 & 9 \\ \hline 5 & 5 \\ \hline 7 & 2 \\ \hline \end{array}$
Answer: B
Domain: Algebra
Explanation: In choice B: for $(-2, 5)$, $5 < 25$ and $5 > 0$; for $(0, 3)$, $3 < 17$ and $3 > -6$; for $(1, 2)$, $2 < 13$ and $2 > -9$. Each other choice has a point that fails $y < -4x + 17$: $(5, 5)$ in A and D, since $5 < -3$ is false, and $(3, 5)$ in C, since $5 < 5$ is false.

20. James withdrew one fifth of his savings last week. This week, James withdrew one quarter of the remaining amount. He is left with \$150. How much did he originally have?
A. \$280
B. \$250
C. \$220
D. \$195
Answer: B
Domain: Algebra
Explanation: If James originally had $s$ dollars, then $\frac{4}{5}s$ remained after last week and $\frac{3}{4} \cdot \frac{4}{5}s = \frac{3}{5}s$ remained after this week. So $\frac{3}{5}s = 150$ and $s = 250$.

21. Drew is training for a $50$-mile race in the desert by going for a long run every Sunday. He will run $5$ miles on the first Sunday that he trains. Every Sunday after the first, he will run $1.5$ more miles than he ran on the preceding Sunday. Which of the following equations represents the number of miles $m$ Drew will run on the $n$th Sunday of his training?
A. $m = 5 + 1.5n$
B. $m = 3.5 + 1.5n$
C. $m = 5(1.5)^n$
D. $m = 1.5(5)(n)$
Answer: B
Domain: Algebra
Explanation: On the $n$th Sunday, Drew has added $1.5$ miles $n - 1$ times, so $m = 5 + 1.5(n - 1) = 3.5 + 1.5n$. Check: for $n = 1$, $m = 5$.

22. What is the solution to the equation below?

$$\dfrac{11x - 22}{x - 2} = x + 5$$
Answer: 6
Domain: Advanced Math
Explanation: For $x \ne 2$, the left side is $\frac{11(x - 2)}{x - 2} = 11$. So $11 = x + 5$ and $x = 6$.

23. The given function $g$ models the number of gallons of gasoline that remains from a full gas tank in a motorcycle after driving $m$ miles. According to the model, about how many miles per gallon can the motorcycle travel?

$$g(m) = -0.08m + 8.75$$
A. $0.08$
B. $8.75$
C. $12.5$
D. $109$
Answer: C
Domain: Algebra
Explanation: The motorcycle uses $0.08$ gallon for each mile, so it travels $\frac{1}{0.08} = 12.5$ miles per gallon.

24. If $3x = 4y = 6z$, which of the following expresses the average of $x$ and $y$ in terms of $z$?
A. $\dfrac{7z}{4}$
B. $\dfrac{5z}{3}$
C. $\dfrac{10}{4z}$
D. $\dfrac{13z}{9}$
Answer: A
Domain: Algebra
Explanation: From $3x = 6z$, $x = 2z$, and from $4y = 6z$, $y = \frac{3}{2}z$. The average is $\frac{2z + \frac{3}{2}z}{2} = \frac{7z}{4}$.

25. Two quantities $x$ and $y$ are related such that $y = 7$ when $x = 1$. When the value of $x$ increases by $1$, the value of $y$ is multiplied by $2$. Which of the following represents this relationship?
A. $y = 7x^2$
B. $y = 7(x - 1)^2$
C. $y = 7(2)^x$
D. $y = 7(2)^{x - 1}$
Answer: D
Domain: Advanced Math
Explanation: The relationship is exponential with growth factor $2$, and $y = 7$ at $x = 1$. So $y = 7(2)^{x - 1}$: at $x = 1$, $y = 7(2)^0 = 7$, and each increase of $1$ in $x$ doubles $y$.

26. The cost of renting a kayak is \$20 for the first hour, plus an additional \$12 for each additional hour. If $h$ represents the number of hours the kayak is rented, which of the following functions gives the cost $K(h)$, in dollars, of renting the kayak for $h$ hours?
A. $K(h) = 12h + 20$
B. $K(h) = 12h + 8$
C. $K(h) = 12h$
D. $K(h) = 20h + 12$
Answer: B
Domain: Algebra
Explanation: After the first hour there are $h - 1$ additional hours, so $K(h) = 20 + 12(h - 1) = 12h + 8$.

27.

![Graph of a line in the xy-plane that passes through the origin and the marked point (3, 9). Both axes are labeled -10, -5, 5, and 10.](tests/images/algebra-a1/q27.svg)

In the graph above, point $A$ (not shown) with coordinates $(h, k)$ is on the line $y = f(x)$ shown above. If $h$ and $k$ are negative integers, what is the ratio of $k$ to $h$?
A. $-3 : 1$
B. $1 : 3$
C. $2 : 3$
D. $3 : 1$
Answer: D
Domain: Algebra
Explanation: The line passes through $(0, 0)$ and $(3, 9)$, so it is $y = 3x$. For any point $(h, k)$ on the line, $k = 3h$, so $\frac{k}{h} = 3$ and the ratio of $k$ to $h$ is $3 : 1$.

28. The distance between Albert's front door and the end of his driveway is $d$ miles. If he can run at $c$ miles per hour, how long, in minutes, will it take him to run from his front door to the end of the driveway?
A. $\dfrac{d}{c}$
B. $60c$
C. $\dfrac{60d}{c}$
D. $\dfrac{60c}{d}$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The time in hours is $\frac{d}{c}$, and there are $60$ minutes in an hour, so the time in minutes is $\frac{60d}{c}$.

29. The given linear function $f$ models the annual percentage increase in the population over the prior year for Tijuana $t$ years since 2010, where $0 \le t < 15$. What is the best interpretation of $f(10) = 2.5$ in this context?

$$f(t) = -0.075t + 3.25$$
A. $2.5$ years after 2010, the percentage increase in the population of Tijuana was $10\%$ over the previous year.
B. $2.5$ years after 2010, Tijuana's population was approximately $10$ times the amount in 2010.
C. $10$ years after 2010, the percentage increase in the population of Tijuana was $2.5\%$ over the previous year.
D. $10$ years after 2010, Tijuana's population was approximately $2.5$ times its population in 2010.
Answer: C
Domain: Algebra
Explanation: The input $t = 10$ is $10$ years after 2010, and the output $f(10) = 2.5$ is the annual percentage increase over the prior year. So $10$ years after 2010, the population increased by $2.5\%$ over the previous year.

30. Which expression is equivalent to

$$\dfrac{9x(x - 5) - 4(x - 5)}{2x - 10},$$

where $x > 5$?
A. $\dfrac{x - 5}{2}$
B. $\dfrac{9x - 4}{2}$
C. $\dfrac{9x^2 - 4x + 20}{2x - 10}$
D. $\dfrac{9x^2 - 4x - 25}{2x - 10}$
Answer: B
Domain: Advanced Math
Explanation: The numerator factors as $(x - 5)(9x - 4)$ and the denominator is $2(x - 5)$. Since $x > 5$, the expression equals $\frac{9x - 4}{2}$.

31. Skyscrapers have gaps between their floors to allow for expansion and contraction caused by temperature variation. The gap is a part of dynamic riser structure. The size of the gaps between the floors, $g(T)$, in inches, is a linear function of temperature $T$, in degrees Fahrenheit ($^\circ\text{F}$). For a certain skyscraper, the gap is $3.625$ inches at $35^\circ\text{F}$ and is $2.625$ inches at $85^\circ\text{F}$. Which of the following defines the relationship between temperature and the size of the gap?
A. $g(T) = -\dfrac{1}{50}(T - 50) + 5.325$
B. $g(T) = -\dfrac{1}{50}(T + 50) + 5.325$
C. $g(T) = 50(T - 50) + 5.325$
D. $g(T) = 50(T + 50) - 5.325$
Answer: B
Domain: Algebra
Explanation: The slope is $\frac{2.625 - 3.625}{85 - 35} = -\frac{1}{50}$, so $g(T) = -\frac{1}{50}(T - 35) + 3.625 = -\frac{1}{50}T + 4.325$. Choice B expands to $-\frac{1}{50}T - 1 + 5.325 = -\frac{1}{50}T + 4.325$, the same function. Choice A expands to $-\frac{1}{50}T + 6.325$.

32. Which of the following is equivalent to the expression below?

$$16x^4 + 8x^3 - 24x^2 - 12x$$
A. $(2x + 1)(2x^2 - 3)$
B. $x(4x + 2)(4x^2 - 6)$
C. $4x(2x - 1)(2x^2 - 3)$
D. $4x(2x + 3)(2x^2 + 1)$
Answer: B
Domain: Advanced Math
Explanation: Factoring by grouping: $16x^4 + 8x^3 - 24x^2 - 12x = 4x(4x^3 + 2x^2 - 6x - 3) = 4x\big(2x^2(2x + 1) - 3(2x + 1)\big) = 4x(2x + 1)(2x^2 - 3)$. Choice B is $x \cdot 2(2x + 1) \cdot 2(2x^2 - 3) = 4x(2x + 1)(2x^2 - 3)$, the same expression.

33. The graph of the line $l$ in the $xy$-plane passes through the point $(2, 6)$ and is perpendicular to the line $m$ with the equation $2x + 3y = 6$. The line $l$ crosses the $y$-axis at the point $(0, b)$. What is the value of $b$?
Answer: 3
Domain: Algebra
Explanation: Line $m$ has slope $-\frac{2}{3}$, so line $l$ has slope $\frac{3}{2}$. Going from $(2, 6)$ to $x = 0$ changes $y$ by $\frac{3}{2}(-2) = -3$, so $b = 6 - 3 = 3$.

34. What value(s) of $x$ satisfy the equation $12x^3 + 4x^2 - 3x - 1 = 0$?
A. $-\dfrac{1}{3}$
B. $\dfrac{1}{2}$
C. $-\dfrac{1}{2}, \dfrac{1}{2}$
D. $-\dfrac{1}{2}, -\dfrac{1}{3}, \dfrac{1}{2}$
Answer: D
Domain: Advanced Math
Explanation: Grouping gives $4x^2(3x + 1) - (3x + 1) = (3x + 1)(4x^2 - 1) = (3x + 1)(2x - 1)(2x + 1) = 0$. So $x = -\frac{1}{3}$, $x = \frac{1}{2}$, or $x = -\frac{1}{2}$.

35. If the sides of a triangle are all quadrupled, the area of the new triangle is how many times the area of the original triangle?
A. $4$
B. $8$
C. $10$
D. $16$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The new triangle is similar to the original with scale factor $4$, so its area is $4^2 = 16$ times the original area.

36. Line $m$ in the $xy$-plane has slope $-\dfrac{4p}{7}$ and $y$-intercept $(0, p)$, where $p$ is a positive constant. What is the $x$-coordinate of the $x$-intercept of line $m$?
Answer: 7/4 | 1.75
Domain: Algebra
Explanation: Line $m$ is $y = -\frac{4p}{7}x + p$. Setting $y = 0$ gives $\frac{4p}{7}x = p$, and since $p \ne 0$, $x = \frac{7}{4}$.

37. Linh ran from her home to her friend's house in $1$ hour and $15$ minutes at an average rate of $7$ miles per hour. If the equation below represents this situation, what does $z$ represent?

$$\dfrac{1}{1.25} = \dfrac{7}{z}$$
A. The distance, in miles, that Linh ran.
B. The time, in hours, that Linh ran.
C. Linh's average speed, in miles per hour.
D. Linh's average speed, in miles per minute.
Answer: A
Domain: Algebra
Explanation: Solving gives $z = 7(1.25) = 8.75$, which is the rate, $7$ miles per hour, times the time, $1.25$ hours. So $z$ is the distance, in miles, that Linh ran. (The equation says $1$ hour is to $1.25$ hours as $7$ miles is to $z$ miles.)

38.

$$y = 6x - 4$$

The equation of line $m$ in the $xy$-plane is shown above. A second line, $w$, has half the slope of line $m$ and twice the $y$-intercept. Where do lines $m$ and $w$ intersect?
A. $\left(\dfrac{4}{3}, 4\right)$
B. $\left(-\dfrac{3}{4}, -\dfrac{9}{2}\right)$
C. $\left(\dfrac{3}{4}, \dfrac{1}{2}\right)$
D. $\left(-\dfrac{4}{3}, -12\right)$
Answer: D
Domain: Algebra
Explanation: Line $w$ has slope $3$ and $y$-intercept $-8$, so $w$ is $y = 3x - 8$. Setting $6x - 4 = 3x - 8$ gives $x = -\frac{4}{3}$, and $y = 6\left(-\frac{4}{3}\right) - 4 = -12$.

39. In the $xy$-plane, the point $(a, c)$ lies on the line with equation $y = 4x + b$, where $b$ is a constant. The point $(3a, 4c)$ lies on the line with equation $y = 2x + b$. If $a \ne 0$, what is the value of $\dfrac{c}{a}$?
Answer: 2/3
Domain: Algebra
Explanation: The two points give $c = 4a + b$ and $4c = 6a + b$. Subtracting the first equation from the second gives $3c = 2a$, so $\frac{c}{a} = \frac{2}{3}$.

40. The variables $x$ and $y$ are related such that each time $x$ decreases by $7$, $y$ increases by $3$. If $y < 0$ when $x = 0$, which of the following equations could express the relationship between $x$ and $y$?
A. $3x + 7y = -21$
B. $7x + 3y = -30$
C. $3x + 7y = 14$
D. $7x + 3y = 9$
Answer: A
Domain: Algebra
Explanation: The slope is $\frac{3}{-7} = -\frac{3}{7}$, so the equation has the form $3x + 7y = C$. When $x = 0$, $y = \frac{C}{7}$, which is negative only if $C < 0$. So $3x + 7y = -21$ works, while $3x + 7y = 14$ gives $y = 2$ at $x = 0$.

41. The given equation relates the distinct positive real numbers $j$, $k$, and $l$. Which equation correctly expresses $l$ in terms of $j$ and $k$?

$$\dfrac{8j}{48k} = \dfrac{1}{6}\sqrt{l - 17}$$
A. $l = \sqrt{\dfrac{j}{k}} + 17$
B. $l = \sqrt{\dfrac{64j}{2304k}} + 17$
C. $l = \left(\dfrac{j}{k}\right)^2 + 17$
D. $l = \left(\dfrac{64j}{2304k}\right)^2 + 17$
Answer: C
Domain: Advanced Math
Explanation: The left side is $\frac{j}{6k}$. Multiplying both sides by $6$ gives $\frac{j}{k} = \sqrt{l - 17}$. Squaring gives $\left(\frac{j}{k}\right)^2 = l - 17$, so $l = \left(\frac{j}{k}\right)^2 + 17$.

42. A company that manufactures crutches calculates its monthly profit by subtracting its fixed monthly costs from its monthly revenue from sales. The equation $36{,}000 = 20x - 12{,}000$ represents this situation in June when $x$ crutches are manufactured and sold. What is the meaning of $\dfrac{36{,}000}{x}$ in this context?
A. The average cost of manufacturing $x$ crutches in June.
B. The profit per crutch sold in June.
C. The revenue for each crutch sold in June.
D. The total revenue from selling $x$ crutches in June.
Answer: B
Domain: Algebra
Explanation: In the equation, $20x$ is the revenue, $12{,}000$ is the fixed monthly cost, and $36{,}000$ is the profit for June. Dividing the profit by the number of crutches sold, $x$, gives the profit per crutch sold in June.

43. Which expression is equivalent to $5x^6y^3 + 20x^4y^3$?
A. $5x^4y^3(x^2 + 4)$
B. $5x^4y^3\left(x^{\frac{3}{2}} + 4\right)$
C. $5x^4y^3(4x^2)$
D. $5x^4y^3(4x^4)$
Answer: A
Domain: Advanced Math
Explanation: The greatest common factor is $5x^4y^3$, and $5x^6y^3 + 20x^4y^3 = 5x^4y^3(x^2) + 5x^4y^3(4) = 5x^4y^3(x^2 + 4)$.

44. A taco stand is buying pork for carnitas and flank steak for carne asada from its distributor. The distributor will deliver no more than $400$ pounds of meat in a shipment. Pork comes in $9$-pound packages, and flank steak comes in $6$-pound packages. The taco stand wants to order at least three times as many packages of pork as packages of flank steak. Let $p$ represent the number of packages of pork and let $f$ represent the number of packages of flank steak. Which of the following systems of inequalities best represents this situation?
A. $\begin{aligned} &9p + 6f \le 400 \\ &3p \ge f \end{aligned}$
B. $\begin{aligned} &9p + 6f \le 400 \\ &p \ge 3f \end{aligned}$
C. $\begin{aligned} &27p + 6f \le 400 \\ &3p \ge f \end{aligned}$
D. $\begin{aligned} &27p + 6f \le 400 \\ &p \ge 3f \end{aligned}$
Answer: B
Domain: Algebra
Explanation: The meat weighs $9p + 6f$ pounds, which can be at most $400$, so $9p + 6f \le 400$. At least three times as many packages of pork as packages of flank steak means $p \ge 3f$.

45. Julia and Drew both work at their own constant rate, either alone or together. When Julia works alone, she can finish her job $18$ minutes faster than Drew can. The equation below can be used to find the time $x$, in minutes, it takes Drew to finish the job alone. Which of the following is the best interpretation of the number $54$ in the equation?

$$\dfrac{1}{54} = \dfrac{1}{x - 18} + \dfrac{1}{x}$$
A. The number of minutes it takes Julia and Drew to finish the job working together.
B. The number of minutes it takes Julia to complete the job.
C. The number of minutes it takes Drew to complete the job.
D. How many fewer minutes it takes Julia to complete the job than Drew.
Answer: A
Domain: Advanced Math
Explanation: Drew completes $\frac{1}{x}$ of the job per minute and Julia completes $\frac{1}{x - 18}$ of the job per minute. Their sum is their combined rate, $\frac{1}{54}$ of the job per minute, so working together they finish the job in $54$ minutes.

46. For $x \ne 4$, which of the following expressions is equivalent to

$$\dfrac{y + 7}{x - 4} + \dfrac{y(x - 4)}{x^2y - 4xy}?$$
A. $\dfrac{xy + y + 3}{x^3 - 4xy^2 + 16xy}$
B. $\dfrac{xy^2 + 6xy - 4y}{x^2y - 4xy}$
C. $\dfrac{xy^2 + 8xy - 4y}{x^2y - 4xy}$
D. $\dfrac{xy^2 + 8xy - 4y}{x^3y - 8x^2y + 16xy}$
Answer: C
Domain: Advanced Math
Explanation: The common denominator is $x^2y - 4xy = xy(x - 4)$. The first fraction becomes $\frac{xy(y + 7)}{xy(x - 4)} = \frac{xy^2 + 7xy}{x^2y - 4xy}$. Adding the second fraction's numerator, $y(x - 4) = xy - 4y$, gives $\frac{xy^2 + 8xy - 4y}{x^2y - 4xy}$.

47. The formula below expresses $s$ in terms of $d$, $e$, and $t$, where $d$, $e$, $s$, and $t$ are positive. Which of the following gives $e$ in terms of the other variables?

$$s = d^2\sqrt{1 - \dfrac{e^2}{t^2}}$$
A. $e = t\sqrt{1 - \dfrac{s^2}{d^4}}$
B. $e = t\sqrt{1 + \dfrac{s^2}{d^4}}$
C. $e = t\left(1 - \dfrac{s}{d^2}\right)$
D. $e = t\left(1 + \dfrac{s}{d^2}\right)$
Answer: A
Domain: Advanced Math
Explanation: Dividing by $d^2$ and squaring gives $\frac{s^2}{d^4} = 1 - \frac{e^2}{t^2}$, so $\frac{e^2}{t^2} = 1 - \frac{s^2}{d^4}$ and $e^2 = t^2\left(1 - \frac{s^2}{d^4}\right)$. Taking the square root gives $e = t\sqrt{1 - \frac{s^2}{d^4}}$.

48. Line $k$ has a slope of $-\dfrac{5}{6}$ and an $x$-intercept of $\left(\dfrac{p}{2}, 0\right)$, where $p$ is a constant. What is the $y$-coordinate of the $y$-intercept of line $k$ in terms of $p$?
A. $-\dfrac{5p}{12}$
B. $\dfrac{5p}{12}$
C. $-\dfrac{4p}{5}$
D. $\dfrac{4p}{5}$
Answer: B
Domain: Algebra
Explanation: Line $k$ is $y = -\frac{5}{6}\left(x - \frac{p}{2}\right)$. At $x = 0$, $y = -\frac{5}{6}\left(-\frac{p}{2}\right) = \frac{5p}{12}$.

49. The table below shows several values of $x$ and their corresponding values of $y$, where $k$ is a nonzero constant. If the relationship between $x$ and $y$ is linear, which of the following defines this relationship?

| $x$ | $-1$ | $1$ | $2$ |
|:---:|:---:|:---:|:---:|
| $y$ | $-3k - 6$ | $3k + 6$ | $6k + 12$ |
A. $y = 3(kx - 2)$
B. $y = 3(kx + 2x)$
C. $y = 3kx + 6$
D. $y = -3k - x - 2$
Answer: B
Domain: Algebra
Explanation: From $x = 1$ to $x = 2$, $y$ increases by $3k + 6$, so the slope is $3k + 6$. At $x = 1$, $y = 3k + 6 = (3k + 6)(1)$, so the $y$-intercept is $0$ and $y = (3k + 6)x = 3(kx + 2x)$. The point $(-1, -3k - 6)$ also fits.

50. If

$$\dfrac{4x + y}{2x + y} = \dfrac{8}{5},$$

what is the value of $\dfrac{y}{x}$?
A. $\dfrac{3}{4}$
B. $\dfrac{4}{3}$
C. $\dfrac{5}{8}$
D. $\dfrac{8}{13}$
Answer: B
Domain: Algebra
Explanation: Cross-multiplying gives $5(4x + y) = 8(2x + y)$, so $20x + 5y = 16x + 8y$ and $4x = 3y$. Therefore $\frac{y}{x} = \frac{4}{3}$.

51. For the equation below, which of the following expresses $x$ in terms of $y$ and $z$?

$$y = \dfrac{xz - z^2}{x - 1}$$
A. $\dfrac{z^2 - y}{z - y}$
B. $\dfrac{1 + y}{z^2 + y}$
C. $\dfrac{y - z^2}{z + 1}$
D. $\dfrac{z^2 + y}{1 - y}$
Answer: A
Domain: Advanced Math
Explanation: Multiplying both sides by $x - 1$ gives $xy - y = xz - z^2$. Then $xz - xy = z^2 - y$, so $x(z - y) = z^2 - y$ and $x = \frac{z^2 - y}{z - y}$.

52. In the given pair of equations below, $a$ and $b$ are constants. The graph of this pair of equations in the $xy$-plane is a pair of perpendicular lines. Which of the following pairs of equations also represents a pair of perpendicular lines?

$$\begin{gathered} 3x + 8y = 10 \\[4pt] ax + by = 10 \end{gathered}$$
A. $\begin{aligned} &3x - 8y = 10 \\ &ax + by = 10 \end{aligned}$
B. $\begin{aligned} &6x - 16y = 10 \\ &2ax + 2by = 5 \end{aligned}$
C. $\begin{aligned} &3x + 16y = 10 \\ &2ax + by = 10 \end{aligned}$
D. $\begin{aligned} &3x + 16y = 10 \\ &ax + 2by = 10 \end{aligned}$
Answer: C
Domain: Algebra
Explanation: The given lines have slopes $-\frac{3}{8}$ and $-\frac{a}{b}$, and their product is $-1$, so $3a = -8b$. In choice C the slopes are $-\frac{3}{16}$ and $-\frac{2a}{b}$, and their product is $\frac{6a}{16b} = \frac{3a}{8b} = -1$. So the lines in choice C are perpendicular; the products of the slopes in the other choices are not $-1$.

53. The function $f$ is given below. Which table of values represents $y = f(x) + 4$?

$$f(x) = (x + 3)(x + 2)$$
A. $\begin{array}{|c|c|} \hline x & y \\ \hline -6 & 12 \\ \hline 1 & 12 \\ \hline 2 & 20 \\ \hline \end{array}$
B. $\begin{array}{|c|c|} \hline x & y \\ \hline -6 & 16 \\ \hline 1 & 16 \\ \hline 2 & 24 \\ \hline \end{array}$
C. $\begin{array}{|c|c|} \hline x & y \\ \hline -1 & 6 \\ \hline 1 & 14 \\ \hline 2 & 16 \\ \hline \end{array}$
D. $\begin{array}{|c|c|} \hline x & y \\ \hline -10 & 12 \\ \hline -3 & 12 \\ \hline -2 & 20 \\ \hline \end{array}$
Answer: B
Domain: Advanced Math
Explanation: $f(-6) + 4 = (-3)(-4) + 4 = 16$, $f(1) + 4 = (4)(3) + 4 = 16$, and $f(2) + 4 = (5)(4) + 4 = 24$. These are the values in choice B.

54. The sides of a rectangle are in the proportion of $28 : 10$. The longer side of the rectangle is increased by $x$ inches. By how many inches must the shorter side of the rectangle be increased to maintain the same proportion of the side lengths?
A. $\dfrac{7}{4}x$
B. $\dfrac{4}{7}x$
C. $\dfrac{14}{5}x$
D. $\dfrac{5}{14}x$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The shorter side is $\frac{10}{28} = \frac{5}{14}$ of the longer side. To keep this proportion, every increase of the longer side must be matched by an increase of $\frac{5}{14}$ as much in the shorter side, so the shorter side must increase by $\frac{5}{14}x$ inches.

55. The equations below relate the distinct positive real numbers $a$, $b$, $c$, and $d$. Which equation correctly expresses $b$ in terms of $d$?

$$\begin{gathered} c = 2a^2 \\[4pt] a^{3b} = \left(\dfrac{c}{2}\right)^{d - 1} \end{gathered}$$
A. $b = \dfrac{d}{3} + \dfrac{1}{3}$
B. $b = \dfrac{4d}{3} - \dfrac{4}{3}$
C. $b = \dfrac{2d}{3} - \dfrac{2}{3}$
D. $b = \dfrac{2d}{3} - \dfrac{1}{3}$
Answer: C
Domain: Advanced Math
Explanation: Since $\frac{c}{2} = a^2$, the second equation becomes $a^{3b} = (a^2)^{d - 1} = a^{2d - 2}$. The exponents are equal (with $a \ne 1$), so $3b = 2d - 2$ and $b = \frac{2d}{3} - \frac{2}{3}$.

56. The given equation relates the distinct positive real numbers $a$, $b$, and $c$. Which equation correctly expresses $a$ in terms of $b$ and $c$?

$$\dfrac{35c}{5b} = 7\sqrt{a + 12}$$
A. $a = \sqrt{\dfrac{c}{b}} - 12$
B. $a = \sqrt{\dfrac{245c}{35b}} - 12$
C. $a = \left(\dfrac{c}{b}\right)^2 - 12$
D. $a = \left(\dfrac{245c}{5b}\right)^2 - 12$
Answer: C
Domain: Advanced Math
Explanation: The left side is $\frac{7c}{b}$, so $\frac{7c}{b} = 7\sqrt{a + 12}$ and $\frac{c}{b} = \sqrt{a + 12}$. Squaring gives $a + 12 = \left(\frac{c}{b}\right)^2$, so $a = \left(\frac{c}{b}\right)^2 - 12$.

57. In the given pair of equations below, $a$ and $b$ are constants. The graph of this pair of equations in the $xy$-plane is a pair of perpendicular lines. Which of the following pairs of equations represents a pair of parallel lines?

$$\begin{gathered} 7x + 11y = 100 \\[4pt] ax + by = 10b \end{gathered}$$
A. $\begin{aligned} &7x - 11y = 10 \\ &ax + by = 10b \end{aligned}$
B. $\begin{aligned} &7x + 33y = 100 \\ &2ax - 3by = 50b \end{aligned}$
C. $\begin{aligned} &33x - 7y = 100 \\ &3ax + by = b \end{aligned}$
D. $\begin{aligned} &11x + 7y = 100 \\ &ax + by = 10b \end{aligned}$
Answer: C
Domain: Algebra
Explanation: The given lines are perpendicular, so $\left(-\frac{7}{11}\right)\left(-\frac{a}{b}\right) = -1$, which gives $\frac{a}{b} = -\frac{11}{7}$. In choice C, $33x - 7y = 100$ has slope $\frac{33}{7}$, and $3ax + by = b$ has slope $-\frac{3a}{b} = -3\left(-\frac{11}{7}\right) = \frac{33}{7}$. The slopes are equal and the lines are different ($y = \frac{33}{7}x - \frac{100}{7}$ and $y = \frac{33}{7}x + 1$), so they are parallel.

58. For the quadratic function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. Which equation defines $f$?

| $x$ | $-1$ | $0$ | $1$ |
|:---:|:---:|:---:|:---:|
| $f(x)$ | $7$ | $13$ | $21$ |
A. $f(x) = 7x^2 + x + 13$
B. $f(x) = 11x^2 - 3x + 13$
C. $f(x) = 5x^2 + 3x + 13$
D. $f(x) = x^2 + 7x + 13$
Answer: D
Domain: Advanced Math
Explanation: Let $f(x) = ax^2 + bx + c$. Then $f(0) = c = 13$, $f(1) = a + b + 13 = 21$, and $f(-1) = a - b + 13 = 7$. So $a + b = 8$ and $a - b = -6$, which give $a = 1$ and $b = 7$. Therefore $f(x) = x^2 + 7x + 13$.

59. The graph shows the relationship between the number of croissants, $x$, and the number of madeleines, $y$, that Claire can buy from a bakery for \$20.00. The relationship can be modeled by the equation $ax + by = 20$, where $a$ and $b$ are constants. What is the value of $\dfrac{a}{b}$?

![Graph in the xy-plane of a line through (0, 9) on the y-axis and (5, 0) on the x-axis. The x-axis is labeled from 1 to 7 and the y-axis from 1 to 9.](tests/images/algebra-a1/q59.svg)
Answer: 9/5 | 1.8
Domain: Algebra
Explanation: The line passes through $(5, 0)$ and $(0, 9)$. Substituting $(5, 0)$ gives $5a = 20$, so $a = 4$; substituting $(0, 9)$ gives $9b = 20$, so $b = \frac{20}{9}$. Therefore $\frac{a}{b} = 4 \cdot \frac{9}{20} = \frac{9}{5}$. (This is also the negative of the slope, $-\left(-\frac{9}{5}\right)$.)

60. Which of the following expressions is equivalent to

$$x + 2 + \dfrac{3}{x + 1},$$

where $x \ne -1$?
A. $\dfrac{x + 5}{x + 1}$
B. $\dfrac{x^2 + 3x + 5}{x + 1}$
C. $\dfrac{x^2 + 5x}{x + 1}$
D. $x + 3$
Answer: B
Domain: Advanced Math
Explanation: Writing $x + 2$ over the denominator $x + 1$: $\frac{(x + 2)(x + 1) + 3}{x + 1} = \frac{x^2 + 3x + 2 + 3}{x + 1} = \frac{x^2 + 3x + 5}{x + 1}$.

61. For groups of $50$ or more people, an aquarium charges \$17 per person for the first $50$ people and \$12 for each additional person after the 50th person. Which function $c$ gives the total charge, in dollars, for a group of $x$ people, where $x \ge 50$?
A. $c(x) = 12x + 17$
B. $c(x) = 12x + 50$
C. $c(x) = 12x + 250$
D. $c(x) = 12x + 850$
Answer: C
Domain: Algebra
Explanation: The first $50$ people cost $17(50) = 850$ dollars, and the other $x - 50$ people cost $12$ dollars each. So $c(x) = 850 + 12(x - 50) = 12x + 250$.

62. Line $k$ in the $xy$-plane has a slope of $-\dfrac{1}{5}$ and passes through the point $\left(13, \dfrac{8}{5}\right)$. Which equation defines line $k$?
A. $x + 5y = 21$
B. $x + 5y = 4$
C. $5y - x = 21$
D. $13y + 8x = 21$
Answer: A
Domain: Algebra
Explanation: Line $k$ is $y - \frac{8}{5} = -\frac{1}{5}(x - 13)$. Multiplying by $5$ gives $5y - 8 = -x + 13$, so $x + 5y = 21$.

63. The map of a country is drawn to scale where $2$ inches represents $7$ miles. The actual distance between two locations is $x$ miles. Which expression represents the distance on the map, in inches, between the two locations?
A. $\dfrac{2x}{7}$
B. $\dfrac{7x}{2}$
C. $2x + 7$
D. $2x - 7$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Each mile is represented by $\frac{2}{7}$ inch on the map, so $x$ miles are represented by $\frac{2x}{7}$ inches.

64. The number of hours $h$ for Saturn's moon Dione to complete an orbit around Saturn can be modeled by the equation below, where $d$ is the average distance from Saturn, in thousands of miles. Which of the following expresses the distance in terms of the number of hours?

$$h = 18 \cdot \sqrt[3]{\left(\dfrac{d}{67}\right)^4}$$
A. $d = \dfrac{67}{18}(h)^{\frac{3}{4}}$
B. $d = \dfrac{67}{18}(h)^{\frac{4}{3}}$
C. $d = 67\left(\dfrac{h}{18}\right)^{\frac{4}{3}}$
D. $d = 67\left(\dfrac{h}{18}\right)^{\frac{3}{4}}$
Answer: D
Domain: Advanced Math
Explanation: The equation is $\frac{h}{18} = \left(\frac{d}{67}\right)^{\frac{4}{3}}$. Raising both sides to the power $\frac{3}{4}$ gives $\left(\frac{h}{18}\right)^{\frac{3}{4}} = \frac{d}{67}$, so $d = 67\left(\frac{h}{18}\right)^{\frac{3}{4}}$.

65. Money raised by $m$ school clubs will be divided equally among the clubs. Based on school records, $n$ people each gave $p$ dollars. Which of the following describes how much money, in dollars, will each club receive?
A. $mpn$
B. $\dfrac{mp}{n}$
C. $\dfrac{np}{m}$
D. $pn + m$
Answer: C
Domain: Algebra
Explanation: The $n$ people gave a total of $np$ dollars. Divided equally among $m$ clubs, each club receives $\frac{np}{m}$ dollars.

66. A boxing club membership costs \$85 per month. After $1$ year, members receive a discount of \$30 off the cost of their monthly membership. Which function $c$ gives the total cost $c(t)$, in dollars, that a new member pays after $t$ months of membership, where $t \ge 12$?
A. $c(t) = 1{,}020 + 55t$
B. $c(t) = 55t + 85$
C. $c(t) = 360 + 55t$
D. $c(t) = 1{,}020 + 85(t - 12)$
Answer: C
Domain: Algebra
Explanation: The first $12$ months cost $12(85) = 1{,}020$ dollars. Each month after that costs $85 - 30 = 55$ dollars, so $c(t) = 1{,}020 + 55(t - 12) = 360 + 55t$.

67. Sadie plans to make at least $20$ pounds of baked goods that will consist of brownies and cookies. If Sadie wants at least $75\%$ of the baked goods to be made up of cookies, which of the following systems of inequalities represents $b$, pounds of brownies, and $c$, pounds of cookies?
A. $\begin{aligned} &b + c \le 20 \\ &0.75c \le b \end{aligned}$
B. $\begin{aligned} &b + c \ge 20 \\ &0.75b \le c \end{aligned}$
C. $\begin{aligned} &b + c \ge 20 \\ &3c \le b \end{aligned}$
D. $\begin{aligned} &b + c \ge 20 \\ &3b \le c \end{aligned}$
Answer: D
Domain: Algebra
Explanation: At least $20$ pounds means $b + c \ge 20$. At least $75\%$ cookies means $c \ge 0.75(b + c)$, so $0.25c \ge 0.75b$, which simplifies to $3b \le c$.

68. The first term of a sequence is $7$. Each term after the first is $6$ times the preceding term. If $k$ represents the $n$th term of the sequence, which equation gives $k$ in terms of $n$?
A. $k = 6(7^n)$
B. $k = 6(7^{n - 1})$
C. $k = 7(6^n)$
D. $k = 7(6^{n - 1})$
Answer: D
Domain: Advanced Math
Explanation: The terms are $7$, $7(6)$, $7(6^2)$, and so on: the $n$th term is $7$ multiplied by $6$ a total of $n - 1$ times. So $k = 7(6^{n - 1})$.

69. The points $(2, 133)$ and $(3, 138)$ lie on line $k$. Line $k$ is the result of translating line $a$ up $21$ units in the $xy$-plane. What is the $x$-intercept of line $a$?
Answer: -102/5 | -20.4
Domain: Algebra
Explanation: Line $k$ has slope $\frac{138 - 133}{3 - 2} = 5$, so $k$ is $y = 5x + 123$. Line $a$ is $21$ units lower: $y = 5x + 102$. Setting $y = 0$ gives $x = -\frac{102}{5} = -20.4$.

70. A geologist conducted a study on soil erosion in 2014 for farmers in the United States. Flooding was responsible for $0.63$ billion tons of soil loss in 2014. Wind erosion and overgrazing were also responsible for soil loss on farms. Flooding, wind erosion, and overgrazing together were responsible for $1.37$ billion tons of soil loss in 2014. Which inequality represents the possible amounts of soil loss, $s$, in billions of tons, on farms from overgrazing in 2014 in the United States?
A. $0 < s < 0.74$
B. $0.63 < s < 1.37$
C. $0.74 < s < 1.37$
D. $1.37 < s < 2.00$
Answer: A
Domain: Algebra
Explanation: Wind erosion and overgrazing together caused $1.37 - 0.63 = 0.74$ billion tons of soil loss. Both caused some loss, so the overgrazing loss is greater than $0$ and less than $0.74$: $0 < s < 0.74$.

71. The table below shows the list price, discount, and installation fee for a window company. The window company's total expenses for selling and installing $5$ windows is \$250. Which function represents the profit $p$, in dollars, from selling and installing $5$ windows to which the company's discount is applied? (Note: profit $=$ total amount of money received $-$ expenses)

| List price (\$) | Discount | Installation fee |
|:---:|:---:|:---:|
| $x$ per window | Buy $4$ windows at list price and get the 5th free | \$150 for $5$ windows |
A. $p(x) = 5x + 150$
B. $p(x) = 5x - 100$
C. $p(x) = 4x + 150$
D. $p(x) = 4x - 100$
Answer: D
Domain: Algebra
Explanation: With the discount, the customer pays for $4$ windows, $4x$ dollars, plus the $150$-dollar installation fee. Subtracting the $250$ dollars of expenses gives $p(x) = 4x + 150 - 250 = 4x - 100$.

72. Which expression is equivalent to

$$\dfrac{3 + 4x}{81 - 256x^4},$$

where $x > 1$?
A. $\dfrac{1}{27 - 64x^3}$
B. $27 - 64x^3$
C. $\dfrac{1}{(9 + 16x^2)(3 - 4x)}$
D. $(9 + 16x^2)(3 - 4x)$
Answer: C
Domain: Advanced Math
Explanation: The denominator is a difference of squares twice: $81 - 256x^4 = (9 + 16x^2)(9 - 16x^2) = (9 + 16x^2)(3 + 4x)(3 - 4x)$. Canceling $3 + 4x$ gives $\frac{1}{(9 + 16x^2)(3 - 4x)}$.

73. A drawing of an object has a scale where a length of $6$ inches on the drawing represents an actual length of $8$ feet. The actual length of the object is $5y$ feet. Which expression represents the length, in inches, of the object in the drawing?
A. $\dfrac{5}{8}y$
B. $\dfrac{8}{5}y$
C. $\dfrac{15}{4}y$
D. $\dfrac{20}{3}y$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Each foot is represented by $\frac{6}{8} = \frac{3}{4}$ inch, so $5y$ feet are represented by $\frac{3}{4}(5y) = \frac{15}{4}y$ inches.

74. A car manufacturer is shipping two types of cars, Car A and Car B, across the Atlantic Ocean on a car ferry. Each Car A weighs $3$ tons and each Car B weighs $6$ tons. The car manufacturer wants the number of Car A cars transferred to be at least $50\%$ more than the number of Car B cars. The ferry can transport up to $230$ tons of cars and hold no more than $50$ cars. What is the maximum number of Car B cars that can be transported on the ferry?
Answer: 20
Domain: Algebra
Explanation: Let $a$ and $b$ be the numbers of Car A and Car B cars. The conditions are $a \ge 1.5b$, $3a + 6b \le 230$, and $a + b \le 50$. From $a \ge 1.5b$ and $a + b \le 50$, $2.5b \le 50$, so $b \le 20$. With $b = 20$ and $a = 30$, the weight is $90 + 120 = 210 \le 230$ tons and there are $50$ cars, so the maximum is $20$.
`
});
