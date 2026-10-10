/*
 * Advanced test: Algebra A (72 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'algebra-a',
  source: String.raw`
---
title: Algebra A
author: tungtks18022
description: 72 harder Algebra questions on linear equations, linear functions, systems of equations and linear inequalities, with an explanation for every question.
category: Algebra
section: advanced
time: 115
---

1.

![Graph of line g in the xy-plane. The line passes through the marked points (-12, 14) and (0, 1). The x-axis is labeled from -12 to 2 and the y-axis from 2 to 14, in steps of 2.](tests/images/algebra-a/q1.svg)

The graph of line $g$ is shown in the $xy$-plane. Line $k$ is defined by $195x + py = w$, where $p$ and $w$ are constants. If line $k$ is graphed in this $xy$-plane, resulting in the graph of a system of two linear equations, the system of two linear equations will have infinitely many solutions. What is the value of $p + w$?
Answer: 360
Domain: Algebra
Explanation: Line $g$ passes through $(-12, 14)$ and $(0, 1)$, so its slope is $\frac{1 - 14}{0 - (-12)} = -\frac{13}{12}$ and its $y$-intercept is $1$. Its equation is $y = -\frac{13}{12}x + 1$, or $13x + 12y = 12$. For infinitely many solutions, line $k$ must be the same line as line $g$. Since $195 = 15(13)$, multiplying $13x + 12y = 12$ by $15$ gives $195x + 180y = 180$. So $p = 180$, $w = 180$, and $p + w = 360$.

2. A beekeeper's initial observation of the population of a certain bee colony was $1{,}100$ bees. The beekeeper set a goal to increase the population to $2{,}600$ bees. The beekeeper uses a model that predicts the population of this bee colony begins at $1{,}100$ and increases by $120$ bees per week in the first two weeks after the initial observation, and then increases by $180$ bees per week until the beekeeper's goal is reached. According to this model, at the end of week $w$ after the initial observation, where $w > 2$, which of the following functions gives the predicted number of bees still needed to reach the beekeeper's goal?
A. $p(w) = 2{,}600 - 180w$
B. $p(w) = 2{,}480 + 180w$
C. $p(w) = 1{,}620 - 180w$
D. $p(w) = -120 + 180w$
Answer: C
Domain: Algebra
Explanation: In the first $2$ weeks the population grows by $2(120) = 240$, to $1{,}340$ bees. After that it grows by $180$ bees per week, so at the end of week $w$ the model predicts $1{,}340 + 180(w - 2) = 980 + 180w$ bees. The number of bees still needed to reach $2{,}600$ is $2{,}600 - (980 + 180w) = 1{,}620 - 180w$.

3. A town with a population of $7{,}000$ is being divided into two voting districts: District X and District Y. The populations of the two districts must differ by no more than $550$ people. Which of the following systems represents all possible values of the population $x$ of District X and the population $y$ of District Y?
A. $\begin{aligned} &x - y \le 550 \\ &x + y = 7{,}000 \end{aligned}$
B. $\begin{aligned} &x - y = 550 \\ &x + y \le 7{,}000 \end{aligned}$
C. $\begin{aligned} &{-550} \le x - y \le 550 \\ &x + y = 7{,}000 \end{aligned}$
D. $\begin{aligned} &{-275} \le x - y \le 275 \\ &x + y = 7{,}000 \end{aligned}$
Answer: C
Domain: Algebra
Explanation: The two districts make up the whole town, so $x + y = 7{,}000$. The populations differ by no more than $550$ people whichever district is larger, so $|x - y| \le 550$, which is equivalent to $-550 \le x - y \le 550$.

4. If $x \ge -6$ represents all solutions to the inequality $ax - 27 \le 15$, where $a$ is a constant, what is the value of $a$?
Answer: -7
Domain: Algebra
Explanation: Adding $27$ to both sides gives $ax \le 42$. The solutions are $x \ge -6$, so dividing by $a$ must reverse the inequality; therefore $a < 0$ and the solutions are $x \ge \frac{42}{a}$. So $\frac{42}{a} = -6$, which gives $a = -7$.

5.

![Graph in the xy-plane of a solid line through the marked points (-7, -10) and (0, -11). The region above the line is shaded. The x-axis is labeled from -10 to 6 and the y-axis from -14 to 2, in steps of 2.](tests/images/algebra-a/q5.svg)

The shaded region shown represents the solutions to $rx + ty \ge -77$, where $r$ and $t$ are constants. What is the value of $r + t$?
A. $8$
B. $6$
C. $-6$
D. $-7$
Answer: A
Domain: Algebra
Explanation: The boundary line passes through $(-7, -10)$ and $(0, -11)$, so its slope is $\frac{-11 - (-10)}{0 - (-7)} = -\frac{1}{7}$ and its equation is $y = -\frac{1}{7}x - 11$, or $x + 7y = -77$. The shaded region is on and above the solid line and contains $(0, 0)$, so it represents $x + 7y \ge -77$ (check: $0 \ge -77$). So $r = 1$, $t = 7$, and $r + t = 8$.

6. In a set of four consecutive odd integers, where the integers are ordered from least to greatest, the first integer is represented by $x$. The product of $28$ and the third odd integer in the set is at most the value of $50$ less than the sum of the first and fourth odd integers in the set. What is the greatest possible value of $x$?
Answer: -7
Domain: Algebra
Explanation: The integers are $x$, $x + 2$, $x + 4$, and $x + 6$. The condition gives $28(x + 4) \le x + (x + 6) - 50$, so $28x + 112 \le 2x - 44$, which gives $26x \le -156$ and $x \le -6$. Since $x$ is odd, the greatest possible value of $x$ is $-7$.

7.

![Graph of line h in the xy-plane. The line passes through the marked points (-5, 0) and (0, -8). The x-axis is labeled from -12 to -2 and the y-axis from -12 to -2, in steps of 2.](tests/images/algebra-a/q7.svg)

The graph of line $h$ is shown in the $xy$-plane. Line $k$ (not shown) is defined by $sx + 40y = t$, where $s$ and $t$ are constants. If line $k$ is graphed in this $xy$-plane, the result is a graph of two linear equations. This system of two linear equations has no solution. Which of the following is NOT a possible value of $t$?
A. $200$
B. $64$
C. $-8$
D. $-320$
Answer: D
Domain: Algebra
Explanation: Line $h$ passes through $(-5, 0)$ and $(0, -8)$, so its slope is $-\frac{8}{5}$ and its equation is $y = -\frac{8}{5}x - 8$, or $8x + 5y = -40$. A system of two linear equations has no solution when the lines are parallel and distinct. Line $k$ has slope $-\frac{s}{40}$, so it is parallel to line $h$ when $s = 64$. Multiplying $8x + 5y = -40$ by $8$ gives $64x + 40y = -320$, so line $k$ is a different line only if $t \ne -320$. Therefore $-320$ is NOT a possible value of $t$.

8.

$$r > 0.07t$$

The given inequality describes the total rainfall $r$, in inches, in a certain area over a period of $t$ hours, where $t \le 4$. Which of the following describes this rainfall?
A. An average rainfall of more than $0.07$ inches per hour
B. An average rainfall of exactly $0.07$ inches per hour
C. A total rainfall of exactly $4$ inches
D. A total rainfall of more than $4$ inches
Answer: A
Domain: Algebra
Explanation: Dividing both sides of $r > 0.07t$ by the positive number $t$ gives $\frac{r}{t} > 0.07$. The total rainfall divided by the number of hours, $\frac{r}{t}$, is the average rainfall per hour, so the average rainfall was more than $0.07$ inches per hour.

9.

![Graph of a line in the xy-plane that crosses the y-axis at (0, -4) and the x-axis at (2, 0). Both axes are labeled from -5 to 5.](tests/images/algebra-a/q9.svg)

The line shown can be represented by the equation $ax + by = 28$, where $a$ and $b$ are constants. Which of the following is true about $a$ and $b$?
A. $a < 0$ and $b < 0$
B. $a < 0$ and $b > 0$
C. $a > 0$ and $b < 0$
D. $a > 0$ and $b > 0$
Answer: C
Domain: Algebra
Explanation: The line passes through $(2, 0)$ and $(0, -4)$, so its slope is $2$ and its equation is $y = 2x - 4$, or $2x - y = 4$. Multiplying both sides by $7$ gives $14x - 7y = 28$, so $a = 14$ and $b = -7$. Therefore $a > 0$ and $b < 0$.

10. Hannah and Wyatt are saving money to purchase a car. Hannah saves $\dfrac{1}{5}$ of her salary each month, and Wyatt saves $\dfrac{2}{7}$ of his salary each month. Together, they save a total of \$3,270 from their monthly salaries each month. If $h$ and $w$ represent Hannah's and Wyatt's monthly salaries, in dollars, respectively, which equation shows the relationship between $h$ and $w$?
A. $h + w = 3{,}270$
B. $h + 2w = 3{,}270$
C. $10h + 7w = 114{,}450$
D. $7h + 10w = 114{,}450$
Answer: D
Domain: Algebra
Explanation: Each month Hannah saves $\frac{1}{5}h$ dollars and Wyatt saves $\frac{2}{7}w$ dollars, so $\frac{1}{5}h + \frac{2}{7}w = 3{,}270$. Multiplying both sides by $35$ gives $7h + 10w = 114{,}450$.

11.

![Graph of line k in the xy-plane. The line passes through the marked points (-2, 2) and (2, -3). Both axes are labeled from -8 to 8, in steps of 2.](tests/images/algebra-a/q11.svg)

Line $k$ is shown in the $xy$-plane. Line $j$ (not shown) is perpendicular to line $k$ and passes through the point $(16, 22)$. What is the $y$-coordinate of the $y$-intercept of line $j$?
A. $-\dfrac{23}{2}$
B. $-\dfrac{1}{2}$
C. $\dfrac{4}{5}$
D. $\dfrac{46}{5}$
Answer: D
Domain: Algebra
Explanation: Line $k$ passes through $(-2, 2)$ and $(2, -3)$, so its slope is $\frac{-3 - 2}{2 - (-2)} = -\frac{5}{4}$. Line $j$ is perpendicular to line $k$, so its slope is $\frac{4}{5}$. Writing line $j$ as $y = \frac{4}{5}x + b$ and substituting $(16, 22)$ gives $22 = \frac{64}{5} + b$, so $b = \frac{110}{5} - \frac{64}{5} = \frac{46}{5}$.

12. A total of $215$ toothpicks of equal length were used to construct two types of figures: triangles and squares. The triangles and squares were constructed so that no two figures had a common side. The equation $3x + 4y = 215$ represents this situation, where $x$ is the number of triangles constructed, and $y$ is the number of squares constructed. What is the best interpretation of $(x, y) = (25, 35)$ in this context?
A. If $25$ triangles were constructed, then $35$ squares were constructed.
B. If $25$ triangles were constructed, then $35$ toothpicks were used.
C. If $35$ triangles were constructed, then $25$ squares were constructed.
D. If $35$ triangles were constructed, then $25$ toothpicks were used.
Answer: A
Domain: Algebra
Explanation: In $3x + 4y = 215$, $x$ is the number of triangles and $y$ is the number of squares. The pair $(25, 35)$ satisfies the equation because $3(25) + 4(35) = 75 + 140 = 215$. It means that if $25$ triangles were constructed, then $35$ squares were constructed.

13.

$$\begin{gathered} 50x + 49y = c \\[4pt] 49x - 50y = c \end{gathered}$$

In the given system of equations, $c$ is a positive constant. Which of the following could be the point where the graphs of the equations in this system intersect in the $xy$-plane?
A. $\left(10, -\dfrac{10}{99}\right)$
B. $(10, 990)$
C. $\left(c, \dfrac{c}{99}\right)$
D. $(c, 0)$
Answer: A
Domain: Algebra
Explanation: Subtracting the second equation from the first gives $x + 99y = 0$, so the intersection point satisfies $x = -99y$. Only choice A satisfies this: $-99\left(-\frac{10}{99}\right) = 10$. For this point, $c = 50(10) + 49\left(-\frac{10}{99}\right) = \frac{49{,}010}{99}$, which is positive, and the second equation gives the same value. Choices C and D would require $c = -c$ and $c = 0$, which is impossible for a positive $c$.

14. As part of a science experiment on evaporation, Ella measured the height of water in a glass over a period of time. The function $f(x) = 36 - 0.17x$ gives the estimated height, in centimeters (cm), of the water in the glass $x$ days after the start of the experiment. Which of the following is the best interpretation of $36$ in this context?
A. The estimated height, in cm, of the water at the start of the experiment
B. The estimated height, in cm, of the water at the end of the experiment
C. The estimated change in the height, in cm, of the water each day
D. The estimated number of days for all the water to evaporate
Answer: A
Domain: Algebra
Explanation: At the start of the experiment, $x = 0$ and $f(0) = 36 - 0.17(0) = 36$. So $36$ is the estimated height, in cm, of the water at the start of the experiment.

15.

| $x$ | $y$ |
|:---:|:---:|
| $-34$ | $t$ |
| $-17$ | $t + 28$ |
| $0$ | $t + 56$ |

For a linear relationship between $x$ and $y$, the table gives three values of $x$ and their corresponding values of $y$, where $t$ is a constant. Which equation represents this relationship?
A. $y = -2x + t + 28$
B. $y = 2x + t + 28$
C. $y = \dfrac{28}{17}x + t + 56$
D. $y = -\dfrac{28}{17}x + t + 56$
Answer: C
Domain: Algebra
Explanation: Each time $x$ increases by $17$, $y$ increases by $28$, so the slope is $\frac{28}{17}$. When $x = 0$, $y = t + 56$, so the $y$-intercept is $t + 56$. The equation is $y = \frac{28}{17}x + t + 56$.

16. On January 1, 2000, the population of a town was $26{,}255$, and on January 1, 2010, the population was $26{,}956$. The equation $10x + 26{,}255 = 26{,}956$ describes this situation. Which of the following is the best interpretation of $x$ in this context?
A. The total increase in population between 2000 and 2010
B. The average increase per year in the population between 2000 and 2010
C. The percentage by which the population of the town increased each year between 2000 and 2010
D. The projected population of the town 10 years after 2010
Answer: B
Domain: Algebra
Explanation: Subtracting $26{,}255$ from both sides gives $10x = 701$, the total increase over the $10$ years. So $x = 70.1$ is the total increase divided by $10$, which is the average increase per year in the population between 2000 and 2010.

17.

$$\begin{gathered} y < x \\[4pt] y > -4x - 9 \end{gathered}$$

For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given system of inequalities?
A. $\begin{array}{|c|c|} \hline x & y \\ \hline 5 & 4 \\ \hline 6 & 5 \\ \hline 7 & 6 \\ \hline \end{array}$
B. $\begin{array}{|c|c|} \hline x & y \\ \hline -12 & -5 \\ \hline -11 & -6 \\ \hline -10 & -7 \\ \hline \end{array}$
C. $\begin{array}{|c|c|} \hline x & y \\ \hline -12 & -13 \\ \hline -11 & -12 \\ \hline -10 & -11 \\ \hline \end{array}$
D. $\begin{array}{|c|c|} \hline x & y \\ \hline 5 & 10 \\ \hline 6 & 9 \\ \hline 7 & 8 \\ \hline \end{array}$
Answer: A
Domain: Algebra
Explanation: Every point in choice A satisfies both inequalities. For example, for $(5, 4)$: $4 < 5$ and $4 > -4(5) - 9 = -29$; the points $(6, 5)$ and $(7, 6)$ work the same way. In choice B, $-5 < -12$ is false. In choice C, $-13 > -4(-12) - 9 = 39$ is false. In choice D, $10 < 5$ is false.

18. A number $x$ is less than $8$ more than $\dfrac{1}{2}$ times the value of a number $y$. If $y$ is an integer and $x = 17$, what is the least possible value of $y$?
Answer: 19
Domain: Algebra
Explanation: The statement means $x < 8 + \frac{1}{2}y$. Substituting $x = 17$ gives $17 < 8 + \frac{1}{2}y$, so $9 < \frac{1}{2}y$ and $y > 18$. The least integer greater than $18$ is $19$.

19. In a set of three consecutive integers, where the integers are ordered from least to greatest, the first integer is represented by $x$. The sum of $4$ and the second integer is less than the product of $17$ and the third integer. Which inequality represents this situation?
A. $4 + (x + 1) > 17(x + 2)$
B. $4 + (x + 1) < 17(x + 2)$
C. $4 + (x + 2) > 17(x + 3)$
D. $4 + (x + 2) < 17(x + 3)$
Answer: B
Domain: Algebra
Explanation: The integers are $x$, $x + 1$, and $x + 2$. The sum of $4$ and the second integer is $4 + (x + 1)$, and the product of $17$ and the third integer is $17(x + 2)$. The sum is less than the product, so $4 + (x + 1) < 17(x + 2)$.

20.

| $x$ | $f(x)$ |
|:---:|:---:|
| $-39$ | $8$ |
| $-7$ | $0$ |
| $33$ | $10$ |

The table shows three values of $x$ and their corresponding values of $f(x)$, where $f(x) = \dfrac{kx + 63}{x + 3}$ and $k$ is a constant. What is the value of $k$?
Answer: 9
Domain: Advanced Math
Explanation: Since $f(-7) = 0$, the numerator is $0$ when $x = -7$: $-7k + 63 = 0$, so $k = 9$. The other rows check: $f(33) = \frac{9(33) + 63}{36} = \frac{360}{36} = 10$ and $f(-39) = \frac{-351 + 63}{-36} = 8$.

21. During a specific $2$-hour period of the day, the mean photosynthetic rate, $P(x)$, of a plant species increases at a constant rate in terms of the photochemical energy available, $x$. During this period, $P(300) = 9.8$, and the mean photosynthetic rate increases by $0.13$ micromoles per square meter per second ($\mu\text{mol} \cdot \text{m}^{-2} \cdot \text{s}^{-1}$) when the photochemical energy available increases by $5$ $\mu\text{mol} \cdot \text{m}^{-2} \cdot \text{s}^{-1}$. Which equation gives the mean photosynthetic rate, in $\mu\text{mol} \cdot \text{m}^{-2} \cdot \text{s}^{-1}$, in terms of the photochemical energy available, in $\mu\text{mol} \cdot \text{m}^{-2} \cdot \text{s}^{-1}$, during this period?
A. $P(x) = 0.026x + 9.8$
B. $P(x) = 0.026x + 2$
C. $P(x) = 9.8x + 0.026$
D. $P(x) = 9.8x - 2{,}930.2$
Answer: B
Domain: Algebra
Explanation: The rate increases by $0.13$ for each increase of $5$ in $x$, so the slope is $\frac{0.13}{5} = 0.026$. Using $P(300) = 9.8$: $P(x) = 0.026(x - 300) + 9.8 = 0.026x - 7.8 + 9.8 = 0.026x + 2$.

22. A certain product costs a company \$65 to make. The product is sold by a salesperson who earns a commission that is equal to $20\%$ of the sales price of the product. The profit the company makes for each unit is equal to the sales price minus the combined cost of making the product and the commission. If the sales price of the product is \$100, which of the following equations gives the number of units, $u$, of the product the company sold to make a profit of \$6,840?
A. $\big(100(1 - 0.2) - 65\big)u = 6{,}840$
B. $(100 - 65)(1 - 0.8)u = 6{,}840$
C. $0.8(100) - 65u = 6{,}840$
D. $\big(0.2(100) + 65\big)u = 6{,}840$
Answer: A
Domain: Algebra
Explanation: The commission is $0.2(100)$ dollars, so the profit for each unit is $100 - 65 - 0.2(100) = 100(1 - 0.2) - 65 = 15$ dollars. For $u$ units the profit is $\big(100(1 - 0.2) - 65\big)u$, so the equation is $\big(100(1 - 0.2) - 65\big)u = 6{,}840$.

23.

| $x$ | $g(x)$ |
|:---:|:---:|
| $4$ | $9$ |
| $2$ | $0$ |

The table gives two values of $x$ and their corresponding values of $g(x)$, where $g(x) = \dfrac{f(x) + 5}{x + 8}$ and $f$ is a linear function. What is the $y$-coordinate of the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?
Answer: -113
Domain: Algebra
Explanation: Since $g(4) = 9$, $\frac{f(4) + 5}{12} = 9$, so $f(4) = 103$. Since $g(2) = 0$, $f(2) + 5 = 0$, so $f(2) = -5$. The slope of $f$ is $\frac{103 - (-5)}{4 - 2} = 54$, so $f(0) = f(2) - 2(54) = -5 - 108 = -113$.

24.

| $x$ | $y$ |
|:---:|:---:|
| $k$ | $13$ |
| $k + 7$ | $-15$ |

The table gives the coordinates of two points on a line in the $xy$-plane. The $y$-intercept of the line is $(k - 5, b)$, where $k$ and $b$ are constants. What is the value of $b$?
Answer: 33
Domain: Algebra
Explanation: The slope of the line is $\frac{-15 - 13}{(k + 7) - k} = -4$. A $y$-intercept has an $x$-coordinate of $0$, so $k - 5 = 0$ and $k = 5$. The line passes through $(5, 13)$ with slope $-4$, so at $x = 0$, $y = 13 + 4(5) = 33$. Therefore $b = 33$.

25. A shipping service restricts the dimensions of the boxes it will ship for a certain type of service. The restriction states that for boxes shaped like rectangular prisms, the sum of the perimeter of the base of the box and the height of the box cannot exceed $130$ inches. The perimeter of the base is determined using the width and length of the box. If a box has a height of $60$ inches and its length is $2.5$ times the width, which inequality shows the allowable width $x$, in inches, of the box?
A. $0 < x \le 10$
B. $0 < x \le 11\frac{2}{3}$
C. $0 < x \le 17\frac{1}{2}$
D. $0 < x \le 20$
Answer: A
Domain: Algebra
Explanation: The length is $2.5x$, so the perimeter of the base is $2(x + 2.5x) = 7x$. The restriction gives $7x + 60 \le 130$, so $7x \le 70$ and $x \le 10$. The width must also be positive, so $0 < x \le 10$.

26.

**Energy per Gram of Typical Macronutrients**

| Macronutrient | Food calories | Kilojoules |
|:---:|:---:|:---:|
| Protein | $4.0$ | $16.7$ |
| Fat | $9.0$ | $37.7$ |
| Carbohydrate | $4.0$ | $16.7$ |

The table above gives the typical amounts of energy per gram, expressed in both food calories and kilojoules, of the three macronutrients in food. If the $180$ food calories in a granola bar come entirely from $p$ grams of protein, $f$ grams of fat, and $c$ grams of carbohydrate, which of the following expresses $f$ in terms of $p$ and $c$?
A. $f = 20 + \dfrac{4}{9}(p + c)$
B. $f = 20 - \dfrac{4}{9}(p + c)$
C. $f = 20 - \dfrac{4}{9}(p - c)$
D. $f = 20 + \dfrac{9}{4}(p - c)$
Answer: B
Domain: Algebra
Explanation: Protein and carbohydrate each give $4.0$ food calories per gram and fat gives $9.0$, so $4p + 9f + 4c = 180$. Then $9f = 180 - 4(p + c)$, so $f = 20 - \frac{4}{9}(p + c)$.

27.

$$\begin{gathered} ax - by = 72 \\[4pt] 2ax - 8y = 48 \end{gathered}$$

In the given system of equations, $a$ and $b$ are constants. The graphs of these equations in the $xy$-plane intersect at the point $(x, 6)$. What is the value of $b$?
A. $-8$
B. $-4$
C. $4$
D. $6$
Answer: B
Domain: Algebra
Explanation: Substituting $y = 6$ gives $ax - 6b = 72$ and $2ax - 48 = 48$. The second equation gives $2ax = 96$, so $ax = 48$. Then $48 - 6b = 72$, so $-6b = 24$ and $b = -4$.

28.

![Graph with Time (hours) on the horizontal axis from 0 to 8 and Distance (miles) on the vertical axis from 0 to 80. Line segments connect (0, 0) to (1, 60), (1, 60) to (5, 60), and (5, 60) to (6, 0).](tests/images/algebra-a/q28.svg)

Quinidra drove her car on a straight road to a certain location. The graph models Quinidra's distance, in miles, from her home as a function of time, in hours. Which of the following could the model describe?
A. Quinidra drove away from her home at a constant speed for $1$ hour, spent $4$ hours at the location, then continued to drive away from her home at a constant speed for $1$ hour.
B. Quinidra drove away from her home at a constant speed for $1$ hour, spent $4$ hours at the location, then drove back to her home at a constant speed for $1$ hour.
C. Quinidra drove away from her home at an increasing speed for $1$ hour, spent $4$ hours at the location, then drove back to her home at a decreasing speed for $1$ hour.
D. Quinidra drove away from her home at an increasing speed for $1$ hour, drove at a constant speed for $4$ hours, then drove back to her home at a decreasing speed for $1$ hour.
Answer: B
Domain: Algebra
Explanation: From $0$ to $1$ hour, the distance from home increases along a straight segment to $60$ miles, so she drove away from home at a constant speed for $1$ hour. From $1$ to $5$ hours, the distance stays at $60$ miles, so she spent $4$ hours at the location. From $5$ to $6$ hours, the distance decreases along a straight segment to $0$, so she drove back home at a constant speed for $1$ hour.

29.

![Graph with GC content (%) on the horizontal axis from 0 to 100 and Melting temperature (degrees Celsius) on the vertical axis from 60 to 110, with a break in the vertical axis between 0 and 60. A line goes from (0, 64) to (105, 106).](tests/images/algebra-a/q29.svg)

The function $t$ gives the estimated melting temperature, in degrees Celsius, of a DNA molecule as a function of the percent of guanine-cytosine (GC) content, $x$, in the DNA molecule. The graph of $y = t(x)$ is shown. According to the graph, which of the following statements is NOT true?
A. For each increase of $x$ by $1$, $t(x)$ increases by approximately $\dfrac{2}{5}$.
B. A DNA molecule with a GC content of $0\%$ has an estimated melting temperature between $60^\circ\text{C}$ and $65^\circ\text{C}$.
C. A DNA molecule with a GC content of $95\%$ has an estimated melting temperature between $100^\circ\text{C}$ and $105^\circ\text{C}$.
D. A DNA molecule with a GC content of $98\%$ has an estimated melting temperature between $80^\circ\text{C}$ and $90^\circ\text{C}$.
Answer: D
Domain: Algebra
Explanation: The line passes through about $(0, 64)$ and $(100, 104)$, so its slope is about $\frac{40}{100} = \frac{2}{5}$ (choice A is true) and $t(0) \approx 64$ (choice B is true). For $x = 95$, $t(x) \approx 64 + 0.4(95) = 102$ (choice C is true). For $x = 98$, $t(x) \approx 64 + 0.4(98) \approx 103$, which is not between $80^\circ\text{C}$ and $90^\circ\text{C}$, so choice D is NOT true.

30.

![Graph of a line in the xy-plane through the marked points (-2, -3) and (0, 9). Both axes are labeled from -10 to 10, in steps of 2.](tests/images/algebra-a/q30.svg)

The graph shows a linear relationship between $x$ and $y$. Which equation represents this relationship, where $R$ is a positive constant?
A. $Rx + 12y = 18$
B. $Rx - 12y = -18$
C. $12x + Ry = 18$
D. $12x - Ry = -18$
Answer: D
Domain: Algebra
Explanation: The line passes through $(0, 9)$ and $(-2, -3)$, so its slope is $\frac{9 - (-3)}{0 - (-2)} = 6$ and its equation is $y = 6x + 9$. Solving choice D for $y$ gives $y = \frac{12}{R}x + \frac{18}{R}$, which is $y = 6x + 9$ when $R = 2$. Choices A and B have a $y$-intercept of $\frac{3}{2}$, and choice C has a negative slope for every positive $R$.

31. A line segment that has a length of $113$ centimeters (cm) is divided into three parts. One part is $47$ cm long. The other two parts have lengths that are equal to each other. What is the length, in cm, of one of the other two parts of equal length?
Answer: 33
Domain: Algebra
Explanation: If each of the two equal parts is $x$ cm long, then $2x + 47 = 113$. So $2x = 66$ and $x = 33$.

32. For a particular car, the linear function $f$ gives the predicted power, in brake horsepower (bhp), for engine speeds between $1{,}000$ revolutions per minute (rpm) and $6{,}000$ rpm. According to this function, the car's predicted power is $228$ bhp at an engine speed of $1{,}896$ rpm and $600$ bhp at an engine speed of $4{,}500$ rpm. The equation $f(x) = \dfrac{1}{7}(x - a) + 228$ defines $f$, where $x$ is the engine speed, in rpm, and $a$ is a constant. What is the value of $a$?
Answer: 1896
Domain: Algebra
Explanation: Since $f(1{,}896) = 228$, $\frac{1}{7}(1{,}896 - a) + 228 = 228$, so $1{,}896 - a = 0$ and $a = 1{,}896$. Check: $f(4{,}500) = \frac{4{,}500 - 1{,}896}{7} + 228 = 372 + 228 = 600$.

33. A partially filled container containing $24$ milliliters of water is placed under a leaky faucet that produces one $0.03$-milliliter drop of water every $3$ seconds. Until the container is full, which of the following can be used to represent the volume $v$, in milliliters, of water in the container $t$ seconds after it is placed under the faucet, where $t$ is a multiple of $3$?
A. $v = 0.01t + 24$
B. $v = 0.03t + 24$
C. $v = 0.09t + 24$
D. $v = 3t$
Answer: A
Domain: Algebra
Explanation: The faucet adds $0.03$ milliliter every $3$ seconds, which is $0.01$ milliliter per second. After $t$ seconds it has added $0.01t$ milliliters to the $24$ milliliters already in the container, so $v = 0.01t + 24$.

34.

$$a(7x - 14) + 5a = 7(ax - 2a) - 35$$

In the given equation, $a$ is a constant. The equation has infinitely many solutions. What are all possible values of $a$?
A. $0$ only
B. $-7$ only
C. Any real number
D. No real number
Answer: B
Domain: Algebra
Explanation: The left side is $7ax - 14a + 5a = 7ax - 9a$ and the right side is $7ax - 14a - 35$. The $x$-terms are the same, so the equation has infinitely many solutions only if the constants are equal: $-9a = -14a - 35$. This gives $5a = -35$, so $a = -7$ only.

35.

| $x$ | $y$ |
|:---:|:---:|
| $-2$ | $19$ |
| $0$ | $31$ |
| $2$ | $43$ |

The table shows three values of $x$ and their corresponding values of $y$. The linear relationship between $x$ and $y$ can be represented by an equation written in the form $Ax + By = C$, where $A$, $B$, and $C$ are constants. What is the value of $\dfrac{A}{B}$?
Answer: -6
Domain: Algebra
Explanation: As $x$ increases by $2$, $y$ increases by $12$, so the slope is $6$, and the $y$-intercept is $31$. So $y = 6x + 31$, or $6x - y = -31$. Here $A = 6$ and $B = -1$, so $\frac{A}{B} = -6$. Any equivalent form, such as $-12x + 2y = 62$, gives the same ratio.

36.

$$\dfrac{12x + 28}{4} - \dfrac{s}{13} = r(x - 8)$$

In the given equation, $s$ and $r$ are constants, and $s > 0$. If the equation has infinitely many solutions, what is the value of $s$?
Answer: 403
Domain: Algebra
Explanation: The left side is $3x + 7 - \frac{s}{13}$ and the right side is $rx - 8r$. For infinitely many solutions, the coefficients of $x$ must be equal, so $r = 3$, and the constants must be equal: $7 - \frac{s}{13} = -24$. So $\frac{s}{13} = 31$ and $s = 403$.

37. A park rents beach umbrellas to visitors. The park earns revenue of \$16 for each beach umbrella they rent for the day. On Wednesday, the park earned \$400 in profit from renting beach umbrellas after paying daily expenses of \$144. How many beach umbrellas did the park rent on Wednesday? (profit $=$ total revenue $-$ total expenses)
A. $16$
B. $25$
C. $32$
D. $34$
Answer: D
Domain: Algebra
Explanation: If the park rented $n$ umbrellas, then $16n - 144 = 400$. So $16n = 544$ and $n = 34$.

38. The functions $f$ and $g$ are defined as $f(x) = \dfrac{1}{5}x - 9$ and $g(x) = \dfrac{4}{5}x + 27$. If the function $h$ is defined as $h(x) = f(x) + g(x)$, what is the $x$-intercept of the graph of $y = h(x)$ in the $xy$-plane?
A. $\left(-\dfrac{135}{4}, 0\right)$
B. $(-18, 0)$
C. $\left(\dfrac{45}{4}, 0\right)$
D. $(18, 0)$
Answer: B
Domain: Algebra
Explanation: $h(x) = \left(\frac{1}{5}x - 9\right) + \left(\frac{4}{5}x + 27\right) = x + 18$. Setting $h(x) = 0$ gives $x = -18$, so the $x$-intercept is $(-18, 0)$.

39. A set designer is hammering nails along the top edge of a wall with a length of $3x$ feet, where $x$ is an integer, that will be used to hang garland. The designer hammers the first nail at the left edge of the wall. The designer then hammers an additional nail every $\dfrac{3}{8}$ feet along the entire length of the wall, starting from the first nail and with the last nail being hammered at the right edge of the wall. Which equation best represents this situation, where $y$ is the number of nails the designer hammers along the entire length of the wall?
A. $y = \dfrac{3}{8}x$
B. $y = \dfrac{3}{8}x + 1$
C. $y = 8x$
D. $y = 8x + 1$
Answer: D
Domain: Algebra
Explanation: The nails divide the wall into equal spaces of $\frac{3}{8}$ foot, so there are $3x \div \frac{3}{8} = 8x$ spaces. There is a nail at both ends, so there is one more nail than spaces: $y = 8x + 1$.

40. For groups of $25$ or more people, a museum charges \$22 per person for the first $25$ people and \$14 for each additional person. Which function $f$ gives the total charge, in dollars, for a tour group with $n$ people, where $n \ge 25$?
A. $f(n) = 14n + 200$
B. $f(n) = 14n + 22$
C. $f(n) = 14n + 550$
D. $f(n) = 36n - 350$
Answer: A
Domain: Algebra
Explanation: The first $25$ people cost $25(22) = 550$ dollars, and each of the other $n - 25$ people costs $14$ dollars. So $f(n) = 550 + 14(n - 25) = 14n + 200$.

41.

$$\begin{gathered} \dfrac{x - 18}{6} + \dfrac{y + 25}{3} = -5 \\[6pt] \dfrac{x - 18}{3} - \dfrac{y + 25}{6} = 5 \end{gathered}$$

The solution to the given system of equations is $(x, y)$. What is the value of $x - y$?
Answer: 67
Domain: Algebra
Explanation: Let $u = x - 18$ and $v = y + 25$. Multiplying both equations by $6$ gives $u + 2v = -30$ and $2u - v = 30$. From the second equation, $v = 2u - 30$, so $u + 4u - 60 = -30$, which gives $u = 6$ and $v = -18$. So $x = 24$, $y = -43$, and $x - y = 24 - (-43) = 67$.

42. The function $g$ is defined by $g(x) = \dfrac{1}{m}x + 21$, where $m$ is an integer constant and $14 \le m \le 17$. For the graph of $y = g(x) - 9$ in the $xy$-plane, what is the $x$-coordinate of a possible $x$-intercept?
Answer: -168 | -180 | -192 | -204
Domain: Algebra
Explanation: $g(x) - 9 = \frac{1}{m}x + 12$. Setting this equal to $0$ gives $x = -12m$. For $m = 14$, $15$, $16$, or $17$, the $x$-coordinate of the $x$-intercept is $-168$, $-180$, $-192$, or $-204$; any one of these is correct.

43.

$$x(r - 7) + 3 = 19x + 25$$

In the given equation, $r$ is a positive integer. If the given equation has exactly one solution, what CANNOT be the value of $r$?
A. $3$
B. $7$
C. $22$
D. $26$
Answer: D
Domain: Algebra
Explanation: Rewriting gives $(r - 7)x - 19x = 22$, or $(r - 26)x = 22$. The equation has exactly one solution when $r - 26 \ne 0$. If $r = 26$, the equation becomes $0 = 22$, which has no solution. So $r$ cannot be $26$.

44. A circle in the $xy$-plane has its center at $(-2, -4)$. Line $k$ is tangent to this circle at the point $(-5, -5)$. What is the slope of line $k$?
A. $-3$
B. $-\dfrac{1}{3}$
C. $\dfrac{1}{3}$
D. $3$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The radius from the center $(-2, -4)$ to the point of tangency $(-5, -5)$ has slope $\frac{-5 - (-4)}{-5 - (-2)} = \frac{1}{3}$. A tangent line is perpendicular to the radius at the point of tangency, so the slope of line $k$ is $-3$.

45.

$$\begin{gathered} 3x + 5y = 8 \\[4pt] 9x + 15y = 24 \end{gathered}$$

For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system?
A. $\left(r, -\dfrac{5r}{3} + \dfrac{8}{3}\right)$
B. $\left(r, \dfrac{3r}{5} + \dfrac{8}{5}\right)$
C. $\left(-\dfrac{5r}{3} + \dfrac{8}{3}, r\right)$
D. $\left(\dfrac{r}{3} + 8, -\dfrac{r}{3} + 24\right)$
Answer: C
Domain: Algebra
Explanation: The second equation is $3$ times the first, so both equations have the same graph, $3x + 5y = 8$. If $y = r$, then $3x = 8 - 5r$ and $x = -\frac{5r}{3} + \frac{8}{3}$. So the point $\left(-\frac{5r}{3} + \frac{8}{3}, r\right)$ lies on the graph of each equation for every real number $r$.

46.

![Graph with Number of M-type stars, x, on the horizontal axis and Number of K-type stars, y, on the vertical axis, both from 0 to 160. A line segment goes from (0, 136) on the y-axis to (160, 0) on the x-axis.](tests/images/algebra-a/q46.svg)

A certain open star cluster contains M-type stars and K-type stars. The estimated total mass of M-type and K-type stars in this open star cluster is $132{,}778$ quettagrams. The graph shown models the possible combinations of the number of M-type stars, $x$, and K-type stars, $y$, that could be in this open star cluster if all the M-type stars have the same estimated mass and all the K-type stars have the same estimated mass. Based on the graph, which of the following is closest to the estimated mass, in quettagrams, of each M-type star in this cluster?
A. $828$
B. $973$
C. $52{,}992$
D. $79{,}786$
Answer: A
Domain: Algebra
Explanation: If each M-type star has mass $m$ and each K-type star has mass $k$, the line is $mx + ky = 132{,}778$. The $x$-intercept is about $(160, 0)$: with no K-type stars, there are about $160$ M-type stars. So $160m \approx 132{,}778$ and $m \approx 830$. The closest choice is $828$.

47. The shaded region shown represents the solutions to the inequality $-18y < c$, where $c$ is a constant. What is the value of $c$?

![Graph in the xy-plane of a dashed horizontal line at y = -9. The region above the dashed line is shaded. The x-axis is labeled from -6 to 6 and the y-axis from -10 to 2, in steps of 2.](tests/images/algebra-a/q47.svg)

A. $162$
B. $9$
C. $-9$
D. $-162$
Answer: A
Domain: Algebra
Explanation: The boundary is the dashed line $y = -9$ and the region above it is shaded, so the solutions are $y > -9$. Dividing $-18y < c$ by $-18$ reverses the inequality: $y > -\frac{c}{18}$. So $-\frac{c}{18} = -9$ and $c = 162$.

48.

| $x$ | $g(x)$ |
|:---:|:---:|
| $-24$ | $3$ |
| $-9$ | $0$ |
| $16$ | $5$ |

The table shows three values of $x$ and their corresponding values of $g(x)$, where $g(x) = \dfrac{f(x)}{x + 4}$ and $f$ is a linear function. What is the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?
A. $(0, 36)$
B. $(0, 9)$
C. $(0, 4)$
D. $(0, -9)$
Answer: A
Domain: Algebra
Explanation: Since $g(-9) = 0$, $f(-9) = 0$. Since $g(16) = 5$, $f(16) = 5(20) = 100$. The slope of $f$ is $\frac{100 - 0}{16 - (-9)} = 4$, so $f(x) = 4(x + 9) = 4x + 36$. Check: $g(-24) = \frac{4(-24) + 36}{-20} = 3$. The $y$-intercept is $(0, 36)$.

49.

| $x$ | $y$ |
|:---:|:---:|
| $-4$ | $n + 142$ |
| $-2$ | $n + 71$ |
| $0$ | $n$ |

The table shows three values of $x$ and their corresponding values of $y$, where $n$ is a constant, for the linear relationship between $x$ and $y$. What is the slope of the line that represents this relationship in the $xy$-plane?
A. $-\dfrac{71}{2}$
B. $-\dfrac{2}{71}$
C. $\dfrac{n + 71}{-2}$
D. $\dfrac{2n - 71}{2}$
Answer: A
Domain: Algebra
Explanation: Using $(-2, n + 71)$ and $(0, n)$, the slope is $\frac{n - (n + 71)}{0 - (-2)} = -\frac{71}{2}$.

50.

$$F(x) = \dfrac{9}{5}(x - 273.15) + 32$$

The function $F$ gives the temperature, in degrees Fahrenheit, that corresponds to a temperature of $x$ kelvins. If a temperature increased by $9.40$ kelvins, by how much did the temperature increase, in degrees Fahrenheit?
A. $16.92$
B. $48.92$
C. $474.75$
D. $506.75$
Answer: A
Domain: Algebra
Explanation: $F$ is a linear function with slope $\frac{9}{5}$, so an increase of $9.40$ kelvins increases the temperature by $\frac{9}{5}(9.40) = 16.92$ degrees Fahrenheit.

51.

$$19.5x + 29.75y = 394$$

Odalys ordered mulch and river rock, which cost a total of \$394, for her home. The given equation represents the relationship between the number of cubic yards of mulch, $x$, and the number of tons of river rock, $y$, Odalys ordered. How much more, in dollars, did a ton of river rock cost Odalys than a cubic yard of mulch?
Answer: 10.25
Domain: Algebra
Explanation: In the equation, $19.5$ is the cost, in dollars, of each cubic yard of mulch and $29.75$ is the cost, in dollars, of each ton of river rock. So a ton of river rock cost $29.75 - 19.5 = 10.25$ dollars more.

52. At a constant temperature, a scuba diver combines two different concentrations of nitrox mix (oxygen-nitrogen gas mixture) to fill a tank to a total pressure of $130$ atmospheres (atm), of which $34\%$ is contributed by oxygen. Nitrox mix A contributes $x$ atm of pressure to the tank, of which $22\%$ is contributed by oxygen. Nitrox mix B contributes $y$ atm of pressure to the tank, of which $48\%$ is contributed by oxygen. Which system of equations represents this situation?
A. $\begin{aligned} &x + y = 130 \\ &0.48x + 0.22y = 0.34(130) \end{aligned}$
B. $\begin{aligned} &x + y = 130 \\ &0.22x + 0.48y = 0.34(130) \end{aligned}$
C. $\begin{aligned} &x + y = 0.34(130) \\ &0.48x + 0.22y = 130 \end{aligned}$
D. $\begin{aligned} &x + y = 0.34(130) \\ &0.22x + 0.48y = 130 \end{aligned}$
Answer: B
Domain: Algebra
Explanation: The pressures from the two mixes add up to the total, so $x + y = 130$. Oxygen contributes $22\%$ of mix A's pressure and $48\%$ of mix B's pressure, and together these are $34\%$ of $130$ atm, so $0.22x + 0.48y = 0.34(130)$.

53. At a depth of $h$ meters below the surface, the estimated total pressure $P_1$, in kilopascals (kPa), a diver experienced is given by $P_1 = 10h + 101$, which is a combination of estimated water pressure and estimated atmospheric pressure. After maintaining a certain depth, the diver descended $d$ additional meters. The estimated total pressure $P_2$, in kPa, the diver experienced after descending these $d$ additional meters is given by $P_2 = 10d + 311$. Which of the following is the best interpretation of $311$ in this context?
A. The estimated total pressure, in kPa, the diver experienced at a depth of $d$ meters
B. The estimated increase in the total pressure, in kPa, the diver experienced for each increase in the depth by $1$ meter
C. The estimated increase in the total pressure, in kPa, the diver experienced for each increase in the depth by $d$ meters
D. The estimated total pressure, in kPa, the diver experienced when the diver began to descend $d$ additional meters
Answer: D
Domain: Algebra
Explanation: When $d = 0$, the diver has not yet descended any additional meters, and $P_2 = 10(0) + 311 = 311$. So $311$ is the estimated total pressure, in kPa, at the depth where the diver began to descend $d$ additional meters (that depth is $21$ meters, since $10(21) + 101 = 311$).

54. The combined original price for a towel and chair is \$36. After a $45\%$ discount to the towel and a $25\%$ discount to the chair are applied, the combined sale price for the two items is \$25. Which system of equations gives the original price $t$, in dollars, of the towel and the original price $c$, in dollars, of the chair?
A. $\begin{aligned} &t + c = 36 \\ &0.45t + 0.25c = 25 \end{aligned}$
B. $\begin{aligned} &t + c = 36 \\ &0.55t + 0.75c = 25 \end{aligned}$
C. $\begin{aligned} &t + c = 36 \\ &0.25t + 0.45c = 25 \end{aligned}$
D. $\begin{aligned} &t + c = 36 \\ &0.75t + 0.55c = 25 \end{aligned}$
Answer: B
Domain: Algebra
Explanation: The original prices add up to $36$ dollars, so $t + c = 36$. After a $45\%$ discount the towel costs $0.55t$ dollars, and after a $25\%$ discount the chair costs $0.75c$ dollars, so $0.55t + 0.75c = 25$.

55. Lines $h$ and $k$ are graphed in the $xy$-plane. The graph of line $h$ has a slope of $\dfrac{5}{3}$ and an $x$-intercept at $(17, 0)$. Line $k$ is the result of translating the graph of line $h$ down $4$ units. What is the $y$-coordinate of the $y$-intercept of the graph of line $k$?
Answer: -97/3
Domain: Algebra
Explanation: Line $h$ is $y = \frac{5}{3}(x - 17)$, so its $y$-intercept is $-\frac{85}{3}$. Translating the line down $4$ units subtracts $4$ from every $y$-value: $-\frac{85}{3} - \frac{12}{3} = -\frac{97}{3}$.

56.

$$\begin{gathered} y < -5x - 19 \\[4pt] y > -3x - 12 \end{gathered}$$

For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given system of inequalities?
A. $\begin{array}{|c|c|} \hline x & y \\ \hline -5 & 6 \\ \hline -6 & 9 \\ \hline -8 & -4 \\ \hline \end{array}$
B. $\begin{array}{|c|c|} \hline x & y \\ \hline -5 & 4 \\ \hline -6 & 10 \\ \hline -8 & 19 \\ \hline \end{array}$
C. $\begin{array}{|c|c|} \hline x & y \\ \hline -5 & 2 \\ \hline -6 & 9 \\ \hline -8 & 19 \\ \hline \end{array}$
D. $\begin{array}{|c|c|} \hline x & y \\ \hline -5 & 1 \\ \hline -6 & 16 \\ \hline -8 & -4 \\ \hline \end{array}$
Answer: B
Domain: Algebra
Explanation: Check each point in both inequalities. In choice B, for $(-5, 4)$: $4 < 6$ and $4 > 3$; for $(-6, 10)$: $10 < 11$ and $10 > 6$; for $(-8, 19)$: $19 < 21$ and $19 > 12$. In choice A, $(-5, 6)$ fails because $6 < 6$ is false. In choices C and D, $(-5, 2)$ and $(-5, 1)$ fail because $2 > 3$ and $1 > 3$ are false.

57. A biologist is designing a study to observe the behavior of male and female amethyst-throated hummingbirds. According to the study's design, at least $91$ hummingbirds will be observed, and the positive difference between the number of males, $x$, and the number of females, $y$, will not exceed $8$. Which of the following systems of inequalities represents this situation?
A. $\begin{aligned} &x + y \ge 91 \\ &|x - y| \le 8 \end{aligned}$
B. $\begin{aligned} &x + y \ge 91 \\ &x - y \le 8 \end{aligned}$
C. $\begin{aligned} &x + y \le 91 \\ &x - y \le 8 \end{aligned}$
D. $\begin{aligned} &x + y \le 91 \\ &|x - y| \le 8 \end{aligned}$
Answer: A
Domain: Algebra
Explanation: At least $91$ hummingbirds means $x + y \ge 91$. The positive difference between $x$ and $y$ is $|x - y|$, and it will not exceed $8$, so $|x - y| \le 8$. Choice B's inequality $x - y \le 8$ would allow any number of extra females.

58.

| Number of cars | Maximum number of passengers and crew |
|:---:|:---:|
| $3$ | $111$ |
| $6$ | $216$ |
| $10$ | $356$ |

The table shows the linear relationship between the number of cars, $c$, on a commuter train and the maximum number of passengers and crew, $p$, that the train can carry. Which equation represents the linear relationship between $c$ and $p$?
A. $35c - p = -6$
B. $35c - p = 6$
C. $35p - c = -6$
D. $35p - c = 6$
Answer: A
Domain: Algebra
Explanation: The slope is $\frac{216 - 111}{6 - 3} = 35$, so $p = 35c + b$. Using $(3, 111)$: $111 = 105 + b$, so $b = 6$ and $p = 35c + 6$ (check: $35(10) + 6 = 356$). Rearranging gives $35c - p = -6$.

59.

![Graph of a line in the xy-plane through the marked points (0, 3) and (7, 0). The x-axis and the y-axis are labeled from 2 to 10, in steps of 2.](tests/images/algebra-a/q59.svg)

The graph of the linear equation $6x + By = 42$ is shown, where $B$ is a constant. What is the value of $B$?
Answer: 14
Domain: Algebra
Explanation: The graph crosses the $y$-axis at $(0, 3)$. Substituting this point into $6x + By = 42$ gives $3B = 42$, so $B = 14$. The $x$-intercept $(7, 0)$ checks: $6(7) = 42$.

60.

| $x$ | $y$ |
|:---:|:---:|
| $-13$ | $48$ |
| $a$ | $3$ |
| $3$ | $b$ |

The table shows three values of $x$ and their corresponding values of $y$, where $a$ and $b$ are constants. There is a linear relationship between $x$ and $y$. In the $xy$-plane, the $y$-intercept of the line representing this relationship is $(0, -17)$. What is the value of $a + b$?
A. $-47$
B. $-46$
C. $-37$
D. $-36$
Answer: D
Domain: Algebra
Explanation: The line passes through $(0, -17)$ and $(-13, 48)$, so its slope is $\frac{48 - (-17)}{-13 - 0} = -5$ and $y = -5x - 17$. For $y = 3$: $-5a - 17 = 3$, so $a = -4$. For $x = 3$: $b = -5(3) - 17 = -32$. So $a + b = -36$.

61. To cut a lawn, Antwan charges a fee of \$10.00 for his equipment and \$8.50 per hour spent cutting a lawn. Taylor charges a fee of \$7.00 for her equipment and \$9.50 per hour spent cutting a lawn. If $x$ represents the number of hours spent cutting a lawn, what are all the values of $x$ for which Taylor's total charge is greater than Antwan's total charge?
A. $2 \le x \le 3$
B. $3 \le x \le 4$
C. $x < 2$
D. $x > 3$
Answer: D
Domain: Algebra
Explanation: Taylor's total charge is $7 + 9.5x$ dollars and Antwan's is $10 + 8.5x$ dollars. Taylor's is greater when $7 + 9.5x > 10 + 8.5x$, which gives $x > 3$.

62. The linear function $g$ is defined by $g(x) = b - 15x$, where $b$ is a constant. If $g(c + 7) = \dfrac{c}{4}$, where $c$ is a constant, which of the following expressions represents the value of $b$?
A. $\dfrac{15c}{4}$
B. $\dfrac{19c}{4} + 7$
C. $\dfrac{61c}{4} + 105$
D. $15c + 105$
Answer: C
Domain: Algebra
Explanation: $g(c + 7) = b - 15(c + 7) = b - 15c - 105$. Setting this equal to $\frac{c}{4}$ gives $b = \frac{c}{4} + 15c + 105 = \frac{61c}{4} + 105$.

63.

![Graph of a line in the xy-plane that passes through (-5, -3), (0, -8), and (4, -12). The x-axis is labeled from -4 to 4 and the y-axis from -10 to -2, in steps of 2.](tests/images/algebra-a/q63.svg)

The graph of the linear function $y = f(x) - 19$ is shown. If $c$ and $d$ are positive constants, which equation could define $f$?
A. $f(x) = d - cx$
B. $f(x) = -d + cx$
C. $f(x) = d + cx$
D. $f(x) = -d - cx$
Answer: A
Domain: Algebra
Explanation: The graph passes through $(0, -8)$ and $(-5, -3)$, so its slope is $-1$ and $f(x) - 19 = -x - 8$. So $f(x) = 11 - x$, which has the form $f(x) = d - cx$ with $c = 1$ and $d = 11$, both positive. (Since $f$ has a negative slope and a positive $y$-intercept, only choice A is possible.)

64. A carnival receives \$10 for each adult admission ticket sold and \$5 for each child admission ticket sold. On a particular day, the carnival received a total of \$4,100 from selling adult and child admission tickets. If $220$ adult admission tickets were sold on that day, how many child admission tickets were sold?
Answer: 380
Domain: Algebra
Explanation: The adult tickets brought in $10(220) = 2{,}200$ dollars, so the child tickets brought in $4{,}100 - 2{,}200 = 1{,}900$ dollars. That is $\frac{1{,}900}{5} = 380$ child tickets.

65.

$$\begin{gathered} -x - wy = -357 \\[4pt] 2x - wy = 51 \end{gathered}$$

In the given system of equations, $w$ is a constant. In the $xy$-plane, the graphs of these equations intersect at the point $(q, 17)$, where $q$ is a constant. What is the value of $w$?
Answer: 13
Domain: Algebra
Explanation: Subtracting the first equation from the second gives $3x = 51 + 357 = 408$, so $x = 136$. Substituting $x = 136$ and $y = 17$ into the second equation gives $272 - 17w = 51$, so $17w = 221$ and $w = 13$.

66.

$$-\dfrac{3}{19}rx + \dfrac{s}{8} = 10 - \dfrac{5}{57}x$$

In the given equation, $r$ and $s$ are constants. The equation has no solution. What is the value of $r$?
Answer: 5/9
Domain: Algebra
Explanation: A linear equation has no solution when the coefficients of $x$ on both sides are equal but the constants are not. So $-\frac{3}{19}r = -\frac{5}{57}$, which gives $r = \frac{5}{57} \cdot \frac{19}{3} = \frac{5}{9}$.

67. A scientist makes batches of bricks using different sand-to-cement ratios to test how the sand-to-cement ratio affects the strength of the brick. For one batch of bricks, the scientist uses $4{,}880$ cubic centimeters ($\text{cm}^3$) of sand and cement, where the ratio of the volume of sand to the volume of cement is $7$ to $3$. If $s$ represents the volume, in $\text{cm}^3$, of sand and $c$ represents the volume, in $\text{cm}^3$, of cement that the scientist uses for this batch of bricks, which system of equations represents this situation?
A. $\begin{aligned} &s = c \\ &7s + 3c = 4{,}880 \end{aligned}$
B. $\begin{aligned} &s = c \\ &3s + 7c = 4{,}880 \end{aligned}$
C. $\begin{aligned} &7s = 3c \\ &s + c = 4{,}880 \end{aligned}$
D. $\begin{aligned} &3s = 7c \\ &s + c = 4{,}880 \end{aligned}$
Answer: D
Domain: Algebra
Explanation: The ratio of sand to cement is $\frac{s}{c} = \frac{7}{3}$, which gives $3s = 7c$. The total volume is $4{,}880$ $\text{cm}^3$, so $s + c = 4{,}880$.

68. A dance studio charges an introductory fee for the first $3$ lessons and then charges a fixed fee for each additional lesson. One student took $4$ lessons and was charged \$60. Another student took $13$ lessons and was charged \$240. Which function $f$ gives the total charge, in dollars, for any student who took $x$ lessons, where $x > 2$?
A. $f(x) = 15x$
B. $f(x) = 15x + 45$
C. $f(x) = 20x$
D. $f(x) = 20x - 20$
Answer: D
Domain: Algebra
Explanation: Let the introductory fee be $F$ dollars and the fee for each additional lesson be $p$ dollars. Then $F + p = 60$ and $F + 10p = 240$, so $9p = 180$, $p = 20$, and $F = 40$. For $x$ lessons, $f(x) = 40 + 20(x - 3) = 20x - 20$.

69.

| $x$ | $y$ |
|:---:|:---:|
| $-2s$ | $19$ |
| $-s$ | $15$ |
| $s$ | $7$ |

The table shows three values of $x$ and their corresponding values of $y$, where $s$ is a constant. There is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?
A. $sx + 4y = 11s$
B. $4x + sy = 11s$
C. $4x + sy = 11$
D. $sx + 4y = 11$
Answer: B
Domain: Algebra
Explanation: From $x = -2s$ to $x = -s$, $y$ decreases by $4$, so the slope is $-\frac{4}{s}$. Using $(-s, 15)$: $15 = -\frac{4}{s}(-s) + b = 4 + b$, so $b = 11$ and $y = -\frac{4}{s}x + 11$. Multiplying by $s$ gives $sy = -4x + 11s$, or $4x + sy = 11s$. Check with $(s, 7)$: $4s + 7s = 11s$.

70.

$$\begin{gathered} 16x - 20y = 6y + 8 \\[4pt] ty = 8x + \dfrac{1}{5} \end{gathered}$$

In the given system of equations, $t$ is a constant. If the system has no solution, what is the value of $t$?
Answer: 13
Domain: Algebra
Explanation: The first equation simplifies to $16x - 26y = 8$, and the second can be written as $8x - ty = -\frac{1}{5}$, or $16x - 2ty = -\frac{2}{5}$. The system has no solution when the lines are parallel and distinct, so $2t = 26$ and $t = 13$. The constants $8$ and $-\frac{2}{5}$ are different, so the lines are distinct.

71. A landscaper will plant two types of shrubs, hydrangeas and winter hazels, in a park. There will be no more than $244$ total shrubs planted, and the number of hydrangeas planted will be at most three times the number of winter hazels planted. Which of the following systems of inequalities best represents this situation, where $h$ is the number of hydrangeas that will be planted and $w$ is the number of winter hazels that will be planted?
A. $\begin{aligned} &h + w \le 244 \\ &h \le 3w \end{aligned}$
B. $\begin{aligned} &h + w \le 244 \\ &3h \ge w \end{aligned}$
C. $\begin{aligned} &h + w \ge 244 \\ &h \le 3w \end{aligned}$
D. $\begin{aligned} &h + w \ge 244 \\ &3h \ge w \end{aligned}$
Answer: A
Domain: Algebra
Explanation: No more than $244$ total shrubs means $h + w \le 244$. The number of hydrangeas is at most three times the number of winter hazels, so $h \le 3w$.

72. Ken is working this summer as part of a crew on a farm. He earned \$8 per hour for the first $10$ hours he worked this week. Because of his performance, his crew leader raised his salary to \$10 per hour for the rest of the week. Ken saves $90\%$ of his earnings from each week. What is the least number of hours he must work the rest of the week to save at least \$270 for the week?
A. $38$
B. $33$
C. $22$
D. $16$
Answer: C
Domain: Algebra
Explanation: Ken earned $8(10) = 80$ dollars for the first $10$ hours. If he works $x$ more hours, he saves $0.9(80 + 10x)$ dollars. Solving $0.9(80 + 10x) \ge 270$ gives $80 + 10x \ge 300$, so $x \ge 22$. The least number of hours is $22$.
`
});
