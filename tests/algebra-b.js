/*
 * Advanced test: Algebra B (69 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page.
 * Question 57 was missing from the source file (only its answer, B, was given); the
 * question below is a replacement written for this test with the same answer.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'algebra-b',
  source: String.raw`
---
title: Algebra B
author: tungtks18022
description: 69 harder Algebra questions on linear equations, linear functions, systems of equations and linear inequalities, with an explanation for every question.
section: advanced
time: 110
---

1. A machine makes $8$-inch, $9$-inch, and $3$-inch parts. During a certain day, the number of $8$-inch parts that the machine makes is $4$ times the number $n$ of $9$-inch parts, and the number of $3$-inch parts is $30$. During this day, the machine makes $100$ parts total. Which equation represents this situation?
A. $8(4n) + 9n + 3(30) = 100$
B. $8n + 9n + 3n = 100$
C. $4n + 30 = 100$
D. $5n + 30 = 100$
Answer: D
Domain: Algebra
Explanation: The machine makes $4n$ eight-inch parts, $n$ nine-inch parts, and $30$ three-inch parts. The total number of parts is $4n + n + 30 = 100$, or $5n + 30 = 100$. (The lengths $8$, $9$, and $3$ inches do not affect the number of parts.)

2. In the $xy$-plane, line $k$ and line $l$ are perpendicular and intersect at the point $(2, 8)$. If line $k$ is defined by the equation $y = mx + b$, where $m$ and $b$ are constants and $m > 1$, which of the following points lies on line $l$?
A. $\left(3, 8 - \dfrac{1}{m}\right)$
B. $\left(3, 8 + \dfrac{1}{m}\right)$
C. $(3, 8 - m)$
D. $(3, 8 + m)$
Answer: A
Domain: Algebra
Explanation: Line $l$ is perpendicular to line $k$, so its slope is $-\frac{1}{m}$, and it passes through $(2, 8)$. Moving $1$ unit to the right from $x = 2$ to $x = 3$ changes $y$ by $-\frac{1}{m}$, so the point $\left(3, 8 - \frac{1}{m}\right)$ lies on line $l$.

3. A $34$-pound dog eats two types of canned food: chicken and beef. The recommended amount of chicken food is $1.25$ cans per $16$ pounds a dog weighs per day. The recommended amount of canned beef food is $0.85$ cans per $23$ pounds a dog weighs per day. If $c$ is the number of cans of chicken food and $b$ is the number of cans of beef food, a $34$-pound dog eats in a given day, which equation describes all possible values of $c$ and $b$?
A. $\dfrac{1.25}{16}c + \dfrac{0.85}{23}b = 34$
B. $\dfrac{16}{1.25}c + \dfrac{23}{0.85}b = 34$
C. $\dfrac{1.25}{16}b + \dfrac{0.85}{23}c = 34$
D. $\dfrac{16}{1.25}b + \dfrac{23}{0.85}c = 34$
Answer: B
Domain: Algebra
Explanation: One can of chicken food is recommended for $\frac{16}{1.25}$ pounds of dog weight, so $c$ cans cover $\frac{16}{1.25}c$ pounds. Likewise, $b$ cans of beef food cover $\frac{23}{0.85}b$ pounds. Together they must cover the dog's $34$ pounds, so $\frac{16}{1.25}c + \frac{23}{0.85}b = 34$.

4.

$$\begin{gathered} 13x + 17y = 10 \\[4pt] ax + by = 10 \end{gathered}$$

In the given pair of equations, $a$ and $b$ are constants. The graph of this pair of equations in the $xy$-plane is a pair of perpendicular lines. Which of the following pairs of equations also represents a pair of perpendicular lines?
A. $\begin{aligned} &39x + 17y = 10 \\ &ax - 3by = 10 \end{aligned}$
B. $\begin{aligned} &52x + 34y = 10 \\ &2ax + 4by = 10 \end{aligned}$
C. $\begin{aligned} &65x + 17y = 10 \\ &5ax + by = 10 \end{aligned}$
D. $\begin{aligned} &13x - 17y = 10 \\ &ax + by = 10 \end{aligned}$
Answer: B
Domain: Algebra
Explanation: The slopes of the given lines are $-\frac{13}{17}$ and $-\frac{a}{b}$. The lines are perpendicular, so $\left(-\frac{13}{17}\right)\left(-\frac{a}{b}\right) = -1$, which gives $13a = -17b$, or $13a + 17b = 0$. In choice B, the slopes are $-\frac{52}{34} = -\frac{26}{17}$ and $-\frac{2a}{4b} = -\frac{a}{2b}$, and their product is $\frac{26a}{34b} = \frac{13a}{17b} = -1$ (because $13a = -17b$). So the lines in choice B are perpendicular. The products of the slopes in choices A, C, and D are not $-1$.

5. An online store is offering two different discounts on its sweaters: a bulk discount for large orders and a coupon discount. For orders of $n$ sweaters, where $10 < n < 50$, a bulk discount of $n\%$ off the original price of \$41 is applied to the price of each sweater. If a coupon is applied to the order, a discount of an additional \$4 is applied to the price of each sweater after the bulk discount is applied. For a certain order with both the bulk discount and the coupon discount applied, the total price after the discounts for the sweaters purchased was \$741. How many sweaters were purchased in this order?
A. $18$
B. $20$
C. $30$
D. $44$
Answer: C
Domain: Advanced Math
Explanation: After both discounts, each sweater costs $41\left(1 - \frac{n}{100}\right) - 4 = 37 - 0.41n$ dollars, so the total price is $n(37 - 0.41n) = 741$. Checking the choices: for $n = 30$, $30(37 - 12.3) = 30(24.7) = 741$. The other choices give $18(29.62) = 533.16$, $20(28.8) = 576$, and $44(18.96) = 834.24$.

6. Lines $k$ and $l$ are perpendicular. If the points $(4, m)$ and $(9, m + 3)$ lie on line $k$ and lines $k$ and $l$ intersect at $(9, m + 3)$, which of the following can lie on line $l$?
A. $(m - 6, -4)$
B. $(m + 9, 24)$
C. $(21, m - 17)$
D. $(24, m + 12)$
Answer: C
Domain: Algebra
Explanation: The slope of line $k$ is $\frac{(m + 3) - m}{9 - 4} = \frac{3}{5}$, so the slope of line $l$ is $-\frac{5}{3}$. Line $l$ passes through $(9, m + 3)$. From $(9, m + 3)$ to $(21, m - 17)$, the slope is $\frac{(m - 17) - (m + 3)}{21 - 9} = \frac{-20}{12} = -\frac{5}{3}$, so $(21, m - 17)$ lies on line $l$ for every value of $m$.

7.

![Graph with Time (hours) on the horizontal axis from 0 to 10 and Total rainfall (centimeters) on the vertical axis from 0 to 8. Line segments connect (0, 0) to (2, 2), (2, 2) to (4, 2), and (4, 2) to (10, 2.8).](tests/images/algebra-b/q7.svg)

The graph shows the total amount of rainfall $y$, in centimeters, from the start of a $10$-hour period, where $x$ is the number of hours after the start of the period. Which of the following statements about the rainfall during this time period is true?
A. The rate of rainfall was $2$ centimeters per hour between $x = 2$ and $x = 4$.
B. The rate of rainfall was the greatest between $x = 4$ and $x = 10$.
C. The rate of rainfall increased between $x = 0$ and $x = 2$.
D. The rate of rainfall was $0$ centimeters per hour between $x = 2$ and $x = 4$.
Answer: D
Domain: Algebra
Explanation: Between $x = 2$ and $x = 4$ the graph is horizontal: the total rainfall stays at $2$ centimeters, so no rain fell and the rate was $0$ centimeters per hour. The rate was $1$ centimeter per hour (constant) between $x = 0$ and $x = 2$, which is greater than the rate between $x = 4$ and $x = 10$, so choices A, B, and C are false.

8. A carpenter charges a flat rate of \$306 for the first $3$ hours of work and \$85 for each additional hour of work. Which equation gives the total amount $y$, in dollars, that the carpenter charges for $x$ hours of work, where $x > 3$?
A. $y = 85x + 51$
B. $y = 306x + 85$
C. $y = 306x + 561$
D. $y = 85x + 306$
Answer: A
Domain: Algebra
Explanation: After the first $3$ hours there are $x - 3$ additional hours, so $y = 306 + 85(x - 3) = 306 + 85x - 255 = 85x + 51$.

9.

| $x$ | $y$ |
|:---:|:---:|
| $-11$ | $-25$ |
| $9$ | $55$ |

The table shows two values of $x$ and their corresponding values of $y$. The graph of the linear equation representing this relationship passes through the point $\left(\dfrac{1}{3}, a\right)$. What is the value of $a$?
Answer: 61/3 | 20.33
Domain: Algebra
Explanation: The slope is $\frac{55 - (-25)}{9 - (-11)} = \frac{80}{20} = 4$, so $y = 4x + b$. Using $(9, 55)$: $55 = 36 + b$, so $b = 19$ and $y = 4x + 19$. At $x = \frac{1}{3}$, $a = \frac{4}{3} + 19 = \frac{61}{3}$, or about $20.33$.

10. Alex engages in up to $3$ types of exercise each week for a total of $9$ hours while training for a triathlon. Alex swims for the same number of minutes each week. The equation $y = 540 - x - 200$ represents the situation where Alex bikes for $x$ minutes during a week and runs for any remaining training time $y$, in minutes. If this equation is graphed in the $xy$-plane, which statement is the best interpretation of the $x$-intercept of the graph?
A. During a week when Alex swims for $340$ minutes, he bikes for $200$ minutes.
B. Each week, Alex bikes and runs for a total of $340$ minutes.
C. During a week when Alex doesn't bike, he runs for $340$ minutes.
D. During a week when Alex doesn't run, he bikes for $340$ minutes.
Answer: D
Domain: Algebra
Explanation: The total training time is $9 \times 60 = 540$ minutes, and Alex swims for $200$ minutes each week. At the $x$-intercept, $y = 0$, so $0 = 540 - x - 200$ and $x = 340$. The point $(340, 0)$ means that during a week when Alex doesn't run ($y = 0$), he bikes for $340$ minutes.

11. The cost of renting a piece of equipment is \$$64n$ for the first day and \$$32n$ for each additional day, where $n$ is a positive integer. Which of the following functions gives the cost $C(x)$, in dollars, of renting this equipment for $x$ days, where $x$ is a positive integer?
A. $C(x) = 32nx + 32n$
B. $C(x) = 32nx + 64n$
C. $C(x) = 64nx + 32n$
D. $C(x) = 64nx - 32n$
Answer: A
Domain: Algebra
Explanation: Renting for $x$ days means the first day plus $x - 1$ additional days, so $C(x) = 64n + 32n(x - 1) = 64n + 32nx - 32n = 32nx + 32n$.

12.

| $x$ | $y$ |
|:---:|:---:|
| $-2s$ | $20$ |
| $-s$ | $16$ |
| $s$ | $8$ |

The table shows three values of $x$ and their corresponding values of $y$, where $s$ is a constant. There is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?
A. $sx + 4y = 12s$
B. $4x + sy = 12s$
C. $4x + sy = 12$
D. $sx + 4y = 12$
Answer: B
Domain: Algebra
Explanation: From $x = -2s$ to $x = -s$, $y$ decreases by $4$, so the slope is $-\frac{4}{s}$. Using $(-s, 16)$: $16 = -\frac{4}{s}(-s) + b = 4 + b$, so $b = 12$ and $y = -\frac{4}{s}x + 12$. Multiplying by $s$ gives $sy = -4x + 12s$, or $4x + sy = 12s$. Check with $(s, 8)$: $4s + 8s = 12s$.

13. For the linear function $p$, $p(c) = -2$, where $c$ is a constant, $p(5) = 34$, and the slope of the graph of $y = p(x)$ in the $xy$-plane is $6$. For the linear function $t$, $t(c) = -4$ and $t(6) = 52$. What is the slope of the graph of $y = t(x)$ in the $xy$-plane?
A. $-1$
B. $4$
C. $6$
D. $8$
Answer: D
Domain: Algebra
Explanation: For $p$, the slope is $\frac{34 - (-2)}{5 - c} = 6$, so $36 = 30 - 6c$ and $c = -1$. Then $t(-1) = -4$ and $t(6) = 52$, so the slope of $t$ is $\frac{52 - (-4)}{6 - (-1)} = \frac{56}{7} = 8$.

14.

![Graph with x from 0 to 5 on the horizontal axis and y from 0 to 10 on the vertical axis. A curve starts at (0, 5), passes through (1, 7.5), and rises more and more slowly toward 10 as x increases to 5.](tests/images/algebra-b/q14.svg)

The graph gives the estimated population $y$, in thousands, of a town $x$ years since 2001, where $0 \le x \le 5$. Which of the following best describes the increase in the estimated population from $x = 0$ to $x = 1$?
A. The estimated population at $x = 1$ is $0.5$ times the estimated population at $x = 0$.
B. The estimated population at $x = 1$ is $1.5$ times the estimated population at $x = 0$.
C. The estimated population at $x = 1$ is $2.5$ times the estimated population at $x = 0$.
D. The estimated population at $x = 1$ is $3.5$ times the estimated population at $x = 0$.
Answer: B
Domain: Advanced Math
Explanation: The graph passes through $(0, 5)$ and $(1, 7.5)$, so the estimated population is $5$ thousand at $x = 0$ and $7.5$ thousand at $x = 1$. Since $\frac{7.5}{5} = 1.5$, the estimated population at $x = 1$ is $1.5$ times the estimated population at $x = 0$.

15. In the $xy$-plane, line $s$ passes through the point $(0, 0)$ and is parallel to the line represented by the equation $y = 25x + 5$. If line $s$ also passes through the point $(2, d)$, what is the value of $d$?
A. $5$
B. $25$
C. $50$
D. $55$
Answer: C
Domain: Algebra
Explanation: Line $s$ is parallel to $y = 25x + 5$, so its slope is $25$, and it passes through the origin, so its equation is $y = 25x$. At $x = 2$, $d = 25(2) = 50$.

16.

$$0.10x + 0.20y = 0.19(x + y)$$

The equation gives a volume $x$, in gallons, of a $10\%$ saltwater solution that could be mixed with a volume $y$, in gallons, of a $20\%$ saltwater solution to produce a $19\%$ saltwater solution. According to this equation, what volume, in gallons, of the $20\%$ saltwater solution could be mixed with $50.0$ gallons of the $10\%$ saltwater solution to produce a $19\%$ saltwater solution? (Assume that the volume of the mixture is the sum of the volumes of the two solutions before they were mixed.)
Answer: 450
Domain: Algebra
Explanation: Substituting $x = 50$ gives $5 + 0.20y = 0.19(50 + y) = 9.5 + 0.19y$. So $0.01y = 4.5$ and $y = 450$ gallons.

17.

![Graph of a line in the xy-plane that crosses the y-axis at (0, 3) and the x-axis at (3, 0). The x-axis is labeled from -4 to 4 and the y-axis from 2 to 8, in steps of 2.](tests/images/algebra-b/q17.svg)

The graph of the linear function $y = f(x) + 13$ is shown. If $c$ and $d$ are positive constants, which equation could define $f$?
A. $f(x) = -d - cx$
B. $f(x) = d - cx$
C. $f(x) = d + cx$
D. $f(x) = -d + cx$
Answer: A
Domain: Algebra
Explanation: The graph passes through $(0, 3)$ and $(3, 0)$, so $f(x) + 13 = -x + 3$ and $f(x) = -x - 10$. This has a negative slope and a negative $y$-intercept, so it has the form $f(x) = -d - cx$ with $c = 1$ and $d = 10$.

18.

$$\begin{gathered} 45x + 33y - 200 = -359 \\[4pt] 2wx + 11y = -53 \end{gathered}$$

In the given system of equations, $w$ is a constant. The system has infinitely many solutions. What is the value of $w$?
Answer: 7.5 | 15/2
Domain: Algebra
Explanation: The first equation is $45x + 33y = -159$. Multiplying the second equation by $3$ gives $6wx + 33y = -159$. The system has infinitely many solutions when the two equations are the same, so $6w = 45$ and $w = 7.5$.

19.

$$\dfrac{1}{9}x - \dfrac{3r}{7}y = 34$$

One of the equations in a system of two linear equations is given, where $r$ is a nonzero constant. The system has no solution. If the other equation in the system is graphed in the $xy$-plane, what is the slope of the graph?
A. $-\dfrac{27r}{7}$
B. $-\dfrac{27}{7r}$
C. $\dfrac{7r}{27}$
D. $\dfrac{7}{27r}$
Answer: D
Domain: Algebra
Explanation: Solving the given equation for $y$: $\frac{3r}{7}y = \frac{1}{9}x - 34$, so $y = \frac{7}{27r}x - \frac{238}{3r}$, and its slope is $\frac{7}{27r}$. A system of two linear equations has no solution when the lines are parallel and distinct, so the other line also has slope $\frac{7}{27r}$.

20. In 2010, a skating team had a total of $35$ skaters, each classified as either advanced or intermediate. From 2010 to 2020, the number of advanced skaters on the team increased by approximately $53\%$, and the number of intermediate skaters on the team increased by approximately $44\%$. The total number of skaters on the team increased by approximately $49\%$. Which equation best represents this situation, where $a$ represents the number of advanced skaters on the team in 2010 and $b$ represents the number of intermediate skaters on the team in 2010?
A. $1.53a + 1.49b = 35(1.44)$
B. $1.49a + 0.53b = 35(1.44)$
C. $1.53a + 1.44b = 35(1.49)$
D. $1.44a + 1.53b = 35(1.49)$
Answer: C
Domain: Algebra
Explanation: In 2020 there were about $1.53a$ advanced skaters and $1.44b$ intermediate skaters, and the total was about $35(1.49)$ skaters. So $1.53a + 1.44b = 35(1.49)$.

21. To purchase a used car at a total price of $11{,}000$ dollars, a one-time down payment is required, and then fixed monthly payments are made for the remaining amount owed for the car. The equation $11{,}000 = 2{,}200 + 200t$ represents this situation, where $t$ is the number of fixed monthly payments that are made. Which of the following is the best interpretation of $200$ in this context?
A. The amount, in dollars, of the down payment
B. The amount, in dollars, of each fixed monthly payment
C. The total amount, in dollars, paid for the car after $t$ fixed monthly payments
D. The total number of fixed monthly payments
Answer: B
Domain: Algebra
Explanation: In $11{,}000 = 2{,}200 + 200t$, $2{,}200$ is the one-time down payment and $200t$ is the amount paid in $t$ monthly payments. So $200$ is the amount, in dollars, of each fixed monthly payment.

22. A family has money in an account for renting movies online. Each time the family rents a movie, the cost of the rental is withdrawn from the account, and each rental costs the same amount of money. The function $f(m) = 21 - 3m$ gives the amount of money, in dollars, in the account after the family has rented $m$ movies. Which of the following represents the amount of money, in dollars, withdrawn from the account each time the family rents a movie?
A. $3m$
B. $3$
C. $21$
D. $21 - 3m$
Answer: B
Domain: Algebra
Explanation: Each additional movie rented decreases $f(m) = 21 - 3m$ by $3$, so $3$ dollars are withdrawn from the account each time the family rents a movie.

23.

| $x$ | $f(x)$ |
|:---:|:---:|
| $-37$ | $4$ |
| $-9$ | $0$ |
| $33$ | $6$ |

The table shows three values of $x$ and their corresponding values of $f(x)$, where $f(x) = \dfrac{kx + 45}{x + 2}$ and $k$ is a constant. What is the value of $k$?
Answer: 5
Domain: Advanced Math
Explanation: Since $f(-9) = 0$, the numerator is $0$ when $x = -9$: $-9k + 45 = 0$, so $k = 5$. The other rows check: $f(33) = \frac{5(33) + 45}{35} = \frac{210}{35} = 6$ and $f(-37) = \frac{-185 + 45}{-35} = 4$.

24.

![Graph with x from 0 to 50 on the horizontal axis and y from 0 to 50 on the vertical axis. A line segment goes from (0, 33) on the y-axis to (33, 0) on the x-axis.](tests/images/algebra-b/q24.svg)

Two students are playing a game. In the first round, Player 1 answers $33$ questions. If an answer is correct, Player 1 earns $1$ point. If an answer is incorrect, Player 2 will earn $1$ point instead. The graph shows $y = f(x)$, where $y$ is the number of points Player 2 will earn when $x$ is the number of points Player 1 earns. Which of the following is the best interpretation of the point $(33, 0)$ in this context?
A. When Player 1 earns $33$ points, Player 2 will earn $33$ points.
B. When Player 1 earns $33$ points, Player 2 will earn $0$ points.
C. When Player 1 earns $0$ points, Player 2 will earn $33$ points.
D. When Player 1 earns $0$ points, Player 2 will earn $0$ points.
Answer: B
Domain: Algebra
Explanation: In the point $(33, 0)$, $x = 33$ is the number of points Player 1 earns and $y = 0$ is the number of points Player 2 earns. So when Player 1 earns $33$ points (answers every question correctly), Player 2 will earn $0$ points.

25. A cooking school is offering a promotion where the first class is free, the second class is half off the regular price, and the remaining classes are regularly priced. If the regular price of a class is \$22.80, which function $f$ gives the total cost, in dollars, of $x$ classes taken using this promotion, where $x \ge 2$?
A. $f(x) = 22.80(x - 1) + 11.40$
B. $f(x) = 22.80(x - 2) + 11.40$
C. $f(x) = 22.80(x - 1) + 11.40(x - 2)$
D. $f(x) = 22.80(x - 2) + 11.40(x - 1)$
Answer: B
Domain: Algebra
Explanation: The first class costs $0$ dollars and the second costs half of $22.80$, or $11.40$ dollars. The remaining $x - 2$ classes cost $22.80$ dollars each. So $f(x) = 22.80(x - 2) + 11.40$.

26. In a scale model of a home, a length of $1$ inch is equivalent to a length of $\dfrac{17}{6}$ feet in the actual home. If a length in the actual home measures $x$ feet, which expression represents the corresponding length, in inches, in the model in terms of $x$?
A. $\dfrac{6x}{(17)(12)}$
B. $\dfrac{17x}{(12)(6)}$
C. $\dfrac{6x}{17}$
D. $\dfrac{17x}{6}$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Each inch in the model represents $\frac{17}{6}$ feet, so $x$ feet are represented by $x \div \frac{17}{6} = \frac{6x}{17}$ inches.

27. For a set of three consecutive integers, the result of subtracting the greatest integer from the sum of the other two integers is $48$. What is the value of the greatest of the three integers?
Answer: 51
Domain: Algebra
Explanation: Let the integers be $n$, $n + 1$, and $n + 2$. Then $n + (n + 1) - (n + 2) = 48$, so $n - 1 = 48$ and $n = 49$. The greatest integer is $49 + 2 = 51$.

28. A club plans to sell tote bags. The club members estimate they will sell $80$ tote bags when the bags are priced at \$9 each. For every price increase of \$1, they estimate they will sell $8$ fewer bags. What is the estimated revenue, in dollars, when the bags are priced at \$12 each? (revenue $=$ price $\times$ number sold)
Answer: 672
Domain: Algebra
Explanation: A price of $12$ dollars is $3$ dollars more than $9$ dollars, so the club estimates it will sell $80 - 3(8) = 56$ bags. The estimated revenue is $12(56) = 672$ dollars.

29. A team of researchers plans to spend no more than $310$ hours in total collecting observation data for two projects. For one of the projects, the team will observe at least $13$ penguins and will spend $5$ hours observing the behavior of each penguin. For the other project, the team will observe at least $16$ seals and will spend $6$ hours observing the behavior of each seal. Based on this plan, what is the maximum number of penguins the team can observe?
Answer: 42
Domain: Algebra
Explanation: If the team observes $p$ penguins and $s$ seals, then $5p + 6s \le 310$. The number of penguins is greatest when the number of seals is least, $s = 16$: $5p + 96 \le 310$, so $p \le 42.8$. The maximum whole number of penguins is $42$.

30. A polygonal chain is a connected series of line segments whose length is defined as the sum of the lengths of the line segments it is made of. A polygonal chain with a length of $33$ centimeters (cm) is extended by adding line segments that each have a length of $8 - r$ cm. Which function $f$ represents the total length, in cm, of the extended polygonal chain after $x$ line segments are added?
A. $f(x) = 33(8 - r) + x$
B. $f(x) = 8x - rx + 33$
C. $f(x) = 8x - r + 33$
D. $f(x) = (41 - r)x$
Answer: B
Domain: Algebra
Explanation: Adding $x$ segments of length $8 - r$ cm adds $(8 - r)x$ cm to the original $33$ cm, so $f(x) = (8 - r)x + 33 = 8x - rx + 33$.

31. A science teacher is preparing the $5$ stations of a science laboratory. Each station will have either Experiment A materials or Experiment B materials, but not both. Experiment A requires $6$ teaspoons of salt, and Experiment B requires $4$ teaspoons of salt. If $x$ is the number of stations that will be set up for Experiment A, and the remaining stations will be set up for Experiment B, which of the following expressions represents the total number of teaspoons of salt required?
A. $5x$
B. $10x$
C. $2x + 20$
D. $10x + 20$
Answer: C
Domain: Algebra
Explanation: There are $x$ stations for Experiment A and $5 - x$ stations for Experiment B, so the total amount of salt is $6x + 4(5 - x) = 6x + 20 - 4x = 2x + 20$ teaspoons.

32. If $x \ge -6$ represents all solutions to the inequality $ax - 27 \le 15$, where $a$ is a constant, what is the value of $a$?
Answer: -7
Domain: Algebra
Explanation: Adding $27$ to both sides gives $ax \le 42$. The solutions are $x \ge -6$, so dividing by $a$ must reverse the inequality; therefore $a < 0$ and the solutions are $x \ge \frac{42}{a}$. So $\frac{42}{a} = -6$, which gives $a = -7$.

33. A salesperson's total earnings consist of a base salary of $x$ dollars per year, plus commission earnings of $11\%$ of the total sales the salesperson makes during the year. This year, the salesperson has a goal for the total earnings to be at least $3$ times and at most $4$ times the base salary. Which of the following inequalities represents all possible values of total sales $s$, in dollars, the salesperson can make this year in order to meet that goal?
A. $2x \le s \le 3x$
B. $\dfrac{2}{0.11}x \le s \le \dfrac{3}{0.11}x$
C. $3x \le s \le 4x$
D. $\dfrac{3}{0.11}x \le s \le \dfrac{4}{0.11}x$
Answer: B
Domain: Algebra
Explanation: The total earnings are $x + 0.11s$, so the goal is $3x \le x + 0.11s \le 4x$. Subtracting $x$ gives $2x \le 0.11s \le 3x$, and dividing by $0.11$ gives $\frac{2}{0.11}x \le s \le \frac{3}{0.11}x$.

34. In a set of four consecutive odd integers, where the integers are ordered from least to greatest, the first integer is represented by $x$. The product of $12$ and the fourth odd integer is at most $26$ less than the sum of the first and third odd integers. Which inequality represents this situation?
A. $12(x + 6) \le x + (x + 4) - 26$
B. $12(x + 6) \ge 26 - \big(x + (x + 4)\big)$
C. $12(x + 4) \le x + (x + 3) - 26$
D. $12(x + 4) \ge 26 - \big(x + (x + 3)\big)$
Answer: A
Domain: Algebra
Explanation: The four consecutive odd integers are $x$, $x + 2$, $x + 4$, and $x + 6$. The product of $12$ and the fourth integer is $12(x + 6)$, and $26$ less than the sum of the first and third integers is $x + (x + 4) - 26$. "At most" means $\le$, so $12(x + 6) \le x + (x + 4) - 26$.

35. According to data provided by the US Department of Energy, the average price per gallon of regular gasoline in the United States from September 1, 2014, to December 1, 2014, is modeled by the function $F$ defined below, where $F(x)$ is the average price per gallon $x$ months after September 1.

$$F(x) = 2.74 - 0.19(x - 3)$$

The constant $2.74$ in this function estimates which of the following?
A. The average monthly decrease in the price per gallon
B. The difference in the average price per gallon from September 1, 2014, to December 1, 2014
C. The average price per gallon on September 1, 2014
D. The average price per gallon on December 1, 2014
Answer: D
Domain: Algebra
Explanation: When $x = 3$, $F(3) = 2.74 - 0.19(0) = 2.74$. Three months after September 1 is December 1, so $2.74$ estimates the average price per gallon on December 1, 2014.

36.

$$c(x - 6) = -7(x + k)$$

In the given equation, $c$ and $k$ are constants. The equation has exactly one solution. Which of the following statements must be true?
A. The value of $c$ cannot be $-7$.
B. The value of $c$ cannot be $-\dfrac{7}{6}$.
C. The value of $k$ cannot be $\dfrac{6}{7}$.
D. The value of $k$ cannot be $-6$.
Answer: A
Domain: Algebra
Explanation: Expanding gives $cx - 6c = -7x - 7k$, so $(c + 7)x = 6c - 7k$. The equation has exactly one solution only when the coefficient of $x$ is not $0$, that is, $c \ne -7$. If $c = -7$, the equation has either no solution or infinitely many solutions.

37.

![Graph in the xy-plane of the lines y = -3x + 5 and y = x - 3, which intersect at (2, -1). The region below both lines is shaded. The x-axis is labeled from -6 to 10 and the y-axis from -6 to 8, in steps of 2.](tests/images/algebra-b/q37.svg)

The graphs of $y = -3x + 5$ and $y = x - 3$ are shown. Point $P$ (not shown) has coordinates $(2, -3)$ and lies in the shaded region. The coordinates of $P$ satisfy which of the following inequalities?

I. $y < -3x + 5$

II. $y > x - 3$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Algebra
Explanation: For $P(2, -3)$: $-3x + 5 = -1$ and $x - 3 = -1$. Inequality I, $-3 < -1$, is true. Inequality II, $-3 > -1$, is false. So the coordinates of $P$ satisfy I only (the shaded region is below both lines).

38. In the $xy$-plane, which of the following does NOT contain any points $(x, y)$ that are solutions to the inequality $-5x < 70y - 75$?
A. The region where $x < 0$ and $y > 0$
B. The region where $x < 0$ and $y < 0$
C. The region where $x > 0$ and $y > 0$
D. The region where $x > 0$ and $y < 0$
Answer: B
Domain: Algebra
Explanation: The inequality is equivalent to $70y > 75 - 5x$. If $x < 0$, then $75 - 5x > 75$, so $70y > 75$ and $y$ must be positive. So no solution has $x < 0$ and $y < 0$. The other regions contain solutions, such as $(-1, 2)$, $(1, 2)$, and $(20, -0.1)$.

39. There is a linear relationship between the mass of an object attached to a vertical spring and the length of the spring extension. The table shows data collected after certain objects were attached to the spring.

| Mass of object | Length of spring extension |
|:---:|:---:|
| $20$ grams | $7$ centimeters |
| $60$ grams | $21$ centimeters |

What is the length of the spring extension, in centimeters, when a $50$-gram object is attached to the spring?
A. $24.5$
B. $35$
C. $14$
D. $17.5$
Answer: D
Domain: Algebra
Explanation: The extension increases by $21 - 7 = 14$ centimeters when the mass increases by $40$ grams, which is $0.35$ centimeter per gram. From $20$ grams to $50$ grams, the extension increases by $0.35(30) = 10.5$ centimeters, so the extension is $7 + 10.5 = 17.5$ centimeters.

40. A freight elevator can hold a maximum weight of $5{,}450$ pounds during one trip. A $190$-pound person needs to deliver several boxes using the freight elevator. Some of these boxes weigh $23$ pounds each, and the others weigh $60$ pounds each. Which inequality represents the possible combinations of the number of $23$-pound boxes, $x$, and the number of $60$-pound boxes, $y$, the person can deliver during one trip if only the person and the boxes are on the freight elevator?
A. $60x + 23y \ge 5{,}450$
B. $23x + 60y \ge 5{,}260$
C. $60x + 23y \le 5{,}450$
D. $23x + 60y \le 5{,}260$
Answer: D
Domain: Algebra
Explanation: The boxes weigh $23x + 60y$ pounds, and together with the person they can weigh at most $5{,}450$ pounds: $23x + 60y + 190 \le 5{,}450$, or $23x + 60y \le 5{,}260$.

41. Each $3.0$-ounce serving of cheddar cheese and each $1.2$-ounce serving of tuna provides about $1$ microgram of vitamin B12. If a total of $3.1$ micrograms of vitamin B12 is consumed from eating $x$ ounces of cheese and $y$ ounces of tuna, which equation best represents this situation?
A. $0.83x + 0.33y = 3.1$
B. $3.0x + 1.2y = 3.1$
C. $1.2x + 3.0y = 3.1$
D. $0.33x + 0.83y = 3.1$
Answer: D
Domain: Algebra
Explanation: Cheese provides $\frac{1}{3.0} \approx 0.33$ microgram per ounce and tuna provides $\frac{1}{1.2} \approx 0.83$ microgram per ounce. So $x$ ounces of cheese and $y$ ounces of tuna provide $0.33x + 0.83y = 3.1$ micrograms.

42. The amount of water $y$, in gallons, in a reservoir $x$ minutes after the reservoir begins to drain using a pump is given by the equation $y = 7{,}200 - 8x$. If the equation is graphed in the $xy$-plane, which of the following is the best interpretation of the $x$-intercept?
A. There are $900$ gallons of water in the reservoir before it begins to drain.
B. The reservoir drains at a rate of $8$ gallons per minute.
C. There are $7{,}200$ gallons of water in the reservoir before it begins to drain.
D. The water will completely drain from the reservoir $900$ minutes after the reservoir begins to drain.
Answer: D
Domain: Algebra
Explanation: At the $x$-intercept, $y = 0$: $0 = 7{,}200 - 8x$, so $x = 900$. The point $(900, 0)$ means that $900$ minutes after the reservoir begins to drain, there are $0$ gallons of water left.

43. A shipment consists of $5$-pound boxes and $10$-pound boxes with a total weight of $360$ pounds. There are $23$ $10$-pound boxes in the shipment. How many $5$-pound boxes are in the shipment?
A. $23$
B. $10$
C. $5$
D. $26$
Answer: D
Domain: Algebra
Explanation: The $10$-pound boxes weigh $23(10) = 230$ pounds, so the $5$-pound boxes weigh $360 - 230 = 130$ pounds. That is $\frac{130}{5} = 26$ boxes.

44. Line $p$ is defined by $2y + 8x = 11$. Line $r$ is perpendicular to line $p$ in the $xy$-plane. What is the slope of line $r$?
A. $-4$
B. $-\dfrac{1}{4}$
C. $\dfrac{1}{4}$
D. $4$
Answer: C
Domain: Algebra
Explanation: Solving for $y$ gives $y = -4x + \frac{11}{2}$, so line $p$ has slope $-4$. A line perpendicular to it has slope $\frac{1}{4}$, the negative reciprocal.

45. Based on a model, on day $1$ of an $8$-day experiment, a lima bean plant had an estimated mass of $253$ grams, and each day after day $1$ of the experiment, the estimated mass of the plant decreased by $4$ grams. Which equation represents this model, where $m$ is the estimated mass, in grams, of the plant on day $x$ of the experiment, and $1 \le x \le 8$?
A. $m = -4x + 245$
B. $m = -4x + 249$
C. $m = -4x + 253$
D. $m = -4x + 257$
Answer: D
Domain: Algebra
Explanation: On day $x$, the mass has decreased by $4$ grams for each of the $x - 1$ days after day $1$, so $m = 253 - 4(x - 1) = -4x + 257$. Check: on day $1$, $m = -4 + 257 = 253$.

46. When several resistors are connected in series in a circuit, the total resistance of the circuit is the sum of the resistances of these resistors. A certain circuit consists of $8$ resistors connected in series, where the resistance of each resistor is positive. This circuit has a total resistance of $130$ ohms. The total resistance of $3$ resistors in this circuit is $90$ ohms. Which inequality best represents all possible values of the resistance $x$, in ohms, of one of the other $5$ resistors in this circuit?
A. $0 < x < 8$
B. $0 < x < 40$
C. $40 < x < 90$
D. $40 < x < 130$
Answer: B
Domain: Algebra
Explanation: The other $5$ resistors have a total resistance of $130 - 90 = 40$ ohms. Each resistance is positive, so one of them is greater than $0$ and less than $40$ ohms (the other $4$ must take up some of the $40$ ohms): $0 < x < 40$.

47. Line $j$ is defined by $4x + 5y = 65$. Line $k$ is parallel to line $j$ in the $xy$-plane. An equation of line $k$ is $32x + ry = 15$, where $r$ is a constant. If line $k$ passes through the point $(0, b)$, what is the value of $b$?
Answer: 0.375 | 3/8
Domain: Algebra
Explanation: Parallel lines have the same slope, so $-\frac{32}{r} = -\frac{4}{5}$, which gives $r = 40$. Line $k$ is $32x + 40y = 15$, and at $x = 0$, $40b = 15$, so $b = \frac{3}{8} = 0.375$.

48. A museum exhibit displays $73$ artifacts on day $1$. On each following day, $3$ artifacts are added to the exhibit. The function $f(x) = 3(x - 1) + 73$ represents this situation, where $f(x)$ is the total number of artifacts exhibited at the end of day $x$. According to the function, what is the number of artifacts that have been added to the exhibit by the end of day $x$?
A. $73$
B. $3x$
C. $3x + 73$
D. $3(x - 1)$
Answer: D
Domain: Algebra
Explanation: The exhibit started with $73$ artifacts on day $1$, and $3$ artifacts were added on each of the $x - 1$ following days. So $3(x - 1)$ artifacts have been added by the end of day $x$.

49. A manager is responsible for ordering supplies for a coffee shop. The shop's inventory starts with $6{,}500$ disposable cups, and the manager estimates that $90$ of these cups are used each day. Based on this estimate, in how many days will the supply of disposable cups reach $2{,}000$?
A. $25$
B. $50$
C. $75$
D. $100$
Answer: B
Domain: Algebra
Explanation: The number of cups after $d$ days is $6{,}500 - 90d$. Setting $6{,}500 - 90d = 2{,}000$ gives $90d = 4{,}500$, so $d = 50$.

50.

| $x$ | $y$ |
|:---:|:---:|
| $-5$ | $91 + 4k$ |
| $5$ | $91$ |
| $10$ | $91 - 2k$ |

The table gives three values of $x$ and their corresponding values of $y$, where $k$ is a positive constant. There is a linear relationship between $x$ and $y$. Which equation represents this relationship?
A. $2kx - 5y = 91 + 2k$
B. $2kx - 5y = 455 + 10k$
C. $2kx + 5y = 91 + 2k$
D. $2kx + 5y = 455 + 10k$
Answer: D
Domain: Algebra
Explanation: From $x = 5$ to $x = 10$, $y$ changes by $-2k$, so the slope is $-\frac{2k}{5}$ (the first two rows give the same slope, $\frac{-4k}{10}$). Using $(5, 91)$: $y - 91 = -\frac{2k}{5}(x - 5)$. Multiplying by $5$ gives $5y - 455 = -2kx + 10k$, or $2kx + 5y = 455 + 10k$.

51. A hotel has rooms with a balcony that cost \$100 per night to rent and rooms without a balcony that cost \$80 per night to rent. On a given night, the hotel received \$6,800 from renting both types of rooms. If a total of $76$ rooms were rented, how many rooms with a balcony were rented on that night?
A. $34$
B. $36$
C. $38$
D. $40$
Answer: B
Domain: Algebra
Explanation: If $b$ rooms with a balcony were rented, then $76 - b$ rooms without a balcony were rented, and $100b + 80(76 - b) = 6{,}800$. So $20b + 6{,}080 = 6{,}800$, $20b = 720$, and $b = 36$.

52. A book publishing company pays the author of a certain book \$3.50 per book for the first $400$ books sold. After the first $400$ books are sold, the payment increases to \$4.75 per book sold. Which function gives the author's total payment $P(b)$, in dollars, in terms of the number of books sold, $b$, where $b > 400$?
A. $P(b) = 3.50(400) + 4.75b$
B. $P(b) = 3.50b + 4.75b$
C. $P(b) = 3.50b + 4.75(b - 400)$
D. $P(b) = 3.50(400) + 4.75(b - 400)$
Answer: D
Domain: Algebra
Explanation: The first $400$ books earn $3.50(400)$ dollars, and each of the remaining $b - 400$ books earns $4.75$ dollars. So $P(b) = 3.50(400) + 4.75(b - 400)$.

53. A group of $10$ gardeners recorded data on the germination rates of their tomato crop for one growing season. The scatterplot shows the relationship between the number of tomato seeds planted, $x$, and the number of tomato seeds that germinated, $y$, for each of the gardeners. A line of best fit is also shown.

![Scatterplot with x from 0 to 500 on the horizontal axis and y from 0 to 500 on the vertical axis, showing 10 data points. A line of best fit passes through (0, 0) and (500, 350).](tests/images/algebra-b/q53.svg)

Which of the following is the best interpretation of the slope of the line of best fit in this context?
A. The number of tomato seeds planted is predicted to increase by $70$ seeds every $100$ days.
B. The number of tomato seeds planted is predicted to increase by $350$ seeds every $100$ days.
C. The number of tomato seeds that germinate is predicted to increase by $70$ seeds for every additional $100$ tomato seeds that are planted.
D. The number of tomato seeds that germinate is predicted to increase by $350$ seeds for every additional $100$ tomato seeds that are planted.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The line of best fit passes through $(0, 0)$ and $(500, 350)$, so its slope is $\frac{350}{500} = 0.7 = \frac{70}{100}$. The slope compares the number of seeds that germinated ($y$) with the number planted ($x$), so the number that germinate is predicted to increase by $70$ for every additional $100$ seeds planted.

54.

$$6x + 3y = 5$$

The given equation is one equation in a system of two linear equations. If the system of equations has at least one solution, which of the following equations could be the other equation in the system?

I. $9x + 4.5y = 7.5$

II. $9x - 4.5y = 7.5$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: C
Domain: Algebra
Explanation: Equation I is $1.5$ times the given equation, so it has the same graph and the system has infinitely many solutions. Equation II has slope $2$, while the given equation has slope $-2$, so the lines intersect in exactly one point. Both systems have at least one solution.

55. The table shows values of $x$ and their corresponding values of $y$ for three points on line $j$ in the $xy$-plane.

| $x$ | $y$ |
|:---:|:---:|
| $0$ | $6$ |
| $1$ | $10$ |
| $2$ | $14$ |

Line $k$ also lies in the $xy$-plane and is defined by the equation $y = 6x$. At what point $(x, y)$ do line $j$ and line $k$ intersect?
A. $(3, 18)$
B. $(3, 22)$
C. $(3, 26)$
D. $(3, 30)$
Answer: A
Domain: Algebra
Explanation: Line $j$ has slope $4$ and $y$-intercept $6$, so it is $y = 4x + 6$. Setting $4x + 6 = 6x$ gives $x = 3$, and $y = 6(3) = 18$. The lines intersect at $(3, 18)$.

56.

$$39(x - n) = 39y + 39n$$

One of the equations in a system of two linear equations is given, where $n$ is a positive constant. The system has no solution. Which equation could be the second equation in this system?
A. $4x - 4y = 8n$
B. $4x + 4y = 4n$
C. $4x + 4y = 8n$
D. $4x - 4y = 4n$
Answer: D
Domain: Algebra
Explanation: Dividing the given equation by $39$ gives $x - n = y + n$, or $x - y = 2n$. The system has no solution when the second line is parallel to this line but different from it. Choice D gives $x - y = n$, which is parallel and different because $n \ne 2n$ for $n > 0$. Choice A is the same line, and choices B and C are not parallel to it.

57. Line $\ell$ in the $xy$-plane has a slope of $-\dfrac{2}{3}$ and passes through the point $(-3, 8)$. Which of the following points also lies on line $\ell$?
A. $(0, 10)$
B. $(6, 2)$
C. $(3, 12)$
D. $(-6, 6)$
Answer: B
Domain: Algebra
Explanation: From $(-3, 8)$ to $(6, 2)$, the slope is $\frac{2 - 8}{6 - (-3)} = \frac{-6}{9} = -\frac{2}{3}$, so $(6, 2)$ lies on line $\ell$. The slopes from $(-3, 8)$ to the points in choices A, C, and D are $\frac{2}{3}$, $\frac{2}{3}$, and $\frac{2}{3}$, so those points are not on line $\ell$.

58.

![The xy-plane with the four quadrants labeled: quadrant I at the upper right, quadrant II at the upper left, quadrant III at the lower left, and quadrant IV at the lower right.](tests/images/algebra-b/q58.svg)

The figure shows the $xy$-plane with the quadrants labeled. The graph of a linear function $h$ (not shown), where $y = h(x)$, is a line completely contained in only quadrants I and II of the $xy$-plane. Which of the following could define the function $h$?
A. $h(x) = 47x + 47$
B. $h(x) = 47x$
C. $h(x) = -47$
D. $h(x) = 47$
Answer: D
Domain: Algebra
Explanation: A line that stays in quadrants I and II must stay above the $x$-axis for every value of $x$, so it cannot rise or fall: it must be a horizontal line with a positive $y$-value. Of the choices, only $h(x) = 47$ is such a line. The lines in choices A and B also pass through quadrant III, and the line in choice C lies in quadrants III and IV.

59.

$$f(x) = 3d(26x + 27) + 18$$

Which of the following represents the $x$-intercept of the graph of $y = f(x) + 6$ in the $xy$-plane, where $d$ is a constant?
A. $(81d + 24, 0)$
B. $\left(\dfrac{-81d - 24}{78d}, 0\right)$
C. $\left(6 - \dfrac{81d + 18}{78d}, 0\right)$
D. $\left(-\dfrac{45}{78d + 6}, 0\right)$
Answer: B
Domain: Algebra
Explanation: $f(x) + 6 = 78dx + 81d + 18 + 6 = 78dx + 81d + 24$. Setting this equal to $0$ gives $78dx = -81d - 24$, so $x = \frac{-81d - 24}{78d}$. The $x$-intercept is $\left(\frac{-81d - 24}{78d}, 0\right)$.

60. At the beginning of an experiment, the temperature of a liquid is $23$ degrees Celsius ($^\circ\text{C}$). During the first $4.0$ minutes of the experiment, the temperature of the liquid increases at an average rate of $6.5^\circ\text{C}$ per minute. Then, the temperature of the liquid increases at a constant rate of $2.2^\circ\text{C}$ per minute. If the temperature of the liquid reaches $61^\circ\text{C}$ $x$ minutes after the beginning of the experiment, where $x > 4.0$, which equation represents this situation?
A. $61 = 2.2x + 49$
B. $61 = 2.2(x - 4.0) + 49$
C. $61 = 2.2(x - 4.0) + 26$
D. $61 = 2.2x + 23$
Answer: B
Domain: Algebra
Explanation: After the first $4.0$ minutes, the temperature is $23 + 6.5(4.0) = 49^\circ\text{C}$. During the next $x - 4.0$ minutes it rises by $2.2(x - 4.0)$ degrees, so $61 = 2.2(x - 4.0) + 49$.

61. In the $xy$-plane, line $r$ passes through the points $(3, 12)$ and $(7, 13)$. Line $s$ passes through the point $(1, 2)$ and is perpendicular to line $r$. An equation of line $s$ is $ax + 7y = c$, where $a$ and $c$ are constants. What is the value of $c$?
Answer: 42
Domain: Algebra
Explanation: The slope of line $r$ is $\frac{13 - 12}{7 - 3} = \frac{1}{4}$, so the slope of line $s$ is $-4$. The slope of $ax + 7y = c$ is $-\frac{a}{7}$, so $-\frac{a}{7} = -4$ and $a = 28$. Substituting $(1, 2)$ into $28x + 7y = c$ gives $c = 28 + 14 = 42$.

62. To win a game show, a contestant needs to score at least $80$ total points from two rounds. Correct responses in the first round are worth $4$ points each, and correct responses in the second round are worth $5$ points each. Which inequality models this situation, where $f$ is the number of correct responses in the first round and $s$ is the number of correct responses in the second round?
A. $f + s \le 80$
B. $4f + 5s \ge 80$
C. $5f + s \ge 80$
D. $5f + 4s \le 80$
Answer: B
Domain: Algebra
Explanation: The contestant earns $4f$ points in the first round and $5s$ points in the second round. Scoring at least $80$ points means $4f + 5s \ge 80$.

63. In the $xy$-plane, lines $k$ and $j$ are perpendicular and intersect at the point $(4, 23)$. Line $j$ passes through the origin, and line $k$ passes through the point $(p, 0)$, where $p$ is a constant. What is the value of $p$?
A. $-128.25$
B. $-127.75$
C. $135.75$
D. $136.25$
Answer: D
Domain: Algebra
Explanation: Line $j$ passes through $(0, 0)$ and $(4, 23)$, so its slope is $\frac{23}{4}$, and line $k$ has slope $-\frac{4}{23}$. Using $(4, 23)$ and $(p, 0)$ on line $k$: $\frac{0 - 23}{p - 4} = -\frac{4}{23}$, so $p - 4 = \frac{529}{4} = 132.25$ and $p = 136.25$.

64. Kai used fabric measuring $4$ yards in length to make each costume for a school play. The relationship between the number of costumes that Kai made, $x$, and the total length of fabric that he purchased, $y$, in yards, is represented by the equation $y - 4x = 5$. What is the best interpretation of $5$ in this context?
A. Kai made $5$ costumes.
B. Kai purchased a total of $5$ yards of fabric.
C. Kai used a total of $5$ yards of fabric to make the costumes.
D. Kai purchased $5$ yards more fabric than he used to make the costumes.
Answer: D
Domain: Algebra
Explanation: Kai used $4x$ yards of fabric to make $x$ costumes and purchased $y$ yards. The equation $y - 4x = 5$ says the fabric purchased minus the fabric used is $5$ yards, so Kai purchased $5$ yards more fabric than he used.

65. Alan drives an average of $100$ miles each week. His car can travel an average of $25$ miles per gallon of gasoline. Alan would like to reduce his weekly expenditure on gasoline by \$5. Assuming gasoline costs \$4 per gallon, which equation can Alan use to determine how many fewer average miles, $m$, he should drive each week?
A. $\dfrac{25}{4}m = 95$
B. $\dfrac{25}{4}m = 5$
C. $\dfrac{4}{25}m = 95$
D. $\dfrac{4}{25}m = 5$
Answer: D
Domain: Algebra
Explanation: Driving $m$ fewer miles saves $\frac{m}{25}$ gallons of gasoline, which costs $4 \cdot \frac{m}{25} = \frac{4}{25}m$ dollars. Alan wants to save $5$ dollars, so $\frac{4}{25}m = 5$.

66. A psychologist set up an experiment to study the tendency of a person to select the first item when presented with a series of items. In the experiment, $300$ people were presented with a set of five pictures arranged in random order. Each person was asked to choose the most appealing picture. Of the first $150$ participants, $36$ chose the first picture in the set. Among the remaining $150$ participants, $p$ people chose the first picture in the set. If more than $20\%$ of all participants chose the first picture in the set, which of the following inequalities best describes the possible values of $p$?
A. $p > 0.20(300 - 36)$, where $p \le 150$
B. $p > 0.20(300 + 36)$, where $p \le 150$
C. $p - 36 > 0.20(300)$, where $p \le 150$
D. $p + 36 > 0.20(300)$, where $p \le 150$
Answer: D
Domain: Algebra
Explanation: In all, $p + 36$ of the $300$ participants chose the first picture. More than $20\%$ of all participants means $p + 36 > 0.20(300)$. Also, $p$ cannot be more than the $150$ remaining participants, so $p \le 150$.

67. Jackson mows lawns in the summer. When Jackson mows a lawn with a fence, he charges \$1.03 per minute. When Jackson mows a lawn without a fence, he charges \$0.56 per minute. Jackson spends a total of $15$ hours mowing lawns with and without a fence in a week and charges a total of \$701.40 for mowing lawns during that week. How many minutes does Jackson spend mowing lawns with a fence during that week?
Answer: 420
Domain: Algebra
Explanation: Fifteen hours is $900$ minutes. If Jackson spends $f$ minutes on lawns with a fence, he spends $900 - f$ minutes on lawns without a fence, and $1.03f + 0.56(900 - f) = 701.40$. So $0.47f + 504 = 701.40$, $0.47f = 197.40$, and $f = 420$.

68.

![Graph in the xy-plane of two lines: a line through the marked points (-4, 5) and (8, 2), and the horizontal line y = 2. Both axes are labeled from -10 to 10, in steps of 2.](tests/images/algebra-b/q68.svg)

The graph of a system of two linear equations is shown. If a new graph of three linear equations is created using the system of equations shown and the equation $x + 4y = -16$, how many solutions $(x, y)$ will the resulting system of three equations have?
A. Zero
B. Exactly one
C. Exactly two
D. Infinitely many
Answer: A
Domain: Algebra
Explanation: The line through $(-4, 5)$ and $(8, 2)$ has slope $\frac{2 - 5}{8 - (-4)} = -\frac{1}{4}$, so it is $y = -\frac{1}{4}x + 4$. The line $x + 4y = -16$ is $y = -\frac{1}{4}x - 4$, which is parallel to it and never meets it. So no point lies on all three lines, and the system of three equations has zero solutions.

69. Hector used a tool called an auger to remove corn from a storage bin at a constant rate. The bin contained $24{,}000$ bushels of corn when Hector began to use the auger. After $5$ hours of using the auger, $19{,}350$ bushels of corn remained in the bin. If the auger continues to remove corn at this rate, what is the total number of hours Hector will have been using the auger when $12{,}840$ bushels of corn remain in the bin?
A. $3$
B. $7$
C. $8$
D. $12$
Answer: D
Domain: Algebra
Explanation: The auger removes $\frac{24{,}000 - 19{,}350}{5} = 930$ bushels per hour. To get down to $12{,}840$ bushels it must remove $24{,}000 - 12{,}840 = 11{,}160$ bushels, which takes $\frac{11{,}160}{930} = 12$ hours.
`
});
