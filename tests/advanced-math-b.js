/*
 * Advanced test: Advanced Math B (57 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'advanced-math-b',
  source: String.raw`
---
title: Advanced Math B
author: tungtks18022
description: 57 harder Advanced Math questions on quadratic, exponential, polynomial and radical functions, equivalent expressions, and nonlinear equations and systems, with an explanation for every question.
category: Advanced Math
section: advanced
time: 91
---

1.

$$\dfrac{1}{cx} = \dfrac{x}{128} + \dfrac{1}{c}$$

In the given equation, $c$ is a constant. If the equation has exactly one solution, what is the value of $c$?
Answer: -32
Domain: Advanced Math
Explanation: The equation requires $c \ne 0$ and $x \ne 0$. Multiplying both sides by $128cx$ gives $128 = cx^2 + 128x$, or $cx^2 + 128x - 128 = 0$. This quadratic equation has exactly one solution when its discriminant is $0$: $128^2 - 4(c)(-128) = 0$, so $16{,}384 + 512c = 0$ and $c = -32$. The solution is then $x = -\frac{128}{2(-32)} = 2$, which is allowed because $x \ne 0$.

2. Function $f$ is a quadratic function. The graph of $y = f(x)$ in the $xy$-plane has a vertex at $(-8, 1)$, contains the point $(-9, -1)$, and has a $y$-intercept at $(0, a)$. The graph of $y = 6f(x)$ has a $y$-intercept at $(0, b)$. What is the positive difference between $a$ and $b$?
Answer: 635
Domain: Advanced Math
Explanation: In vertex form, $f(x) = k(x + 8)^2 + 1$. Since $f(-9) = -1$, $k(-1)^2 + 1 = -1$, so $k = -2$ and $f(x) = -2(x + 8)^2 + 1$. Then $a = f(0) = -2(64) + 1 = -127$ and $b = 6f(0) = -762$. The positive difference is $-127 - (-762) = 635$.

3.

$$f(x) = k(1.84)^x$$

The function $f$ is defined by the given equation, where $k$ is a constant. The value of $f(x)$ increases by $p\%$ for every increase of $x$ by $1$. For which of the following functions, where $k$ is a constant, does the value of $g(x)$ increase by $p\%$ for every increase of $x$ by $4$?
A. $g(x) = k\left(1.84^x\right)^{\frac{1}{4}}$
B. $g(x) = k\left(1.84^x\right)^4$
C. $g(x) = k(1.84)^{x - 4}$
D. $g(x) = k(1.84)^{x + 4}$
Answer: A
Domain: Advanced Math
Explanation: Increasing $x$ by $1$ multiplies $f(x)$ by $1.84$, an increase of $84\%$, so $p = 84$. In choice A, $g(x) = k(1.84)^{\frac{x}{4}}$, so increasing $x$ by $4$ increases the exponent by $1$ and multiplies $g(x)$ by $1.84$: an increase of $84\%$. In choice B, $g(x) = k(1.84)^{4x}$, so increasing $x$ by $4$ multiplies $g(x)$ by $1.84^{16}$. In choices C and D, $g(x)$ increases by $84\%$ for every increase of $x$ by $1$, not by $4$.

4. Which of the following expressions has a factor of $x + 2b$, where $b$ is a positive integer constant?
A. $3x^2 + 9x + 18b$
B. $3x^2 + 24x + 18b$
C. $3x^2 + 30x + 18b$
D. $3x^2 + 39x + 18b$
Answer: D
Domain: Advanced Math
Explanation: If $x + 2b$ is a factor, the expression equals $0$ when $x = -2b$. For $3x^2 + kx + 18b$ this gives $12b^2 - 2bk + 18b = 0$, and dividing by $2b$ gives $6b - k + 9 = 0$, so $b = \frac{k - 9}{6}$. For $k = 9$, $24$, $30$, and $39$, this gives $b = 0$, $2.5$, $3.5$, and $5$. Only choice D gives a positive integer: with $b = 5$, $3x^2 + 39x + 90 = 3(x + 3)(x + 10)$, which has the factor $x + 10 = x + 2b$.

5. An acceptable noise criterion rating for the background noise in a laundry room is $50$. For a noise criterion rating of $50$, the equation $y = 22(0.997)^{x - 60} + 47$ gives the estimated sound pressure level, $y$, in decibels, as a function of the octave band center frequency, $x$, in hertz, where $x \ge 60$. Which of the following is the best interpretation of $47$ in this context?
A. $47$ is $22$ less than the estimated sound pressure level, in decibels, at an octave band center frequency of $60$ hertz.
B. $47$ is $22$ less than the estimated sound pressure level, in decibels, at an octave band center frequency of $0$ hertz.
C. $47$ is the estimated sound pressure level, in decibels, at an octave band center frequency of $60$ hertz.
D. $47$ is the estimated sound pressure level, in decibels, at an octave band center frequency of $0$ hertz.
Answer: A
Domain: Advanced Math
Explanation: When $x = 60$, the exponent is $0$, so $y = 22(1) + 47 = 69$. The estimated sound pressure level at $60$ hertz is $69$ decibels, and $47$ is $22$ less than this level. Choice C is wrong because the level at $60$ hertz is $69$, not $47$, and choices B and D refer to a frequency of $0$ hertz, which is outside the domain $x \ge 60$.

6.

$$34z^{14} + bz^7 + 70$$

In the given expression, $b$ is a positive integer. If $qz^7 + r$ is a factor of the expression, where $q$ and $r$ are positive integers, what is the greatest possible value of $b$?
Answer: 2381
Domain: Advanced Math
Explanation: Let $u = z^7$, so the expression is $34u^2 + bu + 70$. If $qu + r$ is a factor, the other factor is $su + t$, where $qs = 34$ and $rt = 70$, and then $b = qt + rs$. The value of $b$ is greatest when the largest numbers are multiplied together: $(34u + 1)(u + 70) = 34u^2 + 2381u + 70$, so $b = 34(70) + 1(1) = 2{,}381$. Every other choice of factor pairs gives a smaller value; for example, $(17u + 1)(2u + 70)$ gives $b = 1{,}192$, and $(34u + 70)(u + 1)$ gives $b = 104$.

7. The exponential function $f$ is defined by $f(x) = ab^x$, where $a$ and $b$ are positive constants. If $f(n - 1) = f(n) + \dfrac{82}{100}f(n - 1)$, where $n$ is a constant, what is the value of $b$?
Answer: 9/50 | 0.18
Domain: Advanced Math
Explanation: Subtracting $\frac{82}{100}f(n - 1)$ from both sides gives $f(n) = 0.18f(n - 1)$. Since $\frac{f(n)}{f(n - 1)} = \frac{ab^n}{ab^{n - 1}} = b$, the value of $b$ is $0.18$, or $\frac{9}{50}$.

8.

$$f(x) = 3(x - a)(x - b)(x - c)$$

The function $f$ is defined by the given equation, where $a$, $b$, and $c$ are distinct constants. When $a < x < b$, the value of $f(x)$ is positive. The graph of $y = f(x)$ in the $xy$-plane contains the point $(r, s)$, where $r$ and $s$ are constants. If $s = 8$, which of the following could be true?

I. $r < a$

II. $b < r < c$

III. $r > c$
A. I only
B. III only
C. I and III only
D. II and III only
Answer: B
Domain: Advanced Math
Explanation: The zeros of $f$ are $a$, $b$, and $c$, and since the leading coefficient $3$ is positive, $f(x)$ is negative to the left of the least zero, positive between the least and middle zeros, negative between the middle and greatest zeros, and positive to the right of the greatest zero. Since $f(x) > 0$ for every $x$ between $a$ and $b$, $c$ is not between them and $a$ and $b$ must be the two least zeros, so $a < b < c$. Then $f(x) > 0$ only when $a < x < b$ or $x > c$. Since $f(r) = 8 > 0$, $r > c$ is possible (III), but $f(r) < 0$ whenever $r < a$ or $b < r < c$, so I and II cannot be true.

9. The function $f$ is defined by $f(x) = ax^2 - bx + c$, where $a$, $b$, and $c$ are constants and $1 < a < 4$. The graph of $y = f(x)$ in the $xy$-plane passes through the points $(12, 72)$ and $(-6, 0)$. If $a$ is an integer, what could be the value of $a + b$?
Answer: 10 | 17
Domain: Advanced Math
Explanation: The two points give $144a - 12b + c = 72$ and $36a + 6b + c = 0$. Subtracting the second equation from the first gives $108a - 18b = 72$, so $6a - b = 4$ and $b = 6a - 4$. Since $a$ is an integer with $1 < a < 4$, $a = 2$ or $a = 3$. If $a = 2$, then $b = 8$ and $a + b = 10$; if $a = 3$, then $b = 14$ and $a + b = 17$. Either $10$ or $17$ is correct.

10. A quadratic model gives the predicted instantaneous rate of change, in bacteria per hour, of a bacterial population as a function of the population size. According to the model, the predicted instantaneous rate of change is $0$ bacteria per hour for a population size of $0$, and the maximum predicted instantaneous rate of change is $0.200$ bacteria per hour for a population size of $7{,}000$. Based on this model, what is the predicted instantaneous rate of change, in bacteria per hour, of the bacteria population for a population size of $700$?
Answer: 0.038
Domain: Advanced Math
Explanation: Let $r(P)$ be the predicted rate for a population size of $P$. The maximum is $0.200$ at $P = 7{,}000$, so in vertex form $r(P) = -k(P - 7{,}000)^2 + 0.200$. Since $r(0) = 0$, $k(7{,}000)^2 = 0.200$. Then $r(700) = 0.200 - k(6{,}300)^2 = 0.200 - 0.200\left(\frac{6{,}300}{7{,}000}\right)^2 = 0.200(1 - 0.81) = 0.038$ bacteria per hour.

11. The function $f(n) = 7(20.41)^{\frac{n}{5}}$ gives each term of a sequence as a function of the term's position, $n$, in the sequence, where $n$ is a whole number. The value of the term in position $15$ is $p\%$ more than the value of the term in position $10$. What is the value of $p$?
A. $20.41$
B. $41$
C. $1{,}941$
D. $2{,}041$
Answer: C
Domain: Advanced Math
Explanation: $\frac{f(15)}{f(10)} = \frac{7(20.41)^3}{7(20.41)^2} = 20.41$, so the term in position $15$ is $20.41$ times, or $2{,}041\%$ of, the term in position $10$. That is $2{,}041\% - 100\% = 1{,}941\%$ more, so $p = 1{,}941$. Choice D is the percent **of** the earlier term, not the percent increase.

12. The function $f$ is defined by $f(x) = ax^2 + bx + c$, where $a$, $b$, and $c$ are constants. The graph of $y = f(x)$ in the $xy$-plane passes through the points $(10, 0)$ and $(-5, 0)$. If $a$ is an integer greater than $1$, which of the following could be the value of $a + b$?
A. $-8$
B. $-4$
C. $5$
D. $6$
Answer: A
Domain: Advanced Math
Explanation: The zeros of $f$ are $10$ and $-5$, so $f(x) = a(x - 10)(x + 5) = ax^2 - 5ax - 50a$. Then $b = -5a$ and $a + b = -4a$. With $a = 2$, $a + b = -8$. Choice B would require $a = 1$, and choices C and D would require negative values of $a$.

13.

$$z(w) = (0.829)^{2w}$$

The function $z$ is defined by the equation shown. The value of $z(w)$ decreases by $p\%$ for each increase by $1$ in the value of $w$. Which of the following is closest to the value of $p$?
A. $0.171$
B. $0.829$
C. $17.1$
D. $31.3$
Answer: D
Domain: Advanced Math
Explanation: $z(w) = (0.829)^{2w} = \left(0.829^2\right)^w \approx (0.6872)^w$. Each increase of $1$ in $w$ multiplies $z(w)$ by about $0.6872$, a decrease of about $1 - 0.6872 = 0.3128$, or $31.3\%$. So $p \approx 31.3$. Choice C ignores the $2$ in the exponent, and choices A and B are not percents.

14. Which expression is a factor of $36x^2(x + 12) - 36(x + 12)^3$?
A. $-12x + 144$
B. $2x + 12$
C. $6x + 6$
D. $24x - 144$
Answer: B
Domain: Advanced Math
Explanation: Factoring out $36(x + 12)$ gives $36(x + 12)\left[x^2 - (x + 12)^2\right]$. The bracket is a difference of squares: $(x - (x + 12))(x + (x + 12)) = -12(2x + 12)$. So the expression equals $-432(x + 12)(2x + 12)$, and $2x + 12$ is a factor. The other choices are multiples of $x - 12$, $x + 1$, and $x - 6$, which are not factors.

15. A quadratic function models the height, in feet, of an object above the ground in terms of the time, in seconds, after the object was launched. According to the model, the object was launched from a height of $0$ feet and reached its maximum height of $1{,}600$ feet $10$ seconds after it was launched. Based on the model, what was the height, in feet, of the object $7$ seconds after it was launched?
Answer: 1456
Domain: Advanced Math
Explanation: The vertex of the graph is $(10, 1{,}600)$, so $h(t) = -k(t - 10)^2 + 1{,}600$. Since $h(0) = 0$, $100k = 1{,}600$ and $k = 16$. Then $h(7) = -16(7 - 10)^2 + 1{,}600 = -144 + 1{,}600 = 1{,}456$ feet.

16. For the exponential function $f$, the value of $f(1)$ is $k$, where $k$ is a constant. Which of the following equivalent forms of the function $f$ shows the value of $k$ as the coefficient or the base?
A. $f(x) = 50(1.4)^{x + 1}$
B. $f(x) = 70(1.4)^x$
C. $f(x) = 98(1.4)^{x - 1}$
D. $f(x) = 137.2(1.4)^{x - 2}$
Answer: C
Domain: Advanced Math
Explanation: Using choice B, $k = f(1) = 70(1.4) = 98$. In choice C, $f(1) = 98(1.4)^0 = 98$, and $98$ appears as the coefficient. The other forms show $50$, $70$, or $137.2$ as the coefficient and $1.4$ as the base, and none of these is $98$.

17.

$$\begin{gathered} y = -0.5 \\[4pt] y = x^2 + 10x + a \end{gathered}$$

In the given system of equations, $a$ is a positive integer constant. The system has no real solutions. What is the least possible value of $a$?
Answer: 25
Domain: Advanced Math
Explanation: Substituting $y = -0.5$ gives $x^2 + 10x + a = -0.5$, or $x^2 + 10x + (a + 0.5) = 0$. The system has no real solutions when this equation has none, that is, when the discriminant is negative: $10^2 - 4(a + 0.5) < 0$, so $a + 0.5 > 25$ and $a > 24.5$. The least positive integer value of $a$ is $25$.

18.

$$f(x) = 28(1.30)^{\frac{x}{4}}$$

For the given function $f$, the value of $f(x)$ increases by $p\%$ for every increase of $x$ by $8$. What is the value of $p$?
A. $30$
B. $41$
C. $60$
D. $69$
Answer: D
Domain: Advanced Math
Explanation: $f(x + 8) = 28(1.30)^{\frac{x + 8}{4}} = 28(1.30)^{\frac{x}{4}}(1.30)^2 = 1.69f(x)$. So $f(x)$ increases by $69\%$ for every increase of $x$ by $8$, and $p = 69$. Choice A is the increase for every increase of $x$ by $4$, and choice C wrongly doubles $30\%$.

19. The graph of the equation $y = 2^x + k$ is shown, where $k$ is a constant. What is the value of $k$?

![Graph in the xy-plane of an increasing exponential curve. The x-axis is labeled from -6 to 6 and the y-axis from -8 to 4, in steps of 2, with lighter grid lines every 0.5 unit. On the left, the curve is nearly flat, just above the horizontal line y = -7, which it approaches but never reaches. It crosses the y-axis at (0, -6), then rises more and more steeply, crossing the x-axis near x = 2.8 and passing through (3, 1).](tests/images/advanced-math-b/q19.svg)
A. $-7$
B. $-6$
C. $-5$
D. $-4$
Answer: A
Domain: Advanced Math
Explanation: As $x$ decreases, $2^x$ approaches $0$, so the graph of $y = 2^x + k$ approaches the horizontal line $y = k$. The graph levels off at $y = -7$ and crosses the $y$-axis at $(0, -6)$: $2^0 + k = 1 + k = -6$ gives $k = -7$. Choice B is the $y$-coordinate of the $y$-intercept, not $k$.

20. One of the factors of $4x^3 + 88x^2 + 468x$ is $x + b$, where $b$ is a positive constant. What is the smallest possible value of $b$?
Answer: 9
Domain: Advanced Math
Explanation: $4x^3 + 88x^2 + 468x = 4x(x^2 + 22x + 117) = 4x(x + 9)(x + 13)$, because $9 + 13 = 22$ and $9 \cdot 13 = 117$. The factors of the form $x + b$ with $b > 0$ are $x + 9$ and $x + 13$, so the smallest possible value of $b$ is $9$.

21. Liam has \$150 in an account. Each year, he expects to have $2.8\%$ more money in the account than he had the previous year. Which of the following models best describes how Liam expects the money in his account to change over time?
A. Decreasing exponential
B. Decreasing linear
C. Increasing exponential
D. Increasing linear
Answer: C
Domain: Advanced Math
Explanation: Each year the amount is multiplied by $1.028$, so it grows by the same percent (not by the same number of dollars) each year. A quantity that is multiplied by a constant greater than $1$ in each equal time period follows an increasing exponential model.

22.

$$f(x) = \sqrt{5x + 6}$$

The function $f$ is defined by the given equation. If $f(a) = -5a$, where $a$ is a constant, what is the value of $a$?
A. $\dfrac{3}{5}$
B. $\dfrac{2}{5}$
C. $-\dfrac{2}{5}$
D. $-\dfrac{3}{5}$
Answer: C
Domain: Advanced Math
Explanation: $\sqrt{5a + 6} = -5a$ requires $-5a \ge 0$, so $a \le 0$. Squaring gives $5a + 6 = 25a^2$, or $25a^2 - 5a - 6 = 0$, which factors as $(5a - 3)(5a + 2) = 0$. So $a = \frac{3}{5}$ or $a = -\frac{2}{5}$, and only $a = -\frac{2}{5}$ satisfies $a \le 0$. Check: $\sqrt{-2 + 6} = 2 = -5\left(-\frac{2}{5}\right)$. The value $\frac{3}{5}$ (choice A) is extraneous, because $\sqrt{9} = 3$, not $-3$.

23. The function $f$ is defined by $f(x) = (x - 9)(x - 6)(x - 5)$. In the $xy$-plane, the graph of $y = g(x)$ is the result of translating the graph of $y = f(x)$ up $4$ units. What is the value of $g(0)$?
Answer: -266
Domain: Advanced Math
Explanation: Translating the graph up $4$ units gives $g(x) = f(x) + 4$. Since $f(0) = (-9)(-6)(-5) = -270$, $g(0) = -270 + 4 = -266$.

24. An auditorium has seats for $3{,}200$ people. Tickets to attend a show at the auditorium currently cost \$8.00. For each \$1.00 increase in the ticket price, $100$ fewer tickets will be sold. This situation can be modeled by the equation $y = -100x^2 + 2{,}400x + 25{,}600$, where $x$ represents the increase in ticket price, in dollars, and $y$ represents the revenue, in dollars, from ticket sales. If this equation is graphed in the $xy$-plane, at what value of $x$ is the maximum of the graph?
A. $8$
B. $12$
C. $24$
D. $32$
Answer: B
Domain: Advanced Math
Explanation: The graph is a parabola that opens downward, so its maximum is at the vertex, where $x = -\frac{2{,}400}{2(-100)} = 12$. This matches the factored form $y = (8 + x)(3{,}200 - 100x)$: its zeros, $x = -8$ and $x = 32$, have midpoint $12$. (Choice D is a zero of the function, not the location of the maximum.)

25. Which expression is equivalent to $(3x^3 - x^2 + 4)(5x^2 + 8x)$?
A. $15x^5 + 19x^4 - 8x^3 - 20x + 32$
B. $15x^5 + 19x^4 - 8x^3 - 20x^2 + 32$
C. $15x^5 + 19x^4 - 8x^3 + 20x^2 + 32x$
D. $15x^5 + 29x^4 - 8x^3 + 20x^2 + 32x$
Answer: C
Domain: Advanced Math
Explanation: Distributing each term: $3x^3(5x^2 + 8x) = 15x^5 + 24x^4$, $-x^2(5x^2 + 8x) = -5x^4 - 8x^3$, and $4(5x^2 + 8x) = 20x^2 + 32x$. Adding these gives $15x^5 + 19x^4 - 8x^3 + 20x^2 + 32x$.

26.

$$18x^2 + 24x + c = 0$$

In the given equation, $c$ is a constant. The equation has exactly one solution. What is the value of $c$?
Answer: 8
Domain: Advanced Math
Explanation: A quadratic equation has exactly one solution when its discriminant is $0$: $24^2 - 4(18)(c) = 576 - 72c = 0$, so $c = 8$. Check: $18x^2 + 24x + 8 = 2(3x + 2)^2$, which is $0$ only for $x = -\frac{2}{3}$.

27. If $\dfrac{x - 18}{30} = \dfrac{x - 18}{6}$, what is the value of $x + 18$?
A. $0$
B. $5$
C. $18$
D. $36$
Answer: D
Domain: Algebra
Explanation: Multiplying both sides by $30$ gives $x - 18 = 5(x - 18)$, so $4(x - 18) = 0$ and $x = 18$. Then $x + 18 = 36$. Choice A is the value of $x - 18$, and choice C is the value of $x$.

28. The function $f$ is defined by $f(x) = a\sqrt{b - x}$, where $a$ and $b$ are constants. In the $xy$-plane, the graph of $y = f(x)$ passes through the point $(22, 0)$, and $f(-22) < 0$. Which of the following must be true?
A. $a < 0$
B. $b < 0$
C. $f(0) > -22$
D. $f(0) = 22$
Answer: A
Domain: Advanced Math
Explanation: Since $f(-22) < 0$, $a \ne 0$. Then $f(22) = a\sqrt{b - 22} = 0$ gives $b = 22$, so $f(x) = a\sqrt{22 - x}$. Since $f(-22) = a\sqrt{44} < 0$, $a < 0$. Choice B is false because $b = 22$. Choices C and D need not be true: $f(0) = a\sqrt{22}$ is negative, and it is less than $-22$ if, for example, $a = -10$.

29.

$$P(t) = 210(1.03)^{\left(\frac{6}{4}\right)t}$$

The function $P$ models the population, in thousands, of a certain city $t$ years after 2006. According to the model, the population is predicted to increase by $3\%$ every $n$ months. What is the value of $n$?
A. $8$
B. $12$
C. $18$
D. $72$
Answer: A
Domain: Advanced Math
Explanation: The population is multiplied by $1.03$ (a $3\%$ increase) each time the exponent $\frac{6}{4}t$ increases by $1$, that is, each time $t$ increases by $\frac{4}{6} = \frac{2}{3}$ of a year. Since $\frac{2}{3}$ of $12$ months is $8$ months, $n = 8$. Choice C, $18$ months, comes from using $\frac{6}{4}$ of a year instead.

30. For a certain isotope, at the end of every $29$-year period, the mass of a sample of the isotope has decayed to half its mass at the beginning of the $29$-year period. The function $s(t) = 216(0.5)^{\frac{t}{29}}$ gives the approximate mass of this isotope, in grams, that remains $t$ years after a $216$-gram sample starts to decay. Which statement is the best interpretation of $s(3 \cdot 29) = 27$ in this context?
A. The mass of the sample is approximately $27$ grams $3$ years after the sample starts to decay.
B. The mass of the sample is approximately $27$ grams $3$ $29$-year periods after the sample starts to decay.
C. The mass of the sample is approximately $3$ grams $27$ $29$-year periods after the sample starts to decay.
D. The mass of the sample is approximately $3$ grams $27$ years after the sample starts to decay.
Answer: B
Domain: Advanced Math
Explanation: The input $t = 3 \cdot 29$ is the time in years, which is three $29$-year periods ($87$ years), and the output $27$ is the mass in grams. So the mass of the sample is about $27$ grams $3$ $29$-year periods after it starts to decay. Check: $216(0.5)^3 = 27$.

31.

$$\begin{gathered} y = x - c \\[4pt] y = -4(x - 6)^2 \end{gathered}$$

In the given system of equations, $c$ is a constant. The system has two distinct real solutions. Which of the following could be the value of $c$?
A. $1$
B. $5$
C. $\dfrac{95}{16}$
D. $11$
Answer: D
Domain: Advanced Math
Explanation: Setting the expressions for $y$ equal gives $x - c = -4x^2 + 48x - 144$, or $4x^2 - 47x + (144 - c) = 0$. The system has two distinct real solutions when the discriminant is positive: $47^2 - 16(144 - c) > 0$, so $2{,}209 - 2{,}304 + 16c > 0$ and $c > \frac{95}{16} = 5.9375$. Of the choices, only $11$ is greater than $\frac{95}{16}$. When $c = \frac{95}{16}$, the system has exactly one solution.

32. The functions $f$ and $g$ are defined by the equations shown, where $a$ and $b$ are integer constants, $a < b$ and $b < 0$. If $y = f(x)$ and $y = g(x)$ are graphed in the $xy$-plane, which of the following equations displays, as a constant or coefficient, the $y$-coordinate of the $y$-intercept of the graph of the corresponding function?

I. $f(x) = a(4.2)^{x + b}$

II. $g(x) = a(4.2)^x + b$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: D
Domain: Advanced Math
Explanation: The $y$-coordinate of the $y$-intercept of the graph of $f$ is $f(0) = a(4.2)^b$. This is not displayed in equation I; in particular, it is not the coefficient $a$, because $b \ne 0$ means $(4.2)^b \ne 1$. The $y$-coordinate of the $y$-intercept of the graph of $g$ is $g(0) = a(1) + b = a + b$, which is not displayed in equation II; it is not $a$ or $b$, because neither $a$ nor $b$ is $0$. So neither equation displays it.

33. For the polynomial function $f$, a solution to the equation $f(x) = 0$ is $x = 7$, and one of the factors of $f(x)$ is $x + 5$. Which of the following could be the graph of $y = f(x)$ in the $xy$-plane?
A. ![Graph of a cubic curve in the xy-plane, with both axes labeled from -8 to 8 in steps of 2. The curve comes down from the upper left, crosses the x-axis at x = -5, reaches a low point near (-2.5, -3.6), rises through the y-axis between -2 and -1, crosses the x-axis at x = 1, reaches a high point near (4.5, 3.6), crosses the x-axis at x = 7, and falls steeply to the lower right.](tests/images/advanced-math-b/q33a.svg)
B. ![Graph of a cubic curve in the xy-plane, with both axes labeled from -8 to 8 in steps of 2. The curve comes down from the upper left, crosses the x-axis at x = -7, reaches a low point near (-4.5, -3.6), rises to cross the x-axis at x = -1 and the y-axis between 1 and 2, reaches a high point near (2.5, 3.6), crosses the x-axis at x = 5, and falls steeply to the lower right.](tests/images/advanced-math-b/q33b.svg)
C. ![Graph of a cubic curve in the xy-plane, with both axes labeled from -8 to 8 in steps of 2. The curve comes down from the upper left, touches the x-axis at x = -1 without crossing it (a low point at (-1, 0)), rises through the y-axis slightly above 0 to a high point near (4.3, 3.3), crosses the x-axis at x = 7, and falls steeply to the lower right.](tests/images/advanced-math-b/q33c.svg)
D. ![Graph of a cubic curve in the xy-plane, with both axes labeled from -8 to 8 in steps of 2. The curve comes down steeply from the upper left, crosses the x-axis at the origin, reaches a low point near (2.3, -2), rises to touch the x-axis at x = 7 without crossing it (a high point at (7, 0)), and then falls to the lower right.](tests/images/advanced-math-b/q33d.svg)
Answer: A
Domain: Advanced Math
Explanation: Since $x + 5$ is a factor of $f(x)$, $f(-5) = 0$, and since $x = 7$ is a solution of $f(x) = 0$, $f(7) = 0$. So the graph must meet the $x$-axis at both $x = -5$ and $x = 7$. Only the graph in choice A does. The graph in choice B has $x$-intercepts at $x = -7$, $-1$, and $5$; the graph in choice C meets the $x$-axis only at $x = -1$ and $x = 7$; and the graph in choice D meets it only at $x = 0$ and $x = 7$.

34.

$$-x^2 + bx - 169 = 0$$

In the given equation, $b$ is an integer. The equation has no real solutions. What is the least possible value of $b$?
Answer: -25
Domain: Advanced Math
Explanation: The equation has no real solutions when its discriminant is negative: $b^2 - 4(-1)(-169) = b^2 - 676 < 0$. So $b^2 < 676$, which means $-26 < b < 26$. The least integer in this range is $-25$.

35.

$$\sqrt{k - x} = 39 - x$$

In the given equation, $k$ is a constant. The equation has exactly one real solution. What is the minimum possible value of $4k$?
Answer: 155
Domain: Advanced Math
Explanation: A solution must satisfy $39 - x \ge 0$. Let $u = 39 - x$, so $u \ge 0$ and $x = 39 - u$. Squaring gives $k - 39 + u = u^2$, or $u^2 - u + (39 - k) = 0$, whose discriminant is $1 - 4(39 - k) = 4k - 155$. If $4k < 155$, there are no real solutions. If $4k = 155$, there is exactly one root, $u = \frac{1}{2} \ge 0$, so the original equation has exactly one real solution, $x = 38.5$ (check: $\sqrt{38.75 - 38.5} = 0.5 = 39 - 38.5$). So the minimum possible value of $4k$ is $155$. (For $38.75 < k \le 39$ there are two solutions, and for $k > 39$ there is again exactly one.)

36. The functions $f$ and $g$ are defined by the given equations, where $x \ge 0$. Which of the following equations displays, as a constant or coefficient, the maximum value of the function it defines, where $x \ge 0$?

I. $f(x) = 19(1.27)^x + 43$

II. $g(x) = 8(0.77)^x$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: B
Domain: Advanced Math
Explanation: Since $1.27 > 1$, $f$ is increasing and has no maximum value for $x \ge 0$. Since $0 < 0.77 < 1$, $g$ is decreasing, so its maximum value for $x \ge 0$ is $g(0) = 8(1) = 8$, which appears as the coefficient in equation II.

37. The graph of $y = f(x) + 1$ is shown. Which equation defines the function $f$?

![Graph in the xy-plane of an increasing exponential curve. The x-axis is labeled from -3 to 3, and the y-axis is labeled from 1 to 15 in steps of 1. On the left, the curve is nearly flat, just above the horizontal line y = 1, which it approaches but never reaches. It crosses the y-axis at (0, 2), passes through (1, 7), and rises steeply, leaving the top of the grid near x = 1.5.](tests/images/advanced-math-b/q37.svg)
A. $f(x) = 6^x$
B. $f(x) = 2^x$
C. $f(x) = 6^x + 2$
D. $f(x) = 2^x + 1$
Answer: A
Domain: Advanced Math
Explanation: The graph of $y = f(x) + 1$ approaches $y = 1$ on the left, crosses the $y$-axis at $(0, 2)$, and passes through $(1, 7)$. If $f(x) = 6^x$, then $f(x) + 1 = 6^x + 1$, which gives $6^0 + 1 = 2$ and $6^1 + 1 = 7$, matching the graph. For choice B, $f(1) + 1 = 3$, not $7$, and for choices C and D, the $y$-intercept would be $(0, 4)$ and $(0, 3)$.

38. At the start of an experiment, the pressure inside a container was $18$ pounds per square inch (psi). The pressure inside the container doubled every $29$ minutes after the start of the experiment. Which equation represents this situation, where $y$ is the pressure, in psi, inside the container $x$ minutes after the start of the experiment?
A. $y = 18(2)^{\frac{x}{29}}$
B. $y = 18(29)^{2x}$
C. $y = 18(x + 29)^2$
D. $y = 18x^2 + 29$
Answer: A
Domain: Advanced Math
Explanation: The pressure starts at $18$ psi and is multiplied by $2$ every $29$ minutes. After $x$ minutes there have been $\frac{x}{29}$ doubling periods, so $y = 18(2)^{\frac{x}{29}}$. For example, at $x = 29$, $y = 36$.

39. The function $f$ is defined by $f(x) = 44(0.21)^x$. For any positive integer $n$, the value of $f(n)$ is $p\%$ less than the value of $f(n - 1)$. What is the value of $p$?
A. $79$
B. $56$
C. $44$
D. $21$
Answer: A
Domain: Advanced Math
Explanation: $\frac{f(n)}{f(n - 1)} = \frac{44(0.21)^n}{44(0.21)^{n - 1}} = 0.21$, so $f(n)$ is $21\%$ of $f(n - 1)$, which is $100\% - 21\% = 79\%$ less. So $p = 79$. Choice D is the percent **of** $f(n - 1)$, not the percent decrease.

40. The kinetic energy $K$, in joules, of an object is given by the formula $K = \dfrac{1}{2}mv^2$, where $m$ is the mass of the object, in kilograms, and $v$ is the velocity of the object, in meters per second. If the kinetic energy of a certain object can be found by using the formula $K = 34v^2$, what is the mass of the object, in kilograms?
A. $17$
B. $34$
C. $68$
D. $1{,}156$
Answer: C
Domain: Advanced Math
Explanation: Comparing $K = \frac{1}{2}mv^2$ with $K = 34v^2$ gives $\frac{1}{2}m = 34$, so $m = 68$ kilograms. Choice B is $\frac{1}{2}m$, not $m$.

41.

![Graph in the xy-plane of a cubic curve. Both axes are labeled from -8 to 8 in steps of 2, with lighter grid lines every 0.5 unit. The curve comes down steeply from the top of the grid near x = -1.7, crosses the x-axis near x = -1, reaches a low point near (-0.2, -2.7), rises to cross the x-axis near x = 1.1, reaches a high point near (1.6, 0.6) just above the x-axis, crosses the x-axis again near x = 2, and then falls steeply, leaving the bottom of the grid near x = 2.9.](tests/images/advanced-math-b/q41.svg)

The graph of $y = f(x)$ is shown, where the function $f$ is defined by $f(x) = ax^3 + bx^2 + cx + d$ and $a$, $b$, $c$, and $d$ are constants. For how many values of $x$ does $f(x) = 0$?
A. One
B. Two
C. Three
D. Four
Answer: C
Domain: Advanced Math
Explanation: The values of $x$ for which $f(x) = 0$ are the $x$-coordinates of the $x$-intercepts of the graph. The graph crosses the $x$-axis three times (near $x = -1$, $x = 1$, and $x = 2$), so there are three such values. A cubic function has at most three zeros, so choice D is impossible.

42.

$$f(x) = 5x^2 + 60x + 181$$

The function $g$ is defined by $g(x) = f(x + 8)$. What is the minimum value of $g(x)$?
A. $-14$
B. $-6$
C. $1$
D. $9$
Answer: C
Domain: Advanced Math
Explanation: Completing the square, $f(x) = 5(x^2 + 12x + 36) - 180 + 181 = 5(x + 6)^2 + 1$, so the minimum value of $f$ is $1$. The graph of $g(x) = f(x + 8) = 5(x + 14)^2 + 1$ is the graph of $f$ shifted $8$ units to the left, which does not change the minimum value, $1$. Choices A and B are the $x$-coordinates of the vertices of the graphs of $g$ and $f$.

43. The functions $g$ and $h$ are defined by the given equations.

$$\begin{gathered} g(x) = \sqrt{(x - 11)^2 + 45} \\[4pt] h(x) = \sqrt[3]{64} + \dfrac{x^2}{2} \end{gathered}$$

If $g(8) = t$, where $t$ is a constant, what is the value of $h(t)$?
A. $3\sqrt{6}$
B. $22$
C. $31$
D. $51$
Answer: C
Domain: Advanced Math
Explanation: $t = g(8) = \sqrt{(-3)^2 + 45} = \sqrt{54}$, so $t^2 = 54$. Since $\sqrt[3]{64} = 4$, $h(t) = 4 + \frac{54}{2} = 4 + 27 = 31$. Choice A is the value of $t$, not $h(t)$.

44. The function $f$ is defined by $f(x) = a^x + b$, where $a$ and $b$ are constants and $a > 0$. In the $xy$-plane, the graph of $y = f(x)$ has a $y$-intercept at $(0, -20)$ and passes through the point $(2, 43)$. What is the value of $a - b$?
Answer: 29
Domain: Advanced Math
Explanation: $f(0) = a^0 + b = 1 + b = -20$, so $b = -21$. Then $f(2) = a^2 - 21 = 43$, so $a^2 = 64$, and since $a > 0$, $a = 8$. So $a - b = 8 - (-21) = 29$.

45. The function $h$ is defined by $h(x) = (x + p)(x - 2)(2x - 12)$, where $p$ is a constant. In the $xy$-plane, the graph of $y = h(x)$ passes through the point $(-3, 0)$. What is the value of $h(0)$?
A. $-36$
B. $-3$
C. $5$
D. $72$
Answer: D
Domain: Advanced Math
Explanation: Since $h(-3) = 0$, $(-3 + p)(-5)(-18) = 0$, so $p = 3$. Then $h(0) = (0 + 3)(0 - 2)(0 - 12) = 3(-2)(-12) = 72$.

46.

$$\begin{gathered} y = 2x^2 - 15x + 23 \\[4pt] y = x + a \end{gathered}$$

In the given system of equations, $a$ is a constant. The graphs of the equations in the given system intersect at exactly one point, $(x, y)$, in the $xy$-plane. What is the value of $x$?
A. $-9$
B. $-4$
C. $4$
D. $9$
Answer: C
Domain: Advanced Math
Explanation: Setting the expressions for $y$ equal gives $2x^2 - 15x + 23 = x + a$, or $2x^2 - 16x + (23 - a) = 0$. The graphs intersect at exactly one point when this equation has exactly one solution, a double root, which is $x = -\frac{-16}{2(2)} = 4$. (The discriminant condition $256 - 8(23 - a) = 0$ gives $a = -9$; choice A is the value of $a$, not $x$.)

47. The function $f(t) = 30{,}000(2)^{\frac{t}{370}}$ gives the number of bacteria in a population $t$ minutes after an initial observation. How much time, in minutes, does it take for the number of bacteria in the population to double?
A. $2$
B. $370$
C. $740$
D. $30{,}000$
Answer: B
Domain: Advanced Math
Explanation: The number of bacteria is multiplied by $2$ each time the exponent $\frac{t}{370}$ increases by $1$, that is, every $370$ minutes. For example, $f(370) = 30{,}000(2)^1 = 60{,}000$, which is twice $f(0) = 30{,}000$.

48.

$$\sqrt[5]{x^m}$$

In the given expression, $m$ is a constant and $x > 1$. The expression can be rewritten as $\sqrt[7]{x}$. What is the value of $m$?
Answer: 5/7
Domain: Advanced Math
Explanation: $\sqrt[5]{x^m} = x^{\frac{m}{5}}$ and $\sqrt[7]{x} = x^{\frac{1}{7}}$. Since $x > 1$, the exponents must be equal: $\frac{m}{5} = \frac{1}{7}$, so $m = \frac{5}{7}$.

49.

| Time (years) | Total amount (dollars) |
|:---:|:---:|
| $0$ | $867.00$ |
| $1$ | $870.47$ |
| $2$ | $873.95$ |

Sam opened a savings account at a bank. The table shows the exponential relationship between the time $t$, in years, since Sam opened the account and the total amount $n$, in dollars, in the account. If Sam made no additional deposits or withdrawals, which of the following equations best represents the relationship between $t$ and $n$?
A. $n = 0.004(1 + 867)^t$
B. $n = 867(1 + 0.004)^t$
C. $n = (1 + 0.004)^t$
D. $n = (1 + 867)^t$
Answer: B
Domain: Advanced Math
Explanation: At $t = 0$, $n = 867.00$, so the initial amount is $867$. Each year the amount is multiplied by about $\frac{870.47}{867.00} \approx 1.004$ (and $\frac{873.95}{870.47} \approx 1.004$), so $n = 867(1 + 0.004)^t$. Check: $867(1.004) \approx 870.47$ and $867(1.004)^2 \approx 873.95$. Choices C and D give $n = 1$ at $t = 0$, and choice A gives $n = 0.004$.

50.

$$f(x) = 7{,}020(0.28)^{\frac{x}{12}}$$

The function $f$ gives the value, in dollars, of a certain piece of equipment after $x$ months of use. If the value of the equipment decreases each year by $p\%$ of its value the preceding year, what is the value of $p$?
A. $2$
B. $10$
C. $28$
D. $72$
Answer: D
Domain: Advanced Math
Explanation: One year is $12$ months, and $f(x + 12) = 7{,}020(0.28)^{\frac{x}{12} + 1} = 0.28f(x)$. So each year the value is $28\%$ of its value the preceding year, a decrease of $100\% - 28\% = 72\%$. So $p = 72$. Choice C is the percent **of** the preceding value, not the percent decrease.

51. The functions $f$ and $g$ are defined by the given equations, where $x \ge 0$. Which of the following equations displays, as a constant or coefficient, the maximum value of the function it defines, where $x \ge 0$?

I. $f(x) = 16(1.25)^x + 43$

II. $g(x) = 6(0.75)^x$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: B
Domain: Advanced Math
Explanation: Since $1.25 > 1$, $f$ is increasing and has no maximum value for $x \ge 0$. Since $0 < 0.75 < 1$, $g$ is decreasing, so its maximum value for $x \ge 0$ is $g(0) = 6(1) = 6$, which appears as the coefficient in equation II.

52.

$$\begin{gathered} y = x - c \\[4pt] y = -4(x - 8)^2 \end{gathered}$$

In the given system of equations, $c$ is a constant. The system has two distinct real solutions. Which of the following could be the value of $c$?
A. $3$
B. $7$
C. $\dfrac{127}{16}$
D. $13$
Answer: D
Domain: Advanced Math
Explanation: Setting the expressions for $y$ equal gives $x - c = -4x^2 + 64x - 256$, or $4x^2 - 63x + (256 - c) = 0$. The system has two distinct real solutions when the discriminant is positive: $63^2 - 16(256 - c) > 0$, so $3{,}969 - 4{,}096 + 16c > 0$ and $c > \frac{127}{16} = 7.9375$. Of the choices, only $13$ is greater than $\frac{127}{16}$. When $c = \frac{127}{16}$, the system has exactly one solution.

53.

$$\sqrt[7]{p^4} = t^{\frac{5}{6}}$$

In the given equation, $p > 1$ and $t > 1$. If $t = p^{2n - 1}$, where $n$ is a constant, what is the value of $n$?
Answer: 59/70
Domain: Advanced Math
Explanation: The left side is $p^{\frac{4}{7}}$, and substituting $t = p^{2n - 1}$ makes the right side $\left(p^{2n - 1}\right)^{\frac{5}{6}} = p^{\frac{5(2n - 1)}{6}}$. Since $p > 1$, the exponents must be equal: $\frac{5(2n - 1)}{6} = \frac{4}{7}$, so $2n - 1 = \frac{24}{35}$, $2n = \frac{59}{35}$, and $n = \frac{59}{70}$.

54.

$$f(x) = -x^2 + bx + c$$

The function $f$ is defined by the given equation, where $b$ and $c$ are constants. The graph of $y = f(x)$ in the $xy$-plane passes through the points $(0, 2)$ and $(10, 0)$. What is the value of $b$?
Answer: 49/5 | 9.8
Domain: Advanced Math
Explanation: Since the graph passes through $(0, 2)$, $c = f(0) = 2$. Since it passes through $(10, 0)$, $-100 + 10b + 2 = 0$, so $10b = 98$ and $b = 9.8$.

55.

$$f = \dfrac{(3x)^2}{4g}$$

The given equation relates the positive numbers $f$, $x$, and $g$. Which equation correctly expresses $x$ in terms of $f$ and $g$?
A. $x = \dfrac{\sqrt{4fg}}{3}$
B. $x = 3\sqrt{4fg}$
C. $x = \sqrt{\dfrac{4fg}{3}}$
D. $x = \sqrt{4fg} - 3$
Answer: A
Domain: Advanced Math
Explanation: Multiplying both sides by $4g$ gives $4fg = (3x)^2 = 9x^2$. Since $x > 0$, taking the positive square root gives $3x = \sqrt{4fg}$, so $x = \frac{\sqrt{4fg}}{3}$. Choice C comes from forgetting to square the $3$.

56.

$$h(t) = -16t^2 + b$$

The function $h$ estimates an object's height, in feet, above the ground $t$ seconds after the object is dropped, where $b$ is a constant. The function estimates that the object is $40.96$ feet above the ground when it is dropped at $t = 0$. How many seconds after being dropped does the function estimate the object will hit the ground?
Answer: 8/5 | 1.6
Domain: Advanced Math
Explanation: At $t = 0$, $h(0) = b = 40.96$. The object hits the ground when $h(t) = 0$: $16t^2 = 40.96$, so $t^2 = 2.56$, and since $t > 0$, $t = 1.6$ seconds.

57.

$$f(x) = x^2 - 4x - 320$$

The function $f$ is defined by the given equation. Which of the following equivalent forms of the equation displays the minimum value of the function as a constant or coefficient?
A. $f(x) = x^2 - 4(x + 80)$
B. $f(x) = (x - 2)^2 + (-324)$
C. $f(x) = x(x - 4) + (-320)$
D. $f(x) = (x + 16)(x - 20)$
Answer: B
Domain: Advanced Math
Explanation: Completing the square, $x^2 - 4x - 320 = (x^2 - 4x + 4) - 324 = (x - 2)^2 - 324$. Since $(x - 2)^2 \ge 0$, the minimum value of $f$ is $-324$ (at $x = 2$), and choice B displays $-324$ as a constant. The forms in choices A, C, and D are also equivalent to $f(x)$, but none of them displays $-324$.
`
});
