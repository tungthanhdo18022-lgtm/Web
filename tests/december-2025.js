/*
 * Practice test: December 2025 (33 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'december-2025',
  source: String.raw`
---
title: December 2025
author: tungtks18022
date: 2025-12
description: A 33-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 53
---

1. A real estate company offers a series of three webinars. $3{,}125$ people attended the first webinar. $56\%$ of the people who attended the first webinar attended the second webinar, and $26\%$ of the people who attended the first and second webinars attended the third webinar. How many people attended all three webinars?
Answer: 455
Domain: Problem-Solving and Data Analysis
Explanation: The number of people who attended the first and second webinars is $0.56(3{,}125) = 1{,}750$. Of these, $0.26(1{,}750) = 455$ people also attended the third webinar.

2. In the $xy$-plane, an equation of circle $R$ is $(x + 8)^2 + (y + 19)^2 = 100$. Circle $S$ is obtained by shifting circle $R$ to the right $3$ units. An equation defining circle $S$ is $(x + h)^2 + (y + k)^2 = 100$, where $h$ and $k$ are constants. What is the value of $h$?
Answer: 5
Domain: Geometry and Trigonometry
Explanation: Circle $R$ has center $(-8, -19)$. Shifting it to the right $3$ units moves the center to $(-5, -19)$, so circle $S$ is defined by $(x + 5)^2 + (y + 19)^2 = 100$. Therefore, $h = 5$.

3. For the polynomial function $f$, when $f(x)$ is divided by $x - 8$, the remainder is $9$. Which of the following must be true about the graph of $y = f(x)$ in the $xy$-plane?
A. It passes through the point $(9, -8)$.
B. It passes through the point $(-8, 9)$.
C. It passes through the point $(9, 8)$.
D. It passes through the point $(8, 9)$.
Answer: D
Domain: Advanced Math
Explanation: By the remainder theorem, the remainder when $f(x)$ is divided by $x - 8$ is $f(8)$. So $f(8) = 9$, which means the graph of $y = f(x)$ passes through the point $(8, 9)$.

4.

![A line segment on a grid in the xy-plane, with tick marks labeled every 2 units from -8 to 8 on the x-axis and from 2 to 6 on the y-axis. The segment runs from the point (-7, 4) to the point (5, 7).](tests/images/december-2025/q4.svg)

The line segment shown in the $xy$-plane represents side $JK$ of isosceles triangle $JKL$, where side $JL$ is congruent to side $KL$. The perimeter of this triangle is $13\sqrt{17}$ units. What is the length, in units, of side $JL$ of this triangle?
A. $\sqrt{17}$
B. $3\sqrt{17}$
C. $5\sqrt{17}$
D. $6\sqrt{17}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The endpoints of the segment are $(-7, 4)$ and $(5, 7)$, so $JK = \sqrt{12^2 + 3^2} = \sqrt{153} = 3\sqrt{17}$. Then $JL + KL = 13\sqrt{17} - 3\sqrt{17} = 10\sqrt{17}$, and since $JL = KL$, $JL = 5\sqrt{17}$.

5. The graph of a linear function $h$ (not shown), where $y = h(x)$, is a line completely contained in only quadrants I and II of the $xy$-plane. Which of the following could define the function $h$?
A. $h(x) = 16x + 16$
B. $h(x) = 16x$
C. $h(x) = 16$
D. $h(x) = -16$
Answer: C
Domain: Algebra
Explanation: A line that lies only in quadrants I and II never crosses the $x$-axis, so it must be horizontal and lie above the $x$-axis. Of the choices, only $h(x) = 16$ defines such a line.

6.

$$H = 2.419L + 22.83$$

A group of biology students conducted an experiment to study the relationship between a person's femur length and the person's height. The given equation describes the relationship between the length $L$, in inches, of a student's femur and the student's estimated height $H$, in inches, for the students in the group. Which of the following is the best interpretation of $2.419$ in this context?
A. The increase in a student's estimated height, in inches, for each increase of $1$ inch in the student's femur length
B. The increase in a student's femur length, in inches, for each increase of $1$ inch in the student's estimated height
C. The increase in a student's femur length, in inches, for each increase of $22.83$ inches in the student's estimated height
D. The estimated height, in inches, of a student whose femur has a length of $1$ inch
Answer: A
Domain: Algebra
Explanation: The value $2.419$ is the slope of the linear equation, so each increase of $1$ inch in the femur length $L$ increases the estimated height $H$ by $2.419$ inches.

7.

$$f(x) = 5{,}000(1.003)^{2x}$$

The given function $f$ models the balance of a bank account, in dollars, $x$ years after it is opened. Which statement is the best interpretation of $(1.003)^{2x}$?
A. Every $6$ months, the balance increases by about \$3.
B. Every $2$ years, the balance increases by about \$3.
C. At the end of every $6$-month interval, the balance increases by about $0.3\%$ of the balance at the beginning of the $6$-month interval.
D. At the end of every $2$-year interval, the balance increases by about $0.3\%$ of the balance at the beginning of the $2$-year interval.
Answer: C
Domain: Advanced Math
Explanation: When $x$ increases by $\frac{1}{2}$ (that is, every $6$ months), the exponent $2x$ increases by $1$, so the balance is multiplied by $1.003$. So at the end of every $6$-month interval, the balance increases by about $0.3\%$ of the balance at the beginning of that interval.

8. Which of the following is a factor of the expression $2x^2 + (18r + 5)x + 45r$, where $r$ is a nonzero constant?

I. $x + 9r$

II. $2x + 5r$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Advanced Math
Explanation: Factoring by grouping gives $2x^2 + 5x + 18rx + 45r = x(2x + 5) + 9r(2x + 5) = (x + 9r)(2x + 5)$. So $x + 9r$ is a factor for every nonzero value of $r$. The other factor, $2x + 5$, is the same as $2x + 5r$ only when $r = 1$, so $2x + 5r$ is not a factor in general.

9. The equation $5|x - 8| = k$, where $k$ is a constant, has exactly one solution. Which of the following could be the value of $\frac{k}{5}$?
A. $-8$ or $8$
B. $-8$ only
C. $0$ only
D. $8$ only
Answer: C
Domain: Advanced Math
Explanation: The equation is equivalent to $|x - 8| = \frac{k}{5}$. It has two solutions if $\frac{k}{5} > 0$ and no solutions if $\frac{k}{5} < 0$. It has exactly one solution, $x = 8$, only when $\frac{k}{5} = 0$.

10. A scientist studied the effects of mixing two chemicals, chemical A and chemical B, by gradually adding more of each chemical to a mixture of the two chemicals. At the start of the study, the mass of chemical A in the mixture was equal to the mass of chemical B in the mixture. From the start of the study to the end of the study, the mass of chemical A in the mixture increased by $2{,}600\%$ and the mass of chemical B in the mixture increased by $380\%$. At the end of the study, approximately how many times greater was the mass of chemical A in the mixture than the mass of chemical B in the mixture?
A. $29.80$
B. $22.20$
C. $6.84$
D. $5.63$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Let $m$ be the starting mass of each chemical. At the end of the study, chemical A has a mass of $m + 26m = 27m$ and chemical B has a mass of $m + 3.8m = 4.8m$. Since $\frac{27m}{4.8m} = 5.625$, the mass of chemical A is approximately $5.63$ times the mass of chemical B.

11.

$$r^2 + qr = 8r - 87$$

In the given equation, $q$ is an integer constant. The given equation has no real solutions. What is the largest possible value of $q$?
Answer: 26
Domain: Advanced Math
Explanation: The equation is equivalent to $r^2 + (q - 8)r + 87 = 0$. It has no real solutions when the discriminant is negative: $(q - 8)^2 - 4(87) < 0$, or $(q - 8)^2 < 348$. Since $18^2 = 324 < 348 < 361 = 19^2$, the largest integer value of $q - 8$ is $18$, so $q = 26$.

12. An isosceles right triangle has a perimeter of $34 + 17\sqrt{2}$ inches. What is the length, in inches, of one leg of this triangle?
A. $17$
B. $17\sqrt{2}$
C. $34$
D. $34\sqrt{2}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: If each leg has length $s$, the hypotenuse has length $s\sqrt{2}$, so the perimeter is $2s + s\sqrt{2}$. Setting $2s + s\sqrt{2} = 34 + 17\sqrt{2}$ gives $s = 17$.

13.

$$\dfrac{-22x - 29 + m}{2} = k(x + 5)$$

In the given equation, $k$ and $m$ are constants. The equation has infinitely many solutions. What is the value of $m$?
A. $34$
B. $-11$
C. $-26$
D. $-81$
Answer: D
Domain: Algebra
Explanation: Multiplying both sides by $2$ gives $-22x + (m - 29) = 2kx + 10k$. For infinitely many solutions, the coefficients and the constants must match: $2k = -22$, so $k = -11$, and $m - 29 = 10k = -110$, so $m = -81$.

14. The function $f$ is defined by the equation $f(x) = 20^x + b$, where $b$ is a constant. In the $xy$-plane, the graph of $y = f(x)$ contains the points $(0, 36)$ and $(2, p + 19)$, where $p$ is a constant. What is the value of $p$?
Answer: 416
Domain: Advanced Math
Explanation: Since $f(0) = 20^0 + b = 1 + b = 36$, $b = 35$. Then $f(2) = 20^2 + 35 = 435$, so $p + 19 = 435$ and $p = 416$.

15.

$$f(x) = (x - a)(x - b)$$

The function $f$ is defined by the given equation, where $a$ and $b$ are integer constants. If $f(39) > 0$, $f(42) < 0$, and $f(45) > 0$, which of the following could be the value of $a + b$?
A. $42$
B. $44$
C. $81$
D. $83$
Answer: D
Domain: Advanced Math
Explanation: The graph of $f$ is a parabola that opens upward with $x$-intercepts $a$ and $b$. Since $f(42) < 0$ while $f(39) > 0$ and $f(45) > 0$, one zero is between $39$ and $42$ and the other is between $42$ and $45$. As integers, one of $a$ and $b$ is $40$ or $41$ and the other is $43$ or $44$, so $a + b$ is $83$, $84$, or $85$. Of the choices, only $83$ is possible.

16. One of the factors of $8x^4 + 50x^2 + 63$ is $ax^2 + b$, where $a$ and $b$ are positive integer constants. Which of the following is a possible value of $ab$?
A. $7$
B. $14$
C. $18$
D. $36$
Answer: C
Domain: Advanced Math
Explanation: The expression factors as $8x^4 + 50x^2 + 63 = (4x^2 + 7)(2x^2 + 9)$. So $ax^2 + b$ is a positive integer multiple of $4x^2 + 7$ or of $2x^2 + 9$, which makes $ab = 28n^2$ or $ab = 18n^2$ for some positive integer $n$. Of the choices, only $18$ (from $2x^2 + 9$) is possible.

17. The quadratic function $g$ models the depth, in meters, below the surface of the water of a Weddell seal $t$ minutes after the seal entered the water during a dive. The function estimates that the seal reached its maximum depth of $396.8$ meters $8$ minutes after it entered the water and then reached the surface of the water $16$ minutes after it entered the water. Based on the function, what was the estimated depth, to the nearest meter, of the seal $11$ minutes after it entered the water?
Answer: 341
Domain: Advanced Math
Explanation: The vertex is $(8, 396.8)$, so $g(t) = c(t - 8)^2 + 396.8$ for some constant $c$. Since $g(16) = 0$, $64c = -396.8$ and $c = -6.2$. Then $g(11) = -6.2(3)^2 + 396.8 = 341$ meters.

18.

$$x^2 + y^2 - 6x - 10y - 4n = 0$$

The given equation represents circle $A$ in the $xy$-plane, where $n$ is a constant. Point $(5, 7)$ lies on circle $B$, which has the same center but twice the diameter as circle $A$. What is the value of $n$?
Answer: -8
Domain: Geometry and Trigonometry
Explanation: Completing the square gives $(x - 3)^2 + (y - 5)^2 = 34 + 4n$, so circle $A$ has center $(3, 5)$ and radius squared $34 + 4n$. Circle $B$ has radius squared $4(34 + 4n)$, and $(5, 7)$ lies on it, so $(5 - 3)^2 + (7 - 5)^2 = 8 = 4(34 + 4n)$. Then $34 + 4n = 2$, so $n = -8$.

19.

$$39(x - n) = 39y + 39n$$

One of the equations in a system of two linear equations is given, where $n$ is a positive constant. The system has no solution. Which equation could be the second equation in this system?
A. $4x - 4y = 8n$
B. $4x + 4y = 4n$
C. $4x + 4y = 8n$
D. $4x - 4y = 4n$
Answer: D
Domain: Algebra
Explanation: Dividing the given equation by $39$ gives $x - n = y + n$, or $x - y = 2n$. Dividing choice D by $4$ gives $x - y = n$. Since $n > 0$, $n \ne 2n$, so the two lines are parallel and distinct, and the system has no solution.

20. The function $f(t) = 40{,}000(2)^{6t/7}$ gives the number of bacteria in a population $t$ minutes after an initial observation. How much time, in seconds, does it take for the number of bacteria in the population to double?
Answer: 70
Domain: Advanced Math
Explanation: The number of bacteria doubles when the exponent $\frac{6t}{7}$ increases by $1$, that is, when $t$ increases by $\frac{7}{6}$ minutes. Since $\frac{7}{6}(60) = 70$, it takes $70$ seconds.

21.

$$g(x) = \dfrac{x^2 - x - a}{x^3 - x - b}$$

The function $g$ is defined by the given equation, where $a$ and $b$ are constants. In the $xy$-plane, the graph of $y = g(x)$ passes through the point $(0, 47)$, and $g(-47) = 0$. What is the value of $b$?
A. $48$
B. $47$
C. $-47$
D. $-48$
Answer: A
Domain: Advanced Math
Explanation: Since $g(-47) = 0$, the numerator is $0$ at $x = -47$: $(-47)^2 + 47 - a = 0$, so $a = 2{,}256$. Since $g(0) = \dfrac{-a}{-b} = \dfrac{a}{b} = 47$, $b = \dfrac{2{,}256}{47} = 48$.

22. A right circular cone has a volume of $4{,}800\pi$ cubic centimeters, and the area of its base is $1{,}600\pi$ square centimeters. What is the slant height, in centimeters, of this cone?
A. $3$
B. $9$
C. $40$
D. $41$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $V = \frac{1}{3}Bh$, $4{,}800\pi = \frac{1}{3}(1{,}600\pi)h$, so the height is $h = 9$. Since $\pi r^2 = 1{,}600\pi$, the radius is $r = 40$. The slant height is $\sqrt{9^2 + 40^2} = \sqrt{1{,}681} = 41$.

23. Triangle $ABC$ is similar to triangle $XYZ$, where $A$ and $B$ correspond to $X$ and $Y$, respectively. The length of each side of triangle $XYZ$ is $k$ times the length of its corresponding side in triangle $ABC$, where $k$ is an integer greater than $1$. The measure, in degrees, of angle $Z$ can be represented by the expression $9x + 29$, where $x$ is an integer. Which of the following expressions represents the measure, in degrees, of angle $C$ for all possible values of $x$?
A. $9x + 29$
B. $k(9x + 29)$
C. $90 - (9x + 29)$
D. $180 - k(9x + 29)$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Angle $C$ corresponds to angle $Z$, and corresponding angles of similar triangles are congruent; the scale factor $k$ affects only the side lengths. So the measure of angle $C$ is $9x + 29$ degrees.

24. A conservation specialist hung artificial nesting structures each in the shape of a right rectangular prism for a species of native duck. Each structure has a height of $18$ inches. The length of each structure's base is $x$ inches, which is $1$ inch more than the width of the structure's base. Which function $V$ gives the volume of each structure, in cubic inches, in terms of the length of the structure's base?
A. $V(x) = x(x + 18)(x + 1)$
B. $V(x) = x(x + 18)(x - 1)$
C. $V(x) = 18x(x + 1)$
D. $V(x) = 18x(x - 1)$
Answer: D
Domain: Advanced Math
Explanation: The length is $x$ inches, so the width is $x - 1$ inches, and the height is $18$ inches. The volume is $V(x) = 18x(x - 1)$.

25.

| $x$ | $y$ |
|:---:|:---:|
| $-26$ | $t$ |
| $-13$ | $t + 29$ |
| $0$ | $t + 58$ |

For a linear relationship between $x$ and $y$, the table gives three values of $x$ and their corresponding values of $y$, where $t$ is a constant. Which equation represents this relationship?
A. $y = -2x + t + 29$
B. $y = 2x + t + 29$
C. $y = -\dfrac{20}{11}x + t + 58$
D. $y = \dfrac{29}{13}x + t + 58$
Answer: D
Domain: Algebra
Explanation: Each increase of $13$ in $x$ increases $y$ by $29$, so the slope is $\frac{29}{13}$. When $x = 0$, $y = t + 58$, so the $y$-intercept is $t + 58$. The equation is $y = \frac{29}{13}x + t + 58$.

26. A researcher selected $23$ guinea pigs from one habitat and $19$ wild cavies from another habitat at random in Venezuela. A field of a specific size within each habitat was divided into equally sized virtual squares, and the animals were allowed to wander in the field for a fixed amount of time. To observe their behavior, the researcher counted the number of times the guinea pigs and wild cavies crossed the virtual squares in their field during early adolescence and again during late adolescence. The researcher found that in early adolescence, the number of virtual squares the wild cavies crossed was significantly more than the number of virtual squares the guinea pigs crossed. The researcher also found that the number of virtual squares crossed by both the wild cavies and the guinea pigs decreased from early adolescence to late adolescence.

Based on the researcher's findings, which of the following statements is an appropriate conclusion that can be drawn from this study?
A. The statistically significant difference in behavior between the two age groups was caused by the differences in habitat.
B. The statistically significant difference in behavior between the two age groups was caused by aging.
C. The statistically significant difference in behavior during early adolescence between the two groups of animals can be generalized to all guinea pigs and wild cavies.
D. The statistically significant difference in behavior during early adolescence between the two groups of animals can only be generalized to the habitats in the study.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The animals were selected at random from one habitat each, so the results can be generalized only to the animals in the habitats in the study, not to all guinea pigs and wild cavies. This was an observational study with no random assignment, so no cause-and-effect conclusion can be drawn, which rules out choices A and B.

27. A zoologist observed the nests of wood ducks in an area. Each year, the zoologist recorded the number of eggs in each of the first $50$ nests that were observed and created a frequency table for the data set. Which of the following frequency tables represents the data set with the smallest standard deviation?

<div class="q-tables">
<table class="q-table"><thead><tr><th colspan="2">A</th></tr><tr><th>Number of eggs</th><th>Frequency</th></tr></thead><tbody><tr><td>12</td><td>11</td></tr><tr><td>13</td><td>10</td></tr><tr><td>14</td><td>8</td></tr><tr><td>15</td><td>10</td></tr><tr><td>16</td><td>11</td></tr></tbody></table>
<table class="q-table"><thead><tr><th colspan="2">B</th></tr><tr><th>Number of eggs</th><th>Frequency</th></tr></thead><tbody><tr><td>12</td><td>10</td></tr><tr><td>13</td><td>10</td></tr><tr><td>14</td><td>10</td></tr><tr><td>15</td><td>10</td></tr><tr><td>16</td><td>10</td></tr></tbody></table>
<table class="q-table"><thead><tr><th colspan="2">C</th></tr><tr><th>Number of eggs</th><th>Frequency</th></tr></thead><tbody><tr><td>12</td><td>2</td></tr><tr><td>13</td><td>11</td></tr><tr><td>14</td><td>24</td></tr><tr><td>15</td><td>11</td></tr><tr><td>16</td><td>2</td></tr></tbody></table>
<table class="q-table"><thead><tr><th colspan="2">D</th></tr><tr><th>Number of eggs</th><th>Frequency</th></tr></thead><tbody><tr><td>12</td><td>0</td></tr><tr><td>13</td><td>5</td></tr><tr><td>14</td><td>40</td></tr><tr><td>15</td><td>5</td></tr><tr><td>16</td><td>0</td></tr></tbody></table>
</div>
A. Table A
B. Table B
C. Table C
D. Table D
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Each data set is symmetric with mean $14$. In table D, $40$ of the $50$ values equal the mean and the other $10$ values are only $1$ away from it, so its values are the most tightly clustered around the mean. Therefore, table D has the smallest standard deviation.

28. Two participants solved a puzzle cube during timed competitions. The lists give the times, to the nearest second, that participant A and participant B took to solve the cube at various competitions.

Participant A: $23$, $23$, $24$, $26$

Participant B: $23$, $23$, $24$, $26$, $39$

Which statement correctly compares the mean solve times, to the nearest second, of participant A and participant B at these competitions?
A. The mean solve time of participant A is greater than the mean solve time of participant B.
B. The mean solve time of participant A is less than the mean solve time of participant B.
C. The mean solve time of participant A is equal to the mean solve time of participant B.
D. There is not enough information to compare the mean solve times of participant A and participant B.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Participant A's times have a sum of $96$, so the mean is $\frac{96}{4} = 24$ seconds. Participant B's times have a sum of $135$, so the mean is $\frac{135}{5} = 27$ seconds. So the mean solve time of participant A is less than the mean solve time of participant B.

29. A polygon with $21$ sides has a perimeter of $67$ inches. The length of one side is $7$ inches. The other $20$ sides have equal lengths. What is the length, in inches, of one of the $20$ sides with equal lengths?
Answer: 3
Domain: Algebra
Explanation: If each of the $20$ equal sides has length $s$ inches, then $7 + 20s = 67$. So $20s = 60$ and $s = 3$.

30.

![The xy-plane with the origin O, with the four quadrants labeled: I at the upper right, II at the upper left, III at the lower left, and IV at the lower right.](tests/images/december-2025/q30.svg)

The figure shows the $xy$-plane with the quadrants labeled. The graph of a linear function $h$ (not shown), where $y = h(x)$, is a line completely contained in only quadrants I and II of the $xy$-plane. Which of the following could define the function $h$?
A. $h(x) = 47x + 47$
B. $h(x) = 47x$
C. $h(x) = -47$
D. $h(x) = 47$
Answer: D
Domain: Algebra
Explanation: A line that lies only in quadrants I and II never crosses the $x$-axis, so it must be horizontal and lie above the $x$-axis. Of the choices, only $h(x) = 47$ defines such a line.

31. Which expression is a factor of $x^4 + 6ax^2 + 9a^2 - 16$, where $a$ is a positive constant?
A. $x^2 + 3a + 4$
B. $x^2 - 3a - 4$
C. $x^2 + 6a$
D. $x^2 - 4a$
Answer: A
Domain: Advanced Math
Explanation: The expression is a difference of squares: $x^4 + 6ax^2 + 9a^2 - 16 = (x^2 + 3a)^2 - 4^2 = (x^2 + 3a - 4)(x^2 + 3a + 4)$. So $x^2 + 3a + 4$ is a factor.

32.

![Two histograms of weight in grams, with the number of objects (from 0 to 12) on the vertical axis. Group A: 6 objects from 0 to 1, 3 from 1 to 2, 2 from 2 to 3, 3 from 3 to 4, and 6 from 4 to 5. Group B, whose horizontal axis has a break between 0 and 9: 2 objects from 9 to 10, 3 from 10 to 11, 10 from 11 to 12, 3 from 12 to 13, and 2 from 13 to 14.](tests/images/december-2025/q32.svg)

The weight of each object in two groups, A and B, was recorded. The histograms represent the distributions of weight, in grams, for the objects in groups A and B. The mean weight of the objects in group A is equal to $2.2$, and the mean weight of the objects in group B is equal to $11.2$. Which of the following statements about the standard deviations of weight for the objects in these two groups is true?
A. The standard deviation of weight for the objects in group A is less than the standard deviation of weight for the objects in group B.
B. The standard deviation of weight for the objects in group A is equal to the standard deviation of weight for the objects in group B.
C. The standard deviation of weight for the objects in group A is greater than the standard deviation of weight for the objects in group B.
D. There is not enough information to compare the standard deviations of weight for the objects in these two groups.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: In group A, most of the weights are in the lowest and highest intervals, far from the mean of $2.2$. In group B, half of the weights are in the middle interval from $11$ to $12$, close to the mean of $11.2$. So the weights in group A are more spread out from the mean, and group A has the greater standard deviation.

33. The values in data sets $X$ and $Y$ are shown in the table.

<div class="q-table-wrap"><table class="q-table"><tbody><tr><th>Data set $X$</th><td>13</td><td>13</td><td>14</td><td>14</td><td>15</td><td>16</td><td>16</td><td>17</td><td>17</td></tr><tr><th>Data set $Y$</th><td>2</td><td>2</td><td>3</td><td>3</td><td>4</td><td>5</td><td>5</td><td>6</td><td>6</td></tr></tbody></table></div>

The standard deviation of data set $X$ is $q$, and the standard deviation of data set $Y$ is $s$. Which of the following statements about the standard deviation of the data sets is true?
A. $q < s$
B. $q > s$
C. $q = s$
D. The relationship between $q$ and $s$ cannot be determined.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Each value in data set $X$ is $11$ more than the corresponding value in data set $Y$. Adding the same constant to every value shifts the data but does not change its spread, so $q = s$.
`
});
