/*
 * Practice test: October 2025 (17 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'october-2025',
  source: String.raw`
---
title: SAT Math October 2025
author: tungtks18022
date: 2025-10
description: A 17-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 27
---

1. A computer program models the total mass of the population of a certain type of algae after the algae was placed in an environment where it has no natural predators. According to the model, the estimated total mass of this population of algae at the end of every $6$-hour period is $129\%$ greater than the estimated total mass of this population of algae at the end of the previous $6$-hour period, and the estimated total mass of this population of algae is $613.90$ grams after $18$ hours. Which equation best represents this model, where $A$ is the estimated total mass, in grams, of the population of algae after $x$ hours, and $x < 50$?
A. $A = 34.11(1.29)^{x/6}$
B. $A = 34.11(2.29)^{x/6}$
C. $A = 51.12(2.29)^{x/6}$
D. $A = 285.98(1.29)^{x/6}$
Answer: C
Domain: Advanced Math
Explanation: A mass that is $129\%$ greater is $1 + 1.29 = 2.29$ times as large, so the model has the form $A = a(2.29)^{x/6}$. Since $A = 613.90$ when $x = 18$ and $\frac{18}{6} = 3$, $a(2.29)^3 = 613.90$, which gives $a \approx 51.12$. So $A = 51.12(2.29)^{x/6}$.

2. Hannah and Wyatt are saving money to purchase a car. Hannah saves $1/5$ of her salary each month, and Wyatt saves $2/7$ of his salary each month. Together, they save a total of \$3,270 from their monthly salaries each month. If $h$ and $w$ represent Hannah's and Wyatt's monthly salaries, in dollars, respectively, which equation shows the relationship between $h$ and $w$?
A. $h + w = 3{,}270$
B. $h + 2w = 3{,}270$
C. $10h + 7w = 114{,}450$
D. $7h + 10w = 114{,}450$
Answer: D
Domain: Algebra
Explanation: Each month, Hannah saves $\frac{1}{5}h$ dollars and Wyatt saves $\frac{2}{7}w$ dollars, so $\frac{1}{5}h + \frac{2}{7}w = 3{,}270$. Multiplying both sides of this equation by $35$ gives $7h + 10w = 114{,}450$.

3.

![A shaded rectangle labeled pool sits inside a larger rectangle, and the region between them is labeled concrete path. Double-headed arrows across the path at the top and at the left are each labeled x ft.](tests/images/october-2025/q3.svg)

*Note: Figure not drawn to scale.*

The figure shows a rectangular pool surrounded by a concrete path that is $x$ feet (ft) wide on all sides. The pool is $21$ ft long and $11$ ft wide. The area of the concrete path is $144\text{ ft}^2$. What is the value of $x$?
A. $2$
B. $4$
C. $18$
D. $36$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The pool and the path together form a rectangle that is $21 + 2x$ ft long and $11 + 2x$ ft wide, so the area of the path is $(21 + 2x)(11 + 2x) - 21(11) = 4x^2 + 64x$. Setting $4x^2 + 64x = 144$ gives $x^2 + 16x - 36 = 0$, or $(x + 18)(x - 2) = 0$. Since $x > 0$, $x = 2$.

4.

| Number of bald eagles | Number of days |
|:---:|:---:|
| 0 | 1 |
| 1 | 3 |
| 2 | 4 |
| 3 | 5 |
| 4 | 4 |
| 5 | 3 |
| 19 | 1 |

At a nature preserve, a wildlife biologist counted bald eagles from an observation deck at the same time each day for $21$ days. The table summarizes the resulting data set, data set A. The data value $19$ was recorded in error and is removed from data set A to create data set B, which consists of the remaining $20$ data values. Which statement best compares the median of data set A and the median of data set B?
A. The median of data set B is less than the median of data set A.
B. The median of data set B is equal to the median of data set A.
C. The median of data set B is greater than the median of data set A.
D. There is not enough information to compare the medians of the two data sets.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: In increasing order, data set A has one $0$, three $1$s, four $2$s, and five $3$s, so the $9$th through $13$th values are all $3$. Data set A has $21$ values, so its median is the $11$th value, $3$. Data set B has $20$ values, so its median is the mean of the $10$th and $11$th values, which is also $3$. The medians are equal.

5.

$$\sqrt[3]{117n}\left(\sqrt[4]{117n}\right)^2$$

For what value of $x$ is the given expression equivalent to $(117n)^{12x}$, where $n > 1$?
Answer: 5/72
Domain: Advanced Math
Explanation: $\sqrt[3]{117n}\left(\sqrt[4]{117n}\right)^2 = (117n)^{\frac{1}{3}}(117n)^{\frac{2}{4}} = (117n)^{\frac{1}{3} + \frac{1}{2}} = (117n)^{\frac{5}{6}}$. So $12x = \frac{5}{6}$, which gives $x = \frac{5}{72}$.

6.

| | Volume (cubic units) |
|:---|:---:|
| **Right circular cylinder A** | $392\pi$ |
| **Right circular cylinder B** | $10{,}584\pi$ |

The table shows the volume of two similar solids, right circular cylinder A and right circular cylinder B. The radius of right circular cylinder A is $7$ units. The surface area of right circular cylinder A is $k\pi$ square units, and the surface area of right circular cylinder B is $n\pi$ square units, where $k$ and $n$ are constants. What is the value of $n - k$? (The surface area of a right circular cylinder with radius $r$ and height $h$ is $2\pi r^2 + 2\pi rh$.)
Answer: 1680
Domain: Geometry and Trigonometry
Explanation: The ratio of the volumes is $\frac{10{,}584\pi}{392\pi} = 27 = 3^3$, so the scale factor is $3$ and the ratio of the surface areas is $3^2 = 9$. For cylinder A, $\pi(7)^2h = 392\pi$ gives $h = 8$, so $k\pi = 2\pi(7)^2 + 2\pi(7)(8) = 210\pi$. Then $n = 9(210) = 1{,}890$, and $n - k = 1{,}890 - 210 = 1{,}680$.

7. In triangle $RST$, angle $T$ is a right angle, point $L$ lies on $RS$, point $K$ lies on $ST$, and $LK$ is parallel to $RT$. If the length of $RT$ is $63$ units, the length of $LK$ is $21$ units, and the area of triangle $RST$ is $252$ square units, what is the length of $KT$, in units?
Answer: 16/3
Domain: Geometry and Trigonometry
Explanation: Since angle $T$ is a right angle, $\frac{1}{2}(63)(ST) = 252$, so $ST = 8$. Because $LK$ is parallel to $RT$, triangle $SKL$ is similar to triangle $STR$, so $\frac{SK}{ST} = \frac{LK}{RT} = \frac{21}{63} = \frac{1}{3}$ and $SK = \frac{8}{3}$. Therefore, $KT = 8 - \frac{8}{3} = \frac{16}{3}$.

8. A researcher investigated two species of mites: a predator and its prey. At the start of a week, there was an equal number of the two species. At the end of the week, the number of prey had increased by $1{,}900\%$ of the number of prey at the start of the week, and the number of predators had increased by $150\%$ of the number of predators at the start of the week. The number of prey at the end of the week was $p\%$ greater than the number of predators at the end of the week. What is the value of $p$?
Answer: 700
Domain: Problem-Solving and Data Analysis
Explanation: Let $N$ be the number of each species at the start of the week. At the end of the week, there were $N + 19N = 20N$ prey and $N + 1.5N = 2.5N$ predators. Since $\frac{20N - 2.5N}{2.5N} = 7$, the number of prey was $700\%$ greater, so $p = 700$.

9.

$$57x^{10} + bx^5 + 26$$

The given expression, where $b$ is a constant, is equivalent to $(3x^5 + q)(rx^5 + 2)$, where $q$ and $r$ are constants. What is the value of $b$?
Answer: 253
Domain: Advanced Math
Explanation: Expanding gives $(3x^5 + q)(rx^5 + 2) = 3rx^{10} + (6 + qr)x^5 + 2q$. Matching coefficients, $3r = 57$ and $2q = 26$, so $r = 19$ and $q = 13$. Then $b = 6 + (13)(19) = 253$.

10. A school is ordering tablet computers for its students. The tablets cost \$170 each, and $7\%$ tax is added to the total cost of the order. If the school can spend no more than $53{,}400$ dollars on the tablets, including tax, what is the maximum number of tablets that the school can order?
Answer: 293
Domain: Algebra
Explanation: Including tax, each tablet costs $170(1.07) = 181.9$ dollars, so $n$ tablets cost $181.9n$ dollars. Solving $181.9n \le 53{,}400$ gives $n \le \frac{53{,}400}{181.9} \approx 293.6$, so the maximum number of tablets is $293$.

11. Each $3.0$-ounce serving of cheddar cheese and each $1.2$-ounce serving of tuna provides about $1$ microgram of vitamin B12. If a total of $3.8$ micrograms of vitamin B12 are consumed from eating $x$ ounces of cheese and $y$ ounces of tuna, which equation best represents this situation?
A. $3.0x + 1.2y = 3.8$
B. $1.2x + 3.0y = 3.8$
C. $0.83x + 0.33y = 3.8$
D. $0.33x + 0.83y = 3.8$
Answer: D
Domain: Algebra
Explanation: Cheese provides $\frac{1}{3.0} \approx 0.33$ microgram of vitamin B12 per ounce, and tuna provides $\frac{1}{1.2} \approx 0.83$ microgram per ounce. So $x$ ounces of cheese and $y$ ounces of tuna provide $0.33x + 0.83y$ micrograms, and $0.33x + 0.83y = 3.8$.

12.

$$x - a = (x - a)(x - 24)$$

Which of the following are solutions to the given equation, where $a$ is a constant and $a > 25$?

I. $a$

II. $24$

III. $25$
A. I and II only
B. I and III only
C. II and III only
D. I, II, and III
Answer: B
Domain: Advanced Math
Explanation: Subtracting $x - a$ from both sides gives $(x - a)(x - 24) - (x - a) = 0$, or $(x - a)(x - 25) = 0$. So the solutions are $x = a$ and $x = 25$. For $x = 24$, the left side is $24 - a \ne 0$ but the right side is $0$, so $24$ is not a solution.

13. A giant panda is predicted to have a mass between $\frac{1}{950}$ and $\frac{1}{850}$ times its mother's mass when it is born. If its mother is predicted to have a mass of $95{,}950$ grams when the giant panda is born, which inequality best represents the prediction of the giant panda's mass $p$, in grams, when it is born?
A. $10.1 \le p < 11.289$
B. $101 \le p < 112.89$
C. $1{,}010 \le p < 1{,}128.9$
D. $10{,}100 \le p < 11{,}289$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The predicted mass is between $\frac{1}{950}(95{,}950) = 101$ grams and $\frac{1}{850}(95{,}950) \approx 112.88$ grams. Of the choices, only $101 \le p < 112.89$ has bounds of this size; each other choice is too small or too large by a factor of $10$ or $100$.

14. For a study, a research team measured the heights of $380$ king penguins from the Kerguelen Islands and $190$ king penguins from the Falkland Islands. The research team determined that the mean height of the $380$ king penguins from the Kerguelen Islands was $87$ centimeters and the mean height of the $190$ king penguins from the Falkland Islands was $93$ centimeters. What was the mean height, in centimeters, of all $570$ king penguins the research team measured for this study?
A. $91$
B. $89$
C. $90$
D. $88$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The total height of all $570$ penguins is $380(87) + 190(93) = 33{,}060 + 17{,}670 = 50{,}730$ centimeters, so the mean height is $\frac{50{,}730}{570} = 89$ centimeters.

15.

$$18qrt - 2qrs + 10rst = 0$$

In the given equation, $q$, $r$, $s$, and $t$ are positive, and $\frac{q}{t}$ is greater than $5$. Which expression is equivalent to $s$?
A. $\dfrac{-9qt}{q - 5t}$
B. $\dfrac{9qt}{q - 5t}$
C. $18qrt$
D. $\dfrac{2qt}{q - 5t}$
Answer: B
Domain: Advanced Math
Explanation: Dividing both sides by $2r$ gives $9qt - qs + 5st = 0$, so $s(q - 5t) = 9qt$. Since $\frac{q}{t} > 5$, $q - 5t > 0$, so $s = \frac{9qt}{q - 5t}$.

16. For a certain type of rope, the equation $y = 900ax^2$, where $a$ is a constant, gives the estimated breaking strength $y$, in pounds, of a rope with a circumference of $x$ inches. Based on this equation, if a rope of this type has a circumference of $1.75$ inches, it has an estimated breaking strength of $3{,}858.75$ pounds. What is the estimated breaking strength, in pounds, of a rope of this type that has a circumference of $3.50$ inches?
Answer: 15435
Domain: Advanced Math
Explanation: Doubling the circumference from $1.75$ to $3.50$ inches multiplies $x^2$, and therefore $y$, by $2^2 = 4$. So the estimated breaking strength is $4(3{,}858.75) = 15{,}435$ pounds. (Check: $900a(1.75)^2 = 3{,}858.75$ gives $a = 1.4$, and $900(1.4)(3.50)^2 = 15{,}435$.)

17.

$$\begin{gathered} f(x) = 10x^{10} + 3x^8 \\[4pt] g(x) = -17x^7 + 9x^5 \end{gathered}$$

The polynomial $p(x)$ is defined as the product of the given polynomials, $f(x)$ and $g(x)$. What is the coefficient of $x^{15}$ in $p(x)$?
Answer: 39
Domain: Advanced Math
Explanation: In $p(x) = f(x)g(x)$, the $x^{15}$ terms come from $(10x^{10})(9x^5) = 90x^{15}$ and $(3x^8)(-17x^7) = -51x^{15}$. So the coefficient of $x^{15}$ is $90 - 51 = 39$.
`
});
