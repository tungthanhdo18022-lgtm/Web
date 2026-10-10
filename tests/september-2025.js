/*
 * Practice test: September 2025 (27 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'september-2025',
  source: String.raw`
---
title: SAT Math September 2025
author: tungtks18022
date: 2025-09
description: A 27-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 43
---

1. A quadratic function gives the estimated length of daylight $d(t)$, in hours, in a certain city $t$ months after March 1, where $0 \le t \le 7$. According to the function, the estimated length of daylight is $12.66$ hours $6$ months after March 1 and the maximum estimated length of daylight is $13.91$ hours $3.5$ months after March 1. Based on this function, what is the estimated length of daylight, in hours, on March 1?
Answer: 11.46
Domain: Advanced Math
Explanation: The vertex of the parabola is $(3.5, 13.91)$, so $d(t) = a(t - 3.5)^2 + 13.91$. Since $d(6) = 12.66$, $a(2.5)^2 = -1.25$ and $a = -0.2$. On March 1, $t = 0$, so $d(0) = -0.2(3.5)^2 + 13.91 = -2.45 + 13.91 = 11.46$.

2.

$$\dfrac{1}{78}x^2 + \left(s - \dfrac{1}{78}t\right)x - st = 0$$

In the given equation, $s$ and $t$ are positive constants. The product of the solutions to the given equation is $-2kst$, where $k$ is a constant. What is the value of $k$?
Answer: 39
Domain: Advanced Math
Explanation: The equation factors as $\frac{1}{78}(x + 78s)(x - t) = 0$, so its solutions are $-78s$ and $t$, and their product is $-78st$. So $-2kst = -78st$, which gives $k = 39$.

3. A beaker containing a liquid is placed on a table. The function $g(t) = 295 + (364 - 295)(2.72)^{-0.104t}$ gives the approximate temperature, in kelvins, of the liquid $t$ minutes after the beaker was placed on the table. According to this function, what was the approximate temperature, in kelvins, of the liquid when the beaker was placed on the table?
Answer: 364
Domain: Advanced Math
Explanation: The beaker was placed on the table at $t = 0$, so the temperature was $g(0) = 295 + (364 - 295)(2.72)^0 = 295 + 69 = 364$ kelvins.

4.

$$g(x) = \dfrac{1}{11}(5(2)^x + 4)$$

The function $g$ is defined by the given equation. For all values of $x$, the value of $g(x)$ is greater than $k$, where $k$ is a constant. What is the greatest possible value of $k$?
A. $4$
B. $\dfrac{4}{11}$
C. $9$
D. $\dfrac{9}{11}$
Answer: B
Domain: Advanced Math
Explanation: The term $5(2)^x$ is positive for all $x$ and gets arbitrarily close to $0$ as $x$ decreases. So $g(x)$ is always greater than $\frac{1}{11}(0 + 4) = \frac{4}{11}$ and gets arbitrarily close to it, which makes $\frac{4}{11}$ the greatest possible value of $k$.

5.

$$f(x) = 3d(26x + 27) + 18$$

Which of the following represents the $x$-intercept of the graph of $y = f(x) + 6$ in the $xy$-plane, where $d$ is a constant?
A. $(81d + 24, 0)$
B. $\left(\dfrac{-81d - 24}{78d}, 0\right)$
C. $\left(6 - \dfrac{81d + 18}{78d}, 0\right)$
D. $\left(\dfrac{-45}{78d + 6}, 0\right)$
Answer: B
Domain: Algebra
Explanation: Setting $f(x) + 6 = 0$ gives $3d(26x + 27) + 24 = 0$, so $26x + 27 = -\frac{8}{d}$ and $26x = \frac{-27d - 8}{d}$. Then $x = \frac{-27d - 8}{26d} = \frac{-81d - 24}{78d}$.

6. The function $f$ is defined by $f(x) = 20x^3$. The graph of $y = f(-x) + c$ in the $xy$-plane, where $c$ is a positive integer constant, has an $x$-intercept at $(r, 0)$ and a $y$-intercept at $(0, t)$, where $r$ and $t$ are constants. Which of the following must be true about $r$ and $t$?
A. $r > 0$ and $t > 0$
B. $r > 0$ and $t < 0$
C. $r < 0$ and $t > 0$
D. $r < 0$ and $t < 0$
Answer: A
Domain: Advanced Math
Explanation: The graph is $y = -20x^3 + c$. Its $y$-intercept is $t = c > 0$. Setting $y = 0$ gives $x^3 = \frac{c}{20} > 0$, so $r > 0$.

7. For what value of $a$ is $\sqrt[a]{r^{42}}$ equivalent to $r^{6/7}$, where $r > 1$?
Answer: 49
Domain: Advanced Math
Explanation: Since $\sqrt[a]{r^{42}} = r^{42/a}$, the exponents must be equal: $\frac{42}{a} = \frac{6}{7}$, so $a = 49$.

8. The expression $\dfrac{\sqrt[7]{p^5}}{\sqrt{p^{t+3}}}$, where $t$ is a constant, is equivalent to $\sqrt[7]{p^2}$ for all positive values of $p$. What is the value of $t$?
A. $-\dfrac{15}{7}$
B. $-\dfrac{27}{7}$
C. $-\dfrac{24}{7}$
D. $-\dfrac{18}{7}$
Answer: A
Domain: Advanced Math
Explanation: The expression equals $\frac{p^{5/7}}{p^{(t+3)/2}} = p^{\frac{5}{7} - \frac{t+3}{2}}$, and $\sqrt[7]{p^2} = p^{2/7}$. So $\frac{5}{7} - \frac{t+3}{2} = \frac{2}{7}$, which gives $\frac{t+3}{2} = \frac{3}{7}$, $t + 3 = \frac{6}{7}$, and $t = -\frac{15}{7}$.

9. A freight elevator can hold a maximum weight of $5{,}450$ pounds during one trip. A $190$-pound person needs to deliver several boxes using the freight elevator. Some of these boxes weigh $23$ pounds each and the others weigh $60$ pounds each. Which inequality represents the possible combinations of the number of $23$-pound boxes, $x$, and the number of $60$-pound boxes, $y$, the person can deliver during one trip if only the person and the boxes are on the freight elevator?
A. $60x + 23y \ge 5450$
B. $23x + 60y \ge 5260$
C. $60x + 23y \le 5450$
D. $23x + 60y \le 5260$
Answer: D
Domain: Algebra
Explanation: The boxes weigh $23x + 60y$ pounds in total, and together with the person they can weigh at most $5{,}450$ pounds. So $23x + 60y + 190 \le 5450$, or $23x + 60y \le 5260$.

10.

$$\begin{gathered} (x + k) + \dfrac{9}{2}(y + t) + 19 = 0 \\[4pt] (x + k) - \dfrac{9}{2}(y + t) - 19 = 0 \end{gathered}$$

In the given system of equations, $k$ and $t$ are constants. The solution to this system is $(x, y)$. What is the value of $18(y + t)$?
A. $-76$
B. $0$
C. $38$
D. $9$
Answer: A
Domain: Algebra
Explanation: Subtracting the second equation from the first gives $9(y + t) + 38 = 0$, so $9(y + t) = -38$. Multiplying by $2$ gives $18(y + t) = -76$.

11. A partially filled container containing $28$ milliliters of water is placed under a leaky faucet that produces one $0.05$-milliliter drop of water every $5$ seconds. Until the container is full, which of the following can be used to represent the volume $v$, in milliliters, of water in the container $t$ seconds after it is placed under the faucet, where $t$ is a multiple of $5$?
A. $v = 5t$
B. $v = 0.25t + 28$
C. $v = 0.01t + 28$
D. $v = 0.05t + 28$
Answer: C
Domain: Algebra
Explanation: The faucet adds $0.05$ milliliter every $5$ seconds, which is $\frac{0.05}{5} = 0.01$ milliliter per second. Starting from $28$ milliliters, the volume after $t$ seconds is $v = 0.01t + 28$.

12.

| Number of cars | Maximum number of passengers and crew |
|:---:|:---:|
| 2 | 75 |
| 7 | 245 |
| 9 | 313 |

The table shows the linear relationship between the number of cars, $c$, on a commuter train and the maximum number of passengers and crew, $p$, that the train can carry. Which equation represents the linear relationship between $c$ and $p$?
A. $34p - c = 7$
B. $34c - p = 7$
C. $34p - c = -7$
D. $34c - p = -7$
Answer: D
Domain: Algebra
Explanation: The slope is $\frac{245 - 75}{7 - 2} = 34$ (and $\frac{313 - 245}{9 - 7} = 34$). Writing $p = 34c + b$ and using $(2, 75)$ gives $75 = 68 + b$, so $b = 7$. Then $p = 34c + 7$, which is equivalent to $34c - p = -7$.

13. If $x = \sqrt[2n]{7x^n + 30}$, where $n$ is a positive integer constant, what is the value of $x^n$?
Answer: 10
Domain: Advanced Math
Explanation: Raising both sides to the power $2n$ gives $x^{2n} = 7x^n + 30$. With $u = x^n$, this is $u^2 - 7u - 30 = 0$, or $(u - 10)(u + 3) = 0$. Since $x$ is a $2n$th root, which is an even root, $x \ge 0$. So $x^n \ge 0$, which rules out $-3$ and gives $x^n = 10$.

14. The density of a certain type of marble stone is $2.6000$ grams per cubic centimeter. If a sample of this type of stone is in the shape of a sphere with a diameter of $31.000$ centimeters, what is the mass of this sample, in grams, to the nearest whole number? (Use $3.14159$ for $\pi$.)
Answer: 40556
Domain: Geometry and Trigonometry
Explanation: The radius is $15.5$ centimeters, so the volume is $\frac{4}{3}(3.14159)(15.5)^3 \approx 15{,}598.518$ cubic centimeters. The mass is $2.6(15{,}598.518) \approx 40{,}556.15$ grams, which rounds to $40{,}556$.

15. A piece of string with a length of $108$ inches is cut into two parts. One part has a length of $x$ inches, and the other part has a length of $y$ inches. The value of $x$ is $8$ more than $4$ times the value of $y$. What is the value of $x$?
A. $25$
B. $29$
C. $58$
D. $88$
Answer: D
Domain: Algebra
Explanation: We have $x + y = 108$ and $x = 4y + 8$. Substituting gives $5y + 8 = 108$, so $y = 20$ and $x = 4(20) + 8 = 88$.

16. A circle in the $xy$-plane has its center at $(2, 9)$. Line $t$ is tangent to this circle at the point $(a, -4)$, where $a$ is a constant. The slope of line $t$ is $\frac{6}{5}$. What is the value of $a$?
A. $-\dfrac{68}{5}$
B. $-\dfrac{53}{6}$
C. $\dfrac{77}{6}$
D. $\dfrac{88}{5}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The radius to the point of tangency is perpendicular to the tangent line, so its slope is $-\frac{5}{6}$. Then $\frac{-4 - 9}{a - 2} = -\frac{5}{6}$, so $a - 2 = \frac{78}{5}$ and $a = \frac{88}{5}$.

17. The scatterplot shows data set A, which consists of the weights $y$, in pounds, of a Labrador retriever puppy at various ages, $x$, in months. The equation of a line of best fit for the relationship in data set A can be written as $y = -5.1 + 8.7x$, where $2 \le x \le 6$.

![Scatterplot in the xy-plane. The x-axis is numbered 1 through 10 and the y-axis is labeled 10.0 through 70.0 in increments of 10.0. Five points are plotted at approximately (2, 10), (3, 23), (4, 30), (5, 40), and (6, 46).](tests/images/september-2025/q17.svg)

The puppy was weighed again at $9$ months old and weighed $52$ pounds. Data set B consists of all the data points in data set A as well as the data point $(9, 52)$. The equation of a line of best fit for data set B can be written as $y = r + sx$, where $r$ and $s$ are constants and $2 \le x \le 9$. Assuming the equations of the lines of best fit are calculated in the same way, which of the following is the best estimate for the value of $s$?
A. $5.9$
B. $8.7$
C. $13.8$
D. $17.7$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The line for data set A predicts $-5.1 + 8.7(9) = 73.2$ pounds at $9$ months, so the new point $(9, 52)$ lies far below it and pulls the right end of the line down. The slope must decrease from $8.7$, and $5.9$ is the only choice less than $8.7$. (A least-squares fit to the plotted points gives $s \approx 5.9$.)

18. A right square pyramid has a surface area of $100 + 20\sqrt{146}$ square inches, which includes a base area of $100$ square inches. What is the height, in inches, of this pyramid?
Answer: 11
Domain: Geometry and Trigonometry
Explanation: The base is a square with side length $10$ inches. The lateral area is $4 \cdot \frac{1}{2}(10)\ell = 20\ell = 20\sqrt{146}$, so the slant height is $\ell = \sqrt{146}$. The slant height, the height, and half a side form a right triangle, so the height is $\sqrt{146 - 5^2} = \sqrt{121} = 11$.

19. Which of the following expressions has a factor of $x + 2b$, where $b$ is a positive integer constant?
A. $2x^2 + 9x + 18b$
B. $2x^2 + 19x + 18b$
C. $2x^2 + 20x + 18b$
D. $2x^2 + 29x + 18b$
Answer: D
Domain: Advanced Math
Explanation: If $x + 2b$ is a factor of $2x^2 + mx + 18b$, then $x = -2b$ makes the expression $0$: $8b^2 - 2bm + 18b = 0$, so $m = 4b + 9$. For $m = 9$, $19$, $20$, and $29$, this gives $b = 0$, $2.5$, $2.75$, and $5$, and only $b = 5$ is a positive integer. Check: $2x^2 + 29x + 90 = (x + 10)(2x + 9)$.

20. Data set A consists of $10$ positive integers less than $60$. The list gives $9$ of the integers from data set A.

$$42, 46, 44, 42, 38, 39, 40, 47, 40$$

The mean of these $9$ integers is $42$. If the mean of data set A is an integer that is greater than $42$, what is the value of the largest integer from data set A?
A. $43$
B. $47$
C. $52$
D. $59$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The $9$ integers have a sum of $9(42) = 378$. If the tenth integer is $n$, then $378 + n$ is a multiple of $10$ greater than $420$. Since $n < 60$, $378 + n < 438$, so $378 + n = 430$ and $n = 52$. This is greater than every integer in the list, so it is the largest integer in data set A.

21.

| | Black | Brown | Blue | Total |
|:---:|:---:|:---:|:---:|:---:|
| Short | 19 | 20 | 24 | 63 |
| Regular | 17 | 21 | 22 | 60 |
| Long | 14 | 25 | 19 | 58 |
| **Total** | 50 | 66 | 65 | 181 |

A department store sells pants in three lengths: short, regular, and long. The table summarizes the distribution of pant length, by color, for all the pants in the store. A pair of pants is selected at random. What is the probability of selecting a pair of pants that is brown, given that the pair of pants is regular length? (Express your answer as a decimal or fraction, not as a percent.)
Answer: 7/20 | 0.35
Domain: Problem-Solving and Data Analysis
Explanation: There are $60$ pairs of regular-length pants, and $21$ of them are brown. The probability is $\frac{21}{60} = \frac{7}{20}$, or $0.35$.

22. Which expression is **NOT** a factor of $7{,}290x^4 - 56{,}250$?
A. $9x^2 + 25$
B. $3x^2 - 5$
C. $3x + 5$
D. $90$
Answer: B
Domain: Advanced Math
Explanation: Factoring gives $7{,}290x^4 - 56{,}250 = 90(81x^4 - 625) = 90(9x^2 + 25)(9x^2 - 25) = 90(9x^2 + 25)(3x + 5)(3x - 5)$. So $9x^2 + 25$, $3x + 5$, and $90$ are factors, but $3x^2 - 5$ is not.

23.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th rowspan="2">Classification</th><th colspan="3">Cell body diameter (micrometers)</th></tr><tr><th>Less than $20$</th><th>$20$ to $30$</th><th>Greater than $30$</th></tr></thead><tbody><tr><td><b>Sensory neuron</b></td><td>13</td><td>7</td><td>2</td></tr><tr><td><b>Motor neuron</b></td><td>0</td><td>17</td><td>18</td></tr><tr><td><b>Interneuron</b></td><td>10</td><td>33</td><td>0</td></tr></tbody></table></div>

For $100$ neurons, the table summarizes the distribution of classification and cell body diameter. One of these neurons will be selected at random. What is the probability of selecting a neuron with a cell body diameter that is less than or equal to $30$ micrometers, given that it is **not** classified as a motor neuron? (Express your answer as a decimal or fraction, not as a percent.)
Answer: 63/65
Domain: Problem-Solving and Data Analysis
Explanation: The neurons not classified as motor neurons are the $13 + 7 + 2 = 22$ sensory neurons and the $10 + 33 + 0 = 43$ interneurons, $65$ in all. Of these, $13 + 7 + 10 + 33 = 63$ have a cell body diameter less than or equal to $30$ micrometers. The probability is $\frac{63}{65}$ (or $.9692$).

24.

$$5x + 3y = 6$$

The given equation is one equation in a system of two linear equations. If the system of equations has at least one solution, which of the following equations could be the other equation in the system?

I. $7.5x + 4.5y = 9$

II. $7.5x - 4.5y = 9$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: C
Domain: Algebra
Explanation: Equation I is $1.5$ times the given equation, so it represents the same line and the system has infinitely many solutions. The line in equation II has slope $\frac{5}{3}$, which differs from the slope $-\frac{5}{3}$ of the given line, so the two lines intersect at exactly one point. Both equations could be the other equation.

25.

$$x^2 + 2x + c = 0$$

In the given equation, $c$ is a constant. The equation has no real solutions if $c > n$. What is the least possible value of $n$?
A. $-2$
B. $-1$
C. $1$
D. $2$
Answer: C
Domain: Advanced Math
Explanation: The equation has no real solutions exactly when its discriminant is negative: $2^2 - 4c < 0$, or $c > 1$. For every $c > n$ to satisfy $c > 1$, $n$ must be at least $1$, so the least possible value of $n$ is $1$.

26. While the mass of an object is the same everywhere, the weight of an object is not the same on different planets. An object has a weight of $70.00$ pounds on Earth and a weight of $74.62$ pounds on Saturn. The object's weight on Jupiter is $252.8\%$ of its weight on Earth. If the object's weight on Saturn is $x\%$ of its weight on Jupiter, which of the following is closest to the value of $x$?
A. $42.17$
B. $69.76$
C. $176.96$
D. $269.48$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The object's weight on Jupiter is $2.528(70.00) = 176.96$ pounds. So $x = \frac{74.62}{176.96}(100) \approx 42.17$.

27.

![A circle with points A, B, C, and E on it. Chords AC and BE intersect at point D inside the circle, with a right-angle mark at D. Segments AB and BC are drawn, and angle ABC is marked as a right angle.](tests/images/september-2025/q27.svg)

*Note: Figure not drawn to scale.*

In the figure shown, points $A$, $B$, $C$, and $E$ lie on the circle, and $AB < BC$. Segment $AC$ is perpendicular to segment $BE$ at point $D$, and $BD = \sqrt{390}$. The diameter of the circle is $197$. If $\dfrac{CD}{AD} = r$, what is the value of $r$?
Answer: 97.5
Domain: Geometry and Trigonometry
Explanation: Angle $ABC$ is a right angle inscribed in the circle, so $\overline{AC}$ is a diameter and $AC = 197$. In right triangle $ABC$, the altitude $BD$ satisfies $BD^2 = AD \cdot CD$, so $AD \cdot CD = 390$ and $AD + CD = 197$. Then $AD$ and $CD$ are the solutions of $u^2 - 197u + 390 = 0$, which are $2$ and $195$. Since $AB < BC$, $AD < CD$, so $AD = 2$, $CD = 195$, and $r = \frac{195}{2} = 97.5$.
`
});
