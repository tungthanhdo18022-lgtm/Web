/*
 * Advanced test: Algebra B1 (56 questions, from "SAT Math Practice Set 2 · Mixed Review").
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'algebra-b1',
  source: String.raw`
---
title: Algebra B1
author: tungtks18022
description: 56 mixed SAT Math questions on linear systems, absolute value equations and inequalities, quadratic and rational equations, and linear models, with an explanation for every question.
section: advanced
time: 90
---

1. In the given system of equations, $k$ is a constant. If the system has no solution, what is the value of $k$?

$$\begin{gathered} \dfrac{4}{3}y - \dfrac{2}{3}x = \dfrac{5}{4} - \dfrac{5}{3}y \\[6pt] \dfrac{1}{6}x + \dfrac{4}{5} = ky + \dfrac{7}{2} \end{gathered}$$
Answer: 3/4 | 0.75
Domain: Algebra
Explanation: The first equation simplifies to $3y - \frac{2}{3}x = \frac{5}{4}$, so $y = \frac{2}{9}x + \frac{5}{12}$ and its slope is $\frac{2}{9}$. The second equation gives $ky = \frac{1}{6}x - \frac{27}{10}$, so its slope is $\frac{1}{6k}$. The system has no solution when the lines are parallel: $\frac{1}{6k} = \frac{2}{9}$, so $6k = \frac{9}{2}$ and $k = \frac{3}{4}$. (The $y$-intercepts, $\frac{5}{12}$ and $-\frac{27}{10k} = -\frac{18}{5}$, are different, so the lines do not coincide.)

2. The product of $2$ positive integers is $84$. The smaller integer is one more than one half of the greater integer. What is the smaller integer?
A. $5$
B. $6$
C. $7$
D. $12$
Answer: C
Domain: Advanced Math
Explanation: If the greater integer is $g$, the smaller is $1 + \frac{g}{2}$, so $g\left(1 + \frac{g}{2}\right) = 84$. Then $g^2 + 2g - 168 = 0$, or $(g + 14)(g - 12) = 0$, so $g = 12$ and the smaller integer is $1 + 6 = 7$. Check: $7 \times 12 = 84$.

3. One of the two equations in a linear system is $6ax - by = 10$. The system has no solution. Which equation could be the other equation in the system?
A. $\dfrac{2}{3}ax = \dfrac{1}{9}by - \dfrac{1}{2}$
B. $\dfrac{12}{5}ax - \dfrac{2}{5}by = 4$
C. $\dfrac{1}{2}ax + \dfrac{1}{12}by = \dfrac{6}{5}$
D. $-\dfrac{2}{3}ax - \dfrac{1}{9}by = \dfrac{10}{9}$
Answer: A
Domain: Algebra
Explanation: The system has no solution when the other equation is a multiple of $6ax - by$ with a different constant. Choice A is $\frac{2}{3}ax - \frac{1}{9}by = -\frac{1}{2}$; multiplying by $9$ gives $6ax - by = -\frac{9}{2}$, a parallel, different line. Choice B multiplied by $\frac{5}{2}$ is $6ax - by = 10$, the same line. In choices C and D the $y$-term has the wrong sign relative to the $x$-term, so those lines are not parallel to the given line.

4. In the given equation, $b$ is a positive integer constant. Which value could be a solution to the equation?

$$x^2 + bx - 18 = 0$$
A. $3$
B. $6$
C. $11$
D. $17$
Answer: A
Domain: Advanced Math
Explanation: If $x = 3$ is a solution, then $9 + 3b - 18 = 0$, so $b = 3$, a positive integer. For $x = 6$, $11$, or $17$, the value of $b$ would be $-3$, $-\frac{103}{11}$, or $-\frac{271}{17}$, none of which is a positive integer.

5. Which of the following systems of equations has infinite solutions?
A. $\begin{aligned} &7ax + 2by = 4c \\ &7ax + 2by = -4c \end{aligned}$
B. $\begin{aligned} &-8by + 3ax = -12c \\ &24by + 9ax = 36c \end{aligned}$
C. $\begin{aligned} &ax + 3by = 4c \\ &18by + 6ax = 24c \end{aligned}$
D. $\begin{aligned} &15ax + 30by = 10c \\ &6by - 10c = 3ax \end{aligned}$
Answer: C
Domain: Algebra
Explanation: In choice C, dividing the second equation by $6$ gives $3by + ax = 4c$, which is the first equation. The two equations describe the same line, so the system has infinitely many solutions. In choice A the left sides are equal but the constants differ, and in choices B and D the equations are not multiples of each other.

6. In the system of equations below, $h$ is a constant. For what value of $h$ does the system have no real solution?

$$\begin{gathered} 15x + 36y = 28 + 96x \\[4pt] 3hx - 109 = 8y - 200 \end{gathered}$$
Answer: 6
Domain: Algebra
Explanation: The first equation is $36y = 81x + 28$, so its slope is $\frac{81}{36} = \frac{9}{4}$. The second is $8y = 3hx + 91$, so its slope is $\frac{3h}{8}$. The system has no solution when the lines are parallel: $\frac{3h}{8} = \frac{9}{4}$, so $h = 6$. (The $y$-intercepts, $\frac{7}{9}$ and $\frac{91}{8}$, are different.)

7. There is no solution to which of the following linear equations?

I. $3(x - 2) = 3x - 2$

II. $3(x - 2) = 6x - 6$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Algebra
Explanation: Equation I becomes $3x - 6 = 3x - 2$, or $-6 = -2$, which is never true, so it has no solution. Equation II becomes $3x - 6 = 6x - 6$, which gives $x = 0$, so it has one solution.

8. According to the formula $p = \dfrac{4}{3}k + 81$, if the value of $p$ is increased by $16$, by how much does the value of $k$ increase?
Answer: 12
Domain: Algebra
Explanation: Each increase of $1$ in $k$ increases $p$ by $\frac{4}{3}$. So an increase of $16$ in $p$ requires an increase of $16 \div \frac{4}{3} = 12$ in $k$.

9. In the given system of equations, $k$ is a constant. If the system has no solution, what is the value of $k$?

$$\begin{gathered} 9y = 12x - 6y + 14 \\[4pt] 4y = -kx + 2 \end{gathered}$$
Answer: -16/5 | -3.2
Domain: Algebra
Explanation: The first equation is $15y = 12x + 14$, so its slope is $\frac{12}{15} = \frac{4}{5}$. The second has slope $-\frac{k}{4}$. For no solution the lines must be parallel: $-\frac{k}{4} = \frac{4}{5}$, so $k = -\frac{16}{5}$. (The $y$-intercepts, $\frac{14}{15}$ and $\frac{1}{2}$, are different.)

10. In the given equation, $a$ is a positive integer constant less than $30$. The equation has exactly one solution. What is the greatest possible value of $a$?

$$29x - 73 = ax + 30$$
Answer: 28
Domain: Algebra
Explanation: Rewriting gives $(29 - a)x = 103$. This has exactly one solution when $29 - a \ne 0$, that is, $a \ne 29$. The greatest positive integer less than $30$ other than $29$ is $28$.

11. Which equation has one solution?
A. $3(x + 7) = x + 7$
B. $3(x + 7) = 3x + 7$
C. $3(x + 7) = 3x + 21$
D. $3x + 7 = 3x + 1$
Answer: A
Domain: Algebra
Explanation: Choice A gives $3x + 21 = x + 7$, so $2x = -14$ and $x = -7$: exactly one solution. Choices B and D reduce to false statements ($21 = 7$ and $7 = 1$), and choice C is true for every $x$.

12.

![A circle in the first quadrant of the xy-plane that touches the x-axis, the y-axis, and line l. Line l slopes down from the upper left and touches the circle at the point P(8, t).](tests/images/algebra-b1/q12.svg)

In the $xy$-plane above, a circle is tangent to line $\ell$, the $x$-axis, and the $y$-axis. If the radius of the circle is $5$, what is the value of $t$?
A. $7$
B. $8$
C. $9$
D. $10$
Answer: C
Domain: Geometry and Trigonometry
Explanation: A circle of radius $5$ tangent to both axes in the first quadrant has center $(5, 5)$, so its equation is $(x - 5)^2 + (y - 5)^2 = 25$. Point $P(8, t)$ is on the circle, so $9 + (t - 5)^2 = 25$ and $t - 5 = \pm 4$. In the figure, $P$ is above the center, so $t = 9$.

13. The given expression below is equivalent to $x(ax + 1)(bx + 3)$, where $a$ and $b$ are positive integers. What is a possible value of $a + b$?

$$42x^3 + 27x^2 + 3x$$
Answer: 13 | 23
Domain: Advanced Math
Explanation: Expanding, $x(ax + 1)(bx + 3) = abx^3 + (3a + b)x^2 + 3x$. So $ab = 42$ and $3a + b = 27$. The positive integer pairs are $a = 7$, $b = 6$ (since $21 + 6 = 27$) and $a = 2$, $b = 21$ (since $6 + 21 = 27$). So $a + b$ is $13$ or $23$; either value is correct.

14. At the O.K. Daily Milk Company, machine X fills a box with milk, and machine Y eliminates a milk box if its weight is less than $450$ grams or greater than $500$ grams. If the weight of a box that will be eliminated by machine Y is $E$, in grams, which of the following describes all possible values of $E$?
A. $|E - 475| < 25$
B. $|E - 500| > 450$
C. $|475 - E| = 25$
D. $|E - 475| > 25$
Answer: D
Domain: Algebra
Explanation: The accepted weights are from $450$ to $500$ grams, which is within $25$ grams of the midpoint, $475$. A box is eliminated when its weight is more than $25$ grams away from $475$ grams: $|E - 475| > 25$.

15. An industrial printer is loaded with $32{,}000$ sheets of paper. The machine starts a large job and prints at a constant rate. After $12$ minutes, the printer has used $5\%$ of the paper. Which of the following equations models the number of sheets of paper, $p$, remaining in the printer $h$ __hours__ after the printer started printing?
A. $p = 32{,}000 - 1{,}600h$
B. $p = 32{,}000 - 8{,}000h$
C. $p = 32{,}000(0.05)^{\frac{h}{5}}$
D. $p = 32{,}000(0.95)^{\frac{h}{5}}$
Answer: B
Domain: Algebra
Explanation: In $12$ minutes the printer uses $0.05(32{,}000) = 1{,}600$ sheets. An hour is $5$ times as long, so it uses $8{,}000$ sheets per hour, and $p = 32{,}000 - 8{,}000h$. (The rate is constant, so the model is linear, not exponential.)

16. In the system of equations below, $g$, $k$, and $z$ are constants. If the system has infinite solutions, which statement must be true?

$$\begin{gathered} y = 2x + k \\[4pt] gx + 9y = z \end{gathered}$$
A. $g = 18$, $\dfrac{z}{9} = k$
B. $g = -18$, $\dfrac{z}{9} = k$
C. $g = 2$, $\dfrac{k}{9} = z$
D. $g = -2$, $\dfrac{k}{9} = 2$
Answer: B
Domain: Algebra
Explanation: The second equation is $y = -\frac{g}{9}x + \frac{z}{9}$. For infinitely many solutions it must be the same line as $y = 2x + k$, so $-\frac{g}{9} = 2$ and $\frac{z}{9} = k$. That gives $g = -18$ and $\frac{z}{9} = k$.

17. In the equation below, $a$, $b$, and $c$ are constants. If the equation is true for all values of $x$, what is the value of $a - b + c$?

$$x(2x - 2) - 2(-x - 4) = ax^2 + bx + c$$
A. $2$
B. $4$
C. $8$
D. $10$
Answer: D
Domain: Advanced Math
Explanation: The left side is $2x^2 - 2x + 2x + 8 = 2x^2 + 8$, so $a = 2$, $b = 0$, and $c = 8$. Then $a - b + c = 2 - 0 + 8 = 10$.

18. What is the value of $\dfrac{k}{13}$ if the equation shown below only has one solution?

$$13|x - 7| = k$$
A. $-7$
B. $7$
C. $-7$ or $7$
D. $0$
Answer: D
Domain: Advanced Math
Explanation: The equation is $|x - 7| = \frac{k}{13}$. An absolute value equation $|x - 7| = c$ has two solutions when $c > 0$, none when $c < 0$, and exactly one, $x = 7$, when $c = 0$. So $\frac{k}{13} = 0$.

19.

$$3x + 2y = 10$$

If $a$ and $b$ are constants and $2a = 3b$, which of the following lines is perpendicular to the given line?
A. $ax + by = 5$
B. $bx + ay = 7$
C. $ax - by = 11$
D. $bx - ay = 4$
Answer: D
Domain: Algebra
Explanation: The given line has slope $-\frac{3}{2}$, so a perpendicular line has slope $\frac{2}{3}$. Since $2a = 3b$, $\frac{b}{a} = \frac{2}{3}$. Choice D gives $ay = bx - 4$, so its slope is $\frac{b}{a} = \frac{2}{3}$. The slopes in choices A, B, and C are $-\frac{3}{2}$, $-\frac{2}{3}$, and $\frac{3}{2}$.

20. A cruise ship has a total of $480$ rooms, and on a certain morning, one quarter of the rooms are cleaned. There are $15$ housekeepers on duty on the cruise ship that morning, and each housekeeper cleans the same number of rooms, $r$. Which of the following equations represents the information given in terms of $r$?
A. $4(15r) = 480$
B. $\dfrac{1}{4}(15r) = 480$
C. $4(r + 15) = 480$
D. $\dfrac{1}{4}(r + 15) = 480$
Answer: A
Domain: Algebra
Explanation: The housekeepers clean $15r$ rooms, which is one quarter of the $480$ rooms. So $15r = \frac{1}{4}(480)$, or $4(15r) = 480$.

21.

| $x$ | $f(x)$ |
|:---:|:---:|
| $k$ | $2a$ |
| $3k$ | $10a$ |
| $7k$ | $26a$ |

If $f$ is a linear function, what is the $y$-coordinate of the $y$-intercept of the graph of $y = f(x)$?
A. $0$
B. $-2a$
C. $-4a$
D. $-6a$
Answer: B
Domain: Algebra
Explanation: From $x = k$ to $x = 3k$, $f(x)$ increases by $8a$, so the slope is $\frac{8a}{2k} = \frac{4a}{k}$. Then $f(0) = f(k) - \frac{4a}{k}(k) = 2a - 4a = -2a$. (The point $(7k, 26a)$ also fits: $-2a + \frac{4a}{k}(7k) = 26a$.)

22. The area of a rectangular rug is $88$ square feet. The rug's length $x$, in feet, is $7$ feet shorter than its width. Which equation represents this situation?
A. $x^2 - 7 = 88$
B. $x^2 - 7x = 88$
C. $x^2 + 7 = 88$
D. $x^2 + 7x = 88$
Answer: D
Domain: Advanced Math
Explanation: The width is $x + 7$ feet, so the area is $x(x + 7) = 88$, or $x^2 + 7x = 88$.

23. The volumes of $10$ small boxes and $10$ large boxes are $m$ cubic meters and $n$ cubic meters, respectively. If $y$ out of $x$ boxes are large and the total volume of all the boxes is $500$ cubic meters, which of the following describes the situation?
A. $\dfrac{mx}{10} + \dfrac{ny}{10} = 500$
B. $\dfrac{my}{10} + \dfrac{nx}{10} = 500$
C. $\dfrac{m(x - y)}{10} + \dfrac{ny}{10} = 500$
D. $\dfrac{n(x - y)}{10} + \dfrac{my}{10} = 500$
Answer: C
Domain: Algebra
Explanation: Each small box has volume $\frac{m}{10}$ and each large box has volume $\frac{n}{10}$ cubic meters. There are $x - y$ small boxes and $y$ large boxes, so $\frac{m(x - y)}{10} + \frac{ny}{10} = 500$.

24. What is a negative solution to the equation below?

$$10.75|1.25x + 1.4| - 4.5|1.25x + 1.4| = 22.5$$
Answer: -4
Domain: Advanced Math
Explanation: Combining like terms gives $6.25|1.25x + 1.4| = 22.5$, so $|1.25x + 1.4| = 3.6$. Then $1.25x + 1.4 = 3.6$, giving $x = 1.76$, or $1.25x + 1.4 = -3.6$, giving $x = -4$. The negative solution is $-4$.

25. What is the sum of all possible solutions to the given equation below?

$$-3|4x - 7| = -16x$$
Answer: 3/4 | 0.75
Domain: Advanced Math
Explanation: The equation is $3|4x - 7| = 16x$, so $x \ge 0$. If $4x - 7 \ge 0$, then $12x - 21 = 16x$ gives $x = -\frac{21}{4}$, which does not satisfy $4x \ge 7$. If $4x - 7 < 0$, then $21 - 12x = 16x$ gives $x = \frac{3}{4}$, which works. The only solution is $\frac{3}{4}$, so the sum is $\frac{3}{4}$.

26. Which of the following inequalities gives a value of $c$ where the equation below has no solution?

$$\dfrac{4}{3}|20 - x^2| = \dfrac{9}{5} - 12c$$
A. $-\sqrt{20} < c < \sqrt{20}$
B. $c < -\sqrt{20}$ or $c > \sqrt{20}$
C. $c < \dfrac{3}{20}$
D. $c > \dfrac{3}{20}$
Answer: D
Domain: Advanced Math
Explanation: The left side is never negative, and it can equal any nonnegative number. So the equation has no solution exactly when the right side is negative: $\frac{9}{5} - 12c < 0$, which gives $c > \frac{3}{20}$.

27. What is the positive solution to the equation below?

$$6|5 - x| + 3|5 - x| = 63$$
Answer: 12
Domain: Advanced Math
Explanation: Combining like terms gives $9|5 - x| = 63$, so $|5 - x| = 7$. Then $x = -2$ or $x = 12$, and the positive solution is $12$.

28. To build a new field, a certain number of companies are going to donate a total of \$250,000. Each company will donate the same amount of money. Right at the deadline, $5$ more companies decide to donate, and, as a result of the additional companies, each company will pay \$2,500 less. How many companies were initially going to donate to pay for the field?
Answer: 20
Domain: Advanced Math
Explanation: If $n$ companies were initially going to donate, then $\frac{250{,}000}{n} - \frac{250{,}000}{n + 5} = 2{,}500$. Dividing by $2{,}500$ gives $\frac{100}{n} - \frac{100}{n + 5} = 1$, so $100(n + 5) - 100n = n(n + 5)$, or $n^2 + 5n - 500 = 0$. Then $(n + 25)(n - 20) = 0$, so $n = 20$.

29. In the $xy$-plane, the equation of line $\ell$ is $x + 3y = 5$. If line $m$ is perpendicular to line $\ell$, what is a possible equation of line $m$?
A. $y = -\dfrac{1}{3}x + 2$
B. $y = \dfrac{1}{3}x - 1$
C. $y = -3x + 1$
D. $y = 3x + \dfrac{2}{3}$
Answer: D
Domain: Algebra
Explanation: Line $\ell$ is $y = -\frac{1}{3}x + \frac{5}{3}$, with slope $-\frac{1}{3}$. A perpendicular line has slope $3$, and only choice D has slope $3$.

30.

![Graph of a line in the xy-plane through the points (0, 3) and (5, 0). The point P(a, b) is marked on the line between them.](tests/images/algebra-b1/q30.svg)

The graph of a function $f$ is shown in the $xy$-plane above. If $b = 2a$, what is the value of $a$?
A. $\dfrac{5}{2}$
B. $\dfrac{5}{4}$
C. $\dfrac{15}{13}$
D. $\dfrac{16}{15}$
Answer: C
Domain: Algebra
Explanation: The line through $(0, 3)$ and $(5, 0)$ is $y = -\frac{3}{5}x + 3$. Point $P(a, b)$ is on it, so $b = -\frac{3}{5}a + 3$. Substituting $b = 2a$ gives $2a = -\frac{3}{5}a + 3$, so $\frac{13}{5}a = 3$ and $a = \frac{15}{13}$.

31. In the given system of equations, $a$ is a constant. If the system has infinite solutions, what is the value of $a$?

$$\begin{gathered} 6y + 5x = -4x + 3 \\[4pt] 8y + \dfrac{45}{2}x = -7y + a \end{gathered}$$
Answer: 15/2 | 7.5
Domain: Algebra
Explanation: The first equation is $9x + 6y = 3$ and the second is $\frac{45}{2}x + 15y = a$. Multiplying the first equation by $\frac{5}{2}$ gives $\frac{45}{2}x + 15y = \frac{15}{2}$. The equations are the same when $a = \frac{15}{2}$.

32. In the given equation, $k$ is a constant. The equation has no solution. What is the value of $k$?

$$\dfrac{3}{5}x + 5 = kx - 4$$
Answer: 3/5 | 0.6
Domain: Algebra
Explanation: Rewriting gives $\left(\frac{3}{5} - k\right)x = -9$. This has no solution only when the coefficient of $x$ is $0$, so $k = \frac{3}{5}$ (the equation then says $0 = -9$).

33. In the equation below, $a$ and $b$ are constants. If the equation has infinite solutions, what is the value of $a + b$?

$$ax + 3(3x - 2) = 5x + b$$
A. $-10$
B. $-6$
C. $-4$
D. $5$
Answer: A
Domain: Algebra
Explanation: The left side is $(a + 9)x - 6$. For infinitely many solutions, $a + 9 = 5$ and $-6 = b$, so $a = -4$, $b = -6$, and $a + b = -10$.

34. A farmer wants to buy horses and cows. The farmer has a budget of \$17,000 and wants to buy at least $13$ animals. The price of each horse is \$1,800 and the price of each cow is \$1,100. What is the maximum number of horses that can be purchased?
Answer: 3
Domain: Algebra
Explanation: With $h$ horses and $c$ cows, $1{,}800h + 1{,}100c \le 17{,}000$ and $h + c \ge 13$. For the most horses, buy as few cows as possible: $c = 13 - h$. Then $1{,}800h + 1{,}100(13 - h) \le 17{,}000$, so $700h \le 2{,}700$ and $h \le 3.86$. The maximum is $3$ horses.

35. Johnny's transport company has a ferry with a weight limit of $35{,}000$ pounds. The ferry is already carrying $13{,}050$ pounds in shipments when it arrives at the dock. If each additional crate weighs $750$ pounds, what is the maximum number of new crates that the ferry can transport?
Answer: 29
Domain: Algebra
Explanation: The ferry can carry $35{,}000 - 13{,}050 = 21{,}950$ more pounds. Since $750c \le 21{,}950$ gives $c \le 29.27$, the maximum is $29$ crates.

36. Woody the woodchuck can chuck at least $13$ logs a day and at most $19$ logs a day. Willy the woodchuck can chuck at least $7$ logs a day and at most $16$ logs a day. Based on this, if Woody and Willy chuck logs together for a whole number of days, what is a possible number of days it would take them to chuck $175$ logs?
Answer: 5 | 6 | 7 | 8
Domain: Algebra
Explanation: Together they chuck at least $13 + 7 = 20$ and at most $19 + 16 = 35$ logs a day. So $175$ logs take at least $\frac{175}{35} = 5$ days and at most $\frac{175}{20} = 8.75$ days. The possible whole numbers of days are $5$, $6$, $7$, and $8$; any one of them is correct.

37. At a bottling company, a computerized machine accepts a bottle only if the number of fluid ounces is greater than or equal to $5\frac{3}{7}$, and less than or equal to $6\frac{4}{7}$. If the machine accepts a bottle containing $f$ fluid ounces, which of the following describes all possible values of $f$?
A. $|f - 6| < \dfrac{4}{7}$
B. $|f - 6| \le \dfrac{3}{7}$
C. $|f + 6| > \dfrac{4}{7}$
D. $|6 - f| \le \dfrac{4}{7}$
Answer: D
Domain: Algebra
Explanation: The accepted interval is from $5\frac{3}{7}$ to $6\frac{4}{7}$. Its midpoint is $6$ and each endpoint is $\frac{4}{7}$ away from $6$, so the accepted values satisfy $|f - 6| \le \frac{4}{7}$, which is the same as $|6 - f| \le \frac{4}{7}$. Choice A leaves out the endpoints.

38. If

$$\left|\dfrac{5}{3}x - 84\right| = \left|\dfrac{5}{2}x\right|,$$

what is the greatest possible solution?
Answer: 504/25 | 20.16
Domain: Advanced Math
Explanation: Either $\frac{5}{3}x - 84 = \frac{5}{2}x$ or $\frac{5}{3}x - 84 = -\frac{5}{2}x$. The first gives $-\frac{5}{6}x = 84$, so $x = -100.8$. The second gives $\frac{25}{6}x = 84$, so $x = \frac{504}{25} = 20.16$. The greatest solution is $\frac{504}{25}$.

39. How many solutions does the given system of equations below have?

$$\begin{gathered} \dfrac{5}{2}y - \dfrac{26}{4}x = \dfrac{29}{3} + \dfrac{1}{3}x \\[6pt] 28x + \dfrac{5}{2}y - \dfrac{49}{3} = y + 3 \end{gathered}$$
A. Zero
B. Exactly one
C. Exactly two
D. Infinitely many
Answer: B
Domain: Algebra
Explanation: The first equation is $\frac{5}{2}y = \frac{41}{6}x + \frac{29}{3}$, which has a positive slope, $\frac{41}{15}$. The second is $\frac{3}{2}y = -28x + \frac{58}{3}$, which has a negative slope, $-\frac{56}{3}$. Lines with different slopes intersect in exactly one point.

40. Jamie makes pies and cookies. It takes her $20$ minutes to make a pie and $30$ minutes to make a tray of cookies. This weekend Jamie is going to spend $8$ hours making pies and cookies. She will make twice as many trays of cookies as pies. How many trays of cookies will she make?
A. $6$
B. $8$
C. $10$
D. $12$
Answer: D
Domain: Algebra
Explanation: If Jamie makes $p$ pies, she makes $2p$ trays of cookies, and $20p + 30(2p) = 480$ minutes. So $80p = 480$, $p = 6$, and she makes $2(6) = 12$ trays of cookies.

41. What is the sum of all possible solutions to the given equation below?

$$|x^2 - 17x + 45| = 4x - 9$$
Answer: 34
Domain: Advanced Math
Explanation: The right side must be nonnegative, so $x \ge \frac{9}{4}$. If $x^2 - 17x + 45 = 4x - 9$, then $x^2 - 21x + 54 = 0$, so $x = 3$ or $x = 18$. If $x^2 - 17x + 45 = -(4x - 9)$, then $x^2 - 13x + 36 = 0$, so $x = 4$ or $x = 9$. All four values satisfy $x \ge \frac{9}{4}$ and check in the original equation, so the sum is $3 + 18 + 4 + 9 = 34$.

42. The Jones family is throwing a huge surprise party for their grandfather's 80th birthday. The birthday party costs \$18,000. All the family members agree to split the cost of the party equally. When $3$ members of the family later refused to pay for the event, the remaining members of the family each had to pay an additional \$1,000. How many family members were initially going to split the costs for the party?
Answer: 9
Domain: Advanced Math
Explanation: If $n$ members were initially going to pay, then $\frac{18{,}000}{n - 3} - \frac{18{,}000}{n} = 1{,}000$. Dividing by $1{,}000$ and clearing denominators gives $18n - 18(n - 3) = n(n - 3)$, so $n^2 - 3n - 54 = 0$ and $(n - 9)(n + 6) = 0$. So $n = 9$.

43. The equation $7x + 3 = a(x + b)$, where $a$ and $b$ are constants, has no solution. Which of the following must be true?

I. $a = 7$

II. $b = 3$

III. $b \ne \dfrac{3}{7}$
A. None
B. I only
C. I and II only
D. I and III only
Answer: D
Domain: Algebra
Explanation: The equation is $7x + 3 = ax + ab$. It has no solution when the $x$-coefficients are equal and the constants are not: $a = 7$ and $ab \ne 3$, so $7b \ne 3$ and $b \ne \frac{3}{7}$. Statement II need not be true. So I and III only.

44. In the system of equations below, $a$ and $b$ are constants. If the system of equations has infinite solutions, what is the value of $a + b$?

$$\begin{gathered} 4x - ay = 20 \\[4pt] -bx + 3y = 30 \end{gathered}$$
A. $-8$
B. $-4$
C. $4$
D. $8$
Answer: A
Domain: Algebra
Explanation: For infinitely many solutions, the second equation must be a multiple of the first. Since $30 = \frac{3}{2}(20)$, the multiplier is $\frac{3}{2}$: $-b = \frac{3}{2}(4) = 6$ and $3 = \frac{3}{2}(-a)$. So $b = -6$, $a = -2$, and $a + b = -8$.

45.

| $x$ | $f(x)$ |
|:---:|:---:|
| $2$ | $5$ |
| $4$ | $a$ |
| $8$ | $23$ |
| $a$ | $b$ |

The table above shows values of the linear function $f$ for selected values of $x$. What is the value of $b$?
A. $11$
B. $22$
C. $32$
D. $42$
Answer: C
Domain: Algebra
Explanation: From $(2, 5)$ and $(8, 23)$, the slope is $\frac{18}{6} = 3$, so $f(x) = 3x - 1$. Then $a = f(4) = 11$ and $b = f(11) = 32$.

46. If the equation below is true for all values of $x$, $m$ is a constant, and $a < 0$, what is the value of $a$?

$$m(x^2 - a^2) = (3x - 1)(3x + 1)$$
A. $-\dfrac{1}{81}$
B. $-\dfrac{1}{27}$
C. $-\dfrac{1}{9}$
D. $-\dfrac{1}{3}$
Answer: D
Domain: Advanced Math
Explanation: The right side is $9x^2 - 1$, and the left side is $mx^2 - ma^2$. So $m = 9$ and $9a^2 = 1$, which gives $a^2 = \frac{1}{9}$. Since $a < 0$, $a = -\frac{1}{3}$.

47. If the equation below is true for all values of $x$ and if $a$, $b$, and $c$ are all positive constants, what is the value of $a + b + c$?

$$(3x + 2b)^2 = ax^2 + 8ax + c$$
Answer: 159
Domain: Advanced Math
Explanation: The left side is $9x^2 + 12bx + 4b^2$. Matching coefficients gives $a = 9$, $12b = 8a = 72$, so $b = 6$, and $c = 4b^2 = 144$. So $a + b + c = 9 + 6 + 144 = 159$.

48.

| $x$ | $f(x)$ |
|:---:|:---:|
| $2$ | $a$ |
| $5$ | $6$ |
| $8$ | $b$ |

The table above gives values of the linear function $f$ for selected values of $x$. What is the value of $a + b$?
A. $8$
B. $10$
C. $12$
D. $18$
Answer: C
Domain: Algebra
Explanation: The value $x = 5$ is halfway between $x = 2$ and $x = 8$, and $f$ is linear, so $f(5)$ is the average of $a$ and $b$: $\frac{a + b}{2} = 6$. So $a + b = 12$.

49. A regional train company sells a monthly pass for \$275. Tickets for individual trips cost \$7.75, \$13.50, or \$17.50, depending on the length of the trip. What is the minimum number of trips per month for which a monthly pass could cost less than purchasing individual tickets for those trips?
Answer: 16
Domain: Algebra
Explanation: The pass costs less than the tickets only if the tickets cost more than $275$ dollars. With the most expensive tickets, $n$ trips cost $17.50n$ dollars, and $17.50n > 275$ gives $n > 15.7$. With $15$ or fewer trips, the tickets cost at most $15(17.50) = 262.50$ dollars, less than the pass. So the minimum number of trips is $16$.

50. Nimi created a scale model of a train where $1$ centimeter on the model equals $5$ meters on the train. The length of the model train is $7.6$ centimeters. Nimi wants to make a new model where a scale of $1$ centimeter on the model equals $10$ meters on the train. Which of the following best describes how the length of the new model train will compare to the length of the first model train?
A. The length of the new model train will be $10$ centimeters longer than the length of the first model train.
B. The length of the new model train will be $10$ centimeters shorter than the length of the first model train.
C. The length of the new model train will be $\dfrac{1}{2}$ as long as the length of the first model train.
D. The length of the new model train will be $2$ times as long as the length of the first model train.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The train is $7.6(5) = 38$ meters long. At $1$ centimeter per $10$ meters, the new model is $3.8$ centimeters long, which is $\frac{1}{2}$ of $7.6$ centimeters. (Each centimeter now stands for twice as many meters, so the model is half as long.)

51. How many solutions does the equation below have?

$$\dfrac{8x}{12x - 4} = \dfrac{2x + 1}{3x - 1}$$
A. None
B. One
C. Two
D. Infinitely many
Answer: A
Domain: Advanced Math
Explanation: The left side is $\frac{8x}{4(3x - 1)} = \frac{2x}{3x - 1}$, so for $x \ne \frac{1}{3}$ the equation becomes $2x = 2x + 1$, or $0 = 1$, which is false. The equation has no solution.

52. The daily protein intake of a person is $8$ grams per kilogram of body weight. Every $100$ grams of chicken and of meat contain $27$ grams and $26$ grams of protein, respectively. If an $80$-kilogram man consumes $x$ grams of chicken and $y$ grams of meat, which is enough for his daily protein intake, which of the following is true?
A. $\dfrac{27x}{100} + \dfrac{26y}{100} = 80$
B. $\dfrac{27x}{800} + \dfrac{26y}{800} = 80$
C. $\dfrac{100x}{27} + \dfrac{100y}{26} = 640$
D. $\dfrac{100x}{27} + \dfrac{100y}{26} = 80$
Answer: B
Domain: Algebra
Explanation: The man needs $8(80) = 640$ grams of protein, and the food gives $\frac{27x}{100} + \frac{26y}{100}$ grams. So $\frac{27x}{100} + \frac{26y}{100} = 640$. Dividing both sides by $8$ gives $\frac{27x}{800} + \frac{26y}{800} = 80$.

53. In the system of equations below, $g$ and $k$ are constants. If the system has no solution, which statement must be true?

$$\begin{gathered} y = 4x + 5k \\[4pt] gx + 5y = 20 \end{gathered}$$
A. $g = -4$, $k = 4$
B. $g = -4$, $k \ne 4$
C. $g = -20$, $k = \dfrac{4}{5}$
D. $g = -20$, $k \ne \dfrac{4}{5}$
Answer: D
Domain: Algebra
Explanation: The second equation is $y = -\frac{g}{5}x + 4$. For no solution the lines must be parallel and different: $-\frac{g}{5} = 4$, so $g = -20$, and $5k \ne 4$, so $k \ne \frac{4}{5}$.

54.

![Graph of line l in the xy-plane, which slopes down from left to right and passes through the marked point P(2, 2).](tests/images/algebra-b1/q54.svg)

In the $xy$-plane above, line $\ell$ passes through point $P$ and has a slope of $-\dfrac{1}{2}$. What is the $x$-intercept of line $\ell$?
A. $(4, 0)$
B. $(5, 0)$
C. $(6, 0)$
D. $(7, 0)$
Answer: C
Domain: Algebra
Explanation: Line $\ell$ is $y - 2 = -\frac{1}{2}(x - 2)$. Setting $y = 0$ gives $-2 = -\frac{1}{2}(x - 2)$, so $x - 2 = 4$ and $x = 6$. The $x$-intercept is $(6, 0)$.

55.

$$\begin{gathered} 7kx + 13my = 20.5 \\[4pt] 6kx + 5my = -48 \end{gathered}$$

In the given system of equations, $k$ and $m$ are constants. The system has a solution of $(2, y)$. What is the value of $k$?
Answer: -1453/172
Domain: Algebra
Explanation: Substituting $x = 2$ and letting $u = my$ gives $14k + 13u = 20.5$ and $12k + 5u = -48$. From the second equation, $u = \frac{-48 - 12k}{5}$. Substituting into the first: $14k + \frac{13(-48 - 12k)}{5} = 20.5$, so $70k - 624 - 156k = 102.5$ and $-86k = 726.5$. So $k = -\frac{726.5}{86} = -\frac{1453}{172} \approx -8.448$; enter $-8.447$ or $-8.448$.

56. Which of the following equations has no solution?
A. $3 - \left|\dfrac{9}{4}x + \dfrac{8}{5}\right| = \dfrac{20}{3}$
B. $|4x + 182| = |2.75x + 101|$
C. $-3\left|\dfrac{11}{9}x - \dfrac{3}{11}\right| = -108$
D. $|x^2 - 6x + 9| = 12$
Answer: A
Domain: Advanced Math
Explanation: Choice A gives $\left|\frac{9}{4}x + \frac{8}{5}\right| = 3 - \frac{20}{3} = -\frac{11}{3}$. An absolute value cannot be negative, so choice A has no solution. Choice B has solutions where $4x + 182 = \pm(2.75x + 101)$, choice C gives an absolute value equal to $36$, and choice D gives $(x - 3)^2 = 12$, which also has solutions.
`
});
